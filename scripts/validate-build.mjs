import { access, readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { gzipSync } from 'node:zlib';

import { HtmlValidate } from 'html-validate';

const root = process.cwd();
const outputRoot = path.join(root, 'dist');
const productionOrigin = 'https://mehdiahmadirad.me';
const budgets = {
  initialJavaScriptGzip: 30 * 1024,
  totalCssGzip: 50 * 1024,
  criticalFontPreloads: 2,
};

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const target = path.join(directory, entry.name);
      return entry.isDirectory() ? walk(target) : [target];
    }),
  );
  return nested.flat();
}

function routeForHtml(file) {
  const relative = path.relative(outputRoot, file).replaceAll('\\', '/');
  if (relative === 'index.html') return '/';
  if (relative.endsWith('/index.html')) {
    return `/${relative.slice(0, -'index.html'.length)}`;
  }
  return `/${relative}`;
}

function localFileForPath(pathname) {
  const decoded = decodeURIComponent(pathname);
  const relative = decoded.replace(/^\/+/, '');
  const candidate = path.resolve(outputRoot, relative);
  if (
    candidate !== path.resolve(outputRoot) &&
    !candidate.startsWith(`${path.resolve(outputRoot)}${path.sep}`)
  ) {
    throw new Error(`Path escapes dist: ${pathname}`);
  }
  if (path.extname(candidate)) return candidate;
  return path.join(candidate, 'index.html');
}

async function exists(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

function attributes(html) {
  return [...html.matchAll(/\b(?:href|src)=(?:"([^"]*)"|'([^']*)')/g)].map(
    (match) => (match[1] ?? match[2]).replaceAll('&amp;', '&'),
  );
}

function ids(html) {
  return new Set(
    [...html.matchAll(/\bid=(?:"([^"]+)"|'([^']+)')/g)].map(
      (match) => match[1] ?? match[2],
    ),
  );
}

function executableScripts(html) {
  return [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)].filter(
    ([, attrs]) => !/type=(?:"|')application\/ld\+json(?:"|')/i.test(attrs),
  );
}

const files = await walk(outputRoot);
const htmlFiles = files.filter((file) => file.endsWith('.html'));
const cssFiles = files.filter((file) => file.endsWith('.css'));
const htmlValidate = new HtmlValidate({
  extends: ['html-validate:recommended', 'html-validate:prettier'],
  elements: ['html5'],
  rules: { 'no-inline-style': 'off' },
});
const errors = [];
const htmlByFile = new Map();

for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  htmlByFile.set(file, html);
  const report = await htmlValidate.validateFile(file);
  if (!report.valid) {
    for (const result of report.results) {
      for (const message of result.messages.filter(
        ({ severity }) => severity === 2,
      )) {
        errors.push(
          `${path.relative(root, file)}:${message.line}:${message.column} ${message.ruleId} — ${message.message}`,
        );
      }
    }
  }
}

for (const [file, html] of htmlByFile) {
  const route = routeForHtml(file);
  const base = new globalThis.URL(route, productionOrigin);
  for (const reference of attributes(html)) {
    if (!reference || /^(?:data:|mailto:|tel:|javascript:)/i.test(reference)) {
      continue;
    }
    let url;
    try {
      url = new globalThis.URL(reference, base);
    } catch {
      errors.push(`${route} has an invalid reference: ${reference}`);
      continue;
    }
    if (url.origin !== productionOrigin) continue;
    const target = localFileForPath(url.pathname);
    if (!(await exists(target))) {
      errors.push(`${route} references missing ${url.pathname}`);
      continue;
    }
    if (url.hash && target.endsWith('.html')) {
      const targetHtml =
        htmlByFile.get(target) ?? (await readFile(target, 'utf8'));
      const fragment = decodeURIComponent(url.hash.slice(1));
      if (!ids(targetHtml).has(fragment)) {
        errors.push(
          `${route} references missing fragment ${url.pathname}${url.hash}`,
        );
      }
    }
  }
}

let maximumJavaScriptGzip = 0;
let maximumJavaScriptRoute = '';
for (const [file, html] of htmlByFile) {
  let size = 0;
  for (const [, attrs, inline] of executableScripts(html)) {
    const source = attrs.match(/\bsrc=(?:"([^"]+)"|'([^']+)')/i);
    if (source) {
      const value = source[1] ?? source[2];
      if (/^https?:/i.test(value)) {
        errors.push(
          `${routeForHtml(file)} loads third-party JavaScript: ${value}`,
        );
      } else {
        const script = localFileForPath(
          new globalThis.URL(value, productionOrigin).pathname,
        );
        size += gzipSync(await readFile(script)).byteLength;
      }
    } else {
      size += gzipSync(globalThis.Buffer.from(inline)).byteLength;
    }
  }
  if (size > maximumJavaScriptGzip) {
    maximumJavaScriptGzip = size;
    maximumJavaScriptRoute = routeForHtml(file);
  }
  if (size >= budgets.initialJavaScriptGzip) {
    errors.push(
      `${routeForHtml(file)} initial custom JS is ${size} bytes gzip (budget < ${budgets.initialJavaScriptGzip})`,
    );
  }
  const preloadCount = [...html.matchAll(/<link\b[^>]*>/gi)].filter(
    ([link]) =>
      /\brel=(?:"|')preload(?:"|')/i.test(link) &&
      /\bas=(?:"|')font(?:"|')/i.test(link),
  ).length;
  if (preloadCount > budgets.criticalFontPreloads) {
    errors.push(
      `${routeForHtml(file)} preloads ${preloadCount} fonts (budget <= ${budgets.criticalFontPreloads})`,
    );
  }
}

const totalCssGzip = (
  await Promise.all(
    cssFiles.map(async (file) => gzipSync(await readFile(file)).byteLength),
  )
).reduce((total, size) => total + size, 0);
if (totalCssGzip >= budgets.totalCssGzip) {
  errors.push(
    `Total CSS is ${totalCssGzip} bytes gzip (budget < ${budgets.totalCssGzip})`,
  );
}

if (errors.length > 0) {
  throw new Error(`Build validation failed:\n- ${errors.join('\n- ')}`);
}

globalThis.console.log(
  `Validated ${htmlFiles.length} HTML documents and their local links.`,
);
globalThis.console.log(
  `Total CSS: ${totalCssGzip} bytes gzip (budget < 51200).`,
);
globalThis.console.log(
  `Largest initial custom JS: ${maximumJavaScriptGzip} bytes gzip on ${maximumJavaScriptRoute || 'static pages'} (budget < 30720).`,
);
globalThis.console.log('Critical font preloads: at most 2 per document.');

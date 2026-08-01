import rss from '@astrojs/rss';
import type { APIRoute, GetStaticPaths } from 'astro';

import { locales, type Locale } from '../../i18n/locales';
import { articlePath } from '../../i18n/routing';
import { getUi } from '../../i18n/ui';
import { getPublishedArticles } from '../../lib/content/repository';

interface Props {
  locale: Locale;
}

export const getStaticPaths: GetStaticPaths = () =>
  locales.map((locale) => ({
    params: { lang: locale },
    props: { locale },
  }));

export const GET: APIRoute<Props> = async ({ props, site }) => {
  const { locale } = props;
  const ui = getUi(locale);
  const articles = (await getPublishedArticles(locale)).toSorted(
    (left, right) =>
      right.data.publishedAt.getTime() - left.data.publishedAt.getTime(),
  );

  return rss({
    title: ui.publishing.feedTitle,
    description: ui.publishing.feedDescription,
    site: site ?? 'https://mehdiahmadirad.me',
    customData: `<language>${locale}</language>`,
    items: articles.map((article) => ({
      title: article.data.title,
      description: article.data.description,
      pubDate: article.data.publishedAt,
      link: articlePath(locale, article.data.slug),
    })),
  });
};

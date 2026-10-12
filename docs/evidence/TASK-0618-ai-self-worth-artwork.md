# TASK-0618 — Selected bilingual AI/self-worth artwork

## Source and authorization

The owner selected “آدم و سیل” (concept 1) and requested its use in both editions. Original generation: `exec-ec5c0125-4c3c-443b-bd46-c0a897698f00`. Subsequent owner feedback requested paper-color consistency with existing article images. The background-only image edit uses the existing loop essay artwork as its reference: `exec-12ffadb9-d120-48f9-b77c-258b3b07da2e`.

One optimized 1254 × 1254 WebP is shared across FA/EN at `/images/articles/ai-and-self-worth/hero.webp`; quality 88, 149,694 bytes, with stripped metadata. Black printed shapes, brick accent and square composition retain the chosen concept. The source images remain separately preserved.

## Verification

- Format, lint and Astro check passed (0 errors, 0 warnings; existing inline-script hint).
- 27 content/unit tests passed using `node --import tsx --test tests/unit/*.test.*`.
- Production build, Pagefind and 30-page HTML/link/budget validation passed before paper-tone refinement; the build is refreshed with the final optimized asset.
- Both localized covers point to one shared file and supply meaningful localized alt text.
- Both article bodies are unchanged. No title, date, topic or template/style change.
- Existing cover rules restrict display to article pages and the selected featured Home writing; article/topic lists remain text-only.
- CI verifies desktop/mobile behavior, accessibility and approved visual contracts without new baselines.

## Release targets

- https://mehdiahmadirad.me/fa/articles/ai-and-self-worth/
- https://mehdiahmadirad.me/en/articles/ai-and-self-worth/

PR merge, Pages completion and live asset checks are required before publication is reported complete.

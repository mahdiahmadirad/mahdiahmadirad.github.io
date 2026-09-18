# TASK-0613 — Compact editorial density review evidence

## Outcome

The reversible density pilot is implemented on
`feature/compact-editorial-density`. The product owner subsequently approved
the changes and requested pushing them to origin/main. TASK-0613 captures are
now accepted visual evidence; historical screenshots remain unchanged.

At the same 1440px desktop width, the full Home capture changed as follows:

| Locale | Approved capture | Pilot capture | Reduction |
|---|---:|---:|---:|
| Persian | 2891px | 2408px | 16.7% |
| English | 2862px | 2379px | 16.9% |

The long DaD III article capture is 7.6% shorter in Persian and 5.7% shorter
in English. The difference between languages is expected because their text
and line-height are independently authored and tuned.

## Visual evidence

The review matrix contains full-page Home captures and first-viewport captures
for both surfaces:

- Home × FA/EN × 1440×1100 and 390×844
- Article × FA/EN × 1440×1100 and 390×844

Files follow these patterns:

- `TASK-0613-home-{fa|en}-{desktop|mobile}.png`
- `TASK-0613-{home|article}-{fa|en}-{desktop|mobile}-viewport.png`

## Verification

| Check | Result |
|---|---|
| `npm run format:check` | pass |
| `npm run lint` | pass |
| `npm run check` | pass; one pre-existing GoatCounter inline-script hint |
| `node --import tsx --test tests/unit/*.test.*` | 27 passed |
| `npm run build` | pass; 26 static pages and two Pagefind languages |
| `npm run validate:build` | pass; links and budgets valid |
| `PLAYWRIGHT_EXECUTABLE_PATH=/tmp/chromium npx playwright test tests/e2e tests/accessibility --workers=1` | 78 passed |

The repository's `tsx` CLI wrapper could not open its IPC socket in this
runtime, so the same TypeScript test files were executed directly through
Node's test runner with the `tsx` import hook.

After owner approval, `PLAYWRIGHT_EXECUTABLE_PATH=/tmp/chromium npm run
test:visual` passed all 24 tests. The active suite checks rendering and overflow;
the historical pixel-comparison helper is not invoked by its current tests.
No historical screenshot was overwritten.

## Review decision

Approved by the product owner in this conversation. ADR-012 is accepted and
SPEC-002/SPEC-006 are synchronized with implementation. No article content or
navigation policy changed. Deployment verification follows the requested push.

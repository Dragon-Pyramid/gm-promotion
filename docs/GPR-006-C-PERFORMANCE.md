# GPR-006-C - Performance

## Baseline

- Branch: `feature/gm-promotion-performance-v1`
- Baseline: `42cdaeaadbc6b11fabfbcbe4ca45d1b333fa6795`

## Audit evidence

The production audit found:

- one production CSS asset of approximately `267.59 KB`;
- approximately `680.53 KB` of generated static JavaScript across all production chunks;
- `Scene01Fragmentation` uses React hooks and browser APIs including `window.matchMedia`, `IntersectionObserver`, and `requestAnimationFrame`;
- `Scene02` through `Scene14` did not contain React hooks, browser APIs, or event handlers in the focused client-boundary audit;
- `Scene02` through `Scene14` use client-side `react-kino` primitives such as `Scene`, `ScrollTransform`, `Kino`, and `Reveal`.

A proof of concept removed `"use client"` from `Scene03AdminOverview.tsx`; typecheck, lint, and production build all passed.

## Change

Remove the file-level `"use client"` directive from `Scene02` through `Scene14`.

These scene modules can therefore be rendered as Server Components while still composing the client-side `react-kino` primitives where needed.

`Scene01Fragmentation.tsx` remains a Client Component because it contains real browser-side behavior.

## Intended effect

Reduce unnecessary client-component boundaries and hydration surface without changing:

- cinematic layout;
- animation definitions;
- scroll behavior;
- copy;
- routing;
- SEO;
- accessibility semantics.

## Validation strategy

The patch must pass:

- exact branch and baseline guards;
- target semantic guards;
- exact changed-path reconciliation;
- TypeScript;
- ESLint;
- production build;
- `git diff --check`.

Production payload/manifests should then be re-measured before commit.

## Measured result

After removing the unnecessary client boundaries and rebuilding production:

| Metric | Before | After | Change |
| --- | ---: | ---: | ---: |
| Production CSS | `267.59 KB` | `267.59 KB` | no change |
| Generated static JavaScript | `680.53 KB` | `646.39 KB` | `-34.14 KB` (`~5.0%`) |
| Home client-reference manifest | `13.33 KB` | `7.26 KB` | `-6.07 KB` (`~45.5%`) |

The measured result confirms a smaller client-side surface while preserving the existing production build and cinematic behavior.

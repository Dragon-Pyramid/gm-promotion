# GPR-006-A - Production Hygiene

## Baseline

- Branch: `feature/gm-promotion-production-hygiene-v1`
- Baseline: `e2962c5da6bdfaf96dce22df2c7e4b90bab7b993`

## Scope

This patch removes unused default public assets inherited from the Next.js/Vercel starter.

## Removed assets

- `public/file.svg`
- `public/globe.svg`
- `public/next.svg`
- `public/vercel.svg`
- `public/window.svg`

A repository-wide reference audit found no usage for these files outside their own paths.

## Preserved assets and configuration

The following files are intentionally preserved:

- `public/images/gm_logo_blanco.png`
- `public/images/gm_logo_negro.png`
- `src/lib/brand/assets.ts`
- `next.config.ts`

The second `images.localPatterns` rule in `next.config.ts` remains intentional because it permits the Scene 02 logo URL with the exact query string `?context=scene02`, while the broader `/images/**` rule permits image URLs without a query string.

## Out of scope

Accessibility and performance changes are not included in this patch. They remain separate GPR-006 workstreams to preserve reviewability and reduce regression risk.

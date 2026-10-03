# GPR-005-A - Core Production SEO

## Baseline

- Branch: `feature/gm-promotion-production-seo-v1`
- Baseline: `dc8774dbdce9bd58b892de894a61f803e5e0629a`
- Production domain: `https://gymmaster.com.ar`

## Scope

This patch prepares the localized Gym Master promotion site for production SEO.

## Included

- Production `metadataBase` on `https://gymmaster.com.ar`.
- Localized canonical URLs for `/es` and `/en`.
- Dedicated localized metadata for `/es/demo` and `/en/demo`.
- `hreflang` alternatives for Spanish and English plus `x-default` to Spanish.
- Textual Open Graph metadata.
- Twitter summary metadata.
- `robots.ts` with sitemap declaration.
- `sitemap.ts` covering the four public localized URLs.

## Deferred

- Dedicated Open Graph/social preview image: GPR-005-B.
- Search Console verification and sitemap submission: production launch workflow.

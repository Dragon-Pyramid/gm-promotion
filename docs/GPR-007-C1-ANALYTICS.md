# GPR-007-C1 - Vercel Web Analytics

## Baseline

- Branch: `feature/gm-promotion-analytics-v1`
- Baseline: `dfeecab594d6222ad3009245d8ff37043144a447`

## Objective

Integrate Vercel Web Analytics into Gym Master Promotion so production visitors and page views can be measured after Web Analytics is enabled in the Vercel project.

## Audit evidence

Before this change:

- `@vercel/analytics` was not installed;
- there were no analytics imports or tracking components in `src`;
- the application has one locale layout at `src/app/[locale]/layout.tsx`;
- the project is already deployed successfully on Vercel;
- the Vercel Web Analytics dashboard is available but not yet enabled.

## Change

- install `@vercel/analytics` `^2.0.1`;
- import `Analytics` from `@vercel/analytics/next`;
- render `<Analytics />` once in the locale layout, directly inside `<body>` and outside `NextIntlClientProvider`.

## Expected coverage

After Vercel-side enablement and redeployment, page-view collection should cover:

- `/es`;
- `/en`;
- `/es/demo`;
- `/en/demo`.

## Validation

- exact branch and baseline guards;
- exact changed-path reconciliation;
- `npm audit --omit=dev`;
- TypeScript;
- ESLint;
- production build;
- `git diff --check`.

## Out of scope

This step does not:

- enable Web Analytics in Vercel;
- add custom analytics events;
- add UTM conventions;
- modify DNS or `gymmaster.com.ar`;
- change copy, SEO, routing, or cinematic behavior.

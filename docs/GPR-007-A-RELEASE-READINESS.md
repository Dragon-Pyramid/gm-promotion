# GPR-007-A - Production / Vercel Readiness

## Baseline

- Branch: `feature/gm-promotion-release-readiness-v1`
- Baseline: `26f0e3af96df3515f775de251ca56d264aef8299`

## Readiness audit

The production-readiness audit confirmed:

- the repository builds successfully with Next.js 16.3.6;
- `package-lock.json` is present;
- local secrets are stored in `.env.local`;
- `.env*` is ignored by Git;
- no environment file is tracked;
- the demo-request endpoint uses the Node.js runtime and Yahoo SMTP;
- the source references exactly three runtime environment variables:
  - `YAHOO_SMTP_USER`;
  - `YAHOO_SMTP_APP_PASSWORD`;
  - `DEMO_RECIPIENT_EMAIL`;
- canonical SEO, robots, and sitemap use `https://gymmaster.com.ar`;
- no project-specific `vercel.json` or `.vercelignore` is currently required.

## Change

This readiness patch:

- declares Node.js `24.x` in `package.json`;
- mirrors the Node.js `24.x` engine requirement in the root metadata of `package-lock.json`;
- adds a tracked `.env.example` contract without secret values;
- explicitly allows `.env.example` through the existing `.env*` Git ignore rule.

## Environment contract

Production and Preview deployments require these server-side variables:

```text
YAHOO_SMTP_USER
YAHOO_SMTP_APP_PASSWORD
DEMO_RECIPIENT_EMAIL
```

No secret values are committed.

## Dependency audit

- `npm audit --omit=dev`: `0 vulnerabilities`;
- the full development dependency audit reports `5 high severity` findings in the ESLint tooling dependency chain (`eslint-config-next` -> `@next/eslint-plugin-next` -> `fast-glob` -> `micromatch` -> `braces`);
- these findings are not present in production dependencies;
- no `npm audit fix --force` is applied because npm proposes a breaking dependency change outside this release-readiness scope.

## Out of scope

This patch does not:

- deploy to Vercel;
- modify DNS or domain delegation;
- modify production secrets;
- connect `gymmaster.com.ar`;
- change application behavior, copy, SEO content, or cinematic presentation.

Those actions belong to the deployment and launch steps after this readiness patch is validated and merged.

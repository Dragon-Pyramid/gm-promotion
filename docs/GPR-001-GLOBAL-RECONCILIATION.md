# GPR-001 — Global Visual & Narrative Reconciliation

## Patch

GPR-001-A — Public copy and hard-coded UI reconciliation.

## Baseline

- Branch: `feature/gm-promotion-global-reconciliation-v1`
- Baseline: `098040c9997c8316e070e96aba642adaee4dd8fb`

## Scope

This patch performs a narrow production-facing copy reconciliation after completion of the Scene 00–14 cinematic pass.

### Changes

- localizes the Hero scroll rail:
  - ES: `DESLIZÁ`
  - EN: `SCROLL`
- replaces decorative English-only Scene 02 technical labels with language-neutral Gym Master branding;
- reuses the existing localized `adminLive` label for the secondary Scene 03 live marker;
- removes the English-only `BUSINESS SIGNAL` helper phrase from Scene 04 while preserving Gym Master branding;
- refines promotional scene labels so they read as intentional product/presentation framing rather than prototype scaffolding;
- preserves transparency where values, sequences or views are illustrative/conceptual.

## Explicitly preserved

- main narrative copy and scene order;
- Scene 13 `MISMA OPERACIÓN · DOS FORMAS DE VIVIRLA` / `SAME OPERATION · TWO WAYS TO LIVE IT`;
- `GM` and `GYM MASTER` brand marks used inside visual compositions;
- all React Kino ownership and scroll-linked transforms;
- scene durations;
- CSS and responsive geometry;
- animations and reduced-motion behavior;
- CTA intent `request-demo`.

## Files changed

- `messages/es.json`
- `messages/en.json`
- `src/app/[locale]/page.tsx`
- `src/components/story/Scene02Poc.tsx`
- `src/components/story/Scene03AdminOverview.tsx`
- `src/components/story/Scene04AdminBusiness.tsx`
- `docs/GPR-001-GLOBAL-RECONCILIATION.md`

## Out of scope

- language selector and locale persistence;
- `/demo` route;
- form/email/WhatsApp integration;
- SEO production configuration;
- analytics;
- visual redesign;
- CSS changes.

Those items remain in later Global Pre-Release patches.

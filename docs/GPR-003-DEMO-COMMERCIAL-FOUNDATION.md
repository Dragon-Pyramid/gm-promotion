# GPR-003 - Demo Commercial Foundation

## Patch

GPR-003-A - Localized demo request foundation and Scene 14 commercial route connection.

## Baseline

- Branch: `feature/gm-promotion-demo-foundation-v1`
- Baseline: `c4515637312e92ae54e4b7ffff05208b55ad2f09`

## Scope

This patch creates the localized commercial demo surface for Gym Master Promotion without adding a delivery backend.

### Changes

- adds localized `/es/demo` and `/en/demo` through `src/app/[locale]/demo/page.tsx`;
- adds a presentational demo request form;
- adds ES/EN `Demo` translation namespaces;
- connects the Scene 14 CTA to the localized `/demo` route using the existing `next-intl` navigation foundation;
- preserves the global ES/EN selector inside the demo route;
- adds a localized Dragon Pyramid company link (ES/EN destination);
- adds responsive demo styling;
- keeps the commercial submission intent explicitly decoupled for GPR-004.

## Form fields

- full name;
- gym / company;
- email;
- phone / WhatsApp;
- city;
- country;
- operation / needs message.

## Architecture preserved

- localized routing remains owned by `routing.ts`, `request.ts`, `proxy.ts` and `navigation.ts`;
- `[locale]/page.tsx` remains server-rendered;
- the demo page is server-rendered;
- Scene 00-14 cinematic ownership and motion remain unchanged;
- no new runtime dependency is added.

## GPR-004 handoff

The form submit control exposes `data-cta-intent="submit-demo-request"` but intentionally has no delivery handler in this patch. GPR-004 will connect the real commercial channels and reception mechanism.

## Files changed

- `src/app/[locale]/demo/page.tsx`
- `src/app/[locale]/layout.tsx`
- `src/components/demo/DemoRequestForm.tsx`
- `src/components/story/Scene14FinalCta.tsx`
- `src/app/globals.css`
- `messages/es.json`
- `messages/en.json`
- `docs/GPR-003-DEMO-COMMERCIAL-FOUNDATION.md`

## Out of scope

- API route / Server Action;
- email delivery;
- WhatsApp deep link;
- CRM or persistence;
- success confirmation;
- analytics;
- production SEO/domain reconciliation.

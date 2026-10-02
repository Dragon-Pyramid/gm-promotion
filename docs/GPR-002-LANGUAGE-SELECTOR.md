# GPR-002 - Language Selector & Locale Persistence

## Patch

GPR-002-A - Global ES/EN selector and locale-aware navigation foundation.

## Baseline

- Branch: `feature/gm-promotion-language-selector-v1`
- Baseline: `15dd4168f478e62c28bd00b7688e6454dc33e79b`

## Scope

This patch adds a small global language selector without changing the Scene 00-14 cinematic composition or converting the promotion page into a Client Component.

### Changes

- adds `src/i18n/navigation.ts` using `createNavigation(routing)`;
- adds a focused client island `LanguageSwitcher`;
- mounts the selector globally from the localized server layout;
- exposes `ES / EN` with an explicit active state;
- switches locale while preserving the logical pathname;
- uses the existing next-intl locale navigation flow rather than adding an independent localStorage preference;
- adds responsive, safe-area-aware fixed positioning;
- adds keyboard-visible focus treatment.

## Architecture preserved

- `routing.ts`, `request.ts` and `proxy.ts` remain the locale source of truth;
- `localePrefix: "always"` remains unchanged;
- `[locale]/page.tsx` remains server-rendered;
- Scene 00-14 source, ordering and cinematic behavior remain unchanged;
- React Kino ownership, durations, transforms and reduced-motion behavior remain unchanged.

## Forward compatibility

The selector preserves the logical pathname when changing locale. This establishes the navigation behavior required by later localized routes such as:

- `/es/demo`
- `/en/demo`

## Files changed

- `src/i18n/navigation.ts`
- `src/components/navigation/LanguageSwitcher.tsx`
- `src/app/[locale]/layout.tsx`
- `src/app/globals.css`
- `docs/GPR-002-LANGUAGE-SELECTOR.md`

## Out of scope

- `/demo` implementation;
- commercial form/email/WhatsApp integration;
- production SEO/domain reconciliation;
- analytics;
- Scene 00-14 copy or motion changes;
- global header/navigation redesign.

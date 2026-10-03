# GPR-006-B - Accessibility

## Baseline

- Branch: `feature/gm-promotion-accessibility-v1`
- Baseline: `3c8f2b2cf3e3b2c9bd39de4502206887ba1be545`

## Audit summary

The accessibility audit confirmed that the promotion already includes semantic landmarks, a coherent heading hierarchy, accessible form labels and feedback, keyboard-focus styles for the main demo actions, and extensive `prefers-reduced-motion` handling.

## Finding addressed

The hero discovery link (`.gm-discover`) is keyboard-focusable but did not have an explicit `:focus-visible` treatment comparable to the other primary interactive elements.

## Change

A visible keyboard focus indicator is added to `.gm-discover:focus-visible` using the existing Gym Master cyan focus language:

- `2px` outline;
- cyan `rgba(34, 211, 225, 0.78)`;
- `4px` outline offset.

## Out of scope

No form structure, cinematic motion, copy, routing, SEO, or performance behavior is changed in this patch.

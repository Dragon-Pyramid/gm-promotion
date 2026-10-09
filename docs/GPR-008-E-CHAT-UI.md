# GPR-008-E — Chat UI

## Status

DESIGN / CONTRACT

GPR-008-E defines and implements the public bilingual chat interface for Gym Master Promotion.

This stage is UI-only. It does not connect the interface to the RAG retrieval pipeline or to an LLM. That integration belongs to GPR-008-F.

## Goal

Provide a polished, accessible and responsive Gym Master assistant UI that is globally available in:

- `/es`
- `/en`
- `/es/demo`
- `/en/demo`

The chat must feel native to the current Gym Master promotional experience and must not look like an unrelated third-party widget.

## Architectural placement

Mount the assistant once at:

```text
src/app/[locale]/layout.tsx
```

This layout is the correct integration point because both the localized landing and demo routes render through it and already share locale context.

Do not duplicate the assistant inside the landing page or demo page.

## Proposed component structure

```text
src/components/chat/
  ChatAssistant.tsx
  ChatLauncher.tsx
  ChatPanel.tsx
  ChatMessageList.tsx
  ChatComposer.tsx
```

UI-only helpers may live under:

```text
src/lib/chat/
```

No provider-specific or RAG-specific infrastructure belongs in this stage.

## Global behavior

Default state:

- collapsed;
- visible as a compact launcher;
- no automatic panel opening;
- no blocking modal on page load;
- no aggressive notification badge;
- no continuous pulse/bounce animation.

The assistant must preserve the cinematic character of the promotion and remain visually present without competing with the main storytelling.

## Route-aware behavior

### Landing routes

On `/es` and `/en`, the initial assistant copy should invite product exploration.

Conceptual ES:

```text
¿Querés conocer cómo Gym Master puede ayudarte?
```

Conceptual EN:

```text
Want to see how Gym Master can help your gym?
```

These strings must live in the existing i18n system, not be hardcoded inside the component.

### Demo routes

On `/es/demo` and `/en/demo`, the assistant remains available but changes its contextual opening copy.

Conceptual ES:

```text
¿Tenés alguna duda antes de solicitar la demo?
```

Conceptual EN:

```text
Do you have any questions before requesting a demo?
```

The variation must be route-driven rather than implemented by duplicating the assistant.

## Bilingual behavior

Requirements:

- Spanish and English UI strings use the existing localization mechanism;
- visible UI follows the active page locale;
- changing the global locale changes the chat shell locale;
- no independent duplicated ES/EN components;
- no hidden hardcoded strings in the visual shell.

GPR-008-F will handle user-query language behavior and RAG response integration.

## Visual direction

Preferred:

- dark translucent surfaces;
- restrained cyan/accent border treatment;
- subtle glow;
- strong text contrast;
- rounded geometry consistent with the current design;
- compact launcher;
- short, restrained transitions.

Avoid:

- generic vendor-widget appearance;
- unrelated gradients;
- permanent pulsing;
- bouncing;
- oversized badges;
- animation that distracts from the landing scenes.

## Desktop layout

- launcher anchored bottom-right;
- panel opens above or adjacent to launcher;
- approximate width target: 380–420 px;
- height constrained by viewport;
- message list scrolls internally;
- composer remains reachable;
- opening chat must not shift page layout.

Exact dimensions are calibrated during visual QA.

## Mobile layout

Preferred behavior:

- high bottom sheet or near-full-screen surface;
- safe-area aware;
- clear close affordance;
- composer never hidden by browser/UI safe areas;
- internal message list scroll;
- no horizontal overflow.

## Safe areas

Account for:

```css
env(safe-area-inset-bottom)
env(safe-area-inset-right)
env(safe-area-inset-left)
```

where relevant.

## Layering / z-index

The current UI already contains fixed global controls such as the language selector.

Requirements:

- chat must use a dedicated high interactive layer;
- it must not disappear behind cinematic scenes;
- it must not overlap the top-right language selector;
- avoid arbitrary escalating z-index values across child components.

## Coexistence with language selector

- chat launcher defaults to bottom-right;
- no duplicated language control inside chat;
- locale switching must not leave the chat in a broken visual state.

## Coexistence with WhatsApp and demo actions

- WhatsApp remains an independent commercial action;
- do not add a second competing floating WhatsApp control;
- chat may expose a localized "Solicitar demo" / "Request demo" action;
- from landing routes it may navigate to `/{locale}/demo`;
- on demo routes it should orient the user toward the existing form rather than create a duplicate form.

## UI states

At minimum:

```text
collapsed
open
typing/input
mock user message
mock assistant message
empty/input-disabled edge state if needed
```

GPR-008-E uses local mock messages or controlled local state only.

Real loading, streaming, retrieval failure, LLM failure and API retry belong to GPR-008-F unless a neutral visual placeholder is needed for shell completeness.

## Message presentation

The shell should distinguish:

- assistant messages;
- user messages;
- optional system/context notices;
- commercial CTA actions when present.

Prioritize readability over messaging-app chrome.

## Composer

Provide:

- text input or textarea;
- explicit send action;
- keyboard-friendly behavior;
- visible focus state;
- disabled/empty protection;
- localized placeholder;
- no real network request in GPR-008-E.

## Accessibility

Required from the first implementation:

- semantic launcher button;
- accessible open/close labels;
- `aria-expanded`;
- `aria-controls`;
- stable panel id;
- visible keyboard focus;
- Escape closes panel;
- focus returns to launcher after close when appropriate;
- panel has appropriate semantic role/label;
- message updates use a non-disruptive live region where appropriate;
- controls remain keyboard reachable;
- readable contrast;
- reduced-motion preference respected.

Focus trapping should only be introduced if the final interaction genuinely behaves as a modal surface.

## Motion

Allowed:

- short opacity transition;
- short translate/scale transition;
- restrained launcher feedback.

Requirements:

- no continuous attention-seeking animation;
- no animation required to understand state;
- `prefers-reduced-motion` minimizes nonessential motion.

## Responsive constraints

Validate at minimum:

- narrow mobile;
- standard mobile;
- tablet-ish width;
- desktop;
- tall and short viewports.

No clipping, hidden composer, unreachable close control or horizontal page overflow.

## State lifetime

Local component state is sufficient for GPR-008-E.

Not required yet:

- persistence across navigation;
- session storage;
- conversation restoration;
- server-side history.

## Dependencies

Use the existing application stack.

Do not add a chat framework, modal framework or large UI dependency solely for this feature unless a concrete requirement cannot be met safely with the current React/Next/Tailwind/CSS stack.

## Security boundary

GPR-008-E must not:

- expose API keys;
- embed provider credentials;
- include hidden customer data;
- expose Masteradmin information;
- make direct browser calls to future LLM providers;
- create a public chat endpoint.

Those concerns belong to later integration/security stages.

## Masteradmin exclusion

Masteradmin must not appear in:

- chat shell copy;
- suggested questions;
- demo copy;
- public assistant labels;
- public capability examples.

## Suggested questions

If quick prompts are implemented visually, restrict them to public subjects such as:

- members;
- payments;
- access/QR;
- sales and stock;
- workouts and progress;
- communication;
- reports;
- demo/commercial questions.

Do not imply unsupported functionality or roadmap promises.

## Commercial behavior

The UI may visually support commercial intent, but GPR-008-E does not implement intent classification.

Allowed visual outcomes:

- demo CTA;
- contextual link to demo route;
- neutral informational suggestion.

Actual intent detection and grounded response selection belong to GPR-008-F.

## Out of scope

Explicitly out of scope:

- RAG invocation;
- retrieval orchestration;
- LLM provider selection;
- prompt engineering;
- answer generation;
- `/api/chat`;
- streaming;
- vector search;
- embeddings;
- rate limiting;
- abuse controls;
- prompt-injection defenses;
- chat analytics;
- persistent conversation history;
- production deployment.

## Implementation sequence

1. create global shell and launcher;
2. create panel and route-aware heading/copy;
3. add bilingual strings;
4. add local mock messages;
5. add composer interaction without network calls;
6. add responsive behavior;
7. add accessibility behaviors;
8. perform visual QA on landing and demo in ES/EN;
9. run repository gates;
10. reconcile final scope before commit/PR.

## Acceptance criteria

GPR-008-E is ready to close when:

- assistant mounts once globally through the localized layout;
- launcher is visible and usable on all four target routes;
- panel opens/closes reliably;
- landing and demo show correct contextual copy;
- ES/EN UI follows active locale;
- desktop and mobile layouts are usable;
- no collision occurs with the language selector;
- no harmful collision occurs with demo commercial actions;
- keyboard interaction works;
- Escape close behavior works;
- focus behavior is sensible;
- reduced motion is respected;
- no Masteradmin content appears;
- no real RAG/LLM/network integration is introduced;
- typecheck passes;
- lint passes;
- build passes;
- `git diff --check` passes;
- visual QA is completed before commit.

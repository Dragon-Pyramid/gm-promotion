# GPR-008-F — Chat / RAG Integration

Status: IN PROGRESS
Baseline: `main@68f4272399c770eefdd03755833b296e4009fbb2`
Predecessor: GPR-008-E — Chat UI (CLOSED, PR #48)

## 1. Purpose

Connect the bilingual Gym Master chat UI to the curated public RAG corpus and the deterministic retrieval pipeline completed in GPR-008-B/C/D.

The integration must remain grounded, server-side at the trust boundary, bilingual, auditable and compatible with the existing production freeze.

## 2. Current audited state

### Chat UI

The global chat UI is already mounted once at `src/app/[locale]/layout.tsx` and is available on:

- `/es`
- `/en`
- `/es/demo`
- `/en/demo`

Current client behavior is intentionally local/mock:

- `src/components/chat/ChatAssistant.tsx`
- `src/components/chat/ChatPanel.tsx`
- `src/components/chat/ChatComposer.tsx`
- `src/components/chat/ChatMessageList.tsx`
- `src/components/chat/ChatLauncher.tsx`

The UI already supports:

- ES/EN localized shell
- contextual landing/demo opening copy
- user and assistant messages
- local typing state
- suggested prompts
- multiline composer
- demo CTA
- Escape + focus return
- desktop/mobile behavior
- reduced motion

### Retrieval

The deterministic retrieval entrypoint is:

`src/lib/rag/retrieval/retrieve.mjs`

Its contract requires:

- `chunks`
- non-empty `query`
- `queryLocale` or valid `pageLocale`
- optional `profileHint`
- optional `topicHint`
- optional `topK`

It already provides:

- same-language-first retrieval
- explicit cross-language fallback
- `groundedEnough`
- deterministic ordering
- fail-closed rejection of non-public chunks
- fail-closed rejection of non-current chunks

The accepted GPR-008-D baseline remains:

- 14 evaluation cases
- Top1 expected topic: 9/14
- Top3 expected topic: 14/14
- unsupported queries rejected
- ES/EN brand-overlap unsupported queries rejected
- queryLocale overrides pageLocale
- cross-language fallback validated
- deterministic repeated retrieval validated

### Corpus / ingestion

The curated source corpus is:

- 22 public/current documents
- 11 ES
- 11 EN
- 94 deterministic chunks
- 47 ES
- 47 EN

The manifest is:

`src/content/rag/manifest.ts`

Current ingestion/chunk construction is implemented under:

`scripts/rag-ingestion/`

The generated artifact:

`artifacts/rag/chunks.v1.json`

is intentionally ignored by Git and therefore cannot be assumed to exist at application runtime.

## 3. Key integration finding

`retrieve()` is already application-neutral and safe to reuse, but it expects a fully built `chunks` array.

The current corpus-building path exists only in scripts and uses filesystem access to read:

- the manifest source
- 22 Markdown corpus files

Therefore GPR-008-F must introduce a deliberate **server-side runtime corpus boundary**. The client must never receive the entire corpus or ingestion internals.

Do not directly wire the browser to `retrieve()`.

## 4. Target architecture

```text
Chat UI (client)
    ↓
POST /api/chat
    ↓
server-side request validation
    ↓
query locale resolution
    ↓
runtime public/current corpus
    ↓
GPR-008-D retrieve()
    ↓
grounding decision + Top-K context
    ↓
answer generation boundary
    ↓
grounded response contract
    ↓
Chat UI
```

## 5. Trust boundary

The browser may send only bounded conversational input required by the chat experience.

Server-side code owns:

- payload validation
- locale resolution
- corpus loading
- retrieval
- grounding decision
- answer generation
- output shaping
- commercial routing signals

The browser must not control:

- corpus visibility/status rules
- arbitrary source paths
- retrieval internals
- provider credentials
- system instructions
- hidden administrative context
- Masteradmin knowledge
- trusted metadata that could elevate retrieval without server validation

## 6. Runtime

The chat API must run with:

```ts
export const runtime = "nodejs";
```

This keeps the integration compatible with the existing Node-based application/server capabilities and any later server-only provider credentials.

No provider credential may be exposed through `NEXT_PUBLIC_*`.

## 7. Runtime corpus strategy

This is the first technical decision to resolve in F.

The solution must satisfy all of the following:

- source of truth remains the curated 22-document corpus
- deterministic 94-chunk identity remains intact
- public/current fail-closed validation remains intact
- no client-side corpus delivery
- works in local dev, production build and Vercel Node runtime
- avoids silently depending on an ignored local artifact
- does not weaken GPR-008-C validation

Preferred implementation direction:

1. Extract/reuse ingestion primitives behind an application-safe server module.
2. Load/build the corpus server-side.
3. Cache the validated corpus in-process after first successful construction.
4. Ensure corpus Markdown files required at runtime are explicitly traceable/bundled for deployment if filesystem loading remains the selected strategy.

A generated committed runtime corpus may only be chosen if synchronization and deterministic verification are explicit and fail closed.

## 8. Query locale

`queryLocale` must be resolved server-side.

Rules:

1. Detect clear ES/EN evidence from the user's current message.
2. When the message is ambiguous, fall back to `pageLocale`.
3. Only `es` and `en` are accepted.
4. The resolved `queryLocale` is passed to `retrieve()`.
5. The answer must be returned in the user's resolved query language, even when cross-language retrieval fallback was necessary.

No external language-detection dependency is required unless evidence proves the deterministic approach insufficient.

## 9. Retrieval hints

`profileHint` and `topicHint` currently improve ranking but must not simply be trusted from arbitrary client input.

Before adding a classifier, F must measure retrieval quality without hints using the existing evaluation cases.

Decision rule:

- if no-hint retrieval remains adequate, keep the first runtime path simple
- if material regressions appear, add a small deterministic server-side hint resolver
- do not add LLM classification merely to compensate for missing metadata hints unless later evidence requires it

## 10. Grounding behavior

When:

```text
groundedEnough = false
```

the assistant must not invent an answer.

Expected behavior:

- answer cautiously in the resolved user language
- explain that the available Gym Master information does not support confirming that point
- when appropriate, offer the demo/contact path
- do not answer from general model knowledge as if it were Gym Master product truth

When grounded:

- answer only from retrieved public/current context
- preserve distinctions between current capabilities and roadmap/future ideas
- do not invent prices, integrations, delivery promises or AI capabilities

## 11. Commercial intent

Commercial intent belongs in the server integration layer, not only in UI copy.

Examples:

- price / pricing / cost / precio / cuesta
- implementation
- trial
- contract
- demo
- purchase / sales contact

A commercial signal may influence the response CTA, but it must never override grounding or fabricate commercial facts.

Pricing remains unknown unless explicitly supported by the curated corpus.

## 12. Answer generation boundary

GPR-008-F must keep answer generation provider-neutral at the application boundary.

The provider choice must not leak into:

- chat component contracts
- retrieval
- corpus schema
- UI message schema

A server adapter should receive a constrained grounded context and return a normalized answer result.

Provider/model selection is a separate implementation decision inside F and must be documented before credentials or external calls are introduced.

## 13. API request contract

Initial target shape:

```ts
type ChatRequest = {
  message: string;
  pageLocale: "es" | "en";
};
```

Conversation history may be added only when the first grounded single-turn path is stable.

Input must be bounded server-side.

## 14. API response contract

Target normalized shape:

```ts
type ChatResponse = {
  ok: true;
  answer: string;
  queryLocale: "es" | "en";
  grounded: boolean;
  usedCrossLanguageFallback: boolean;
  commercialIntent: boolean;
  sources: Array<{
    documentId: string;
    topic: string;
    sourceSection: string;
  }>;
};
```

Errors must use a bounded public error contract and must not expose stack traces, provider errors, corpus paths or secrets.

## 15. Source exposure

The UI may receive minimal public source metadata useful for traceability.

Do not return:

- full corpus dumps
- filesystem paths
- content hashes unless explicitly needed
- hidden prompts
- scoring internals
- provider request payloads
- credentials

## 16. Suggested implementation sequence

### F-01 — Runtime audit and no-hint evaluation

Read-only / test-only.

Confirm:

- corpus runtime strategy
- no-hint retrieval quality
- Node runtime requirements
- deployment tracing requirements

### F-02 — Server corpus boundary

Introduce validated server-only corpus loading/caching.

No chat API yet.

### F-03 — Retrieval service boundary

Wrap `retrieve()` behind a normalized server-side application service.

No external provider yet.

### F-04 — `/api/chat` retrieval contract

Add bounded request/response validation and grounded/unsupported behavior.

Initially deterministic if necessary.

### F-05 — Grounded answer generation adapter

Introduce the documented provider-neutral generation boundary.

External provider/model choice must be explicit before this step.

### F-06 — Chat UI integration

Replace the local mock timer with the real `/api/chat` call while preserving existing UX/accessibility.

### F-07 — Commercial routing

Add server-controlled commercial intent handling and localized CTA behavior.

### F-08 — Integration evaluation

Validate:

- ES/EN
- landing/demo
- same-language retrieval
- cross-language fallback
- unsupported questions
- commercial unknowns
- controlled AI claims
- deterministic retrieval invariants
- no client-side corpus/secrets

## 17. Out of scope for GPR-008-F

Deferred to GPR-008-G unless required as a minimal prerequisite:

- production-grade rate limiting
- abuse throttling
- advanced prompt-injection defenses
- automated adversarial testing
- long-term conversation persistence
- analytics of chat content
- customer-specific data
- authentication
- Masteradmin content
- private ERP credentials/data

F must still avoid introducing obvious unsafe defaults.

## 18. Non-negotiable product boundaries

- Public corpus only.
- Masteradmin excluded.
- Current vs roadmap must remain distinguishable.
- No invented prices.
- No invented integrations.
- No invented AI capabilities.
- No customer data.
- No ERP credentials.
- Same-language first.
- Cross-language fallback only when needed.
- User-facing answer in resolved user language.
- Demo/WhatsApp remain the safe commercial fallback.

## 19. Quality gates

Every implementation patch must preserve:

```text
npm run rag:ingest:check
npm run rag:ingest:test
npm run rag:retrieve:evaluate
npm run typecheck
npm run lint
npm run build
git diff --check
```

Manual QA is required before implementation commits that change the chat behavior.

## 20. Deployment

Automatic production deployments remain frozen.

No GPR-008-F merge should be treated as a production release until GPR-008-G/H are complete and the release freeze is deliberately lifted.

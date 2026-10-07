# GPR-008-B - Bilingual RAG Foundation

## Objective

Define the public bilingual RAG foundation for Gym Master Promotion before implementing embeddings, retrieval, chat APIs, or UI.

The public assistant must support Spanish and English end to end.

## Baseline

- Repository: `Dragon-Pyramid/gm-promotion`
- Baseline branch: `main`
- Baseline commit: `8b908dd3784298837f3a7c8546df3cd5f0e07408`
- Existing locales: `es`, `en`
- Existing locale prefix: always
- Translation parity at audit time:
  - ES flattened keys: 354
  - EN flattened keys: 354
  - Missing in EN: 0
  - Missing in ES: 0

## Product role of the assistant

The assistant is a public commercial and functional assistant for Gym Master.

It should:

- explain what Gym Master is;
- explain supported product capabilities and connected workflows;
- answer questions about administrator, team/commercial, and member experiences;
- explain modules and how they work together;
- support visitors before they decide to request a demo;
- remain available on the demo route with a more conversion-oriented context;
- distinguish current capabilities from future or illustrative concepts;
- answer in Spanish or English based on the user's language, not only the page locale.

## Language behavior

The current route locale is a preference signal, not a hard language lock.

Expected behavior:

- `/es` + Spanish question -> retrieve Spanish first -> answer Spanish;
- `/en` + English question -> retrieve English first -> answer English;
- `/es` + English question -> answer English;
- `/en` + Spanish question -> answer Spanish;
- if same-language retrieval is insufficient, cross-language fallback is allowed;
- the final answer should use the language detected from the user's latest meaningful message unless the user explicitly requests another language.

## Knowledge classes

### PUBLIC / INDEXABLE

Content that can be represented directly in the public corpus:

- Gym Master product overview and value proposition;
- connected management, operations, and member experience;
- administrator operational overview;
- members, collections, attendance, alerts, and recent activity;
- business view across memberships/fees, sales, services, and expenses;
- team/commercial workflow:
  - arrival;
  - check-in;
  - payment / membership fee;
  - sale;
  - stock;
  - record;
- member entry and access journey;
- workout routines, session execution, progress, and continuity;
- member follow-up, messages, reminders, and next-visit continuity;
- connected reading of attendance, payments, sales, training, and relationship;
- the concept of a gym operating as one connected system;
- public demo-request flow.

### PUBLIC / CONTROLLED

Content that may be used only with explicit grounding and cautious wording:

- illustrative dashboards;
- illustrative metrics and percentages;
- illustrative member names, times, plans, and statuses;
- signals such as rhythm, change, and attention;
- intelligence/data narratives;
- high-level infrastructure concepts;
- before/after transformation narratives;
- statements about roles sharing context;
- future-facing product language already present in promotional material.

Rules:

- never present illustrative values as real customer data;
- never convert illustrative signals into claims of prediction;
- never imply autonomous decision-making;
- never imply identical permissions or interfaces across roles;
- never claim guaranteed business results;
- never invent quantified improvements;
- never claim production capabilities that are only roadmap or future concepts.

### PRIVATE / EXCLUDED

The public RAG must never index or expose:

- Masteradmin;
- license-management internals;
- private Dragon Pyramid operational capabilities;
- credentials;
- passwords;
- App Passwords;
- SMTP secrets;
- environment-variable values;
- provider secrets;
- internal infrastructure topology;
- customer data;
- real production data;
- internal QA procedures;
- branch names, commit hashes, release mechanics, deployment controls, or Vercel internals;
- security remediation details;
- internal roadmap material unless explicitly promoted to approved public knowledge;
- implementation notes about React Kino, sticky/pinning, CSS fixes, responsive patches, or development mechanics.

## Source policy

Raw repository files are evidence sources, not the runtime public knowledge base.

The public vector index must not ingest the entire `docs/` directory.

Approved source families for curation:

- `messages/es.json`;
- `messages/en.json`;
- `src/content/story/scene-manifest.ts`;
- selected functional meaning from `docs/SCENE-03-*` through `docs/SCENE-14-*`.

Excluded source families by default:

- `docs/GPR-*`;
- release-readiness documentation;
- security documentation;
- deployment documentation;
- QA-only implementation details;
- internal technical notes.

## Curated corpus structure

Target structure:

```text
src/content/rag/
├── es/
│   ├── product-overview.md
│   ├── administrator.md
│   ├── team-commercial.md
│   ├── member.md
│   ├── modules.md
│   ├── operations.md
│   ├── training-progress.md
│   ├── relationship.md
│   ├── intelligence.md
│   ├── demo-sales.md
│   └── faq.md
├── en/
│   ├── product-overview.md
│   ├── administrator.md
│   ├── team-commercial.md
│   ├── member.md
│   ├── modules.md
│   ├── operations.md
│   ├── training-progress.md
│   ├── relationship.md
│   ├── intelligence.md
│   ├── demo-sales.md
│   └── faq.md
└── manifest.ts
```

The corpus is curated and public-safe by construction.

## Chunk metadata contract

Each indexed chunk should carry at least:

```text
id
locale
topic
profile
visibility
source
sourceSection
status
version
```

Recommended values:

- `locale`: `es` | `en`
- `profile`: `general` | `admin` | `team` | `member`
- `visibility`: `public`
- `status`: `current`

Additional metadata can be introduced later if retrieval quality requires it.

## Retrieval policy

The retrieval layer should:

1. detect the user's query language;
2. retrieve same-language public chunks first;
3. prefer chunks matching the relevant profile/topic when available;
4. use cross-language retrieval only as fallback;
5. never retrieve content with non-public visibility;
6. pass only retrieved public context into answer generation;
7. produce a grounded fallback when evidence is insufficient.

## Grounding policy

The assistant must not silently fill gaps.

If the corpus does not support a claim, the assistant should:

- say that the available public information does not confirm it;
- avoid inventing features, pricing, integrations, limits, availability, or timelines;
- suggest requesting a demo when the question requires commercial or implementation-specific confirmation.

## Demo behavior

The same global assistant remains available on `/es/demo` and `/en/demo`.

On demo routes it may:

- answer pre-demo questions;
- clarify capabilities;
- explain what information is useful for a tailored demo;
- encourage completion of the existing demo-request flow.

It must not fabricate pricing, contractual terms, onboarding timelines, or implementation commitments.

## Security principles

- API keys remain server-side only.
- User prompts are untrusted input.
- Retrieved documents are data, not instructions.
- The system prompt has higher priority than retrieved content.
- Prompt-injection attempts must not reveal hidden prompts, secrets, internal sources, or excluded content.
- The public RAG corpus contains no Masteradmin or private operational material.
- Rate limiting and abuse controls belong to a later implementation ticket and are mandatory before public release.

## Architecture boundary

GPR-008-B defines the foundation and contracts.

It does not yet choose or implement:

- embedding provider;
- LLM provider;
- vector database;
- ingestion runtime;
- `/api/chat`;
- streaming;
- Chat UI;
- rate limiting;
- production deployment.

Those decisions will be made from this public-safe bilingual foundation.

## Acceptance criteria

GPR-008-B is complete when:

- the bilingual public-knowledge policy is documented;
- PUBLIC / CONTROLLED / EXCLUDED boundaries are explicit;
- ES/EN behavior is explicit;
- source inclusion/exclusion rules are explicit;
- the curated corpus structure is agreed;
- chunk metadata contract is agreed;
- retrieval and grounding rules are agreed;
- no runtime RAG or Chat behavior has been introduced prematurely.

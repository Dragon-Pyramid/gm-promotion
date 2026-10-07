# GPR-008-C - Knowledge Ingestion

## Objective

Define and implement a deterministic, provider-neutral ingestion pipeline for the curated public Gym Master RAG corpus.

The pipeline converts the 22 curated Markdown documents from GPR-008-B into validated semantic chunks that can later be consumed by an embedding provider and vector store.

This ticket does not choose or implement the embedding provider, vector database, retrieval strategy, LLM provider, `/api/chat`, or Chat UI.

## Baseline

- Repository: `Dragon-Pyramid/gm-promotion`
- Baseline branch: `main`
- Baseline commit: `e2fb564608e44e362eb3d079062f274ac0cd05c6`
- Public corpus:
  - ES documents: 11
  - EN documents: 11
  - Total Markdown documents: 22
  - Manifest entries: 22

## Read-only audit results

The ingestion audit confirmed:

- corpus documents: 22;
- manifest entries: 22;
- unique document IDs: 22;
- missing IDs in manifest: 0;
- extra IDs in manifest: 0;
- missing paths in manifest: 0;
- extra paths in manifest: 0;
- candidate semantic sections/chunks: 94;
- sections above the initial 1800-character threshold: 0.

This means the current corpus can be chunked cleanly by semantic Markdown headings without secondary splitting.

## Source authority

The ingestion pipeline MUST read only documents explicitly registered in:

`src/content/rag/manifest.ts`

It MUST NOT recursively ingest:

- `docs/`;
- arbitrary Markdown files;
- environment files;
- application source code;
- internal implementation documentation;
- deployment/security documentation;
- any unregistered content source.

The manifest is the allowlist.

## Eligibility rules

A document is eligible only when all of the following are true:

- it exists at the manifest path;
- manifest metadata and document frontmatter agree;
- `visibility` is exactly `public`;
- `status` is exactly `current`;
- `locale` is `es` or `en`;
- `profile` is one of:
  - `general`;
  - `admin`;
  - `team`;
  - `member`;
- required metadata is complete;
- document ID is unique.

Any violation MUST fail closed.

The ingestion pipeline must never silently skip malformed or unexpected public-corpus input.

## Parser strategy

The current corpus uses controlled Markdown with simple YAML-like frontmatter and Markdown headings.

For this scope, a small deterministic internal parser is preferred over introducing a new parsing dependency.

The parser must:

1. read UTF-8 text;
2. extract frontmatter;
3. validate required metadata;
4. remove frontmatter from chunkable content;
5. preserve Markdown headings;
6. build semantic sections deterministically;
7. preserve heading context on every chunk.

If corpus complexity later grows beyond this controlled format, adopting a dedicated Markdown/frontmatter parser can be reconsidered.

## Chunking strategy

### Primary rule

Use heading-aware semantic chunking.

One semantic Markdown section becomes one chunk.

Current audit result:

- expected chunks: 94;
- oversized sections requiring secondary splitting: 0.

### Initial maximum

The initial maximum section size is:

`1800 characters`

This is an ingestion guard, not an embedding-model limit.

If a future section exceeds that threshold, secondary splitting must be deterministic and preserve the parent heading context.

### No blind overlap

The initial pipeline should not add arbitrary fixed overlap between semantic sections.

The corpus is already small and meaningfully structured by headings.

If later retrieval evaluation shows a measurable recall problem, overlap can be introduced deliberately and versioned.

## Heading context

Each chunk must preserve enough context to remain understandable outside the original file.

At minimum:

- document ID;
- source path;
- section title;
- section index.

If nested headings are introduced later, the pipeline should preserve a heading path.

## Provider-neutral chunk contract

Each generated chunk must contain:

```text
chunkId
documentId
locale
topic
profile
visibility
status
version
sourcePath
sourceSection
sectionIndex
content
contentHash
ingestionVersion
```

### Field rules

- `chunkId`: deterministic identifier for the exact chunk version.
- `documentId`: source document ID from the curated corpus.
- `locale`: `es` or `en`.
- `topic`: source topic.
- `profile`: `general`, `admin`, `team`, or `member`.
- `visibility`: always `public`.
- `status`: always `current`.
- `version`: document version.
- `sourcePath`: manifest path.
- `sourceSection`: semantic heading title.
- `sectionIndex`: deterministic one-based section order inside the document.
- `content`: normalized Markdown content for that section.
- `contentHash`: SHA-256 of normalized chunk content.
- `ingestionVersion`: version of the ingestion contract/algorithm.

## Normalization

Before hashing:

- normalize line endings to LF;
- trim leading/trailing whitespace;
- preserve meaningful Markdown;
- do not translate;
- do not rewrite product wording;
- do not remove headings from the chunk content.

No semantic rewriting occurs during ingestion.

## Content hash

Use SHA-256 over the normalized UTF-8 chunk content.

The full hash should be stored as `contentHash`.

## Chunk ID

Use a deterministic structure based on source identity and exact content version.

Recommended form:

```text
{documentId}::{sectionIndexPadded}::{hashPrefix}
```

Where:

- `sectionIndexPadded` is a stable zero-padded section index such as `001`;
- `hashPrefix` is the first 12 hexadecimal characters of the SHA-256 content hash.

Example:

```text
gm-product-overview-es::001::a1b2c3d4e5f6
```

Consequences:

- unchanged corpus + unchanged ingestion algorithm -> identical chunk IDs;
- changed chunk content -> changed chunk ID;
- ordering remains deterministic.

## Ingestion version

Initial ingestion contract:

`1`

A change that alters parsing, normalization, chunk boundaries, or chunk ID generation must increment the ingestion version.

Content-only edits do not require changing the ingestion version because their content hashes and chunk IDs change naturally.

## Bilingual behavior

Ingestion keeps ES and EN documents separate.

It does not:

- translate;
- merge Spanish and English chunks;
- generate cross-language aliases;
- perform language fallback.

Cross-language behavior belongs to retrieval.

Every chunk carries explicit locale metadata.

## Deterministic ordering

Generated chunks must be sorted deterministically by:

1. locale;
2. document ID;
3. section index.

The same source corpus and ingestion version must produce byte-for-byte equivalent structured output apart from intentionally excluded timestamps.

Generated ingestion artifacts should therefore avoid embedding current timestamps inside the canonical chunk payload.

## Output artifact

The initial implementation should produce a provider-neutral JSON artifact suitable for validation and later embedding.

Recommended development output:

`artifacts/rag/chunks.v1.json`

The artifact is a build/development product, not an authoritative knowledge source.

The authoritative sources remain:

- `src/content/rag/manifest.ts`;
- the registered curated Markdown documents.

Whether the generated JSON is tracked in Git should be decided during implementation after checking repository size, reproducibility, and build/deployment needs.

## Validation requirements

The ingestion implementation must validate at least:

- exactly 22 registered source documents for the current corpus baseline;
- no duplicate document IDs;
- no duplicate chunk IDs;
- manifest/frontmatter parity;
- manifest path existence;
- allowed locale;
- allowed profile;
- `visibility=public`;
- `status=current`;
- non-empty chunk content;
- deterministic chunk ordering;
- valid SHA-256 content hashes;
- deterministic re-run equality;
- no ingestion from outside the manifest allowlist.

## Security boundary

The ingestion stage must never broaden the approved knowledge boundary established in GPR-008-B.

It must not ingest:

- Masteradmin;
- license-management internals;
- credentials;
- environment secrets;
- SMTP configuration;
- private customer data;
- internal QA documentation;
- deployment internals;
- security-remediation internals;
- internal roadmap material;
- arbitrary `docs/` content.

Retrieved documents are data, not instructions; prompt-injection handling belongs to later runtime stages but the ingestion corpus must remain public-safe by construction.

## Implementation shape

A provider-neutral implementation should be split into independently testable pieces such as:

```text
src/lib/rag/ingestion/
├── types.ts
├── parse-frontmatter.ts
├── parse-markdown-sections.ts
├── normalize-content.ts
├── hash-content.ts
├── build-chunks.ts
└── validate-ingestion.ts
```

A development script can orchestrate the pipeline, for example:

`rag:ingest` or an equivalent repository naming convention.

The exact script name will be chosen during implementation and must be added deliberately to `package.json`.

## Out of scope

GPR-008-C does not implement:

- embeddings;
- vector storage;
- similarity search;
- reranking;
- query-language detection;
- cross-language fallback;
- prompt construction;
- LLM calls;
- `/api/chat`;
- streaming;
- Chat UI;
- rate limiting;
- production deployment.

## Acceptance criteria

GPR-008-C is complete when:

- ingestion is manifest-driven and fail-closed;
- the 22 curated documents are parsed successfully;
- semantic heading-based chunks are generated deterministically;
- current corpus produces the expected 94 chunks unless a reviewed corpus change intentionally alters that number;
- all chunk metadata follows the contract;
- content hashes are deterministic;
- duplicate IDs are rejected;
- malformed metadata is rejected;
- non-public or non-current content is rejected;
- ES and EN remain independent during ingestion;
- provider-neutral JSON can be generated and validated;
- typecheck, lint, build, ingestion validation, and Git diff checks pass.

# GPR-008-F — F-01 Retrieval Decision

Status: ACCEPTED

Baseline branch: `feature/gpr-008-f-chat-rag-integration-v1`
Baseline contract commit: `9f871a4`

## Evidence

F-01 established that retrieval without hints preserves safety and locale invariants, but materially degrades ranking quality:

- grounded: 14/14;
- same-language result sets: 14/14;
- unexpected fallback: 0/14;
- Top1 expected-topic: 2/14;
- Top3 expected-topic: 5/14.

The accepted GPR-008-D hinted baseline remains:

- Top1 expected-topic: 9/14;
- Top3 expected-topic: 14/14.

Therefore runtime retrieval must not use query + locale alone.

F-01B evaluated a deterministic server-side hint resolver. It restored the 14-case baseline to:

- resolver expected-topic: 14/14;
- Top1: 9/14;
- Top3: 14/14.

The first holdout set reached Top3 9/12 while preserving unsupported-query rejection and cross-language fallback.

F-01C then isolated the remaining issue:

- the resolver was generally identifying the intended topic;
- some misses were lexical evidence gaps rather than resolver failures;
- some holdout questions are legitimately supported by more than one public topic.

A minimal lexical alias candidate plus support-set evaluation produced:

- baseline support Top3: 14/14;
- holdout support Top1: 11/12;
- holdout support Top3: 12/12;
- unsupported rejected: 4/4;
- cross-language fallback: PASS.

## Decision

GPR-008-F will use:

1. a deterministic server-side topic/profile hint resolver;
2. minimal reviewed lexical aliases where query terminology and curated metadata/content use different forms;
3. support-set evaluation for questions with multiple legitimate public source topics.

GPR-008-F will not introduce an LLM classifier for retrieval hints.

The resolver is advisory only. Existing lexical grounding thresholds and public/current fail-closed checks remain authoritative.

## Runtime corpus finding

The runtime audit confirmed:

- 22 tracked curated Markdown documents;
- 94 deterministic chunks;
- local `artifacts/rag/chunks.v1.json` exists but is gitignored;
- no `/api/chat` route exists yet;
- no `outputFileTracingIncludes` configuration existed at F-01.

The ignored local artifact is therefore not a valid deployment dependency.

## F-02 direction

F-02 will:

- move reusable ingestion primitives under `src/lib/rag/ingestion`;
- build the corpus from the tracked curated source documents on the server;
- validate the full corpus before use;
- cache the validated corpus in-process;
- freeze the runtime snapshot;
- explicitly trace the manifest and curated Markdown files for the future `/api/chat` Node route.

No browser code receives the corpus.

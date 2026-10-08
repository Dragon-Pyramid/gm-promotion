# GPR-008-D - Retrieval Pipeline

## Objective

Define and implement the first retrieval layer for the public bilingual Gym Master RAG corpus produced by GPR-008-C.

The retrieval pipeline must rank and return grounded public chunks for a user query while preserving:

- bilingual behavior;
- public-only safety boundaries;
- metadata traceability;
- deterministic evaluation;
- explicit insufficient-evidence behavior.

This ticket does not implement LLM generation, `/api/chat`, streaming, Chat UI, rate limiting, or production deployment.

## Baseline

- Repository: `Dragon-Pyramid/gm-promotion`
- Baseline branch: `main`
- Baseline commit: `89a0c7f433ae57e9c895dfd882ed9b788acf384a`
- Source documents: 22
- Generated chunks: 94
- ES chunks: 47
- EN chunks: 47
- Ingestion validation: PASS
- Fail-closed ingestion tests: PASS

## Read-only audit results

The retrieval audit confirmed:

- total chunks: 94;
- ES chunks: 47;
- EN chunks: 47;
- all 11 topics are represented in both languages;
- profile distribution is symmetrical between ES and EN:
  - admin: 7;
  - general: 21;
  - member: 12;
  - team: 7;
- initial bilingual probe set: 14 queries;
- repository returned to a clean working tree after the audit.

### Dependency interpretation

The initial dependency scan used a broad textual pattern that matched names containing the letters `ai`.

That produced false positives such as:

- `nodemailer`;
- `tailwindcss`;
- `@tailwindcss/postcss`;
- `@types/nodemailer`.

These are not retrieval, embedding, vector, or LLM dependencies.

Therefore, GPR-008-D starts without assuming an existing retrieval provider or vector database.

## Retrieval strategy

### Phase 1 baseline

Implement a deterministic local lexical baseline first.

Reasons:

- the corpus is small: 94 chunks;
- all chunks fit comfortably in memory;
- lexical quality can be measured before adding infrastructure;
- provider-neutral behavior remains testable;
- no external service or secret is required;
- this creates a quality baseline against which embeddings can later be compared.

### Phase 2 decision gate

Embeddings, vector search, or hybrid retrieval may be introduced later only if evaluation shows a material benefit over the lexical baseline.

A provider decision must not be made only because vector search is common in RAG architectures.

It must be justified by:

- measurable recall improvement;
- semantic-query performance;
- cross-language behavior;
- operational simplicity;
- deployment constraints;
- cost;
- maintainability.

## Retrieval input contract

The retrieval function should accept at least:

```text
query
queryLocale
pageLocale
profileHint
topicHint
topK
```

### Field semantics

- `query`: latest meaningful user query.
- `queryLocale`: detected or explicitly supplied language of the query.
- `pageLocale`: locale of the current route; preference signal only.
- `profileHint`: optional `general`, `admin`, `team`, or `member`.
- `topicHint`: optional topic preference.
- `topK`: maximum number of returned chunks.

`queryLocale` has higher priority than `pageLocale`.

## Retrieval output contract

Each result should include at least:

```text
chunk
score
rank
sameLanguage
signals
```

The retrieval response should also include:

```text
queryLocale
usedCrossLanguageFallback
groundedEnough
results
```

### Result signals

`signals` should make scoring auditable.

Recommended signals:

```text
lexicalScore
localeBoost
profileBoost
topicBoost
```

Additional signals can be introduced only when they have a clear evaluation purpose.

## Language policy

Expected behavior:

- Spanish query -> search Spanish chunks first;
- English query -> search English chunks first;
- `/es` + English query -> English remains primary;
- `/en` + Spanish query -> Spanish remains primary;
- page locale is a secondary preference only;
- cross-language fallback activates only when same-language evidence is insufficient.

The retrieval layer must not translate chunks during retrieval.

## Same-language first

The primary candidate set must contain chunks whose `locale` matches `queryLocale`.

The pipeline should score and evaluate this set first.

It must not mix cross-language chunks into the first pass by default because that makes language behavior difficult to reason about and evaluate.

## Cross-language fallback

Cross-language retrieval is allowed only when the primary same-language pass is not grounded enough.

When fallback activates:

- search the alternate public locale;
- mark returned chunks with `sameLanguage=false`;
- set `usedCrossLanguageFallback=true`;
- do not silently imply that same-language evidence was sufficient.

The final answer language belongs to the future generation layer, not retrieval.

## Metadata policy

### Visibility and status

Only chunks satisfying both conditions are eligible:

```text
visibility = public
status = current
```

Any unexpected visibility or status must fail closed.

### Profile

`profileHint` is a ranking preference, not a hard filter.

Reason:

A general product question can require evidence from more than one profile.

Hard profile filtering could incorrectly remove useful evidence.

### Topic

`topicHint` is also a ranking preference by default.

Hard topic filtering should be introduced only if later evaluation proves it useful.

## Lexical normalization

The lexical baseline should normalize query and chunk text consistently.

Initial normalization should include:

- Unicode normalization;
- lowercase;
- punctuation separation/removal where appropriate;
- whitespace normalization;
- tokenization.

The initial implementation should avoid aggressive stemming or language-specific morphology until evaluation shows that it is needed.

## Stop words

Do not begin with a large external stop-word package.

A minimal internal ES/EN stop-word list may be used if the baseline demonstrates excessive noise from common function words.

Any stop-word behavior must remain deterministic and testable.

## Lexical scoring

The initial scorer should be simple and auditable.

Recommended signals:

1. normalized token overlap;
2. unique matched query tokens;
3. coverage of query tokens;
4. optional phrase/bigram matches;
5. metadata boosts.

Do not hide scoring behind an opaque heuristic.

Every result should be explainable from its scoring signals.

## Metadata boosts

Initial boosts should be small enough that lexical evidence remains dominant.

Conceptually:

```text
finalScore =
  lexicalScore
  + localeBoost
  + profileBoost
  + topicBoost
```

Same-language retrieval is already handled primarily by candidate selection, so locale boost should not be used to compensate for weak lexical evidence.

## Ranking

Ranking must be deterministic.

Tie-breaking should use stable fields, for example:

1. score descending;
2. same-language first;
3. document ID ascending;
4. section index ascending.

The same query and corpus must produce the same ordered results.

## Top K

Initial default:

```text
topK = 5
```

The retrieval layer must not return low-quality chunks simply to fill all `topK` slots.

Returning fewer than `topK` results is valid.

## Grounding decision

Retrieval must explicitly decide whether the available evidence is strong enough.

Recommended output:

```text
groundedEnough: true | false
```

This decision must be based on retrieval evidence, not on the future LLM.

### Insufficient evidence

When evidence is below threshold:

- return `groundedEnough=false`;
- do not pad the result set with irrelevant chunks;
- allow the later generation layer to produce a grounded fallback.

Examples that should be treated cautiously:

- exact price;
- discounts;
- contract terms;
- implementation timeline;
- unconfirmed integrations;
- unsupported AI claims;
- roadmap capabilities presented as current.

## Commercial unknowns

Queries such as:

- "¿Cuánto cuesta Gym Master?"
- "How much does Gym Master cost?"

may retrieve `demo-sales` or `faq` evidence that explicitly states that public pricing is not defined.

This is valid grounded evidence.

The retrieval layer should return that evidence rather than classify the query as having no evidence at all.

The later generation layer can then route toward demo/commercial contact without inventing pricing.

## Evaluation set

The initial audit produced 14 bilingual probe queries.

Evaluation must be expanded to include at least:

### Positive queries

Questions clearly covered by the corpus.

### Profile-oriented queries

Questions associated with:

- admin;
- team/commercial;
- member.

### Commercial unknowns

Questions where the corpus contains an explicit limitation or demo-routing answer.

### Controlled claims

Questions about:

- AI;
- prediction;
- autonomy;
- guaranteed results.

### Unsupported queries

Questions unrelated to Gym Master or unsupported by public knowledge.

### Cross-language cases

Cases where:

- page locale and query language differ;
- same-language evidence is intentionally weak or unavailable in a controlled fixture.

## Initial success criteria

The lexical baseline is acceptable when:

- expected relevant topic appears in top results for the probe set;
- same-language retrieval is respected;
- profile/topic hints improve ranking without destroying recall;
- pricing and unsupported AI questions retrieve limitation evidence rather than invented capability;
- unrelated queries can return `groundedEnough=false`;
- ordering is deterministic;
- no private/non-current content can be retrieved.

## Evaluation metrics

For the initial manually curated probe set, record at least:

```text
top1Expected
top3Expected
groundedExpected
fallbackExpected
```

A later benchmark can add:

- Precision@K;
- Recall@K;
- MRR;
- nDCG.

Do not introduce metric complexity before the probe set is stable.

## Security boundary

Retrieval must consume only the validated public/current chunk contract produced by GPR-008-C.

It must not search:

- arbitrary repository files;
- `docs/`;
- `.env` files;
- credentials;
- Masteradmin;
- license internals;
- customer data;
- QA internals;
- deployment/security internals;
- hidden implementation notes.

## Implementation shape

A provider-neutral implementation may use:

```text
src/lib/rag/retrieval/
├── types.ts
├── normalize-query.ts
├── tokenize.ts
├── lexical-score.ts
├── rank-chunks.ts
├── retrieve.ts
└── evaluate-retrieval.ts
```

The exact file names may change during implementation if repository conventions suggest a better structure.

## Provider decision boundary

GPR-008-D should first establish whether deterministic local lexical retrieval is sufficient for the current public corpus.

If it is insufficient, the next reviewed step may compare:

- local lexical;
- embeddings;
- hybrid lexical + vector.

Only after that comparison should a production vector store or embedding provider be selected.

## Out of scope

GPR-008-D does not implement:

- answer generation;
- LLM calls;
- system prompts;
- `/api/chat`;
- streaming;
- Chat UI;
- rate limiting;
- analytics for chat;
- production deployment.

## Acceptance criteria

GPR-008-D is complete when:

- retrieval is public/current-only;
- same-language-first behavior is implemented;
- query language can override page locale;
- cross-language fallback is explicit;
- metadata hints influence ranking without becoming unsafe hard filters;
- ranking is deterministic;
- low-evidence queries can return `groundedEnough=false`;
- bilingual probe queries are evaluated;
- commercial unknowns retrieve grounded limitation/demo evidence;
- controlled AI claims retrieve cautious public evidence;
- provider choice remains justified by measured retrieval quality;
- typecheck, lint, build, retrieval tests, and Git diff checks pass.
## Implementation outcome and provider decision

### Implemented baseline

GPR-008-D implemented a provider-neutral deterministic lexical retrieval baseline over the validated public/current chunk contract produced by GPR-008-C.

The implementation includes:

- Unicode-aware query normalization;
- deterministic tokenization;
- small bilingual stop-word handling;
- lexical IDF-weighted coverage;
- phrase/bigram signals;
- profile and topic ranking hints;
- deterministic tie-breaking;
- same-language-first retrieval;
- explicit cross-language fallback;
- explicit `groundedEnough` evaluation;
- public/current fail-closed validation;
- contextual treatment of the `Gym Master` brand phrase;
- small deterministic lexical aliases for public commercial terminology.

No embedding provider, vector store, external retrieval service, or new runtime secret was introduced.

### Evaluation result

The final curated bilingual evaluation produced:

```text
Cases: 14
Top1 expected-topic hits: 9/14
Top3 expected-topic hits: 14/14
```

Additional acceptance checks passed:

- unsupported queries return `groundedEnough=false`;
- ES and EN brand-overlap unsupported capability queries are rejected;
- `queryLocale` overrides `pageLocale`;
- explicit cross-language fallback works;
- repeated retrieval is deterministic;
- non-public chunks fail closed;
- non-current chunks fail closed;
- commercial unknowns retrieve grounded limitation/demo evidence;
- controlled AI claims retrieve cautious FAQ evidence.

The final corpus baseline remained:

```text
Documents: 22
Chunks: 94
ES chunks: 47
EN chunks: 47
Deterministic rerun: PASS
```

GPR-008-C ingestion fail-closed tests also remained green after the retrieval implementation.

### Provider decision

For the current public Gym Master corpus, the lexical baseline satisfies the initial GPR-008-D acceptance criteria.

Therefore:

- embeddings are not required at this stage;
- a vector database is not required at this stage;
- hybrid lexical/vector retrieval is deferred;
- no external retrieval provider is selected in GPR-008-D.

This is a deliberate measured decision, not a permanent architectural prohibition.

Embeddings or hybrid retrieval should be reconsidered only if future evidence shows a material retrieval-quality gap, for example:

- corpus growth substantially increases ambiguity;
- semantic paraphrases regularly miss relevant evidence;
- multilingual recall becomes insufficient;
- evaluation metrics regress below the accepted baseline;
- the knowledge corpus expands beyond what the deterministic local strategy handles comfortably.

### Final decision gate

Current decision:

```text
Deterministic local lexical retrieval: ACCEPTED
Embeddings: DEFERRED
Vector store: DEFERRED
Hybrid retrieval: DEFERRED
```

The next RAG stage may consume this retrieval contract without introducing provider infrastructure solely for architectural fashion.

# GPR-008-F - F-05 Grounded Generation Decision

Status: APPROVED

Baseline branch: `feature/gpr-008-f-chat-rag-integration-v1`
Baseline commit: `8d0a712`

## Provider decision

The first production generation provider for Gym Master will be OpenAI.

- API: Responses API
- Model: `gpt-6-luna`
- Mode: single-turn grounded generation
- Storage: `store=false`
- Built-in tools: none
- Web search: disabled
- Browser-visible provider configuration: none

The provider/model choice is isolated behind a server-side adapter so the RAG core and chat contract remain provider-neutral.

## Grounding contract

A model call is permitted only when retrieval has already produced a grounded public result.

Unsupported and excluded-scope queries must remain deterministic and must not call the generation provider.

The model receives only:

1. the current user question;
2. the resolved query locale;
3. the public/current chunks selected by the retrieval boundary;
4. server-owned generation instructions.

The model must not receive browser-controlled retrieval hints, hidden administration data, credentials, private customer data, or non-public corpus material.

## Answer policy

Generated answers must:

- answer in the resolved query locale;
- use only the supplied public Gym Master evidence;
- remain concise, functional, and commercially appropriate;
- distinguish current capabilities from unsupported claims;
- avoid inventing prices, integrations, roadmap items, guarantees, or predictions;
- treat retrieved corpus text as evidence, never as executable instructions;
- fail closed if the provider returns no usable text.

## Delivery sequence

F-05A establishes the provider-neutral generation boundary and validates it with an injected fake provider. It performs no external model call and requires no API key.

F-05B will add the OpenAI Responses API adapter, server-only environment configuration, and a controlled live smoke test.

No API key is committed to source control.

## F-05B runtime configuration

Server-only environment variables:

- `OPENAI_API_KEY` - required for grounded generation;
- `OPENAI_MODEL` - optional, defaults to `gpt-6-luna`.

Neither variable uses a `NEXT_PUBLIC_` prefix.

The production route uses a lazy generation runtime. Unsupported and excluded-scope requests therefore remain deterministic and do not require provider configuration. A grounded request fails closed when `OPENAI_API_KEY` is unavailable.

The OpenAI adapter calls `POST https://api.openai.com/v1/responses` with `store=false`, no built-in tools, and a bounded output token budget.

The normal deterministic gate suite uses an injected fake `fetch` and performs zero external API calls. `rag:openai:smoke` is intentionally separate and performs one live grounded model request only when explicitly invoked.

# GPR-008-A - Freeze Automatic Vercel Deployments

## Objective

Temporarily disable automatic Git-triggered Vercel deployments while the Gym Master Promotion RAG and bilingual Chat UI are developed.

## Baseline

- Repository: Dragon-Pyramid/gm-promotion
- Baseline branch: main
- Baseline commit: 19760d358f8d019ffd0b5414c0b48561c942a29b
- Production domain: https://gymmaster.com.ar

## Change

Add `vercel.json` with:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "git": {
    "deploymentEnabled": false
  }
}
```

This prevents Git pushes and merges from automatically triggering Vercel deployments.

## Purpose

Keep the current production version stable while development continues through normal branches, commits, pull requests, reviews and merges.

The production site must remain available.

## Planned work during the freeze

- bilingual RAG foundation;
- Spanish and English knowledge base;
- ingestion and chunking;
- multilingual retrieval;
- Chat UI;
- locale-aware behavior;
- demo-context behavior;
- security and abuse controls;
- QA and release validation.

## Release strategy

Automatic deployments remain disabled until the complete RAG and Chat release candidate is validated.

After final QA, deployment will be performed deliberately and production will be verified before the release is considered complete.

## Out of scope

This ticket does not:

- modify the production application UI;
- implement the RAG;
- implement the Chat UI;
- change DNS;
- change analytics;
- change SEO;
- change the production domain.

# GPR-008-G — Security / Abuse Controls

## G02C — Bounded HTTP JSON input (initial layer)

Both public POST endpoints use the same server-side request boundary before invoking Chat/RAG/OpenAI or SMTP:

| Endpoint | Body ceiling | Rejection behavior |
| --- | ---: | --- |
| `/api/chat` | 8,192 UTF-8 bytes | 413 `payload_too_large` |
| `/api/demo-request` | 24,576 UTF-8 bytes | 413 `payload_too_large` |

- Only `application/json` (optionally `charset=utf-8`) is accepted; otherwise 415 `unsupported_media_type`.
- Browser `Origin` must exactly match the request URL origin when supplied; invalid, external and `null` origins return 403 `forbidden_origin`. Missing Origin remains allowed for non-browser integrations; **this is not authentication**.
- Declared Content-Length is checked early. The server then counts actual request-body bytes as it streams the body, so missing or inaccurate Content-Length does not bypass the cap.
- Malformed JSON or invalid UTF-8 returns 400 `invalid_payload`.
- The existing chat `Cache-Control: no-store` behavior and the valid chat/demo payload contracts are preserved.
- All checks occur before generation or SMTP delivery. The offline test mocks those side effects and verifies that rejected requests do not invoke them.

### Scope / limitations

This is a defense-in-depth HTTP input layer, **not** an abuse prevention or authentication solution. Origin may be absent or forged by non-browser clients. Distributed atomic rate limiting, per-client quotas, model cost ceilings, mail-spam defense and deployment proxy validation remain for G03/G04/G05.

### Offline verification

Run `npm run security:http-boundary:check`. The test uses the real route code with synthetic provider/SMTP dependencies, without network access. The prior G02B RED harness may additionally be rerun in GREEN mode.

**Release:** Vercel Git deployments remain disabled. Do not merge PR #49, deploy, or enable production until GPR-008-G/GPR-008-H are completed.

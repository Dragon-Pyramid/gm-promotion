# GPR-004 - Commercial Actions

## Patch

GPR-004-A - Real demo request delivery through Yahoo SMTP and customer-originated WhatsApp contact.

## Baseline

- Branch: `feature/gm-promotion-commercial-actions-v1`
- Baseline: `a2069ecbc061dd28f0cb3df288c4e14f111bf934`

## Scope

This patch connects the localized Gym Master demo form to real commercial contact channels while preserving the existing localized demo experience.

## Email flow

`DemoRequestForm` sends a JSON payload to:

`POST /api/demo-request`

The server route:

- validates required commercial fields;
- runs on the Node.js runtime;
- reads Yahoo SMTP credentials only from server-side environment variables;
- sends the request to the configured commercial recipient;
- uses the prospect email as `Reply-To`;
- never exposes SMTP credentials to the browser.

Required environment variables:

- `YAHOO_SMTP_USER`
- `YAHOO_SMTP_APP_PASSWORD`
- `DEMO_RECIPIENT_EMAIL`

No real password or App Password is committed to the repository.

## WhatsApp flow

The same form data can be sent through WhatsApp.

Destination:

`5493815476502`

The browser opens a `wa.me` Click to Chat URL with a localized prefilled message.

The visitor remains responsible for pressing Send in WhatsApp, so the conversation originates from the visitor's own WhatsApp account.

## UX states

Email submission supports:

- idle;
- sending;
- success;
- recoverable error.

WhatsApp remains available independently from SMTP delivery.

## Files changed

- `package.json`
- `package-lock.json`
- `src/app/api/demo-request/route.ts`
- `src/components/demo/DemoRequestForm.tsx`
- `src/app/[locale]/demo/page.tsx`
- `messages/es.json`
- `messages/en.json`
- `src/app/globals.css`
- `docs/GPR-004-COMMERCIAL-ACTIONS.md`

## Security boundaries

- Yahoo regular account password is never used by the application.
- Yahoo App Password remains server-side only.
- SMTP secrets are read exclusively from environment variables.
- The public WhatsApp number is intentionally present in client code because it is required by the public `wa.me` link.
- User-provided values are length-limited before email delivery.
- Email delivery uses plain-text content to avoid HTML injection.

## Out of scope

- CRM persistence;
- analytics;
- database-backed rate limiting;
- automated WhatsApp Business API delivery;
- production domain and SEO reconciliation.

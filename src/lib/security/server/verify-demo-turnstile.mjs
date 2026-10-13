// Cloudflare Turnstile verification for the public demo email endpoint.
// No secrets or token values are logged. Fail closed on missing configuration.
const SITEVERIFY = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const EXPECTED_ACTION = "demo_request";
const TEST_SECRET_KEYS = new Set([
  "1x0000000000000000000000000000000AA",
  "2x0000000000000000000000000000000AA",
  "3x0000000000000000000000000000000AA"
]);
const TEST_SITE_KEYS = new Set([
  "1x00000000000000000000AA",
  "2x00000000000000000000AB",
  "1x00000000000000000000BB",
  "2x00000000000000000000BB",
  "3x00000000000000000000FF"
]);

export async function verifyDemoTurnstile(token) {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  const hostnames = new Set(
    (process.env.TURNSTILE_ALLOWED_HOSTNAMES ?? "")
      .split(",").map((host) => host.trim().toLowerCase()).filter(Boolean)
  );
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim();
  const isProduction = process.env.VERCEL_ENV === "production";

  // Refuse production credentials accidentally left in test mode.
  if (!secret || !siteKey || hostnames.size === 0 ||
      (isProduction && (TEST_SECRET_KEYS.has(secret) || TEST_SITE_KEYS.has(siteKey) ||
        hostnames.has("localhost") || hostnames.has("127.0.0.1")))) {
    return {ok: false, status: 503, error: "turnstile_unavailable"};
  }

  if (typeof token !== "string" || !token.trim() || token.length > 2048) {
    return {ok: false, status: 400, error: "turnstile_token_required"};
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  try {
    const response = await fetch(SITEVERIFY, {
      method: "POST",
      headers: {"Content-Type": "application/x-www-form-urlencoded"},
      body: new URLSearchParams({secret, response: token}),
      cache: "no-store",
      signal: controller.signal
    });
    if (!response.ok) {
      return {ok: false, status: 503, error: "turnstile_unavailable"};
    }
    const result = await response.json();
    if (result?.success !== true || result?.action !== EXPECTED_ACTION ||
        typeof result?.hostname !== "string" ||
        !hostnames.has(result.hostname.toLowerCase())) {
      return {ok: false, status: 403, error: "turnstile_rejected"};
    }
    return {ok: true};
  } catch {
    return {ok: false, status: 503, error: "turnstile_unavailable"};
  } finally {
    clearTimeout(timeout);
  }
}

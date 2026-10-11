// Shared HTTP input boundary for public JSON POST endpoints.
// Origin is only a browser-side signal; it is not authentication or an abuse quota.

function reject(status, error) {
  return {ok: false, status, error};
}

function validOrigin(request) {
  const origin = request.headers.get("origin");
  if (origin === null) return true; // Non-browser clients may omit Origin.
  try {
    const parsed = new URL(origin);
    const destination = new URL(request.url);
    return (
      (parsed.protocol === "http:" || parsed.protocol === "https:") &&
      origin === parsed.origin &&
      parsed.origin === destination.origin
    );
  } catch {
    return false;
  }
}

function validJsonMediaType(raw) {
  if (typeof raw !== "string") return false;
  return /^application\/json(?:\s*;\s*charset\s*=\s*(?:utf-8|"utf-8"))?$/i.test(raw.trim());
}

/**
 * @returns {Promise<{ok: true, value: unknown} | {ok: false, status: number, error: string}>}
 */
export async function readBoundedJsonRequest(request, {maxBytes}) {
  if (!Number.isSafeInteger(maxBytes) || maxBytes < 1) {
    throw new Error("HTTP JSON byte ceiling must be a positive safe integer");
  }

  if (!validOrigin(request)) return reject(403, "forbidden_origin");
  if (!validJsonMediaType(request.headers.get("content-type"))) {
    return reject(415, "unsupported_media_type");
  }

  const declared = request.headers.get("content-length");
  if (declared !== null) {
    if (!/^(?:0|[1-9][0-9]*)$/.test(declared)) return reject(400, "invalid_payload");
    if (Number(declared) > maxBytes) return reject(413, "payload_too_large");
  }

  if (!request.body) return reject(400, "invalid_payload");
  let reader;
  try {
    reader = request.body.getReader();
    const chunks = [];
    let totalBytes = 0;

    while (true) {
      const {done, value} = await reader.read();
      if (done) break;
      if (!(value instanceof Uint8Array)) return reject(400, "invalid_payload");
      totalBytes += value.byteLength;
      if (totalBytes > maxBytes) {
        // Do not hold more than the configured ceiling or parse oversized JSON.
        await reader.cancel().catch(() => {});
        return reject(413, "payload_too_large");
      }
      chunks.push(value);
    }

    const bytes = new Uint8Array(totalBytes);
    let offset = 0;
    for (const chunk of chunks) {
      bytes.set(chunk, offset);
      offset += chunk.byteLength;
    }
    const text = new TextDecoder("utf-8", {fatal: true}).decode(bytes);
    return {ok: true, value: JSON.parse(text)};
  } catch {
    return reject(400, "invalid_payload");
  } finally {
    reader?.releaseLock();
  }
}

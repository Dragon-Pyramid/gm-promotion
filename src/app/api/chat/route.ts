import {NextResponse} from "next/server";

import {handleChatRetrievalPayload} from "@/lib/rag/server/chat-retrieval-contract.mjs";
import {generateGroundedChatAnswer} from "@/lib/rag/server/chat-generation-runtime.mjs";

export const runtime = "nodejs";

const NO_STORE_HEADERS = {
  "Cache-Control": "no-store"
};

export async function POST(request: Request) {
  let raw: unknown;

  try {
    raw = await request.json();
  } catch {
    return NextResponse.json(
      {ok: false, error: "invalid_payload"},
      {
        status: 400,
        headers: NO_STORE_HEADERS
      }
    );
  }

  try {
    const response = await handleChatRetrievalPayload(
      raw,
      {
        generateGroundedAnswer:
          generateGroundedChatAnswer
      }
    );

    return NextResponse.json(
      response.body,
      {
        status: response.status,
        headers: NO_STORE_HEADERS
      }
    );
  } catch (error) {
    console.error("[chat] Retrieval contract failed.", error);

    return NextResponse.json(
      {ok: false, error: "retrieval_failed"},
      {
        status: 500,
        headers: NO_STORE_HEADERS
      }
    );
  }
}

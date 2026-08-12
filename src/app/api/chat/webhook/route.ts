import { NextResponse } from "next/server";
import { addMessage, getRecentConversationId } from "@/lib/chatStore";
import { extractRefId } from "@/lib/chat";
import { getWhatsAppConfig, normalizeNumber, parseInboundPayload } from "@/lib/whatsapp";

export const runtime = "nodejs";

const REPLY_WINDOW_MS = 15 * 60 * 1000;

function isAuthorized(request: Request): boolean {
  const expected = process.env.WHAPI_WEBHOOK_TOKEN;
  if (!expected) return true;
  const url = new URL(request.url);
  return url.searchParams.get("token") === expected;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ status: "ok" });
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await request.json().catch(() => null);
  const inbound = parseInboundPayload(payload);
  const { ownerNumber } = getWhatsAppConfig();

  if (
    inbound &&
    inbound.direction !== "outgoing" &&
    normalizeNumber(inbound.from) === normalizeNumber(ownerNumber)
  ) {
    const refId = extractRefId(inbound.quotedText ?? inbound.text);
    const conversationId = refId ?? getRecentConversationId(REPLY_WINDOW_MS);
    if (conversationId) {
      addMessage(conversationId, "owner", inbound.text);
    }
  }

  return NextResponse.json({ status: "ok" });
}

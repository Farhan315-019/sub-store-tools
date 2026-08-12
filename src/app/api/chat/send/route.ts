import { NextResponse } from "next/server";
import { addMessage } from "@/lib/chatStore";
import { isValidConversationId, MAX_MESSAGE_LENGTH } from "@/lib/chat";
import { getWhatsAppConfig, sendWhatsAppText } from "@/lib/whatsapp";
import { buildInquiryMessage } from "@/lib/chat";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const conversationId =
    typeof body?.conversationId === "string" ? body.conversationId.trim() : "";
  const text = typeof body?.text === "string" ? body.text.trim() : "";

  if (!isValidConversationId(conversationId)) {
    return NextResponse.json({ error: "Invalid conversation." }, { status: 400 });
  }
  if (!text || text.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json({ error: "Message is required." }, { status: 400 });
  }

  const message = addMessage(conversationId, "visitor", text);
  const { enabled, ownerNumber } = getWhatsAppConfig();
  const delivered = enabled
    ? await sendWhatsAppText(ownerNumber, buildInquiryMessage(conversationId, text))
    : false;

  return NextResponse.json({ ok: true, message, delivered });
}

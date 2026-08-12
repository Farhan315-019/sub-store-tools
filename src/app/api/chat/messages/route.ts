import { NextResponse } from "next/server";
import { getMessages } from "@/lib/chatStore";
import { isValidConversationId } from "@/lib/chat";
import { getWhatsAppConfig } from "@/lib/whatsapp";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const conversationId = (url.searchParams.get("conversationId") ?? "").trim();

  if (!isValidConversationId(conversationId)) {
    return NextResponse.json({ error: "Invalid conversation." }, { status: 400 });
  }

  const messages = getMessages(conversationId);
  const { enabled } = getWhatsAppConfig();

  return NextResponse.json({ messages, whatsappEnabled: enabled });
}

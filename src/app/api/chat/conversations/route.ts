import { NextResponse } from "next/server";
import { listConversations } from "@/lib/chatStore";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({ conversations: listConversations() });
}

import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { store } from "@/lib/store";

type Context = { params: Promise<{ id: string }> };

export async function DELETE(_request: NextRequest, { params }: Context) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { id } = await params;
  store.deleteMessage(id);
  return NextResponse.json({ ok: true });
}

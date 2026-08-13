import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { store, type OrderStatus } from "@/lib/store";

type Context = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, { params }: Context) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { id } = await params;
  const body = await request.json();
  const status = String(body?.status ?? "");

  if (!["pending", "confirmed", "completed", "cancelled"].includes(status)) {
    return NextResponse.json({ ok: false, error: "Invalid status." }, { status: 400 });
  }

  store.patchOrder(id, { status: status as OrderStatus });
  return NextResponse.json({ ok: true });
}

export async function DELETE(_request: NextRequest, { params }: Context) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { id } = await params;
  store.deleteOrder(id);
  return NextResponse.json({ ok: true });
}

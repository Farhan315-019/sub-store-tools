import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { store, type SellerStatus } from "@/lib/store";

type Context = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, { params }: Context) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { id } = await params;
  const body = await request.json();
  const status = String(body?.status ?? "");

  if (status !== "active" && status !== "disabled") {
    return NextResponse.json({ ok: false, error: "Invalid status." }, { status: 400 });
  }

  store.setSellerStatus(id, status as SellerStatus);
  return NextResponse.json({ ok: true });
}

export async function DELETE(_request: NextRequest, { params }: Context) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { id } = await params;
  store.deleteSeller(id);
  return NextResponse.json({ ok: true });
}

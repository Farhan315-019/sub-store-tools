import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { store } from "@/lib/store";

type Context = { params: Promise<{ slug: string }> };

export async function PATCH(request: NextRequest, { params }: Context) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { slug } = await params;
  const body = await request.json();

  const patch: Record<string, unknown> = {};
  if (typeof body?.popular === "boolean") patch.popular = body.popular;
  if (typeof body?.featured === "boolean") patch.featured = body.featured;
  if (body?.status === "available" || body?.status === "limited" || body?.status === "unavailable") {
    patch.status = body.status;
  }

  store.patchProduct(slug, patch);
  return NextResponse.json({ ok: true });
}

export async function DELETE(_request: NextRequest, { params }: Context) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { slug } = await params;
  store.deleteProduct(slug);
  return NextResponse.json({ ok: true });
}

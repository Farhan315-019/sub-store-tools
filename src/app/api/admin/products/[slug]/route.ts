import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { store } from "@/lib/store";
import { categories } from "@/data/categories";
import type { Product } from "@/types";

type Context = { params: Promise<{ slug: string }> };

export async function PATCH(request: NextRequest, { params }: Context) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { slug } = await params;
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const existing = store.getProducts().find((product) => product.slug === slug);
  if (!existing) {
    return NextResponse.json({ ok: false, error: "Product not found." }, { status: 404 });
  }

  const patch: Partial<Product> = {};

  if (typeof body.popular === "boolean") patch.popular = body.popular;
  if (typeof body.featured === "boolean") patch.featured = body.featured;
  if (body.status === "available" || body.status === "limited" || body.status === "unavailable") {
    patch.status = body.status;
  }
  if (typeof body.name === "string" && body.name.trim()) {
    patch.name = body.name.trim();
  }
  if (typeof body.badge === "string") {
    patch.badge = body.badge.trim() || undefined;
  }
  if (typeof body.image === "string") {
    patch.image = body.image.trim() || undefined;
  }
  if (typeof body.categorySlug === "string" && body.categorySlug) {
    const category = categories.find((item) => item.slug === body.categorySlug);
    if (category) {
      patch.category = category.name;
      patch.categorySlug = category.slug;
    }
  }

  const plans = existing.plans.map((plan) => ({ ...plan }));
  if (plans.length === 0) {
    plans.push({ id: `${slug}-plan`, name: "Monthly" });
  }

  if (
    body.price !== undefined &&
    body.price !== "" &&
    !Number.isNaN(Number(body.price)) &&
    Number(body.price) >= 0
  ) {
    plans[0].price = Math.round(Number(body.price));
  }
  if (body.originalPrice !== undefined && body.originalPrice !== "") {
    const originalPrice = Number(body.originalPrice);
    if (!Number.isNaN(originalPrice) && originalPrice >= 0) {
      plans[0].originalPrice = originalPrice > 0 ? Math.round(originalPrice) : undefined;
    }
  }
  if (typeof body.duration === "string") {
    const duration = body.duration.trim();
    if (duration) plans[0].duration = duration;
    else delete plans[0].duration;
  }
  patch.plans = plans;

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

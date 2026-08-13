import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { store } from "@/lib/store";
import { buildNewProduct } from "@/lib/productFactory";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;
  return NextResponse.json({ products: store.getProducts() });
}

export async function POST(request: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const body = await request.json();
    const name = String(body?.name ?? "").trim();
    const categorySlug = String(body?.categorySlug ?? "");
    const price =
      body?.price === undefined || body?.price === "" || Number.isNaN(Number(body?.price))
        ? undefined
        : Math.max(0, Math.round(Number(body.price)));

    if (!name) {
      return NextResponse.json({ ok: false, error: "Product name is required." }, { status: 400 });
    }

    const product = buildNewProduct({
      name,
      categorySlug,
      price,
      duration: body?.duration ? String(body.duration) : undefined,
      badge: body?.badge ? String(body.badge) : undefined,
      popular: Boolean(body?.popular),
      featured: Boolean(body?.featured),
      description: body?.description ? String(body.description) : name,
    });

    const existing = store.getProducts().some((item) => item.slug === product.slug);
    if (existing) {
      return NextResponse.json(
        { ok: false, error: "A product with this name already exists." },
        { status: 409 }
      );
    }

    store.addProduct(product);
    return NextResponse.json({ ok: true, product }, { status: 201 });
  } catch {
    return NextResponse.json({ ok: false, error: "Something went wrong." }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { store } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const productName = String(body?.productName ?? "").trim();
    const orderType = body?.orderType === "Reseller" ? "Reseller" : "Retail";

    if (!productName) {
      return NextResponse.json({ ok: false, error: "Product name is required." }, { status: 400 });
    }

    const order = store.addOrder({
      productId: body?.productId ? String(body.productId) : undefined,
      productName,
      plan: body?.plan ? String(body.plan) : undefined,
      quantity: body?.quantity ? Math.max(1, Number(body.quantity)) : undefined,
      orderType,
      customerName: body?.customerName ? String(body.customerName) : undefined,
      customerEmail: body?.customerEmail ? String(body.customerEmail) : undefined,
      customerPhone: body?.customerPhone ? String(body.customerPhone) : undefined,
      notes: body?.notes ? String(body.notes) : undefined,
    });

    return NextResponse.json({ ok: true, order }, { status: 201 });
  } catch {
    return NextResponse.json({ ok: false, error: "Something went wrong." }, { status: 500 });
  }
}

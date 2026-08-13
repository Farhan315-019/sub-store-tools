import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { store } from "@/lib/store";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;
  return NextResponse.json({ sellers: store.getSellers() });
}

export async function POST(request: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const body = await request.json();
    const name = String(body?.name ?? "").trim();
    const storeName = String(body?.store ?? "").trim();
    const email = String(body?.email ?? "").trim();
    const password = String(body?.password ?? "");

    if (!name || !storeName || !email || !password) {
      return NextResponse.json(
        { ok: false, error: "Name, store, email and password are all required." },
        { status: 400 }
      );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ ok: false, error: "Enter a valid email address." }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json(
        { ok: false, error: "Password must be at least 6 characters." },
        { status: 400 }
      );
    }

    const result = store.createSeller({ name, store: storeName, email, password });
    if (!result.ok) {
      return NextResponse.json({ ok: false, error: result.error }, { status: 409 });
    }
    return NextResponse.json({ ok: true, seller: result.seller }, { status: 201 });
  } catch {
    return NextResponse.json({ ok: false, error: "Something went wrong." }, { status: 500 });
  }
}

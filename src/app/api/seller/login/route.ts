import { NextRequest, NextResponse } from "next/server";
import { store } from "@/lib/store";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = String(body?.email ?? "").trim();
    const password = String(body?.password ?? "");

    if (!email || !password) {
      return NextResponse.json({ ok: false, error: "Email and password are required." }, { status: 400 });
    }

    const seller = store.verifySeller(email, password);
    if (!seller) {
      return NextResponse.json(
        { ok: false, error: "Invalid email or password. Reseller accounts are created by our team on request." },
        { status: 401 }
      );
    }

    return NextResponse.json({
      ok: true,
      seller: {
        id: seller.id,
        name: seller.name,
        store: seller.store,
        email: seller.email,
      },
    });
  } catch {
    return NextResponse.json({ ok: false, error: "Something went wrong." }, { status: 500 });
  }
}

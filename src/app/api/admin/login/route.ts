import { NextRequest, NextResponse } from "next/server";
import { store } from "@/lib/store";
import { setAdminSession } from "@/lib/adminAuth";

export async function POST(_request: NextRequest) {
  try {
    const body = await _request.json();
    const username = String(body?.username ?? "").trim();
    const password = String(body?.password ?? "");
    if (!username || !password) {
      return NextResponse.json(
        { ok: false, error: "Username and password are required." },
        { status: 400 }
      );
    }
    const token = store.verifyAdmin(username, password);
    if (!token) {
      return NextResponse.json(
        { ok: false, error: "Invalid username or password." },
        { status: 401 }
      );
    }
    await setAdminSession(token);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Something went wrong." }, { status: 500 });
  }
}

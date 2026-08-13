import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { store } from "@/lib/store";

export async function POST(request: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const body = await request.json();
    const currentPassword = String(body?.currentPassword ?? "");
    const newPassword = String(body?.newPassword ?? "");
    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { ok: false, error: "Both passwords are required." },
        { status: 400 }
      );
    }
    if (newPassword.length < 6) {
      return NextResponse.json(
        { ok: false, error: "New password must be at least 6 characters." },
        { status: 400 }
      );
    }
    const changed = store.changeAdminPassword(currentPassword, newPassword);
    if (!changed) {
      return NextResponse.json(
        { ok: false, error: "Current password is incorrect." },
        { status: 401 }
      );
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Something went wrong." }, { status: 500 });
  }
}

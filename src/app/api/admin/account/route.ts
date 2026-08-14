import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { store } from "@/lib/store";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;
  return NextResponse.json({ ok: true, username: store.getAdminUsername() });
}

export async function PATCH(request: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const body = await request.json();
    const currentPassword = String(body?.currentPassword ?? "");
    const newUsername =
      typeof body?.newUsername === "string" ? body.newUsername.trim() : undefined;
    const newPassword =
      typeof body?.newPassword === "string" && body.newPassword ? body.newPassword : undefined;

    if (!currentPassword) {
      return NextResponse.json(
        { ok: false, error: "Current password is required." },
        { status: 400 }
      );
    }
    if (newUsername === undefined && newPassword === undefined) {
      return NextResponse.json(
        { ok: false, error: "Nothing to update. Enter a new username or password." },
        { status: 400 }
      );
    }
    if (newPassword !== undefined && newPassword.length < 6) {
      return NextResponse.json(
        { ok: false, error: "New password must be at least 6 characters." },
        { status: 400 }
      );
    }

    const result = store.changeAdminCredentials(currentPassword, {
      username: newUsername,
      password: newPassword,
    });
    if (!result.ok) {
      return NextResponse.json(result, { status: 401 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Something went wrong." }, { status: 500 });
  }
}

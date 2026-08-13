import "server-only";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { store } from "./store";

export const ADMIN_COOKIE = "admin_session";

export async function getAdminToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(ADMIN_COOKIE)?.value;
}

export async function isAdminAuthed(): Promise<boolean> {
  return store.isValidSession(await getAdminToken());
}

export async function setAdminSession(token: string, secure = false): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearAdminSession(): Promise<void> {
  await store.revokeSession(await getAdminToken());
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE);
}

export async function requireAdmin(): Promise<NextResponse | null> {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

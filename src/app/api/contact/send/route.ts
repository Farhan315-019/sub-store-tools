import { NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/email";
import { store } from "@/lib/store";

export const runtime = "nodejs";

const MAX_MESSAGE_LENGTH = 2000;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim().slice(0, 100) : "";
  const email = typeof body?.email === "string" ? body.email.trim().slice(0, 200) : "";
  const phone = typeof body?.phone === "string" ? body.phone.trim().slice(0, 40) : "";
  const message =
    typeof body?.message === "string" ? body.message.trim().slice(0, MAX_MESSAGE_LENGTH) : "";

  if (!name) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
  }
  if (!message) {
    return NextResponse.json({ error: "Message is required." }, { status: 400 });
  }

  store.addMessage({ name, email, phone: phone || undefined, message });

  await sendContactEmail({ name, email, message });

  return NextResponse.json({ ok: true });
}

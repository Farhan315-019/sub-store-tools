import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { store } from "@/lib/store";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;
  return NextResponse.json({ overview: store.getOverview() });
}

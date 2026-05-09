import { NextResponse } from "next/server";
import { getWaitlistCount } from "@/lib/waitlist-store";

export async function GET() {
  return NextResponse.json({ count: getWaitlistCount() });
}

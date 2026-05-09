import { NextResponse } from "next/server";
import { addWaitlistEntry } from "@/lib/waitlist-store";

type WaitlistPayload = {
  email?: string;
  personalized?: boolean;
  childName?: string;
  childAge?: string;
  interests?: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as WaitlistPayload;

  if (!body.email || !body.email.includes("@")) {
    return NextResponse.json(
      { error: "Please provide a valid email." },
      { status: 400 },
    );
  }

  if (body.personalized && (!body.childName || !body.childAge)) {
    return NextResponse.json(
      { error: "Child details are required for personalized samples." },
      { status: 400 },
    );
  }

  addWaitlistEntry({
    email: body.email,
    personalized: Boolean(body.personalized),
    childName: body.childName,
    childAge: body.childAge,
    interests: body.interests,
    createdAt: new Date().toISOString(),
  });

  return NextResponse.json({ success: true });
}

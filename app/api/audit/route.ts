import { NextResponse } from "next/server";
import { sendBriefNotification } from "@/lib/mailer";
import { addBriefToSheet } from "@/lib/sheets";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Send email notification
    try {
      await sendBriefNotification({
        name: body.name,
        email: body.email,
        company: body.company,
        stage: body.stage || null,
        brief: body.brief,
      });
    } catch (e) {
      console.error("[AUDIT] Email notification failed:", e);
    }

    // Add to Google Sheet
    try {
      await addBriefToSheet({
        name: body.name,
        email: body.email,
        company: body.company,
        stage: body.stage || null,
        brief: body.brief,
        timestamp: new Date().toISOString(),
      });
    } catch (e) {
      console.error("[AUDIT] Sheet sync failed:", e);
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[AUDIT] error", e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

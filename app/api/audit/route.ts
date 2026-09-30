import { NextResponse } from "next/server";
import { addBriefToSheet } from "@/lib/sheets";
import { sendBriefNotification } from "@/lib/mailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const lead = {
      name: String(body.name || "").trim(),
      email: String(body.email || "").trim(),
      company: String(body.company || "").trim(),
      social: body.social ? String(body.social).trim() : null,
      phone: body.phone ? String(body.phone).trim() : null,
      brief: String(body.brief || "").trim(),
      source: body.source ? String(body.source).trim() : "homepage",
      timestamp: new Date().toISOString(),
    };

    if (!lead.name || !lead.email || !lead.company || !lead.brief) {
      return NextResponse.json({ ok: false, error: "Required fields are missing" }, { status: 400 });
    }

    const results = await Promise.allSettled([
      addBriefToSheet(lead),
      sendBriefNotification({ ...lead, stage: lead.source }),
    ]);
    const captured = results.some((result) => result.status === "fulfilled" && result.value === true);

    if (!captured) {
      console.error("[AUDIT] No lead capture sink succeeded", results);
      return NextResponse.json({ ok: false, error: "Lead capture is temporarily unavailable" }, { status: 503 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[AUDIT] error", e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

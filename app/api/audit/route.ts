import { NextResponse } from "next/server";
import { addBriefToSheet } from "@/lib/sheets";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    try {
      await addBriefToSheet({
        name: body.name,
        email: body.email,
        company: body.company,
        social: body.social || null,
        phone: body.phone || null,
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

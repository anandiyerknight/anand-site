import { NextResponse } from "next/server";
import { addBriefToSheet } from "@/lib/sheets";
import { sendBriefNotification } from "@/lib/mailer";
import { newsletterIssues } from "@/lib/newsletters";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = (body.name || "").toString().trim();
    const email = (body.email || "").toString().trim();
    const company = (body.company || "").toString().trim();
    const slug = (body.slug || "").toString().trim();

    const issue = newsletterIssues.find((i) => i.slug === slug);
    if (!name || !email || !issue) {
      return NextResponse.json({ ok: false, error: "Missing name, email, or issue." }, { status: 400 });
    }

    const brief = `Newsletter download: Issue ${issue.num} — ${issue.title}`;

    // Capture the lead two ways so a flaky sheet never loses it.
    try {
      await addBriefToSheet({
        name,
        email,
        company: company || "(newsletter download)",
        social: null,
        phone: null,
        brief,
        timestamp: new Date().toISOString(),
      });
    } catch (e) {
      console.error("[NEWSLETTER] Sheet sync failed:", e);
    }

    try {
      await sendBriefNotification({
        name,
        email,
        company: company || "(newsletter download)",
        stage: `Newsletter · Issue ${issue.num}`,
        brief,
      });
    } catch (e) {
      console.error("[NEWSLETTER] Email notify failed:", e);
    }

    return NextResponse.json({ ok: true, pdf: `/newsletters/${issue.slug}.pdf`, title: issue.title });
  } catch (e) {
    console.error("[NEWSLETTER] error", e);
    return NextResponse.json({ ok: false, error: "Server error." }, { status: 500 });
  }
}

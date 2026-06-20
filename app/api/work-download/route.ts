import { NextResponse } from "next/server";
import { addBriefToSheet } from "@/lib/sheets";
import { sendBriefNotification } from "@/lib/mailer";
import { workItems } from "@/lib/work";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = (body.name || "").toString().trim();
    const email = (body.email || "").toString().trim();
    const company = (body.company || "").toString().trim();
    const slug = (body.slug || "").toString().trim();

    // Only guide-type items with a pdf are downloadable. Validating against the
    // array also blocks path traversal via an arbitrary slug.
    const item = workItems.find((w) => w.slug === slug && w.type === "guide" && Boolean(w.pdf));
    if (!name || !email || !item || !item.pdf) {
      return NextResponse.json({ ok: false, error: "Missing name, email, or guide." }, { status: 400 });
    }

    const brief = `Work download: ${item.title}`;

    // Capture the lead two ways so a flaky sheet never loses it.
    try {
      await addBriefToSheet({
        name,
        email,
        company: company || "(work download)",
        social: null,
        phone: null,
        brief,
        timestamp: new Date().toISOString(),
      });
    } catch (e) {
      console.error("[WORK] Sheet sync failed:", e);
    }

    try {
      await sendBriefNotification({
        name,
        email,
        company: company || "(work download)",
        stage: `Work · ${item.category}`,
        brief,
      });
    } catch (e) {
      console.error("[WORK] Email notify failed:", e);
    }

    return NextResponse.json({ ok: true, pdf: item.pdf, title: item.title });
  } catch (e) {
    console.error("[WORK] error", e);
    return NextResponse.json({ ok: false, error: "Server error." }, { status: 500 });
  }
}

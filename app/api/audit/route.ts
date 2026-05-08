import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const entry = {
      ts: new Date().toISOString(),
      ip: req.headers.get("x-forwarded-for") ?? "local",
      ...body,
    };
    const file = path.join(process.cwd(), "submissions.jsonl");
    await fs.appendFile(file, JSON.stringify(entry) + "\n", "utf8");
    console.log("[AUDIT]", entry);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[AUDIT] error", e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

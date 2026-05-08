import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    const entry = await prisma.brief.create({
      data: {
        name: body.name,
        email: body.email,
        company: body.company,
        stage: body.stage || null,
        brief: body.brief,
      }
    });

    console.log("[AUDIT] Saved to database:", entry);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[AUDIT] error", e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

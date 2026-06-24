"use client";

import dynamic from "next/dynamic";
import type { CSSProperties, ReactNode } from "react";
import { Nav } from "@/components/nav";

const ExperienceCanvas = dynamic(() => import("@/components/experience/ExperienceCanvas"), {
  ssr: false,
  loading: () => <div style={{ position: "fixed", inset: 0, background: "#070506" }} />,
});

const tag: CSSProperties = {
  fontFamily: "var(--font-geist-mono), monospace",
  fontSize: 12,
  letterSpacing: "0.28em",
  textTransform: "uppercase",
  color: "#ffb877",
  opacity: 0.9,
  marginBottom: 22,
};
const h2: CSSProperties = {
  fontWeight: 800,
  letterSpacing: "-0.035em",
  lineHeight: 1.03,
  fontSize: "clamp(30px, 5vw, 64px)",
  maxWidth: "15ch",
  margin: 0,
  textShadow: "0 2px 40px rgba(0,0,0,.9)",
};
const sub: CSSProperties = {
  margin: "26px auto 0",
  maxWidth: 540,
  color: "#d7cabd",
  fontSize: "clamp(15px,1.5vw,19px)",
  lineHeight: 1.55,
  textShadow: "0 1px 4px rgba(0,0,0,.95)",
};
const section: CSSProperties = {
  minHeight: "110vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  padding: "8vh 6vw",
  background: "radial-gradient(56% 42% at 50% 48%, rgba(0,0,0,.6), transparent 74%)",
};

function Section({ label, title, copy }: { label: string; title: ReactNode; copy: string }) {
  return (
    <section style={section}>
      <span style={tag}>{label}</span>
      <h2 style={h2}>{title}</h2>
      <p style={sub}>{copy}</p>
    </section>
  );
}

export default function ExperiencePage() {
  return (
    <main className="relative">
      <Nav />
      <ExperienceCanvas />
      <div className="relative z-20" style={{ pointerEvents: "none" }}>
        <Section
          label="Integration architecture"
          title={
            <>
              Every tool you use, wired into <span style={{ color: "#ffb877" }}>one system</span>.
            </>
          }
          copy="LinkedIn, WhatsApp, Slack, HubSpot, your CRM and analytics. One orchestration layer moves data between them, so nothing is manual and nothing is dropped."
        />
        <Section
          label="The context engine"
          title={
            <>
              One piece of content becomes <span style={{ color: "#ffb877" }}>thirty</span>.
            </>
          }
          copy="Connect the context engine once. Every idea fans out into carousels, posts, reels, emails and captions. All on brand, all at once."
        />
        <div style={{ height: "70vh" }} />
      </div>
    </main>
  );
}

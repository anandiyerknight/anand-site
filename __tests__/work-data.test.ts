import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { workItems, hasCaseStudy } from "@/lib/work";
import { caseStudies } from "@/lib/case-studies";

const PUBLIC = path.join(__dirname, "..", "public");

describe("lib/work.ts data integrity", () => {
  it("slugs are unique", () => {
    const slugs = workItems.map((w) => w.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("every referenced asset file exists in public/", () => {
    for (const item of workItems) {
      const refs = [item.cover, item.pdf, ...(item.gallery ?? [])].filter(Boolean) as string[];
      for (const ref of refs) {
        expect(fs.existsSync(path.join(PUBLIC, ref)), `${item.slug}: missing ${ref}`).toBe(true);
      }
    }
  });

  it("every caseStudyId resolves to a real case study", () => {
    const ids = new Set(caseStudies.map((c) => c.id));
    for (const item of workItems) {
      if (item.caseStudyId) {
        expect(ids.has(item.caseStudyId), `${item.slug}: unknown caseStudyId ${item.caseStudyId}`).toBe(true);
      }
    }
  });

  it("hasCaseStudy covers both card types and linked studies", () => {
    expect(hasCaseStudy({ slug: "x", type: "case-study", title: "", category: "", blurb: "" })).toBe(true);
    expect(hasCaseStudy({ slug: "x", type: "landing-page", title: "", category: "", blurb: "", caseStudyId: "y" })).toBe(true);
    expect(hasCaseStudy({ slug: "x", type: "landing-page", title: "", category: "", blurb: "" })).toBe(false);
  });

  it("landing pages have a cover or live URL to render", () => {
    for (const item of workItems.filter((w) => w.type === "landing-page")) {
      expect(item.cover || item.liveUrl, `${item.slug} has neither cover nor liveUrl`).toBeTruthy();
    }
  });
});

import type { MetadataRoute } from "next";
import { newsletterIssues } from "@/lib/newsletters";

const siteUrl = "https://anandiyer.co.in";
const siteLastModified = "2026-10-07";

export default function sitemap(): MetadataRoute.Sitemap {
  const corePages = ["", "/work", "/newsletters", "/services/outbound-automation", "/services/content-automation"];
  return [
    ...corePages.map((path) => ({
      url: `${siteUrl}${path}`,
      lastModified: siteLastModified,
      changeFrequency: path === "" ? "weekly" as const : "monthly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...newsletterIssues.map((issue) => ({
      url: `${siteUrl}/newsletters/${issue.slug}`,
      lastModified: siteLastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}

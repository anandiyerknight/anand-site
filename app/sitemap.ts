import type { MetadataRoute } from "next";
import { newsletterIssues } from "@/lib/newsletters";

const siteUrl = "https://anandiyer.co.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const corePages = ["", "/system", "/work", "/experience", "/newsletters", "/services/outbound-automation", "/services/content-automation"];
  const generatedAt = new Date();

  return [
    ...corePages.map((path) => ({
      url: `${siteUrl}${path}`,
      lastModified: generatedAt,
      changeFrequency: path === "" ? "weekly" as const : "monthly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...newsletterIssues.map((issue) => ({
      url: `${siteUrl}/newsletters/${issue.slug}`,
      lastModified: generatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}

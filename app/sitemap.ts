import type { MetadataRoute } from "next";
import { services, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const statics = [
    { url: "", priority: 1 },
    { url: "/services", priority: 0.9 },
    { url: "/our-work", priority: 0.7 },
    { url: "/service-area", priority: 0.8 },
    { url: "/about", priority: 0.7 },
    { url: "/contact", priority: 0.9 },
  ];

  return [
    ...statics.map((s) => ({
      url: `${site.url}${s.url}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: s.priority,
    })),
    ...services.map((s) => ({
      url: `${site.url}/services/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
  ];
}

import { MetadataRoute } from "next";
import { VERIFIED_REPOSITORIES_SNAPSHOT } from "@/lib/github";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://webstix.studio";
  const now = new Date("2026-10-31T00:00:00.000Z");

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/team`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Dynamic project routes
  const projectRoutes: MetadataRoute.Sitemap = VERIFIED_REPOSITORIES_SNAPSHOT.map((p) => ({
    url: `${baseUrl}/work/${p.owner.login}/${p.name}`,
    lastModified: new Date(p.updated_at),
    changeFrequency: "weekly",
    priority: 0.75,
  }));

  return [...staticRoutes, ...projectRoutes];
}

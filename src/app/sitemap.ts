import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const services = ["seo", "ecommerce", "digital-marketing", "graphic-design", "mobile-development", "web-development"]

  // Generate service URLs with their metadata
  const serviceUrls = services.map((service) => ({
    url: `https://novanectar.co.in/services/${service}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))

  return [
    {
      url: "https://novanectar.co.in",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    // Add the services URLs
    ...serviceUrls,
  ]
}


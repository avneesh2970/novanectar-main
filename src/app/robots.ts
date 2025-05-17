import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin/",
        "/_next/static/media/",
        "/_next/static/chunks/",
        "/_next/image/",
      ],
    },
    sitemap: "https://novanectar.co.in/sitemap.xml",
  };
}

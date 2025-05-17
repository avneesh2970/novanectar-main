import type { MetadataRoute } from "next"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://novanectar.co.in"
  
  // Main pages
  const mainPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
  ]

  // Services pages
  const services = ["seo", "ecommerce", "digital-marketing", "graphic-design", "mobile-development", "web-development"]
  const serviceUrls = services.map((service) => ({
    url: `${baseUrl}/services/${service}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))

  // Career pages
  const careerMainPage = {
    url: `${baseUrl}/career`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }
  
  const careerPositions = [
    "b-d-e", 
    "it-sales", 
    "graphic-designer", 
    "social-media-executive", 
    "video-editor"
  ]
  
  const careerPositionUrls = careerPositions.map((position) => ({
    url: `${baseUrl}/career/${position}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }))

  // Blog main page
  const blogMainPage = {
    url: `${baseUrl}/blog`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.9,
  }
  
  

  // Combine all URLs
  return [
    ...mainPages,
    ...serviceUrls,
    careerMainPage,
    ...careerPositionUrls,
    blogMainPage,
  ]
}
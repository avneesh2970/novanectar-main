import type { MetadataRoute } from "next";
import { projects } from "./portfolio/__data/projects";
import { getBlogPosts, getEvents, getNewsItems } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_URL;
  const staticLastModified = new Date("2026-04-15");

  const mainPages = [
    {
      url: baseUrl,
      lastModified: staticLastModified,
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: staticLastModified,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
  ];

  const services = [
    "seo",
    "social-media-management",
    "digital-marketing",
    "graphic-designing",
    "mobile-development",
    "web-development",
  ];

  const serviceUrls = services.map((service) => ({
    url: `${baseUrl}/services/${service}`,
    lastModified: staticLastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const blogMainPage = {
    url: `${baseUrl}/blog`,
    lastModified: staticLastModified,
    changeFrequency: "daily" as const,
    priority: 0.9,
  };

  const ourWorkPage = {
    url: `${baseUrl}/portfolio`,
    lastModified: staticLastModified,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  };

  const aboutPage = {
    url: `${baseUrl}/about-us`,
    lastModified: staticLastModified,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  };

  const newsEventsPages = [
    {
      url: `${baseUrl}/news`,
      lastModified: staticLastModified,
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/event`,
      lastModified: staticLastModified,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
  ];

  const portfolioUrls = projects.map((project: any) => ({
    url: `${baseUrl}/portfolio/${project.id}`,
    lastModified: staticLastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  let eventUrls: MetadataRoute.Sitemap = [];
  let blogUrls: MetadataRoute.Sitemap = [];
  let newsUrls: MetadataRoute.Sitemap = [];

  try {
    const events = await getEvents();
    eventUrls = events.map((post) => ({
      url: `${baseUrl}/event/${post.slug}`,
      lastModified: new Date(post.updatedAt || post.createdAt),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  } catch (error) {
    console.error("Failed to include event URLs in sitemap:", error);
  }

  try {
    const blogPosts = await getBlogPosts();
    blogUrls = blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt || post.createdAt),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  } catch (error) {
    console.error("Failed to include blog URLs in sitemap:", error);
  }

  try {
    const newsItems = await getNewsItems();
    newsUrls = newsItems.map((post) => ({
      url: `${baseUrl}/news/${post.slug}`,
      lastModified: new Date(post.updatedAt || post.createdAt),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  } catch (error) {
    console.error("Failed to include news URLs in sitemap:", error);
  }

  return [
    ...mainPages,
    ...serviceUrls,
    blogMainPage,
    ourWorkPage,
    aboutPage,
    ...newsEventsPages,
    ...portfolioUrls,
    ...eventUrls,
    ...blogUrls,
    ...newsUrls,
  ];
}

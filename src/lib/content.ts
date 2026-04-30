import "server-only";

import { connectDB } from "@/lib/dbConnect";
import { BlogPost } from "@/models/BlogPost";
import { EventPost } from "@/models/EventPost";
import News from "@/models/News";

export interface BlogPostRecord {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt?: string;
  featuredImage?: string;
  featuredImageAlt?: string;
  categories: string[];
  metaTitle?: string;
  metaDescription?: string;
}

export interface NewsRecord {
  _id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  featuredImage?: string;
  featuredImageAlt?: string;
  author: string;
  category: string;
  tags: string[];
  publishDate: string;
  isPublished: boolean;
  views: number;
  metaTitle?: string;
  metaDescription?: string;
  createdAt: string;
  updatedAt: string;
}

export interface EventRecord {
  _id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  eventDate: string;
  eventTime: string;
  venue: string;
  organizer: string;
  isPublished: boolean;
  featuredImage?: string;
  featuredImageAlt?: string;
  categories: string[];
  metaTitle?: string;
  metaDescription?: string;
  createdAt: string;
  updatedAt: string;
}

function serialize<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function hasDatabaseConfig() {
  return Boolean(process.env.NEXT_PUBLIC_MONGODB_URI);
}

export async function getBlogPosts(): Promise<BlogPostRecord[]> {
  if (!hasDatabaseConfig()) {
    return [];
  }
  try {
    await connectDB();
    const posts = await BlogPost.find({ isPublished: { $ne: false } })
      .sort({ createdAt: -1 })
      .lean();
    return serialize(posts) as unknown as BlogPostRecord[];
  } catch (error) {
    console.error("Failed to load blog posts:", error);
    return [];
  }
}

export async function getBlogPost(slug: string): Promise<BlogPostRecord | null> {
  if (!hasDatabaseConfig()) {
    return null;
  }
  try {
    await connectDB();
    const post = await BlogPost.findOne({ slug, isPublished: { $ne: false } }).lean();
    return post ? (serialize(post) as unknown as BlogPostRecord) : null;
  } catch (error) {
    console.error(`Failed to load blog post for slug "${slug}":`, error);
    return null;
  }
}

export async function getNewsItems(): Promise<NewsRecord[]> {
  if (!hasDatabaseConfig()) {
    return [];
  }
  try {
    await connectDB();
    const news = await News.find({ isPublished: { $ne: false } })
      .sort({ publishDate: -1 })
      .lean();
    return serialize(news) as unknown as NewsRecord[];
  } catch (error) {
    console.error("Failed to load news items:", error);
    return [];
  }
}

export async function getNewsItem(slug: string): Promise<NewsRecord | null> {
  if (!hasDatabaseConfig()) {
    return null;
  }
  try {
    await connectDB();
    const news = await News.findOne({ slug, isPublished: { $ne: false } }).lean();
    return news ? (serialize(news) as unknown as NewsRecord) : null;
  } catch (error) {
    console.error(`Failed to load news item for slug "${slug}":`, error);
    return null;
  }
}

export async function getEvents(): Promise<EventRecord[]> {
  if (!hasDatabaseConfig()) {
    return [];
  }
  try {
    await connectDB();
    const events = await EventPost.find({ isPublished: { $ne: false } })
      .sort({ createdAt: -1 })
      .lean();
    return serialize(events) as unknown as EventRecord[];
  } catch (error) {
    console.error("Failed to load events:", error);
    return [];
  }
}

export async function getEvent(slug: string): Promise<EventRecord | null> {
  if (!hasDatabaseConfig()) {
    return null;
  }
  try {
    await connectDB();
    const event = await EventPost.findOne({ slug, isPublished: { $ne: false } }).lean();
    return event ? (serialize(event) as unknown as EventRecord) : null;
  } catch (error) {
    console.error(`Failed to load event for slug "${slug}":`, error);
    return null;
  }
}

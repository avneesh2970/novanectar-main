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
  await connectDB();
  const posts = await BlogPost.find().sort({ createdAt: -1 }).lean();
  return serialize(posts) as unknown as BlogPostRecord[];
}

export async function getBlogPost(slug: string): Promise<BlogPostRecord | null> {
  if (!hasDatabaseConfig()) {
    return null;
  }
  await connectDB();
  const post = await BlogPost.findOne({ slug }).lean();
  return post ? (serialize(post) as unknown as BlogPostRecord) : null;
}

export async function getNewsItems(): Promise<NewsRecord[]> {
  if (!hasDatabaseConfig()) {
    return [];
  }
  await connectDB();
  const news = await News.find({ isPublished: true })
    .sort({ publishDate: -1 })
    .lean();
  return serialize(news) as unknown as NewsRecord[];
}

export async function getNewsItem(slug: string): Promise<NewsRecord | null> {
  if (!hasDatabaseConfig()) {
    return null;
  }
  await connectDB();
  const news = await News.findOne({ slug, isPublished: true }).lean();
  return news ? (serialize(news) as unknown as NewsRecord) : null;
}

export async function getEvents(): Promise<EventRecord[]> {
  if (!hasDatabaseConfig()) {
    return [];
  }
  await connectDB();
  const events = await EventPost.find().sort({ createdAt: -1 }).lean();
  return serialize(events) as unknown as EventRecord[];
}

export async function getEvent(slug: string): Promise<EventRecord | null> {
  if (!hasDatabaseConfig()) {
    return null;
  }
  await connectDB();
  const event = await EventPost.findOne({ slug }).lean();
  return event ? (serialize(event) as unknown as EventRecord) : null;
}

import mongoose, { Schema, type Document } from "mongoose";

export interface IBlogPost extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  featuredImage?: string;
  featuredImageAlt?: string;
  categories: string[];
  metaTitle?: string; // New field
  metaDescription?: string; // New field
  createdAt: Date;
  updatedAt: Date;
}

const BlogPostSchema = new Schema<IBlogPost>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    excerpt: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
      default: "Novanectar",
    },
    featuredImage: {
      type: String,
    },
     featuredImageAlt: {
      type: String,
      trim: true,
    },
    categories: {
      type: [String],
      default: [],
    },
    metaTitle: {
      // New field
      type: String,
      trim: true,
    },
    metaDescription: {
      // New field
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export const BlogPost =
  mongoose.models.BlogPost ||
  mongoose.model<IBlogPost>("BlogPost", BlogPostSchema);

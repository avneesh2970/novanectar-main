import mongoose, { Schema, type Document } from "mongoose"

export interface IBlogPost extends Document {
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  featuredImage?: string
  categories: string[]
  createdAt: Date
  updatedAt: Date
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
      default: "Amit Bhetwal",
    },
    featuredImage: {
      type: String,
    },
    categories: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true },
)

export const BlogPost = mongoose.models.BlogPost || mongoose.model<IBlogPost>("BlogPost", BlogPostSchema)

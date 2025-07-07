import mongoose from "mongoose"

const NewsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [300, "Description cannot exceed 300 characters"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      minlength: [50, "Content must be at least 50 characters"],
    },
    featuredImage: {
      type: String,
      default: "",
    },
    featuredImageAlt: {
      type: String,
      default: "",
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
      default: "Novanectar",
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["Technology", "Business", "Sports", "Entertainment", "Health", "Politics", "Other"],
      default: "Other",
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    publishDate: {
      type: Date,
      default: Date.now,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    metaTitle: {
      type: String,
      trim: true,
    },
    metaDescription: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.News || mongoose.model("News", NewsSchema)

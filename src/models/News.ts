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
    content: {
      type: String,
      required: [true, "Content is required"],
      minlength: [50, "Content must be at least 50 characters"],
    },
    excerpt: {
      type: String,
      maxlength: [300, "Excerpt cannot exceed 300 characters"],
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
  },
  {
    timestamps: true,
  },
)

// Create slug from title before saving
NewsSchema.pre("save", function (next) {
  if (this.isModified("title") && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9 ]/g, "") // Remove special characters
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .trim()
      .substring(0, 100) // Limit length

    // If slug is empty after processing, use a default
    if (!this.slug) {
      this.slug = `news-${Date.now()}`
    }
  }
  next()
})

export default mongoose.models.News || mongoose.model("News", NewsSchema)

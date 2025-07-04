import mongoose, { Schema } from "mongoose";

const EventPostSchema = new Schema<any>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      // required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      // required: true,
    },
    eventDate: {
      type: Date,
      required: true,
    },
    eventTime: {
      type: String, // or Date if you prefer ISO format for combined datetime
      required: true,
    },
    venue: {
      type: String,
      required: true,
      trim: true,
    },
    organizer: {
      type: String,
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
      type: String,
      trim: true,
    },
    metaDescription: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export const EventPost =
  mongoose.models.EventPost ||
  mongoose.model<any>("EventPost", EventPostSchema);

import mongoose, { Document, Model, Schema } from "mongoose";

// Define TypeScript interface for a document
export interface IActiveBlogUser extends Document {
  username: string;
  loginTime: Date;
  sessionType: "owner" | "guest";
  createdAt: Date;
  updatedAt: Date;
}

// Define the Mongoose schema
const activeBlogUserSchema: Schema<IActiveBlogUser> = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    loginTime: {
      type: Date,
      required: true,
      default: Date.now,
    },
    sessionType: {
      type: String,
      enum: ["owner", "guest"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Avoid re-compiling model in Next.js hot reload dev mode
const ActiveBlogUser: Model<IActiveBlogUser> =
  mongoose.models.ActiveBlogUser ||
  mongoose.model<IActiveBlogUser>("ActiveBlogUser", activeBlogUserSchema);

export default ActiveBlogUser;

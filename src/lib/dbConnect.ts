import mongoose from "mongoose";

let connectionPromise: Promise<typeof mongoose> | null = null;

export const connectDB = async () => {
  const uri = process.env.NEXT_PUBLIC_MONGODB_URI;

  if (!uri) {
    throw new Error("MongoDB URI is not configured");
  }

  if (mongoose.connections[0]?.readyState) {
    return mongoose;
  }

  if (!connectionPromise) {
    connectionPromise = mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    });
  }

  try {
    await connectionPromise;
    return mongoose;
  } catch (error) {
    connectionPromise = null;
    throw error;
  }
};

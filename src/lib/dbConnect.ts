import mongoose from "mongoose";
export const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI as string);
};

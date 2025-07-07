import { NextResponse } from "next/server";
import ActiveBlogUser from "@/models/ActiveBlogUser";
import { connectDB } from "@/lib/dbConnect";

export async function GET() {
  await connectDB();

  const activeUsers = await ActiveBlogUser.find().sort({ loginTime: -1 });

  return NextResponse.json({ success: true, activeUsers });
}

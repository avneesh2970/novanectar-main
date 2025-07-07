import { NextResponse } from "next/server"
import ActiveBlogUser from "@/models/ActiveBlogUser"
import { connectDB } from "@/lib/dbConnect"

export async function POST(request: Request) {
  await connectDB()
  const { username } = await request.json()

  if (!username) {
    return NextResponse.json({ success: false, message: "Username missing" }, { status: 400 })
  }

  await ActiveBlogUser.deleteOne({ username })

  return NextResponse.json({ success: true, message: `${username} logged out.` })
}

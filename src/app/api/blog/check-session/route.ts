import { NextResponse } from "next/server"
import ActiveBlogUser from "@/models/ActiveBlogUser"
import { connectDB } from "@/lib/dbConnect"

export async function GET(request: Request) {
  await connectDB()

  const { searchParams } = new URL(request.url)
  const username = searchParams.get("username")

  if (!username) {
    return NextResponse.json({ valid: false })
  }

  const userExists = await ActiveBlogUser.findOne({ username })

  return NextResponse.json({ valid: !!userExists })
}

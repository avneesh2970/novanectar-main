import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import ActiveBlogUser from "@/models/ActiveBlogUser"
import { connectDB } from "@/lib/dbConnect"

export async function POST() {
  await connectDB()

  const cookieStore = await cookies()

  // Get username before clearing cookies
  const username = cookieStore.get("blogUserName")?.value

  // Clear all cookies
  cookieStore.set("blogLoggedIn", "", {
    path: "/",
    httpOnly: true,
    maxAge: 0,
  })

  cookieStore.set("blogLoggedInClient", "", {
    path: "/",
    httpOnly: false,
    maxAge: 0,
  })

  cookieStore.set("blogUserName", "", {
    path: "/",
    httpOnly: false,
    maxAge: 0,
  })

  // Remove from ActiveBlogUser collection
  if (username) {
    await ActiveBlogUser.deleteOne({ username })
  }

  return NextResponse.json({
    success: true,
    message: "Logout successful",
    clearLocalStorage: true, // Signal to clear localStorage
  })
}

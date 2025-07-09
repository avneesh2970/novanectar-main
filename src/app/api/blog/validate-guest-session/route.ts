import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import ActiveBlogUser from "@/models/ActiveBlogUser"
import { connectDB } from "@/lib/dbConnect"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const cookieStore = await cookies()
    const isLoggedIn = cookieStore.get("blogLoggedIn")?.value === "true"
    const username = cookieStore.get("blogUserName")?.value

    if (!isLoggedIn || !username) {
      return NextResponse.json({ valid: false }, { status: 401 })
    }

    // Check if user is a guest and still active in database
    const activeUser = await ActiveBlogUser.findOne({
      username,
      sessionType: "guest",
    })

    if (!activeUser) {
      // Guest was logged out by admin, clear cookies
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

      return NextResponse.json({ valid: false }, { status: 401 })
    }

    // Update last activity time for guest
    await ActiveBlogUser.updateOne({ username, sessionType: "guest" }, { lastActivity: new Date() })

    return NextResponse.json({
      valid: true,
      user: {
        username: activeUser.username,
        sessionType: activeUser.sessionType,
        loginTime: activeUser.loginTime,
      },
    })
  } catch (error) {
    console.error("Guest session validation error:", error)
    return NextResponse.json({ valid: false }, { status: 500 })
  }
}

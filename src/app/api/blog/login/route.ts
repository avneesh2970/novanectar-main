import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request: Request) {
  const { username, password } = await request.json()

  if (username === process.env.BLOG_USERNAME && password === process.env.BLOG_PASSWORD) {
    // Set the cookie for server-side authentication
    const cookieStore = await cookies()

    // Set HTTP-only cookie for security
    cookieStore.set("blogLoggedIn", "true", {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    })

    // Also set a non-HTTP-only cookie for client-side checks
    cookieStore.set("blogLoggedInClient", "true", {
      path: "/",
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    })

    return NextResponse.json({
      success: true,
      message: "Login successful",
    })
  } else {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid credentials",
      },
      { status: 401 },
    )
  }
}

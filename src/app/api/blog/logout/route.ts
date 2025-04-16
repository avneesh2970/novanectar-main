import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST() {
  // Clear the authentication cookies
  const cookieStore = await cookies()

  // Clear HTTP-only cookie
  cookieStore.set("blogLoggedIn", "", {
    path: "/",
    expires: new Date(0), // Expire immediately
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  })

  // Clear client-side cookie
  cookieStore.set("blogLoggedInClient", "", {
    path: "/",
    expires: new Date(0), // Expire immediately
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  })

  return NextResponse.json({ success: true })
}

import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import ActiveBlogUser from "@/models/ActiveBlogUser"
import { connectDB } from "@/lib/dbConnect"
import GuestToken from "@/models/GuestToken"

export async function GET(request: Request) {
  await connectDB()
  const { searchParams } = new URL(request.url)
  const token = searchParams.get("token")

  if (!token) {
    return NextResponse.json({ success: false, message: "Invalid link" }, { status: 400 })
  }

  const guestToken = await GuestToken.findOne({ token })

  if (!guestToken || guestToken.expiresAt < new Date()) {
    return NextResponse.json({ success: false, message: "Link expired or invalid" }, { status: 401 })
  }

  const cookieStore = await cookies()

  // Set persistent cookies for guest (7 days)
  cookieStore.set("blogLoggedIn", "true", {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 30, // 7 days
  })

  cookieStore.set("blogLoggedInClient", "true", {
    path: "/",
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })

  cookieStore.set("blogUserName", guestToken.guestName, {
    path: "/",
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })

  // Check if guest user already exists (prevent duplicates)
  const existingUser = await ActiveBlogUser.findOne({
    username: guestToken.guestName,
    sessionType: "guest",
  })

  if (!existingUser) {
    await ActiveBlogUser.create({
      username: guestToken.guestName,
      loginTime: new Date(),
      lastActivity: new Date(),
      sessionType: "guest",
    })
  } else {
    // Update existing guest user's activity
    await ActiveBlogUser.updateOne(
      { username: guestToken.guestName, sessionType: "guest" },
      { lastActivity: new Date() },
    )
  }

  // Delete the used token
  await GuestToken.deleteOne({ token })

  // Create HTML response that sets localStorage and redirects
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Logging in...</title>
    </head>
    <body>
      <div style="display: flex; justify-content: center; align-items: center; height: 100vh; font-family: Arial, sans-serif;">
        <div style="text-align: center;">
          <div style="border: 4px solid #f3f3f3; border-top: 4px solid #3498db; border-radius: 50%; width: 40px; height: 40px; animation: spin 2s linear infinite; margin: 0 auto 20px;"></div>
          <p>Logging you in...</p>
        </div>
      </div>
      <style>
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
      <script>
        // Set localStorage for persistent guest session
        localStorage.setItem('guestBlogLoggedIn', 'true');
        localStorage.setItem('guestUserName', '${guestToken.guestName}');
        
        // Redirect to dashboard after setting localStorage
        setTimeout(() => {
          window.location.href = '/blog-admin/dashboard';
        }, 1000);
      </script>
    </body>
    </html>
  `

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html",
    },
  })
}

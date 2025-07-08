import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Check if the path is for the blog admin dashboard or its subpaths
  // BUT exclude the main login page
  const isAdminPath = path.startsWith("/blog-admin") && path !== "/blog-admin"

  // Check if the user is logged in
  const isLoggedIn = request.cookies.get("blogLoggedIn")?.value === "true"

  console.log(`Middleware running for path: ${path}`)
  console.log(`Is admin path: ${isAdminPath}`)
  console.log(`Is logged in: ${isLoggedIn}`)

  // If trying to access admin dashboard without being logged in, redirect to login
  if (isAdminPath && !isLoggedIn) {
    console.log("Redirecting to login page")
    return NextResponse.redirect(new URL("/blog-admin", request.url))
  }

  return NextResponse.next()
}

// Updated matcher for Next.js 15
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}

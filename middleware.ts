import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Check if the path is for the blog admin dashboard or its subpaths
  const isAdminPath = path.startsWith("/blog-admin");

  // Check if the user is logged in
  const isLoggedIn = request.cookies.get("blogLoggedIn")?.value === "true";

  console.log(`Middleware running for path: ${path}`);
  console.log(`Is admin path: ${isAdminPath}`);
  console.log(`Is logged in: ${isLoggedIn}`);
  console.log(`Cookies:`, request.cookies.getAll());

  // If trying to access admin dashboard without being logged in, redirect to login
  if (isAdminPath && !isLoggedIn) {
    console.log("Redirecting to login page");
    return NextResponse.redirect(new URL("/blog-admin", request.url));
  }

  return NextResponse.next();
}

// Make sure the matcher includes all dashboard routes
export const config = {
  matcher: [
    "/blog-admin/:path*", // this matches /blog-admin and anything nested under it
  ],
};

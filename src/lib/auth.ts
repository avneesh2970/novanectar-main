import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function isAuthenticated(request: NextRequest) {
  // Check for session in cookies
  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.get("blogLoggedIn")?.value === "true";
  console.log("isLoggedIn", isLoggedIn); // Debugging line
  // For API routes, also check authorization header
  const authHeader = request.headers.get("Authorization");
  const apiKey = process.env.BLOG_API_KEY;
  const validApiKey = apiKey && authHeader === `Bearer ${apiKey}`;

  return isLoggedIn || validApiKey;
}

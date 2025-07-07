import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import ActiveBlogUser from "@/models/ActiveBlogUser";
import { connectDB } from "@/lib/dbConnect";

export async function POST() {
  await connectDB();
  // Clear the authentication cookies
  const cookieStore = await cookies();

  // Read username from cookie
  const userNameCookie = cookieStore.get("blogUserName")?.value;

  // Clear HTTP-only cookie
  cookieStore.set("blogLoggedIn", "", {
    path: "/",
    expires: new Date(0), // Expire immediately
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  // Clear client-side cookie
  cookieStore.set("blogLoggedInClient", "", {
    path: "/",
    expires: new Date(0), // Expire immediately
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  cookieStore.set("blogUserName", "", {
    path: "/",
    expires: new Date(0),
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  // Remove user from ActiveBlogUser collection if present
  if (userNameCookie) {
    await ActiveBlogUser.deleteOne({ username: userNameCookie });
  }

  return NextResponse.json({ success: true });
}

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import ActiveBlogUser from "@/models/ActiveBlogUser";
import { connectDB } from "@/lib/dbConnect";
import GuestToken from "@/models/GuestToken";

export async function GET(request: Request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json(
      { success: false, message: "Invalid link" },
      { status: 400 }
    );
  }
  const guestToken = await GuestToken.findOne({ token });

  if (!guestToken || guestToken.expiresAt < new Date()) {
    return NextResponse.json(
      { success: false, message: "Link expired or invalid" },
      { status: 401 }
    );
  }

  const cookieStore = await cookies();

  // Set cookies
  cookieStore.set("blogLoggedIn", "true", {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7,
  });

  cookieStore.set("blogLoggedInClient", "true", {
    path: "/",
    httpOnly: false,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7,
  });

  cookieStore.set("blogUserName", guestToken.guestName, {
    path: "/",
    httpOnly: false,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7,
  });

  await ActiveBlogUser.create({
    username: guestToken.guestName,
    loginTime: new Date(),
    sessionType: "guest",
  });
  await GuestToken.deleteOne({ token });

  // ✅ Redirect to dashboard after login
  return NextResponse.redirect(new URL("/blog-admin/dashboard", request.url));
}

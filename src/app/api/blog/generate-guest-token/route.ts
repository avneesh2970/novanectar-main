import { NextResponse } from "next/server"
import GuestToken from "@/models/GuestToken"
import { connectDB } from "@/lib/dbConnect"
import crypto from "crypto"

export async function POST(request: Request) {
  await connectDB()

  const { guestName } = await request.json()
  const trimmedGuestName = guestName?.trim()

  if (!trimmedGuestName) {
    return NextResponse.json({ success: false, message: "Guest name required" }, { status: 400 })
  }

  const token = crypto.randomBytes(20).toString("hex")

  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 1) // 1 hour validity

  await GuestToken.create({ token, guestName: trimmedGuestName, expiresAt })

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin
  const link = `${baseUrl}/api/blog/guest-login?token=${token}`

  return NextResponse.json({ success: true, link })
}

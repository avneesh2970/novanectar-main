import { NextResponse } from "next/server"
import { connectDB } from "@/lib/dbConnect"
import Contact from "@/models/Contact"

export async function GET() {
  try {
    await connectDB()
    const contacts = await Contact.find().sort({ createdAt: -1 })
    return NextResponse.json(contacts)
  } catch (error) {
    console.error("Error fetching contacts:", error)
    return NextResponse.json({ message: "Error fetching contacts" }, { status: 500 })
  }
}


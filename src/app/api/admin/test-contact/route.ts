import { NextResponse } from "next/server"
import { connectDB } from "@/lib/dbConnect"
import TestContact from "@/models/TestContacts"

export async function GET() {
  try {
    await connectDB()
    const contacts = await TestContact.find().sort({ createdAt: -1 })
    return NextResponse.json(contacts)
  } catch (error) {
    console.error("Error fetching test contacts:", error)
    return NextResponse.json({ message: "Error fetching tets contacts" }, { status: 500 })
  }
}


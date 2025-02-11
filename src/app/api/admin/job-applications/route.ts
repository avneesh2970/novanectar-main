import { NextResponse } from "next/server"
import { connectDB } from "@/lib/dbConnect"
import JobApplication from "@/models/JobApplication"

export async function GET() {
  try {
    await connectDB()
    const jobApplications = await JobApplication.find().sort({ createdAt: -1 })
    return NextResponse.json(jobApplications)
  } catch (error) {
    console.error("Error fetching job applications:", error)
    return NextResponse.json({ message: "Error fetching job applications" }, { status: 500 })
  }
}


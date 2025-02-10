import { NextResponse } from "next/server"
import mongoose from "mongoose"
import JobApplication from "@/models/JobApplication"

const connectDB = async () => {
  if (mongoose.connections[0].readyState) return
  await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI as string)
}

export async function POST(request: Request) {
  try {
    await connectDB()

    const body = await request.json()
    const newApplication = new JobApplication(body)
    await newApplication.save()

    return NextResponse.json({ message: "Application submitted successfully" }, { status: 201 })
  } catch (error) {
    console.error("Error in job application submission:", error)
    return NextResponse.json({ message: "Error submitting application" }, { status: 500 })
  }
}


/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server"
import JobApplication from "@/models/JobApplication"
import { connectDB } from "@/lib/dbConnect"

export async function POST(request: Request) {
  try {
    await connectDB()

    const body = await request.json()

    // Validate resume URL
    if (!body.resume || !isValidUrl(body.resume)) {
      return NextResponse.json({ message: "Invalid resume URL" }, { status: 400 })
    }

    const newApplication = new JobApplication(body)
    await newApplication.save()

    return NextResponse.json({ message: "Application submitted successfully" }, { status: 201 })
  } catch (error) {
    console.error("Error in job application submission:", error)
    return NextResponse.json({ message: "Error submitting application" }, { status: 500 })
  }
}

function isValidUrl(string: string) {
  try {
    new URL(string)
    return true
  } catch (_) {
    return false
  }
}


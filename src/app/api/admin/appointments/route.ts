import { NextResponse } from "next/server"
import { connectDB } from "@/lib/dbConnect"
import Appointment from "@/models/Appointment"

export async function GET() {
  try {
    await connectDB()
    const appointments = await Appointment.find().sort({ date: -1 })
    return NextResponse.json(appointments)
  } catch (error) {
    console.error("Error fetching appointments:", error)
    return NextResponse.json({ message: "Error fetching appointments" }, { status: 500 })
  }
}


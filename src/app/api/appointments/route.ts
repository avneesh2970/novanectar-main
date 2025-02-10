import { NextResponse } from "next/server"
import mongoose from "mongoose"
import Appointment from "@/models/Appointment"

// Connect to MongoDB
const connectDB = async () => {
  if (mongoose.connections[0].readyState) return
  await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI as string)
}

export async function POST(request: Request) {
  try {
    await connectDB()

    const body = await request.json()
    const newAppointment = new Appointment(body)
    await newAppointment.save()

    return NextResponse.json({ message: "Appointment booked successfully" }, { status: 201 })
  } catch (error) {
    console.error("Error in appointment booking:", error)
    return NextResponse.json({ message: "Error booking appointment" }, { status: 500 })
  }
}


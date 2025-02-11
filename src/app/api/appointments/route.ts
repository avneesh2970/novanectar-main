import { NextResponse } from "next/server";
import Appointment from "@/models/Appointment";
import { connectDB } from "@/lib/dbConnect";

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const { date, name, email, phone, customTime } = body;
    if (!date || !name || !email || !phone) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }
    const newAppointment = new Appointment({
      date: new Date(date),
      customTime,
      name,
      email,
      phone,
    });
    await newAppointment.save();
    console.log("newAppointemnt: ", newAppointment);
    return NextResponse.json(
      { message: "Appointment booked successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in appointment booking:", error);
    return NextResponse.json(
      { message: "Error booking appointment" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/dbConnect";
import Contact from "@/models/Contact";

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();
    const newContact = new Contact(body);
    await newContact.save();

    return NextResponse.json(
      { message: "Contact form submitted successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in contact form submission:", error);
    return NextResponse.json(
      { message: "Error submitting contact form" },
      { status: 500 }
    );
  }
}

import { connectDB } from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import TestContact from "@/models/TestContacts";

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();
    const newContact = new TestContact(body);
    await newContact.save();

    return NextResponse.json(
      { message: "Test Contact form submitted successfully" },
      {
        status: 201,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error in test contact form submission:", error);
    return new NextResponse(
      JSON.stringify({ message: "Error submitting test contact form" }),
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    );
  }
}

// Handle preflight OPTIONS request too
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
    //   "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Origin": "https://try.novanectar.co.in",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }
  });
}
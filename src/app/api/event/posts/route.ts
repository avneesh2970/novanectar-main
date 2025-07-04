import { type NextRequest, NextResponse } from "next/server";
// import { connectToDatabase } from "@/lib/mongodb";
import { connectDB } from "@/lib/dbConnect";
import { EventPost } from "@/models/EventPost";
import { isAuthenticated } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (slug) {
      const event = await EventPost.findOne({ slug });
      if (!event) {
        return NextResponse.json({ error: "Event not found" }, { status: 404 });
      }
      return NextResponse.json(event);
    }

    const events = await EventPost.find().sort({ createdAt: -1 });
    return NextResponse.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const isAdmin = await isAuthenticated(request);
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const data = await request.json();
    // Validate required fields for events
    if (!data.title || !data.eventDate || !data.eventTime || !data.venue) {
      return NextResponse.json(
        { error: "Title, eventDate, eventTime, and venue are required" },
        { status: 400 }
      );
    }

    // Create slug from title if not provided
    if (!data.slug) {
      data.slug = data.title
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "-");
    }
    // Check if slug already exists
    const existingEvent = await EventPost.findOne({ slug: data.slug });
    if (existingEvent) {
      return NextResponse.json(
        { error: "An event with this slug already exists" },
        { status: 400 }
      );
    }
    // Validate alt text if image is present
    if (data.featuredImage && !data.featuredImageAlt) {
      // If no alt text is provided but image is, use the title as fallback
      data.featuredImageAlt = data.title;
    }
    const newEvent = new EventPost(data);
    await newEvent.save();
    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}

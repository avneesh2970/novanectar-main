import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/dbConnect"
import News from "@/models/News"

// GET - Fetch all news
export async function GET() {
  try {
    await connectDB()

    const news = await News.find({ isPublished: true }).sort({ publishDate: -1 }).lean()

    return NextResponse.json({
      success: true,
      data: news,
      count: news.length,
    })
  } catch (error) {
    console.error("Error fetching news:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch news" }, { status: 500 })
  }
}

// POST - Create new news
export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const body = await request.json()

    // Generate slug from title
    if (body.title) {
      body.slug = body.title
        .toLowerCase()
        .replace(/[^a-zA-Z0-9 ]/g, "") // Remove special characters
        .replace(/\s+/g, "-") // Replace spaces with hyphens
        .trim()
        .substring(0, 100) // Limit length to 100 characters

      // Add timestamp suffix to ensure uniqueness
      body.slug = `${body.slug}-${Date.now()}`
    }

    // Generate excerpt if not provided
    if (!body.excerpt && body.content) {
      body.excerpt = body.content.substring(0, 200) + "..."
    }

    const news = await News.create(body)

    return NextResponse.json(
      {
        success: true,
        data: news,
        message: "News created successfully",
      },
      { status: 201 },
    )
  } catch (error: any) {
    console.error("Error creating news:", error)

    if (error.code === 11000) {
      return NextResponse.json({ success: false, error: "News with this title already exists" }, { status: 400 })
    }

    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err: any) => err.message)
      return NextResponse.json({ success: false, error: errors.join(", ") }, { status: 400 })
    }

    return NextResponse.json({ success: false, error: "Failed to create news" }, { status: 500 })
  }
}

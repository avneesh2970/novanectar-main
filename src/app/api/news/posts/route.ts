import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/dbConnect"
import News from "@/models/News"
import { isAuthenticated } from "@/lib/auth"

// GET - Fetch all news
export async function GET(request: NextRequest) {
  try {
    await connectDB()
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get("slug")

    if (slug) {
      const news = await News.findOne({ slug, isPublished: true })
      if (!news) {
        return NextResponse.json({ success: false, error: "News not found" }, { status: 404 })
      }
      return NextResponse.json({ success: true, data: news })
    }

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
    const isAdmin = await isAuthenticated(request)
    if (!isAdmin) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()
    const body = await request.json()

    // Validate required fields
    if (!body.title || !body.description || !body.content || !body.author) {
      return NextResponse.json(
        { success: false, error: "Title, description, content, and author are required" },
        { status: 400 },
      )
    }

    // Create slug from title if not provided
    if (!body.slug) {
      body.slug = body.title
        .toLowerCase()
        .replace(/[^\w\s-]/gi, "")
        .replace(/\s+/g, "-")
        .substring(0, 50)
    }

    // Check if slug already exists
    const existingNews = await News.findOne({ slug: body.slug })
    if (existingNews) {
      return NextResponse.json({ success: false, error: "An article with this slug already exists" }, { status: 400 })
    }

    // Validate alt text if image is present
    if (body.featuredImage && !body.featuredImageAlt) {
      body.featuredImageAlt = body.title
    }

    // Set default meta fields if not provided
    if (!body.metaTitle) {
      body.metaTitle = body.title
    }
    if (!body.metaDescription) {
      body.metaDescription = body.description
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

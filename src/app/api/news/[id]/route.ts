import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/dbConnect"
import News from "@/models/News"
import { isAuthenticated } from "@/lib/auth"

// DELETE - Delete news by ID
export async function DELETE(request: NextRequest, { params }:any) {
  try {
    await connectDB()

    const { id } = await params

    const deletedNews = await News.findByIdAndDelete(id)

    if (!deletedNews) {
      return NextResponse.json({ success: false, error: "News not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "News deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting news:", error)
    return NextResponse.json({ success: false, error: "Failed to delete news" }, { status: 500 })
  }
}

// GET - Get single news by ID
export async function GET(request: NextRequest, { params }:any) {
  try {
    await connectDB()

    const { id } =await params

    const news = await News.findById(id)

    if (!news) {
      return NextResponse.json({ success: false, error: "News not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: news,
    })
  } catch (error) {
    console.error("Error fetching news:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch news" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }:any) {
  try {
    // ADDED: Authentication check
    const isAdmin = await isAuthenticated(request)
    if (!isAdmin) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()
    const { id } = await params
    const body = await request.json()

    // ADDED: Validation for required fields on update
    if (!body.title || !body.description || !body.content || !body.author) {
      return NextResponse.json(
        {
          success: false,
          error: "Title, description, content, and author are required",
        },
        { status: 400 },
      )
    }

    // ADDED: Check for slug uniqueness, excluding the current document
    if (body.slug) {
      const existingNews = await News.findOne({
        slug: body.slug,
        _id: { $ne: id },
      })
      if (existingNews) {
        return NextResponse.json(
          {
            success: false,
            error: "An article with this slug already exists",
          },
          { status: 400 },
        )
      }
    }

    // ADDED: Find and update the news article in the database
    const updatedNews = await News.findByIdAndUpdate(id, body, {
      new: true, // Return the updated document
      runValidators: true, // Run schema validators on update
    })

    if (!updatedNews) {
      return NextResponse.json({ success: false, error: "News not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: updatedNews,
      message: "News updated successfully",
    })
  } catch (error: any) {
    console.error("Error updating news:", error)
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err: any) => err.message)
      return NextResponse.json({ success: false, error: errors.join(", ") }, { status: 400 })
    }
    return NextResponse.json({ success: false, error: "Failed to update news" }, { status: 500 })
  }
}
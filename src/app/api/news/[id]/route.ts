import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/dbConnect"
import News from "@/models/News"

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

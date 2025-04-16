import { type NextRequest, NextResponse } from "next/server"
// import { connectToDatabase } from "@/lib/mongodb"
import { connectDB } from "@/lib/dbConnect"
import { BlogPost } from "@/models/BlogPost"
import { isAuthenticated } from "@/lib/auth"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    await connectDB()
    const post = await BlogPost.findById(id)

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error("Error fetching post:", error)
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const isAdmin = await isAuthenticated(request)
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()
    const data = await request.json()

    // Validate required fields
    if (!data.title || !data.content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 })
    }

    // If slug is being updated, check if it already exists (excluding current post)
    if (data.slug) {
      const existingPost = await BlogPost.findOne({
        slug: data.slug,
        _id: { $ne: id },
      })

      if (existingPost) {
        return NextResponse.json({ error: "A post with this slug already exists" }, { status: 400 })
      }
    }

    const updatedPost = await BlogPost.findByIdAndUpdate(id, { $set: data }, { new: true })

    if (!updatedPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    return NextResponse.json(updatedPost)
  } catch (error) {
    console.error("Error updating post:", error)
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const isAdmin = await isAuthenticated(request)
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()
    const deletedPost = await BlogPost.findByIdAndDelete(id)

    if (!deletedPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Post deleted successfully" })
  } catch (error) {
    console.error("Error deleting post:", error)
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 })
  }
}

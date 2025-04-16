import { type NextRequest, NextResponse } from "next/server";
// import { connectToDatabase } from "@/lib/mongodb";
import { connectDB } from "@/lib/dbConnect";
import { BlogPost } from "@/models/BlogPost";
import { isAuthenticated } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (slug) {
      const post = await BlogPost.findOne({ slug });
      if (!post) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
      }
      return NextResponse.json(post);
    }

    const posts = await BlogPost.find().sort({ createdAt: -1 });
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
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

    // Validate required fields
    if (!data.title || !data.content) {
      return NextResponse.json(
        { error: "Title and content are required" },
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
    const existingPost = await BlogPost.findOne({ slug: data.slug });
    if (existingPost) {
      return NextResponse.json(
        { error: "A post with this slug already exists" },
        { status: 400 }
      );
    }

    const newPost = new BlogPost(data);
    await newPost.save();

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}

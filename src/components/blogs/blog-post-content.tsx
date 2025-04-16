"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar } from "lucide-react"
import { DMSans } from "@/fonts/font"
import { format } from "date-fns"

interface BlogPost {
  _id: string
  title: string
  slug: string
  content: string
  author: string
  createdAt: string
  updatedAt?: string
  featuredImage?: string
  categories: string[]
}

export default function BlogPostContent({ slug }: { slug: string }) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch(`/api/blog/posts?slug=${slug}`)
        if (!response.ok) {
          throw new Error("Failed to fetch post")
        }
        const data = await response.json()
        setPost(data)
      } catch (error) {
        console.error("Error fetching post:", error)
        setError("Failed to load blog post")
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [slug])

  if (loading) {
    return (
      <main className={`${DMSans.className} min-h-screen bg-gray-50 mt-20`}>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
        </div>
      </main>
    )
  }

  if (error || !post) {
    return (
      <main className={`${DMSans.className} min-h-screen bg-gray-50 mt-20`}>
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">{error || "Blog post not found"}</h2>
          <Link href="/blog" className="text-purple-600 hover:text-purple-800 font-medium">
            Return to blog
          </Link>
        </div>
      </main>
    )
  }

  // Function to get category color classes
  const getCategoryColorClasses = (index: number) => {
    // Fixed set of color combinations that work well together
    const colorCombinations = [
      "bg-purple-100 text-purple-700",
      "bg-blue-100 text-blue-700",
      "bg-green-100 text-green-700",
      "bg-indigo-100 text-indigo-700",
      "bg-pink-100 text-pink-700",
      "bg-yellow-100 text-yellow-700",
      "bg-red-100 text-red-700",
      "bg-teal-100 text-teal-700",
    ]

    return colorCombinations[index % colorCombinations.length]
  }

  return (
    <main className={`${DMSans.className} min-h-screen bg-gray-50 mt-20`}>
      <article className="pt-14 max-w-4xl mx-auto px-4 sm:px-6 pb-16">
        <Link
          href="/blog"
          className="inline-flex items-center text-purple-600 hover:text-purple-800 mb-8 transition-colors font-medium"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to blog
        </Link>

        <div className="bg-white rounded-lg overflow-hidden shadow-md">
          {post.featuredImage && (
            <div className="relative h-64 sm:h-80 w-full bg-purple-50 p-4">
              <Image
                src={post.featuredImage || "/placeholder.svg?height=400&width=600&query=blog"}
                alt={post.title}
                fill
                className="object-contain"
                priority
              />
            </div>
          )}

          <div className="p-6 md:p-8">
            <div className="flex flex-wrap justify-between items-center mb-6 border-b border-gray-100 pb-4">
              <div className="text-sm text-gray-600 font-medium">BY: {post.author.toUpperCase()}</div>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-1" />
                {format(new Date(post.createdAt), "dd MMM yyyy")}
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6">{post.title}</h1>

            {/* Enhanced blog content with Tailwind classes */}
            <div className="blog-content prose max-w-none">
              <div
                className="[&>h1]:text-3xl [&>h1]:font-bold [&>h1]:mt-8 [&>h1]:mb-4 [&>h1]:text-gray-800 
                           [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mt-8 [&>h2]:mb-4 [&>h2]:text-gray-800
                           [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:mt-6 [&>h3]:mb-3 [&>h3]:text-gray-800
                           [&>p]:my-4 [&>p]:text-gray-600 [&>p]:leading-relaxed
                           [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:my-4 [&>ul]:text-gray-700
                           [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:my-4 [&>ol]:text-gray-700
                           [&>li]:mb-2 [&>li]:text-gray-700 [&>li>p]:my-1
                           [&>blockquote]:border-l-4 [&>blockquote]:border-gray-300 [&>blockquote]:pl-4 [&>blockquote]:py-2 [&>blockquote]:my-4 [&>blockquote]:italic [&>blockquote]:text-gray-600"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>

            <div className="mt-10 pt-6 border-t border-gray-100">
              <div className="flex flex-wrap gap-2">
                {post.categories.map((category, index) => (
                  <span key={index} className={`text-sm px-3 py-1 rounded-full ${getCategoryColorClasses(index)}`}>
                    {category}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </article>
    </main>
  )
}

"use client"
import { Calendar, Clock, User, ArrowLeft, Sparkles, Tag, Share2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import FooterSection from "@/components/footer/FooterSection"
import Navbar from "@/components/navbar/Navbar"

interface NewsItem {
  _id: string
  title: string
  slug: string
  description: string
  content: string
  featuredImage?: string
  featuredImageAlt?: string
  author: string
  category: string
  tags: string[]
  publishDate: string
  views: number
  metaTitle?: string
  metaDescription?: string
  createdAt: string
  updatedAt: string
}

interface ShareButtonProps {
  title: string
  description: string
  variant?: "icon" | "button"
}

function ShareButton({ title, description, variant = "icon" }: ShareButtonProps) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url: window.location.href,
        })
      } catch (err) {
        console.log("Error sharing:", err)
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  if (variant === "button") {
    return (
      <button
        onClick={handleShare}
        className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
      >
        <Share2 className="w-4 h-4" />
        <span>Share Article</span>
      </button>
    )
  }

  return (
    <button
      onClick={handleShare}
      className="w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
    >
      <Share2 className="w-5 h-5 text-gray-600" />
    </button>
  )
}

function NewsAnimations() {
  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute top-10 sm:top-20 left-4 sm:left-10 w-16 h-16 sm:w-20 sm:h-20 bg-purple-500/20 rounded-full blur-xl"
      />
      <motion.div
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: "1s" }}
        className="absolute top-32 sm:top-40 right-8 sm:right-20 w-24 h-24 sm:w-32 sm:h-32 bg-blue-500/20 rounded-full blur-xl"
      />
      <motion.div
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: "2s" }}
        className="absolute bottom-20 left-1/4 w-20 h-20 sm:w-24 sm:h-24 bg-pink-500/20 rounded-full blur-xl"
      />
    </div>
  )
}

function getReadingTime(content: string) {
  const wordsPerMinute = 200
  const words = content.split(" ").length
  const minutes = Math.ceil(words / wordsPerMinute)
  return `${minutes} min read`
}

export default function NewsDetailPageClient({ news }: { news: NewsItem }) {
  const date = new Date(news.publishDate)
  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
        <Navbar />

        {/* Background Elements - moved to client component for animations */}
        <NewsAnimations />

        <main className="relative z-10 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            {/* Back Button */}
            <div className="mb-8">
              <Link
                href="/news"
                className="inline-flex items-center text-purple-600 hover:text-purple-700 transition-colors group"
              >
                <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to News
              </Link>
            </div>

            {/* Article Content */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Hero Image */}
              <div className="relative w-full h-64 sm:h-80 lg:h-96">
                {news.featuredImage ? (
                  <Image
                    src={news.featuredImage || "/placeholder.svg"}
                    alt={news.featuredImageAlt || news.title}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                    <Sparkles className="w-20 h-20 text-purple-400" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                {/* Category and Share */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                  <span className="px-4 py-2 bg-white/90 backdrop-blur-sm text-purple-800 text-sm font-semibold rounded-full shadow-lg">
                    {news.category}
                  </span>
                  <ShareButton title={news.title} description={news.description} />
                </div>

                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 leading-tight">
                    {news.title}
                  </h1>

                  {/* Tags */}
                  {news.tags && news.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {news.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm"
                        >
                          <Tag className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8 lg:p-12">
                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-6 mb-8 pb-6 border-b border-gray-200">
                  <div className="flex items-center text-gray-600">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center mr-3">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{news.author}</p>
                      <p className="text-xs text-gray-500">Author</p>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center mr-3">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{formattedDate}</p>
                      <p className="text-xs text-gray-500">Published</p>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center mr-3">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{getReadingTime(news.content)}</p>
                      <p className="text-xs text-gray-500">Reading time</p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <p className="text-gray-700 text-lg leading-relaxed bg-gray-50 p-4 rounded-xl border-l-4 border-purple-500">
                    {news.description}
                  </p>
                </div>

                {/* Rich Content */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Full Article</h2>
                  <div className="prose prose-lg max-w-none">
                    <div
                      className="[&>h1]:text-3xl [&>h1]:font-bold [&>h1]:mt-8 [&>h1]:mb-4 [&>h1]:text-gray-800
                              [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mt-8 [&>h2]:mb-4 [&>h2]:text-gray-800
                              [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:mt-6 [&>h3]:mb-3 [&>h3]:text-gray-800
                              [&>p]:my-4 [&>p]:text-gray-600 [&>p]:leading-relaxed
                              [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:my-4 [&>ul]:text-gray-700
                              [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:my-4 [&>ol]:text-gray-700
                              [&>li]:mb-2 [&>li]:text-gray-700 [&>li>p]:my-1
                              [&>blockquote]:border-l-4 [&>blockquote]:border-gray-300 [&>blockquote]:pl-4 [&>blockquote]:py-2 [&>blockquote]:my-4 [&>blockquote]:italic [&>blockquote]:text-gray-600
                              [&>img]:max-w-full [&>img]:rounded-lg [&>img]:my-4 [&>img]:shadow-lg
                              [&>a]:text-purple-600 [&>a]:no-underline [&>a:hover]:text-purple-700 [&>a:hover]:underline
                              [&>code]:bg-gray-100 [&>code]:px-2 [&>code]:py-1 [&>code]:rounded [&>code]:text-sm
                              [&>pre]:bg-gray-100 [&>pre]:p-4 [&>pre]:rounded-lg [&>pre]:overflow-x-auto [&>pre]:my-4"
                      dangerouslySetInnerHTML={{ __html: news.content }}
                    />
                  </div>
                </div>

                {/* All Tags */}
                {news.tags && news.tags.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Tag className="w-5 h-5 mr-2 text-purple-600" />
                      Tags
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {news.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-800 text-sm font-medium rounded-full hover:from-purple-200 hover:to-blue-200 transition-all duration-200 cursor-pointer"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Footer */}
                <div className="pt-6 border-t border-gray-200">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="text-sm text-gray-500">
                      <p>Published on {formattedDate}</p>
                      {news.createdAt !== news.publishDate && (
                        <p className="mt-1">Last updated: {new Date(news.updatedAt).toLocaleDateString()}</p>
                      )}
                    </div>
                    <ShareButton title={news.title} description={news.description} variant="button" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <FooterSection />
      </div>
    </>
  )
}

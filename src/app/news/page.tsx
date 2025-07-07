"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Calendar, User, Clock, Loader2, BookOpen } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar/Navbar"
import FooterSection from "@/components/footer/FooterSection"

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
  createdAt: string
}

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("/api/news/posts")
        const result = await response.json()
        if (result.success) {
          setNews(result.data)
        } else {
          setError("Failed to fetch news")
        }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError("An error occurred while fetching news")
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200
    const words = content.split(" ").length
    const minutes = Math.ceil(words / wordsPerMinute)
    return `${minutes} min read`
  }

  const handleNewsClick = (newsItem: NewsItem) => {
    // Navigate to individual news page using the slug
    router.push(`/news/${newsItem.slug}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }} className="relative">
            <Loader2 className="w-12 h-12 animate-spin text-purple-600 mx-auto mb-4" />
            <div className="absolute inset-0 w-12 h-12 border-4 border-purple-200 rounded-full animate-pulse mx-auto" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600"
          >
            Loading latest news...
          </motion.p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      {/* Header */}
      <Navbar />
      <div className="bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mt-14">
              Our News
            </h1>
          </motion.div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {error ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-12 h-12 text-red-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Error Loading News</h3>
            <p className="text-gray-600">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Try Again
            </button>
          </motion.div>
        ) : news.length === 0 ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-12 h-12 text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No News Available</h3>
            <p className="text-gray-600">Check back later for the latest updates</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {news.map((item, index) => (
              <motion.article
                key={item._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => handleNewsClick(item)}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer transform hover:-translate-y-2"
              >
                {/* Image */}
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  {item.featuredImage ? (
                    <Image
                      src={item.featuredImage || "/placeholder.svg"}
                      alt={item.featuredImageAlt || item.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                      <BookOpen className="w-16 h-16 text-purple-400" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-purple-800 text-xs font-semibold rounded-full shadow-lg">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-purple-700 transition-colors leading-tight">
                    {item.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">{item.description}</p>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <User className="w-3 h-3 mr-1" />
                        <span className="font-medium">{item.author}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        <span>{formatDate(item.publishDate)}</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      <span>{getReadingTime(item.content)}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  {item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {item.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full hover:bg-purple-100 hover:text-purple-700 transition-colors"
                        >
                          #{tag}
                        </span>
                      ))}
                      {item.tags.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{item.tags.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Read More Indicator */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <span className="text-purple-600 text-sm font-medium group-hover:text-purple-700 transition-colors">
                        Read full article
                      </span>
                      <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                        <svg
                          className="w-3 h-3 text-purple-600 transform group-hover:translate-x-0.5 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </main>

      <FooterSection />
    </div>
  )
}

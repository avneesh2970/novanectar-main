"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, MapPin, User, ArrowLeft, Loader2, Sparkles, Tag } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import FooterSection from "@/components/footer/FooterSection"
import Navbar from "@/components/navbar/Navbar"

interface IEventPost {
  _id: string
  title: string
  slug: string
  description: string
  content: string
  eventDate: string
  eventTime: string
  venue: string
  organizer: string
  featuredImage?: string
  featuredImageAlt?: string
  categories: string[]
  metaTitle?: string
  metaDescription?: string
  createdAt: string
  updatedAt: string
  __v?: number
}

export default function EventDetailPage() {
  const [event, setEvent] = useState<IEventPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const params = useParams()
  const slug = params.slug as string

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`/api/event/posts?slug=${slug}`)
        if (!response.ok) {
          throw new Error("Event not found")
        }
        const eventData = await response.json()
        setEvent(eventData)
      } catch (err) {
        console.error("Failed to fetch event:", err)
        setError("Failed to load event. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchEvent()
    }
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }} className="relative">
            <Loader2 className="h-12 w-12 sm:h-16 sm:w-16 animate-spin text-purple-600" />
            <div className="absolute inset-0 h-12 w-12 sm:h-16 sm:w-16 border-4 border-purple-200 rounded-full animate-pulse" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-gray-700 font-medium"
          >
            Loading event details...
          </motion.p>
        </div>
        <FooterSection />
      </div>
    )
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
        <Navbar />
        <div className="max-w-md mx-auto mt-16 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-8 bg-red-50 border border-red-200 rounded-2xl shadow-lg"
          >
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-red-700 mb-4">Event Not Found</h2>
            <p className="text-red-600 leading-relaxed mb-6">
              {error || "The event you're looking for doesn't exist or has been removed."}
            </p>
            <Link
              href="/event"
              className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Events
            </Link>
          </motion.div>
        </div>
        <FooterSection />
      </div>
    )
  }

  const date = new Date(event.eventDate)
  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      <Navbar />

      {/* Enhanced Background Elements */}
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

      <main className="relative z-10 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link
              href="/event"
              className="inline-flex items-center text-purple-600 hover:text-purple-700 transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Events
            </Link>
          </motion.div>

          {/* Event Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Hero Image */}
            <div className="relative w-full h-64 sm:h-80 lg:h-96">
              {event.featuredImage ? (
                <Image
                  src={event.featuredImage || "/placeholder.svg"}
                  alt={event.featuredImageAlt || event.title}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                  <Calendar className="w-20 h-20 text-purple-400" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

              {/* Title Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 leading-tight"
                >
                  {event.title}
                </motion.h1>

                {/* Categories */}
                {event.categories && event.categories.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-wrap gap-2 mt-3"
                  >
                    {event.categories.map((category, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm"
                      >
                        <Tag className="w-3 h-3" />
                        {category}
                      </span>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8 lg:p-12">
              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mb-8"
              >
                <p className="text-gray-600 text-lg leading-relaxed">{event.description}</p>
              </motion.div>

              {/* Event Details Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 mb-8"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1 text-lg">Date</h3>
                    <p className="text-gray-600">{formattedDate}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1 text-lg">Time</h3>
                    <p className="text-gray-600">{event.eventTime}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1 text-lg">Venue</h3>
                    <p className="text-gray-600">{event.venue}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <User className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1 text-lg">Organizer</h3>
                    <p className="text-gray-600">{event.organizer}</p>
                  </div>
                </div>
              </motion.div>

              {/* Rich Content */}
              {event.content && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="border-t border-gray-200 pt-8"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Event Details</h2>
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
                      dangerouslySetInnerHTML={{ __html: event.content }}
                    />
                  </div>
                </motion.div>
              )}

              {/* Action Buttons */}
              {/* <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-8 pt-8 border-t border-gray-200"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="flex-1 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                    Register for Event
                  </button>
                  <button className="flex-1 border border-purple-600 text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
                    Share Event
                  </button>
                </div>
              </motion.div> */}
            </div>
          </motion.div>
        </div>
      </main>

      <FooterSection />
    </div>
  )
}

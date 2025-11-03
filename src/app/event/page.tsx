"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, Sparkles, Loader2, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import FooterSection from "@/components/footer/FooterSection"
import Navbar from "@/components/navbar/Navbar"

interface IEventPost {
  _id: string
  title: string
  slug: string
  description: string
  eventDate: string
  eventTime: string
  venue: string
  organizer: string
  featuredImage?: string
  featuredImageAlt?: string
  createdAt: string
  updatedAt: string
  __v?: number
}

// Enhanced EventCard component with navigation
function EventCard({
  event,
  onClick,
}: {
  event: IEventPost
  onClick: () => void
}) {
  const date = new Date(event.eventDate)
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="group h-full"
    >
      <div
        onClick={onClick}
        className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 h-full flex flex-col group-hover:border-purple-200 cursor-pointer"
      >
        {/* Image Container - Fixed aspect ratio */}
        <div className="relative w-full aspect-[4/3] overflow-hidden">
          {event.featuredImage ? (
            <Image
              src={event.featuredImage || "/placeholder.svg"}
              alt={event.featuredImageAlt || event.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
              <Calendar className="w-16 h-16 text-purple-400" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content Container - Flexible height */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Title and Description - Fixed space */}
          <div className="flex-1 min-h-0">
            <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-purple-700 transition-colors duration-200">
              {event.title}
            </h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">{event.description}</p>
          </div>

          {/* Event Details - Fixed at bottom */}
          <div className="space-y-3 text-gray-700 text-sm mt-auto">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3 flex-shrink-0">
                <Calendar className="w-4 h-4 text-purple-600" />
              </div>
              <span className="font-medium">{formattedDate}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Pagination Component
function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}) {
  if (totalPages <= 1) return null

  const getVisiblePages = () => {
    const delta = 2
    const range = []
    const rangeWithDots = []

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...")
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages)
    } else {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }

  return (
    <div className="flex items-center justify-center space-x-2 mt-12">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {getVisiblePages().map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === "number" && onPageChange(page)}
          disabled={page === "..."}
          className={`px-4 py-2 rounded-lg transition-colors ${
            page === currentPage
              ? "bg-purple-600 text-white"
              : page === "..."
                ? "cursor-default"
                : "border border-gray-300 hover:bg-gray-50"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  )
}

export default function EventPage() {
  const [allEvents, setAllEvents] = useState<IEventPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  // const [filter, setFilter] = useState<FilterType>("upcoming")
  const [currentPage, setCurrentPage] = useState(1)
  const eventsPerPage = 6
  const router = useRouter()

  // const filteredEvents = getFilteredEvents()
  const totalPages = Math.ceil(allEvents.length / eventsPerPage)
  const startIndex = (currentPage - 1) * eventsPerPage
  const paginatedEvents = allEvents.slice(startIndex, startIndex + eventsPerPage)

  const handleEventClick = (event: IEventPost) => {
    // Navigate to individual event page using the slug
    router.push(`/event/${event.slug}`)
  }

  // const handleFilterChange = (newFilter: FilterType) => {
  //   setFilter(newFilter)
  //   setCurrentPage(1) // Reset to first page when filter changes
  // }

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/event/posts")
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const result = await response.json()
        console.log("result: ", result)

        // Handle different API response structures
        let eventsData: IEventPost[] = []

        if (Array.isArray(result)) {
          eventsData = result
        } else if (result && Array.isArray(result.events)) {
          eventsData = result.events
        } else if (result && result._id) {
          eventsData = [result]
        } else {
          eventsData = []
        }

        const eventsWithKeys = eventsData.map((event, index) => ({
          ...event,
          _id: event._id || `event-${index}`,
        }))

        // Sort events by date (upcoming first, then past in reverse chronological order)
        const sortedEvents = eventsWithKeys.sort((a, b) => {
          const dateA = new Date(`${a.eventDate.split("T")[0]}T${a.eventTime}`)
          const dateB = new Date(`${b.eventDate.split("T")[0]}T${b.eventTime}`)
          const now = new Date()

          const aIsUpcoming = dateA > now
          const bIsUpcoming = dateB > now

          if (aIsUpcoming && !bIsUpcoming) return -1
          if (!aIsUpcoming && bIsUpcoming) return 1

          if (aIsUpcoming && bIsUpcoming) {
            return dateA.getTime() - dateB.getTime() // Upcoming: earliest first
          } else {
            return dateB.getTime() - dateA.getTime() // Past: latest first
          }
        })

        setAllEvents(sortedEvents)
      } catch (err) {
        console.error("Failed to fetch events:", err)
        setError("Failed to load events. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

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
        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: "3s" }}
          className="absolute top-1/2 right-1/4 w-18 h-18 sm:w-28 sm:h-28 bg-indigo-500/15 rounded-full blur-xl"
        />
      </div>

      <main className="relative z-10 pb-16">
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <Loader2 className="h-12 w-12 sm:h-16 sm:w-16 animate-spin text-purple-600" />
              <div className="absolute inset-0 h-12 w-12 sm:h-16 sm:w-16 border-4 border-purple-200 rounded-full animate-pulse" />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-lg sm:text-xl text-gray-700 font-medium"
            >
              Loading amazing events...
            </motion.p>
          </div>
        ) : error ? (
          <div className="max-w-md mx-auto mt-16 px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center p-8 bg-red-50 border border-red-200 rounded-2xl shadow-lg"
            >
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-red-500" />
              </div>
              <h2 className="text-2xl font-bold text-red-700 mb-4">Oops!</h2>
              <p className="text-red-600 leading-relaxed">{error}</p>
            </motion.div>
          </div>
        ) : allEvents.length === 0 ? (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16 sm:py-24">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg"
            >
              <Calendar className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-3xl sm:text-4xl md:text-6xl lg:text-6xl font-bold text-gray-900 mb-6"
            >
              No Events Yet
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-xl sm:text-2xl md:text-4xl font-semibold mb-8"
            >
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Something Amazing is Coming
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="text-lg sm:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              We&apos;re curating incredible events just for you. Stay tuned for updates and be the first to know!
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8"
            >
              <motion.div whileHover={{ y: -5, scale: 1.05 }} className="flex flex-col items-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center mb-3 shadow-lg">
                  <Calendar className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <p className="text-gray-700 font-semibold">Events</p>
              </motion.div>

              <motion.div whileHover={{ y: -5, scale: 1.05 }} className="flex flex-col items-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center mb-3 shadow-lg">
                  <Clock className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <p className="text-gray-700 font-semibold">Soon</p>
              </motion.div>

              <motion.div whileHover={{ y: -5, scale: 1.05 }} className="flex flex-col items-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full flex items-center justify-center mb-3 shadow-lg">
                  <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <p className="text-gray-700 font-semibold">Exciting</p>
              </motion.div>
            </motion.div>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8 sm:mb-12"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 mt-8">
                Our Events
              </h1>
            </motion.div>

            {/* Events Grid */}
            {allEvents.length === 0 ? (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calendar className="w-10 h-10 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No event found</h3>
              </motion.div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 auto-rows-fr">
                  {paginatedEvents.map((event, index) => (
                    <motion.div
                      key={event._id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="h-full"
                    >
                      <EventCard event={event} onClick={() => handleEventClick(event)} />
                    </motion.div>
                  ))}
                </div>

                {/* Pagination */}
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
              </>
            )}
          </div>
        )}
      </main>

      <FooterSection />
    </div>
  )
}

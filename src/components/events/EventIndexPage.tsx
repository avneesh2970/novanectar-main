"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import FooterSection from "@/components/footer/FooterSection";
import Navbar from "@/components/navbar/Navbar";
import type { EventRecord } from "@/lib/content";

function EventCard({ event }: { event: EventRecord }) {
  const date = new Date(event.eventDate);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="group h-full"
    >
      <Link
        href={`/event/${event.slug}`}
        className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 h-full flex flex-col group-hover:border-purple-200"
      >
        <div className="relative w-full aspect-[4/3] overflow-hidden">
          {event.featuredImage ? (
            <Image
              src={event.featuredImage}
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

        <div className="p-6 flex-1 flex flex-col">
          <div className="flex-1 min-h-0">
            <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-purple-700 transition-colors duration-200">
              {event.title}
            </h2>
            <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
              {event.description}
            </p>
          </div>

          <div className="space-y-3 text-gray-700 text-sm mt-auto">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3 flex-shrink-0">
                <Calendar className="w-4 h-4 text-purple-600" />
              </div>
              <span className="font-medium">{formattedDate}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

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
  );
}

export default function EventIndexPage({ items }: { items: EventRecord[] }) {
  const [events, setEvents] = useState(items);
  const [isRefreshing, setIsRefreshing] = useState(items.length === 0);

  useEffect(() => {
    if (items.length > 0) return;

    let isMounted = true;

    async function hydrateEvents() {
      try {
        const response = await fetch("/api/event/posts", { cache: "no-store" });
        if (!response.ok) return;

        const data = (await response.json()) as EventRecord[];
        if (isMounted) {
          setEvents(data);
        }
      } catch (error) {
        console.error("Failed to refresh events on the client:", error);
      } finally {
        if (isMounted) {
          setIsRefreshing(false);
        }
      }
    }

    void hydrateEvents();

    return () => {
      isMounted = false;
    };
  }, [items.length]);

  const sortedEvents = [...events].sort((a, b) => {
    const dateA = new Date(`${a.eventDate.split("T")[0]}T${a.eventTime}`);
    const dateB = new Date(`${b.eventDate.split("T")[0]}T${b.eventTime}`);
    const now = new Date();

    const aIsUpcoming = dateA > now;
    const bIsUpcoming = dateB > now;

    if (aIsUpcoming && !bIsUpcoming) return -1;
    if (!aIsUpcoming && bIsUpcoming) return 1;

    if (aIsUpcoming && bIsUpcoming) {
      return dateA.getTime() - dateB.getTime();
    }

    return dateB.getTime() - dateA.getTime();
  });

  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 6;
  const totalPages = Math.ceil(sortedEvents.length / eventsPerPage);
  const startIndex = (currentPage - 1) * eventsPerPage;
  const paginatedEvents = sortedEvents.slice(startIndex, startIndex + eventsPerPage);

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      <Navbar />

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
        {isRefreshing ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600" />
          </div>
        ) : sortedEvents.length === 0 ? (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16 sm:py-24">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg"
            >
              <Calendar className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
            </motion.div>

            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-6xl font-bold text-gray-900 mb-6">
              No Events Yet
            </h1>
            <h2 className="text-xl sm:text-2xl md:text-4xl font-semibold mb-8">
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Something Amazing is Coming
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              We&apos;re curating incredible events just for you. Stay tuned for
              updates and be the first to know.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center mb-3 shadow-lg">
                  <Calendar className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <p className="text-gray-700 font-semibold">Events</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center mb-3 shadow-lg">
                  <Clock className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <p className="text-gray-700 font-semibold">Soon</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full flex items-center justify-center mb-3 shadow-lg">
                  <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <p className="text-gray-700 font-semibold">Exciting</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
            <div className="text-center mb-8 sm:mb-12">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 mt-8">
                Our Events
              </h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 auto-rows-fr">
              {paginatedEvents.map((event) => (
                <div key={event._id} className="h-full">
                  <EventCard event={event} />
                </div>
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </main>

      <FooterSection />
    </div>
  );
}

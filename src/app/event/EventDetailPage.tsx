"use client";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, User, ArrowLeft, Sparkles, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import FooterSection from "@/components/footer/FooterSection";
import Navbar from "@/components/navbar/Navbar";

interface IEventPost {
  _id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  eventDate: string;
  eventTime: string;
  venue: string;
  organizer: string;
  featuredImage?: string;
  featuredImageAlt?: string;
  categories: string[];
  metaTitle?: string;
  metaDescription?: string;
  createdAt: string;
  updatedAt: string;
}

export default function EventDetailPage({ event }: { event: IEventPost }) {
  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
        <Navbar />
        <div className="max-w-md mx-auto mt-16 px-4">
          <div className="text-center p-8 bg-red-50 border border-red-200 rounded-2xl shadow-lg">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-red-700 mb-4">Event Not Found</h2>
            <p className="text-red-600 leading-relaxed mb-6">
              The event you’re looking for doesn’t exist or has been removed.
            </p>
            <Link
              href="/event"
              className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Events
            </Link>
          </div>
        </div>
        <FooterSection />
      </div>
    );
  }

  const date = new Date(event.eventDate);
  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      <Navbar />

      {/* Background Animation */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-20 left-10 w-20 h-20 bg-purple-500/20 rounded-full blur-xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: "1s" }}
          className="absolute bottom-20 right-20 w-32 h-32 bg-blue-500/20 rounded-full blur-xl"
        />
      </div>

      {/* Main Content */}
      <main className="relative z-10 pb-16">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <Link
            href="/event"
            className="inline-flex items-center text-purple-600 hover:text-purple-700 transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Events
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Hero */}
            <div className="relative w-full h-80">
              {event.featuredImage ? (
                <Image
                  src={event.featuredImage}
                  alt={event.featuredImageAlt || event.title}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100">
                  <Calendar className="w-20 h-20 text-purple-400" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h1 className="text-3xl font-bold">{event.title}</h1>
                {event.categories?.length > 0 && (
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {event.categories.map((cat, i) => (
                      <span key={i} className="bg-white/20 px-3 py-1 rounded-full text-sm">
                        <Tag className="w-3 h-3 inline mr-1" />
                        {cat}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Details */}
            <div className="p-8">
              <p className="text-gray-700 mb-6">{event.description}</p>

              <div className="grid sm:grid-cols-2 gap-6">
                <Detail icon={Calendar} label="Date" value={formattedDate} />
                <Detail icon={Clock} label="Time" value={event.eventTime} />
                <Detail icon={MapPin} label="Venue" value={event.venue} />
                <Detail icon={User} label="Organizer" value={event.organizer} />
              </div>

              {event.content && (
                <div
                  className="prose mt-8"
                  dangerouslySetInnerHTML={{ __html: event.content }}
                />
              )}
            </div>
          </motion.div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}

function Detail({ icon: Icon, label, value }: any) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-12 h-12 bg-purple-100 flex items-center justify-center rounded-xl">
        <Icon className="w-6 h-6 text-purple-600" />
      </div>
      <div>
        <h3 className="font-semibold text-gray-900">{label}</h3>
        <p className="text-gray-600">{value}</p>
      </div>
    </div>
  );
}

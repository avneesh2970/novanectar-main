"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, User, Clock, BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navbar/Navbar";
import FooterSection from "@/components/footer/FooterSection";
import type { NewsRecord } from "@/lib/content";

function getReadingTime(content: string) {
  const wordsPerMinute = 200;
  const words = content.split(" ").length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

export default function NewsIndexPage({ items }: { items: NewsRecord[] }) {
  const [newsItems, setNewsItems] = useState(items);
  const [isRefreshing, setIsRefreshing] = useState(items.length === 0);

  useEffect(() => {
    if (items.length > 0) return;

    let isMounted = true;

    async function hydrateNews() {
      try {
        const response = await fetch("/api/news/posts", { cache: "no-store" });
        if (!response.ok) return;

        const result = await response.json();
        if (isMounted && result.success) {
          setNewsItems(result.data as NewsRecord[]);
        }
      } catch (error) {
        console.error("Failed to refresh news items on the client:", error);
      } finally {
        if (isMounted) {
          setIsRefreshing(false);
        }
      }
    }

    void hydrateNews();

    return () => {
      isMounted = false;
    };
  }, [items.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      <Navbar />
      <div className="bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mt-14">
              Our News
            </h1>
          </motion.div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isRefreshing ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600" />
          </div>
        ) : newsItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-12 h-12 text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              No News Available
            </h2>
            <p className="text-gray-600">Check back later for the latest updates.</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {newsItems.map((item, index) => (
              <motion.article
                key={item._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group transform hover:-translate-y-2"
              >
                <Link href={`/news/${item.slug}`} className="block h-full">
                  <div className="relative h-48 sm:h-56 overflow-hidden">
                    {item.featuredImage ? (
                      <Image
                        src={item.featuredImage}
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

                  <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-purple-700 transition-colors leading-tight">
                      {item.title}
                    </h2>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <User className="w-3 h-3 mr-1" />
                          <span className="font-medium">{item.author}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          <span>
                            {new Date(item.publishDate).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        <span>{getReadingTime(item.content)}</span>
                      </div>
                    </div>

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

                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <span className="text-purple-600 text-sm font-medium group-hover:text-purple-700 transition-colors">
                        Read full article
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}
      </main>

      <FooterSection />
    </div>
  );
}

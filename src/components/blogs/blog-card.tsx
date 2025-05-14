"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface BlogCardProps {
  post: any;
  index: number;
}

export default function BlogCard({ post, index }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <Link href={`/blog/${post.slug}`} className="block h-full">
        <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={post.image || "/placeholder.svg"}
                alt={post.featuredImageAlt || post.title || "Blog post featured image"}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <div className="p-5 flex flex-col flex-grow">
            <div className="text-sm text-gray-500 mb-2">
                {post.author} • {post.date || new Date(post.createdAt).toLocaleDateString()}
            </div>

            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold text-gray-900 pr-4 group-hover:text-purple-600 transition-colors duration-200">
                {post.title}
              </h3>
              <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-purple-600 transition-colors duration-200 flex-shrink-0" />
            </div>

            <p className="text-gray-600 text-sm mb-4 flex-grow">
              {post.excerpt}
            </p>

            <div className="flex flex-wrap gap-2 mt-auto">
              {post.categories.map((category: any) => (
                <span
                  key={category}
                  className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

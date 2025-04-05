"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import BlogCard from "./blog-card"


interface BlogGridProps {
  posts: any
}

export default function BlogGrid({ posts }: BlogGridProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 max-w-7xl mx-auto pb-16"
    >
      {posts.map((post:any, index:any) => (
        <BlogCard key={post.id} post={post} index={index} />
      ))}
    </motion.div>
  )
}


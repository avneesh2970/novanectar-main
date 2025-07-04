/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Upload, Save, X, Loader2 } from "lucide-react"
import Image from "next/image"

interface NewsFormData {
  title: string
  content: string
  excerpt: string
  featuredImage: string
  featuredImageAlt: string
  author: string
  category: string
  tags: string
  publishDate: string
}

const categories = ["Technology", "Business", "Sports", "Entertainment", "Health", "Politics", "Other"]

export default function NewsUploadPage() {
  const [formData, setFormData] = useState<NewsFormData>({
    title: "",
    content: "",
    excerpt: "",
    featuredImage: "",
    featuredImageAlt: "",
    author: "",
    category: "Other",
    tags: "",
    publishDate: new Date().toISOString().split("T")[0],
  })

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")
  const [imageError, setImageError] = useState(false)

  // Function to validate if URL is a valid image URL
  const isValidImageUrl = (url: string): boolean => {
    if (!url) return false

    // Check if it's a valid URL format
    try {
      new URL(url)
    } catch {
      return false
    }

    // Check if URL starts with http/https
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      return false
    }

    // Check if URL has a reasonable length (not just "h" or "ht")
    if (url.length < 10) {
      return false
    }

    return true
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Update image preview when featuredImage URL changes
    if (name === "featuredImage") {
      setImageError(false)

      // Only set preview if it's a valid URL
      if (isValidImageUrl(value)) {
        setImagePreview(value)
      } else {
        setImagePreview("")
      }
    }
  }

  const handleImageError = () => {
    setImageError(true)
    setImagePreview("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      // Convert tags string to array
      const tagsArray = formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0)

      const submitData = {
        ...formData,
        tags: tagsArray,
        publishDate: new Date(formData.publishDate),
      }

      const response = await fetch("/api/news/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      })

      const result = await response.json()

      if (result.success) {
        setMessage({ type: "success", text: "News created successfully!" })
        // Reset form
        setFormData({
          title: "",
          content: "",
          excerpt: "",
          featuredImage: "",
          featuredImageAlt: "",
          author: "",
          category: "Other",
          tags: "",
          publishDate: new Date().toISOString().split("T")[0],
        })
        setImagePreview("")
        setImageError(false)
      } else {
        setMessage({ type: "error", text: result.error || "Failed to create news" })
      }
    } catch (error) {
      setMessage({ type: "error", text: "An error occurred while creating news" })
    } finally {
      setLoading(false)
    }
  }

  const clearForm = () => {
    setFormData({
      title: "",
      content: "",
      excerpt: "",
      featuredImage: "",
      featuredImageAlt: "",
      author: "",
      category: "Other",
      tags: "",
      publishDate: new Date().toISOString().split("T")[0],
    })
    setImagePreview("")
    setImageError(false)
    setMessage(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 py-8 text-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Upload className="w-8 h-8 text-white" />
                <h1 className="text-2xl sm:text-3xl font-bold text-white">Upload News</h1>
              </div>
              <button onClick={clearForm} className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Message */}
            {message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-lg ${
                  message.type === "success"
                    ? "bg-green-50 text-green-800 border border-green-200"
                    : "bg-red-50 text-red-800 border border-red-200"
                }`}
              >
                {message.text}
              </motion.div>
            )}

            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Enter news title..."
              />
            </div>

            {/* Author & Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Author *</label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Author name..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Featured Image */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Featured Image URL</label>
              <input
                type="url"
                name="featuredImage"
                value={formData.featuredImage}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="https://example.com/image.jpg"
              />

              {/* URL Validation Message */}
              {formData.featuredImage && !isValidImageUrl(formData.featuredImage) && (
                <p className="text-xs text-amber-600 mt-1">
                  Please enter a complete URL starting with http:// or https://
                </p>
              )}

              {/* Image Error Message */}
              {imageError && formData.featuredImage && (
                <p className="text-xs text-red-600 mt-1">Failed to load image. Please check the URL.</p>
              )}

              {/* Image Preview */}
              {imagePreview && !imageError && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
                  <div className="relative w-full h-48 rounded-lg overflow-hidden border border-gray-200">
                    <Image
                      src={imagePreview || "/placeholder.svg"}
                      alt="Preview"
                      fill
                      className="object-cover"
                      onError={handleImageError}
                      onLoad={() => setImageError(false)}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Image Alt Text */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Image Alt Text</label>
              <input
                type="text"
                name="featuredImageAlt"
                value={formData.featuredImageAlt}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Describe the image..."
              />
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Excerpt</label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                placeholder="Brief description of the news..."
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Content *</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                required
                rows={10}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                placeholder="Write your news content here..."
              />
            </div>

            {/* Tags & Publish Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Tags</label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="tag1, tag2, tag3..."
                />
                <p className="text-xs text-gray-500 mt-1">Separate tags with commas</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Publish Date *</label>
                <input
                  type="date"
                  name="publishDate"
                  value={formData.publishDate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-6">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Publishing...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    <span>Publish News</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

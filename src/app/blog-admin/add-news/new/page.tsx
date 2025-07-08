"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import { useState, useRef } from "react"
import Link from "next/link"
import { ArrowLeft, Save, ImageIcon, X, Loader2, Hash, Search } from "lucide-react"
import { toast } from "react-hot-toast"
import Image from "next/image"
import BlogEditor from "@/components/blogs/blog-editor"// Adjust path as needed
import { useEffect } from "react"

const categories = ["Technology", "Business", "Sports", "Entertainment", "Health", "Politics", "Other"]

export default function AddNews() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [description, setDescription] = useState("")
  const [content, setContent] = useState("")
  const [author, setAuthor] = useState("Novanectar")
  const [category, setCategory] = useState("Other")
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [publishDate, setPublishDate] = useState(new Date().toISOString().split("T")[0])
  const [metaTitle, setMetaTitle] = useState("")
  const [metaDescription, setMetaDescription] = useState("")
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState("")
  const [imageAlt, setImageAlt] = useState("")
  const [saving, setSaving] = useState(false)
  const [showSeoSection, setShowSeoSection] = useState(false)
  const [autoSlug, setAutoSlug] = useState(true)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Add authentication check
  useEffect(() => {
    const checkAuth = () => {
      // Check if user is logged in via cookie
      const isLoggedIn = document.cookie.includes("blogLoggedInClient=true")

      if (!isLoggedIn) {
        router.push("/blog-admin")
        return
      }

      setIsAuthenticated(true)
      setIsLoading(false)
    }

    checkAuth()
  }, [router])

  // Auto-generate slug from title (only for auto-generation)
  const generateSlugFromTitle = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/gi, "") // Allow hyphens in the regex
      .replace(/\s+/g, "-")
      .substring(0, 50)
  }

  // Validate and clean manual slug input (preserve hyphens)
  const cleanSlugInput = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w-]/gi, "") // Only allow word characters and hyphens
      .replace(/--+/g, "-") // Replace multiple consecutive hyphens with single hyphen
      .replace(/^-+|-+$/g, "") // Remove hyphens from start and end
      .substring(0, 50)
  }

  // Handle title change and auto-generate slug
  const handleTitleChange = (value: string) => {
    setTitle(value)
    if (autoSlug) {
      setSlug(generateSlugFromTitle(value))
    }
    // Auto-generate meta title if empty
    if (!metaTitle) {
      setMetaTitle(value)
    }
  }

  // Handle manual slug change
  const handleSlugChange = (value: string) => {
    setSlug(cleanSlugInput(value))
    setAutoSlug(false)
  }

  // Add tag
  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  // Remove tag
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const uploadImageToCloudinary = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "")
      formData.append("cloud_name", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "")

      const xhr = new XMLHttpRequest()
      xhr.onload = () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText)
          resolve(response.secure_url)
        } else {
          reject(new Error("Upload failed"))
        }
      }
      xhr.onerror = () => reject(new Error("Upload failed"))
      xhr.open("POST", `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`)
      xhr.send(formData)
    })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size exceeds 5MB limit")
        return
      }
      setImage(file)
      setImagePreview(URL.createObjectURL(file))
      // Auto-generate alt text from title if empty
      if (!imageAlt && title) {
        setImageAlt(title)
      }
    }
  }

  const removeImage = () => {
    setImage(null)
    setImagePreview("")
    setImageAlt("")
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!title.trim()) {
      toast.error("News title is required")
      return
    }
    if (!slug.trim()) {
      toast.error("News slug is required")
      return
    }
    if (!description.trim()) {
      toast.error("News description is required")
      return
    }
    if (!content.trim()) {
      toast.error("News content is required")
      return
    }
    if (!author.trim()) {
      toast.error("Author is required")
      return
    }
    if (image && !imageAlt.trim()) {
      toast.error("Image alt text is required for accessibility")
      return
    }

    setSaving(true)

    try {
      let imageUrl = ""
      if (image) {
        imageUrl = await uploadImageToCloudinary(image)
      }

      const newsData = {
        title: title.trim(),
        slug: slug.trim(),
        description: description.trim(),
        content: content.trim(),
        author: author.trim(),
        category,
        tags,
        publishDate: new Date(publishDate),
        featuredImage: imageUrl,
        featuredImageAlt: imageAlt.trim(),
        metaTitle: metaTitle.trim() || title.trim(),
        metaDescription: metaDescription.trim() || description.trim(),
      }

      const response = await fetch("/api/news/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newsData),
      })

      const result = await response.json()

      if (result.success) {
        toast.success("News created successfully!")
        router.push("/blog-admin/add-news")
      } else {
        throw new Error(result.error || "Failed to create news")
      }
    } catch (error: any) {
      console.error(error)
      toast.error(error.message || "Failed to create news")
    } finally {
      setSaving(false)
    }
  }

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    )
  }

  // Don't render anything if not authenticated (will redirect)
  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      <header className="bg-white border-b shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/blog-admin/add-news" className="text-purple-600 hover:text-purple-800 mr-4">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-800">Create New News Article</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowSeoSection(!showSeoSection)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                showSeoSection ? "bg-purple-100 text-purple-700" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Search className="h-4 w-4" />
              SEO Settings
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Title & Slug */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Article Details</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Article Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="Enter article title..."
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Hash className="inline h-4 w-4 mr-1" />
                      URL Slug <span className="text-red-500">*</span>
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        /news/
                      </span>
                      <input
                        type="text"
                        value={slug}
                        onChange={(e) => handleSlugChange(e.target.value)}
                        placeholder="article-slug"
                        required
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      This will be the URL for your article page. Use lowercase letters, numbers, and hyphens only.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Short Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Brief description for article cards and previews..."
                      required
                      rows={3}
                      maxLength={300}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors resize-none"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      {description.length}/300 characters - This appears on article cards and search results
                    </p>
                  </div>
                </div>
              </div>

              {/* Rich Text Content */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Article Content <span className="text-red-500">*</span>
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                  Create detailed content for your article with rich formatting, images, and more.
                </p>
                <div className="border border-gray-300 rounded-lg overflow-hidden">
                  <BlogEditor content={content} onChange={setContent} />
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Article Information */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Article Information</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Author <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="Author name"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Publish Date</label>
                    <input
                      type="date"
                      value={publishDate}
                      onChange={(e) => setPublishDate(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Featured Image */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Featured Image</h2>

                {imagePreview ? (
                  <div className="space-y-4">
                    <div className="relative">
                      <Image
                        src={imagePreview || "/placeholder.svg"}
                        alt="Article preview"
                        width={400}
                        height={200}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Alt Text <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={imageAlt}
                        onChange={(e) => setImageAlt(e.target.value)}
                        placeholder="Describe the image for accessibility"
                        required={!!image}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                      />
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-purple-400 transition-colors"
                  >
                    <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600 font-medium mb-1">Click to upload image</p>
                    <p className="text-gray-500 text-sm">PNG, JPG, WebP up to 5MB</p>
                  </div>
                )}

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>

              {/* Tags */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Tags</h2>

                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Add tag"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                    />
                    <button
                      type="button"
                      onClick={addTag}
                      className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm font-medium"
                    >
                      Add
                    </button>
                  </div>

                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="text-purple-500 hover:text-purple-700"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* SEO Section */}
          {showSeoSection && (
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">SEO Settings</h2>
              <p className="text-sm text-gray-600 mb-6">
                Optimize your article for search engines and social media sharing.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Meta Title</label>
                  <input
                    type="text"
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    placeholder="SEO title for search results"
                    maxLength={60}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    {metaTitle.length}/60 characters - Appears in search results
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
                  <textarea
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    placeholder="Brief description for search results"
                    maxLength={160}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    {metaDescription.length}/160 characters - Appears in search results
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end bg-white rounded-lg shadow-sm border p-6">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-purple-400 disabled:cursor-not-allowed font-medium transition-colors"
            >
              {saving ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Creating Article...</span>
                </>
              ) : (
                <>
                  <Save className="h-5 w-5" />
                  <span>Create Article</span>
                </>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}

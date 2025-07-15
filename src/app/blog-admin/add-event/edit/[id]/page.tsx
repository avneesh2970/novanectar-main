"use client"

// MODIFIED: Added useParams to get the event ID from the URL
import { useParams, useRouter } from "next/navigation"
import type React from "react"
import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Save, ImageIcon, X, Loader2, Hash, Search } from "lucide-react"
import { toast } from "react-hot-toast"
import Image from "next/image"
import BlogEditor from "@/components/blogs/blog-editor"

// NEW: Component for editing an existing event
export default function EditEvent() {
  const router = useRouter()
  // NEW: Get the event ID from the URL parameters
  const params = useParams()
  const id = params.id as string

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  // MODIFIED: Combined loading states
  const [isLoading, setIsLoading] = useState(true)

  // Form state variables
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [description, setDescription] = useState("")
  const [content, setContent] = useState("")
  const [eventDate, setEventDate] = useState("")
  const [eventTime, setEventTime] = useState("")
  const [venue, setVenue] = useState("")
  const [organizer, setOrganizer] = useState("Novanectar")
  const [categories, setCategories] = useState<string[]>([])
  const [newCategory, setNewCategory] = useState("")
  const [metaTitle, setMetaTitle] = useState("")
  const [metaDescription, setMetaDescription] = useState("")
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState("")
  const [imageAlt, setImageAlt] = useState("")
  const [saving, setSaving] = useState(false)
  const [showSeoSection, setShowSeoSection] = useState(false)
  const [autoSlug, setAutoSlug] = useState(true)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Authentication check
  useEffect(() => {
    const isLoggedIn = document.cookie.includes("blogLoggedInClient=true")
    if (!isLoggedIn) {
      router.push("/blog-admin")
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  // NEW: useEffect to fetch existing event data
  useEffect(() => {
    if (!id || !isAuthenticated) return

    const fetchEventData = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`/api/event/posts/${id}`)
        if (!response.ok) {
          throw new Error("Failed to fetch event data")
        }
        const data = await response.json()

        // Populate form fields with fetched data
        setTitle(data.title || "")
        setSlug(data.slug || "")
        setDescription(data.description || "")
        setContent(data.content || "")
        // Format date to YYYY-MM-DD for the input field
        setEventDate(data.eventDate ? new Date(data.eventDate).toISOString().split("T")[0] : "")
        setEventTime(data.eventTime || "")
        setVenue(data.venue || "")
        setOrganizer(data.organizer || "Novanectar")
        setCategories(data.categories || [])
        setImagePreview(data.featuredImage || "")
        setImageAlt(data.featuredImageAlt || "")
        setMetaTitle(data.metaTitle || "")
        setMetaDescription(data.metaDescription || "")
        setAutoSlug(false) // Disable auto-slug on edit
      } catch (error) {
        console.error(error)
        toast.error("Could not load event data.")
        router.push("/blog-admin/add-event")
      } finally {
        setIsLoading(false)
      }
    }

    fetchEventData()
  }, [id, router, isAuthenticated])

  // Loading state for both auth check and data fetching
  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    )
  }

  // Helper functions (unchanged from your add-event page)
  const generateSlugFromTitle = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/gi, "")
      .replace(/\s+/g, "-")
      .substring(0, 50)
  }

  const cleanSlugInput = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w-]/gi, "")
      .replace(/--+/g, "-")
      .replace(/^-+|-+$/g, "")
      .substring(0, 50)
  }

  const handleTitleChange = (value: string) => {
    setTitle(value)
    if (autoSlug) {
      setSlug(generateSlugFromTitle(value))
    }
    if (!metaTitle) {
      setMetaTitle(value)
    }
  }

  const handleSlugChange = (value: string) => {
    setSlug(cleanSlugInput(value))
    setAutoSlug(false)
  }

  const addCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      setCategories([...categories, newCategory.trim()])
      setNewCategory("")
    }
  }

  const removeCategory = (categoryToRemove: string) => {
    setCategories(categories.filter((cat) => cat !== categoryToRemove))
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

  // MODIFIED: handleSubmit to update the event
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation (same as add-event)
    if (
      !title.trim() ||
      !slug.trim() ||
      !description.trim() ||
      !content.trim() ||
      !eventDate.trim() ||
      !eventTime.trim() ||
      !venue.trim()
    ) {
      toast.error("Please fill all required fields.")
      return
    }
    if (imagePreview && !imageAlt.trim()) {
      toast.error("Image alt text is required for accessibility.")
      return
    }

    setSaving(true)

    try {
      let imageUrl = imagePreview
      // If a new file is selected, upload it. Otherwise, keep the existing URL.
      if (image) {
        imageUrl = await uploadImageToCloudinary(image)
      }

      const eventData = {
        title: title.trim(),
        slug: slug.trim(),
        description: description.trim(),
        content: content.trim(),
        eventDate,
        eventTime,
        venue: venue.trim(),
        organizer: organizer.trim(),
        categories,
        featuredImage: imageUrl,
        featuredImageAlt: imageAlt.trim(),
        metaTitle: metaTitle.trim() || title.trim(),
        metaDescription: metaDescription.trim() || description.trim(),
      }

      // MODIFIED: Use PUT method to update the event at its specific API endpoint
      const response = await fetch(`/api/event/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to update event")
      }

      toast.success("Event updated successfully!")
      router.push("/blog-admin/add-event")
    } catch (error: any) {
      console.error(error)
      toast.error(error.message || "Failed to update event")
    } finally {
      setSaving(false)
    }
  }

  // The JSX is mostly the same as your add-event page, with updated text.
  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      <header className="bg-white border-b shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/blog-admin/add-event" className="text-purple-600 hover:text-purple-800 mr-4">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            {/* MODIFIED: Title changed to "Edit Event" */}
            <h1 className="text-2xl font-bold text-gray-800">Edit Event</h1>
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
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Event Details</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Event Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="Enter event title..."
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
                        /events/
                      </span>
                      <input
                        type="text"
                        value={slug}
                        onChange={(e) => handleSlugChange(e.target.value)}
                        placeholder="event-slug"
                        required
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Short Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Brief description for event cards and previews..."
                      required
                      rows={3}
                      maxLength={200}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors resize-none"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Event Content <span className="text-red-500">*</span>
                </h2>
                <div className="border border-gray-300 rounded-lg overflow-hidden">
                  <BlogEditor content={content} onChange={setContent} />
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Event Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Event Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Event Time <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="time"
                      value={eventTime}
                      onChange={(e) => setEventTime(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Venue <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={venue}
                      onChange={(e) => setVenue(e.target.value)}
                      placeholder="Event venue or location"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Organizer</label>
                    <input
                      type="text"
                      value={organizer}
                      onChange={(e) => setOrganizer(e.target.value)}
                      placeholder="Event organizer"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Featured Image</h2>
                {imagePreview ? (
                  <div className="space-y-4">
                    <div className="relative">
                      <Image
                        src={imagePreview || "/placeholder.svg"}
                        alt={imageAlt || "Event preview"}
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
                        required={!!imagePreview}
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
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Categories</h2>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      placeholder="Add category"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addCategory())}
                    />
                    <button
                      type="button"
                      onClick={addCategory}
                      className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm font-medium"
                    >
                      Add
                    </button>
                  </div>
                  {categories.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                        >
                          {category}
                          <button
                            type="button"
                            onClick={() => removeCategory(category)}
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
                  {/* MODIFIED: Button text for saving state */}
                  <span>Updating Event...</span>
                </>
              ) : (
                <>
                  <Save className="h-5 w-5" />
                  {/* MODIFIED: Button text */}
                  <span>Update Event</span>
                </>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}

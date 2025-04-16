"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import { format } from "date-fns"
import { Edit, Trash2, Plus, Search, ArrowLeft } from "lucide-react"
import { toast } from "react-hot-toast"

interface BlogPost {
  _id: string
  title: string
  slug: string
  excerpt: string
  author: string
  createdAt: string
  categories: string[]
}

export default function BlogDashboard() {
  const router = useRouter()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [postToDelete, setPostToDelete] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check both sessionStorage and cookies
    const isLoggedInSession = sessionStorage.getItem("blogLoggedIn") === "true"
    const isLoggedInCookie = document.cookie.includes("blogLoggedInClient=true")

    if (!isLoggedInSession && !isLoggedInCookie) {
      console.log("Not authenticated, redirecting to login")
      router.push("/blog-admin")
      return
    }

    setIsAuthenticated(true)
    fetchPosts()
  }, [router])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/blog/posts")
      if (!response.ok) throw new Error("Failed to fetch posts")
      const data = await response.json()
      setPosts(data)
    } catch (error) {
      console.error("Error fetching posts:", error)
      toast.error("Failed to load blog posts")
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    // Clear sessionStorage
    sessionStorage.removeItem("blogLoggedIn")

    // Clear the cookie by making a logout request
    await fetch("/api/blog/logout", {
      method: "POST",
      credentials: "include",
    })

    router.push("/blog-admin")
  }

  const confirmDelete = (id: string) => {
    setPostToDelete(id)
    setShowDeleteModal(true)
  }

  const handleDelete = async () => {
    if (!postToDelete) return

    try {
      const response = await fetch(`/api/blog/posts/${postToDelete}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete post")

      setPosts(posts.filter((post) => post._id !== postToDelete))
      toast.success("Post deleted successfully")
    } catch (error) {
      console.error("Error deleting post:", error)
      toast.error("Failed to delete post")
    } finally {
      setShowDeleteModal(false)
      setPostToDelete(null)
    }
  }

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.categories.some((category) => category.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  // Show loading state until authentication check is complete
  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  return (
    <div className="bg-white min-h-screen">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link href="/blog" className="text-purple-600 hover:text-purple-800">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-800">Blog Dashboard</h1>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <Link
            href="/blog-admin/dashboard/new"
            className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>New Post</span>
          </Link>

          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-gray-500 mb-4">{searchTerm ? "No posts match your search" : "No blog posts yet"}</p>
            {searchTerm && (
              <button onClick={() => setSearchTerm("")} className="text-purple-600 hover:text-purple-800">
                Clear search
              </button>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell"
                  >
                    Author
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell"
                  >
                    Categories
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPosts.map((post) => (
                  <tr key={post._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 truncate max-w-xs">{post.title}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs md:hidden">
                        {post.author} • {format(new Date(post.createdAt), "dd MMM yyyy")}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                      <div className="text-sm text-gray-900">{post.author}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                      <div className="text-sm text-gray-500">{format(new Date(post.createdAt), "dd MMM yyyy")}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {post.categories.slice(0, 2).map((category, index) => (
                          <span key={index} className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">
                            {category}
                          </span>
                        ))}
                        {post.categories.length > 2 && (
                          <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                            +{post.categories.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/blog-admin/dashboard/edit/${post._id}`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Edit className="h-5 w-5" />
                        </Link>
                        <button onClick={() => confirmDelete(post._id)} className="text-red-600 hover:text-red-900">
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Delete Post</h3>
            <p className="text-gray-500 mb-6">
              Are you sure you want to delete this post? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Cancel
              </button>
              <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

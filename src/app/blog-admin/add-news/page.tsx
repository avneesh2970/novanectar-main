/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trash2,
  Eye,
  Plus,
  Calendar,
  User,
  Loader2,
  Search,
  Filter,
  X,
  Clock,
  Edit,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface NewsItem {
  _id: string;
  title: string;
  content: string;
  excerpt: string;
  featuredImage?: string;
  featuredImageAlt?: string;
  author: string;
  category: string;
  tags: string[];
  publishDate: string;
  views: number;
  createdAt: string;
  updatedAt: string;
}

// News Detail Modal Component
function NewsDetailModal({
  news,
  isOpen,
  onClose,
}: {
  news: NewsItem | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!news) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(" ").length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
            <div className="overflow-y-auto max-h-[90vh]">
              {/* Image */}
              <div className="relative w-full h-64 sm:h-80">
                {news.featuredImage ? (
                  <Image
                    src={news.featuredImage || "/placeholder.svg"}
                    alt={news.featuredImageAlt || news.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                    <Eye className="w-20 h-20 text-purple-400" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-purple-800 text-sm font-semibold rounded-full">
                    {news.category}
                  </span>
                </div>
              </div>
              {/* Content */}
              <div className="p-6 sm:p-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                  {news.title}
                </h1>
                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-6 mb-6 text-sm text-gray-600">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    <span>{news.author}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{formatDate(news.publishDate)}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{getReadingTime(news.content)}</span>
                  </div>
                </div>
                {/* Excerpt */}
                {news.excerpt && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Summary
                    </h3>
                    <p className="text-gray-600 text-base leading-relaxed">
                      {news.excerpt}
                    </p>
                  </div>
                )}
                {/* Content */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Content
                  </h3>
                  <div className="prose max-w-none">
                    <p className="text-gray-600 text-base leading-relaxed whitespace-pre-wrap">
                      {news.content}
                    </p>
                  </div>
                </div>
                {/* Tags */}
                {news.tags.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {news.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {/* Actions */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                  <div className="text-sm text-gray-500">
                    Created: {new Date(news.createdAt).toLocaleDateString()}
                    {news.updatedAt !== news.createdAt && (
                      <span className="ml-4">
                        Updated: {new Date(news.updatedAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default function NewsManagementPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // All your existing state variables...
  const [news, setNews] = useState<NewsItem[]>([]);
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = [
    "All",
    "Technology",
    "Business",
    "Sports",
    "Entertainment",
    "Health",
    "Politics",
    "Other",
  ];

  // Add authentication check
  useEffect(() => {
    const checkAuth = () => {
      // Check if user is logged in via cookie
      const isLoggedIn = document.cookie.includes("blogLoggedInClient=true");

      if (!isLoggedIn) {
        router.push("/blog-admin");
        return;
      }

      setIsAuthenticated(true);
      setIsAuthLoading(false);
    };

    checkAuth();
  }, [router]);

  const fetchNews = async () => {
    try {
      const response = await fetch("/api/news/posts");
      const result = await response.json();
      if (result.success) {
        setNews(result.data);
        setFilteredNews(result.data);
      } else {
        setError("Failed to fetch news");
      }
    } catch (err) {
      setError("An error occurred while fetching news");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this news article?")) {
      return;
    }
    setDeleting(id);
    try {
      const response = await fetch(`/api/news/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();
      if (result.success) {
        setNews((prev) => prev.filter((item) => item._id !== id));
        setFilteredNews((prev) => prev.filter((item) => item._id !== id));
      } else {
        alert("Failed to delete news");
      }
    } catch (err) {
      alert("An error occurred while deleting news");
    } finally {
      setDeleting(null);
    }
  };

  const handleViewNews = (newsItem: NewsItem) => {
    setSelectedNews(newsItem);
    setIsModalOpen(true);
  };

  const handleEditNews = (newsItem: NewsItem) => {
    // Navigate to edit page or open edit modal
    console.log("Edit news:", newsItem._id);
    // You can implement navigation to edit page here
    // router.push(`/admin/news/edit/${newsItem._id}`)
  };

  const handleViewLive = (newsItem: NewsItem) => {
    // Open news in new tab
    console.log("View live:", newsItem._id);
    // You can implement navigation to public news page here
    // window.open(`/news/${newsItem.slug}`, '_blank')
  };

  // Filter and search functionality
  useEffect(() => {
    let filtered = [...news];
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }
    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return (
            new Date(b.publishDate).getTime() -
            new Date(a.publishDate).getTime()
          );
        case "oldest":
          return (
            new Date(a.publishDate).getTime() -
            new Date(b.publishDate).getTime()
          );
        case "views":
          return b.views - a.views;
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
    setFilteredNews(filtered);
  }, [news, searchTerm, selectedCategory, sortBy]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchNews();
    }
  }, [isAuthenticated]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Show loading while checking authentication
  if (isAuthLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    );
  }

  // Don't render anything if not authenticated (will redirect)
  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-purple-600 mx-auto mb-4" />
          <p className="text-lg text-gray-600">Loading news...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="text-gray-800 min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8"
        >
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              News Management
            </h1>
            <p className="text-gray-600">
              Manage all your news articles ({filteredNews.length} articles)
            </p>
          </div>
          <Link
            href="/blog-admin/add-news/new"
            className="mt-4 lg:mt-0 flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <Plus className="w-5 h-5" />
            <span>Add News</span>
          </Link>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search news by title, author, or content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>
            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="text-gray-400 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 text-red-800 p-4 rounded-lg border border-red-200 mb-6"
          >
            {error}
          </motion.div>
        )}

        {/* News List */}
        {filteredNews.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Eye className="w-12 h-12 text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {news.length === 0 ? "No News Articles" : "No Results Found"}
            </h3>
            <p className="text-gray-600 mb-6">
              {news.length === 0
                ? "Start by creating your first news article"
                : "Try adjusting your search or filter criteria"}
            </p>
            {news.length === 0 && (
              <Link
                href="/blog-admin/add-news/new"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
              >
                <Plus className="w-5 h-5" />
                <span>Create News</span>
              </Link>
            )}
          </motion.div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Table Header */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="grid grid-cols-12 gap-4 items-center text-sm font-semibold text-gray-700">
                <div className="col-span-1"></div>
                <div className="col-span-4">Title</div>
                <div className="col-span-2">Author</div>
                <div className="col-span-2">Category</div>
                <div className="col-span-1">Date</div>
                <div className="col-span-1">Actions</div>
              </div>
            </div>
            {/* Table Body */}
            <div className="divide-y divide-gray-200">
              <AnimatePresence>
                {filteredNews.map((item, index) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3, delay: index * 0.02 }}
                    className="px-6 py-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="grid grid-cols-12 gap-4 items-center">
                      {/* Image */}
                      <div className="col-span-1">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-gradient-to-br from-purple-100 to-blue-100 flex-shrink-0">
                          {item.featuredImage ? (
                            <Image
                              src={item.featuredImage || "/placeholder.svg"}
                              alt={item.featuredImageAlt || item.title}
                              width={48}
                              height={48}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Eye className="w-5 h-5 text-purple-400" />
                            </div>
                          )}
                        </div>
                      </div>
                      {/* Title */}
                      <div className="col-span-4">
                        <h3 className="font-semibold text-gray-900 line-clamp-2 text-sm leading-tight">
                          {item.title}
                        </h3>
                        {item.excerpt && (
                          <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                            {item.excerpt}
                          </p>
                        )}
                      </div>
                      {/* Author */}
                      <div className="col-span-2">
                        <div className="flex items-center">
                          <User className="w-3 h-3 mr-1 text-gray-400" />
                          <span className="text-sm text-gray-600 truncate">
                            {item.author}
                          </span>
                        </div>
                      </div>
                      {/* Category */}
                      <div className="col-span-2">
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
                          {item.category}
                        </span>
                      </div>
                      {/* Date */}
                      <div className="col-span-1">
                        <span className="text-xs text-gray-500">
                          {formatDate(item.publishDate)}
                        </span>
                      </div>
                      {/* Actions */}
                      <div className="col-span-1">
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => handleViewNews(item)}
                            title="View Details"
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <Link
                            href={`/blog-admin/add-news/edit/${item._id}`}
                            title="Edit Article"
                            className="p-1.5 text-green-600 hover:bg-green-50 rounded-md transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(item._id)}
                            disabled={deleting === item._id}
                            title="Delete Article"
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50"
                          >
                            {deleting === item._id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Stats Footer */}
        {filteredNews.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 p-6"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  {news.length}
                </div>
                <div className="text-sm text-gray-600">Total Articles</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {news.reduce((sum, item) => sum + item.views, 0)}
                </div>
                <div className="text-sm text-gray-600">Total Views</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {new Set(news.map((item) => item.author)).size}
                </div>
                <div className="text-sm text-gray-600">Authors</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">
                  {new Set(news.map((item) => item.category)).size}
                </div>
                <div className="text-sm text-gray-600">Categories</div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* News Detail Modal */}
      <NewsDetailModal
        news={selectedNews}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

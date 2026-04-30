"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Search, Calendar } from "lucide-react";
import { DMSans } from "@/fonts/font";
import { format } from "date-fns";
import FooterSection from "@/components/footer/FooterSection";
import type { BlogPostRecord } from "@/lib/content";
import ContentPaginationControls from "@/components/ui/ContentPaginationControls";

export default function BlogIndexPage({
  initialPosts,
}: {
  initialPosts: BlogPostRecord[];
}) {
  const [posts, setPosts] = useState(initialPosts);
  const [searchTerm, setSearchTerm] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(initialPosts.length === 0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  useEffect(() => {
    if (initialPosts.length > 0) return;

    let isMounted = true;

    async function hydratePosts() {
      try {
        const response = await fetch("/api/blog/posts", { cache: "no-store" });
        if (!response.ok) return;

        const data = (await response.json()) as BlogPostRecord[];
        if (isMounted) {
          setPosts(data);
        }
      } catch (error) {
        console.error("Failed to refresh blog posts on the client:", error);
      } finally {
        if (isMounted) {
          setIsRefreshing(false);
        }
      }
    }

    void hydratePosts();

    return () => {
      isMounted = false;
    };
  }, [initialPosts.length]);

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.categories.some((category) =>
        category.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, pageSize]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + pageSize);

  const getCategoryColorClasses = (index: number) => {
    const colorCombinations = [
      "bg-purple-100 text-purple-700",
      "bg-blue-100 text-blue-700",
      "bg-green-100 text-green-700",
      "bg-indigo-100 text-indigo-700",
      "bg-pink-100 text-pink-700",
      "bg-yellow-100 text-yellow-700",
      "bg-red-100 text-red-700",
      "bg-teal-100 text-teal-700",
    ];

    return colorCombinations[index % colorCombinations.length];
  };

  return (
    <main className={`${DMSans.className} min-h-screen bg-gray-50 mt-20`}>
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Blog
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Insights, guides, and expert opinions on technology, business, and
            digital growth.
          </p>
          <div className="relative max-w-md mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {isRefreshing ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600" />
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <div className="max-w-md mx-auto">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                {searchTerm ? "No blog posts found" : "No blog posts published yet"}
              </h2>
              <p className="text-gray-600 mb-6">
                {searchTerm
                  ? `No posts match "${searchTerm}"`
                  : "Check back soon for new content."}
              </p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="text-purple-600 hover:text-purple-800 font-medium"
                >
                  Clear search
                </button>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {paginatedPosts.map((post) => (
                <article
                  key={post._id}
                  className="bg-white rounded-xl overflow-hidden shadow hover:shadow-md transition-shadow duration-300"
                >
                  <Link href={`/blog/${post.slug}`} className="block group">
                    <div className="relative w-full h-48 overflow-hidden bg-gray-50">
                      <Image
                        src={post.featuredImage || "/placeholder.svg"}
                        alt={post.featuredImageAlt || post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    <div className="p-4">
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{format(new Date(post.createdAt), "dd MMM yyyy")}</span>
                      </div>

                      <div className="flex justify-between items-start mb-2">
                        <h2 className="text-lg font-semibold text-gray-900 pr-4 group-hover:text-purple-600 transition-colors duration-200">
                          {post.title}
                        </h2>
                        <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-purple-600 transition-colors duration-200 flex-shrink-0" />
                      </div>

                      {post.author && (
                        <p className="text-sm text-gray-500 mb-2">By {post.author}</p>
                      )}

                      <p className="text-gray-600 text-sm line-clamp-2">{post.excerpt}</p>

                      <div className="flex gap-2 mt-3 overflow-x-auto whitespace-nowrap scrollbar-hide">
                        {post.categories.map((category, i) => (
                          <span
                            key={i}
                            className={`text-xs px-3 py-1 rounded-full ${getCategoryColorClasses(
                              i,
                            )}`}
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>

            <ContentPaginationControls
              currentPage={currentPage}
              totalItems={filteredPosts.length}
              totalPages={totalPages}
              pageSize={pageSize}
              onPageChange={setCurrentPage}
              onPageSizeChange={setPageSize}
              itemLabel="articles"
            />
          </>
        )}
      </div>
      <FooterSection />
    </main>
  );
}

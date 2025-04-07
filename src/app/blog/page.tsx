import BlogHeader from "@/components/blogs/blog-header";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import outsourceImage from "@/assets/blog/blog1/outsourcing.jpg";
import effectiveInterviewImage from "@/assets/blog/blog2/effectiveInterviews.jpeg";
import { DMSans } from "@/fonts/font";

export default function BlogPage() {
  const blogPosts = [
    {
      title: "Outsourcing IT Services: Advantages and Disadvantages Explained",
      excerpt:
        "In today's era, the digital world is rapidly evolving, and many businesses are turning to outsource IT experts to stay competitive.",
      author: "Amit Bhetwal",
      date: "27-03-25",
      image: outsourceImage,
      slug: "outsourcing-it-services",
      categories: ["Technology", "Business", "IT Services"],
    },
    {
      title:
        "What Makes an Effective Interviewer? Tips for Conducting Successful Interviews",
      excerpt:
        "Interviews are a vital part of the hiring process, helping you identify the best candidates for your team—whether you're hiring a web developer, content creator, or any other role.",
      author: "Amit Bhetwal",
      date: "07-04-25",
      image: effectiveInterviewImage,
      slug: "effective-interviewer-tips",
      categories: ["Business", "Hiring", "Human Resources"],
    },
  ];

  return (
    <main className={`${DMSans.className} min-h-screen bg-gray-50 mt-20`}>
      <BlogHeader />

      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow hover:shadow-md transition-shadow duration-300"
            >
              <Link href={`/blog/${post.slug}`} className="block group">
                {/* Adjusted Image Height */}
                <div className="relative w-full h-48">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Content Section */}
                <div className="p-4">
                  <div className="text-sm text-gray-500 mb-2">
                    {post.author} • {post.date}
                  </div>

                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 pr-4 group-hover:text-blue-600 transition-colors duration-200">
                      {post.title}
                    </h3>
                    <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors duration-200 flex-shrink-0" />
                  </div>

                  {/* Truncated Excerpt */}
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {post.excerpt}
                  </p>

                  {/* Categories */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {post.categories.map((category, i) => (
                      <span
                        key={i}
                        className="text-xs px-3 py-1 bg-blue-100 text-gray-600 rounded-full"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

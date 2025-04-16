import BlogPostContent from "@/components/blogs/blog-post-content"

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  // Await the params before accessing the slug property
  const resolvedParams = await params

  return <BlogPostContent slug={resolvedParams.slug} />
}

import BlogPostContent from "@/components/blogs/blog-post-content"
import { Metadata } from 'next'

// Add this function to generate metadata
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || ''}/api/blog/posts?slug=${params.slug}`)
    const post = await response.json()

    if (!post) {
      return {
        title: 'Blog Post Not Found',
        description: 'The requested blog post could not be found.'
      }
    }

    return {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      openGraph: {
        title: post.metaTitle || post.title,
        description: post.metaDescription || post.excerpt,
        images: post.featuredImage ? [{ url: post.featuredImage }] : [],
        type: 'article',
      },
    }
  } catch (error) {
    console.log("error", error);
    return {
      title: 'Blog',
      description: 'Read our latest blog posts'
    }
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  // Await the params before accessing the slug property
  const resolvedParams = await params

  return <BlogPostContent slug={resolvedParams.slug} />
}

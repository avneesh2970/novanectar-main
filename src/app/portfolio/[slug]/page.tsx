import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { DMSans } from "@/fonts/font"
import Navbar from "@/components/navbar/Navbar"
import { projects } from "../__data/projects"
import FooterSection from "@/components/footer/FooterSection"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

// Base URL for canonical tags - update this to your production domain
const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://novanectar.co.in"

// Generate static params for all projects
export async function generateStaticParams() {
  return projects.map((project: any) => ({
    slug: project.id.toString(),
  }))
}

// Generate metadata with canonical URL and SEO tags
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const projectId = Number.parseInt(slug)
  const project = projects.find((p: any) => p.id === projectId)

  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found.",
    }
  }

  const canonicalUrl = `${BASE_URL}/portfolio/${slug}`

  return {
    title: `${project.title} | Portfolio | NovaNectar`,
    description: project.overview?.slice(0, 160) || `View details about ${project.title} project`,
    keywords: [...project.tags, ...(project.category || []), "NovaNectar", "portfolio", "project"],
    authors: [{ name: "NovaNectar" }],
    // Canonical URL
    alternates: {
      canonical: canonicalUrl,
    },
    // Open Graph tags
    openGraph: {
      title: `${project.title} | Portfolio`,
      description: project.overview?.slice(0, 160) || `View details about ${project.title} project`,
      url: canonicalUrl,
      siteName: "NovaNectar",
      type: "article",
      images: [
        {
          url:
            typeof project.imageUrl === "string"
              ? project.imageUrl
              : project.imageUrl?.src || `${BASE_URL}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    // Twitter Card tags
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Portfolio`,
      description: project.overview?.slice(0, 160) || `View details about ${project.title} project`,
      images: [
        typeof project.imageUrl === "string" ? project.imageUrl : project.imageUrl?.src || `${BASE_URL}/og-image.jpg`,
      ],
    },
    // Robots
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const projectId = Number.parseInt(slug)
  const currentProject = projects.find((p: any) => p.id === projectId)

  if (!currentProject) {
    notFound()
  }

  // Get similar projects (excluding current project)
  const similarProjects = projects.filter((p: any) => p.id !== projectId).slice(0, 6)

  // JSON-LD structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: currentProject.title,
    description: currentProject.overview,
    creator: {
      "@type": "Organization",
      name: "NovaNectar",
    },
    keywords: currentProject.tags.join(", "),
    url: `${BASE_URL}/portfolio/${slug}`,
  }

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className={`${DMSans.className} bg-[#F5F5F5] text-[#333335]`}>
        <Navbar />
        <div className="max-w-6xl mx-auto py-24 px-6 mt-4">
          <div className="mb-6">
            <Link
              href="/portfolio"
              className="text-lg text-black-800 inline hover:text-black-900 transition-colors font-semibold"
            >
              <ArrowLeft className="inline" /> Go Back
            </Link>
          </div>

          {/* Main project content */}
          <article className="mb-8">
            <div className="rounded-2xl overflow-hidden mb-6">
              <Image
                src={currentProject.imageUrlDetail || "/placeholder.svg"}
                alt={currentProject.title}
                className="w-full h-auto object-cover"
                priority
              />
            </div>

            <div className="">
              <h1 className="text-3xl lg:text-4xl font-bold leading-tight">{currentProject.title}</h1>
              <div className="flex flex-wrap items-center gap-2 md:pb-8">
                {currentProject.tags.map((tag: string, index: number) => (
                  <span key={index} className="text-sm text-gray-600">
                    {index > 0 && <span className="text-gray-400 mr-2">•</span>}
                    {tag}
                  </span>
                ))}
              </div>

              <div className="rounded-xl">
                {currentProject.restImages?.[0] ? (
                  <div className="flex flex-col-reverse lg:flex-row gap-12">
                    <div className="flex-1">
                      <div className="text-gray-700 leading-relaxed">
                        <h2 className="text-xl sm:text-2xl font-semibold mb-4">Project Overview</h2>
                        {currentProject.overview || "No description available."}
                      </div>
                    </div>

                    <div className="flex-1 relative w-full h-96 rounded-lg overflow-hidden">
                      <Image
                        src={currentProject.restImages?.[0] || "/placeholder.svg"}
                        alt="Project visual"
                        fill
                        className="object-cover rounded-lg shadow"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority
                      />
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-700 leading-relaxed">
                    {currentProject.overview || "No description available."}
                  </p>
                )}
              </div>
            </div>
          </article>

          {/* Similar Projects Section */}
          {similarProjects.length > 0 && (
            <section className="mt-16">
              <h2 className="text-2xl font-semibold mb-8">Related Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {similarProjects.map((project: any) => (
                  <Link key={project.id} href={`/portfolio/${project.id}`}>
                    <div className="rounded-xl overflow-hidden group">
                      <div className="relative h-80 w-full overflow-hidden">
                        <Image
                          src={project.imageUrl || "/placeholder.svg"}
                          fill
                          alt={project.title}
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4 space-y-2">
                        <h3 className="text-lg font-semibold leading-tight group-hover:text-blue-600 transition-colors">
                          {project.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-1">
                          {project.tags.slice(0, 2).map((tag: string, index: number) => (
                            <span key={index} className="text-xs text-gray-500">
                              {index > 0 && <span className="text-gray-400 mr-1">•</span>}
                              {tag}
                            </span>
                          ))}
                          {project.tags.length > 2 && (
                            <span className="text-xs text-gray-400">• +{project.tags.length - 2} more</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
        <FooterSection />
      </div>
    </>
  )
}

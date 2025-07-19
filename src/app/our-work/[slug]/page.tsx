// app/our-work/[slug]/page.tsx
import { DMSans } from "@/fonts/font"
import Navbar from "@/components/navbar/Navbar"
import { projects } from "../__data/projects"
import FooterSection from "@/components/footer/FooterSection"
import ourWork from "@/assets/our-work/ourWork.jpg"
import Image from "next/image"
import Link from "next/link"


export default function ProjectDetailPage({ params }: any) {

  const projectId = Number.parseInt(params.slug)
  const currentProject = projects.find((p: any) => p.id === projectId)

  if (!currentProject) {
    return (
      <div className={`${DMSans.className} bg-[#F5F5F5] text-[#333335]`}>
        <Navbar />
        <div className="max-w-6xl mx-auto py-24 px-6">
          <Link href="/our-work" className="text-sm text-blue-600 underline mb-4 inline-block">
            ← Back to Our Work
          </Link>
          <div className="text-center py-20">
            <h1 className="text-2xl font-bold mb-4">Project not found</h1>
            <p className="text-gray-600 mb-6">The project you&apos;re looking for doesn&apos;t exist.</p>
            <Link
              href="/our-work"
              className="bg-[#333335] text-white px-6 py-2 rounded-full hover:bg-[#555] transition-colors"
            >
              View All Projects
            </Link>
          </div>
        </div>
        <FooterSection />
      </div>
    )
  }

  // Get similar projects (excluding current project)
  const similarProjects = projects.filter((p: any) => p.id !== projectId).slice(0, 6) // Limit to 6 similar projects

  return (
    <div className={`${DMSans.className} bg-[#F5F5F5] text-[#333335]`}>
      <Navbar />
      <div className="max-w-6xl mx-auto py-24 px-6">
        <Link
          href="/our-work"
          className="text-sm text-blue-600 underline mb-6 inline-block hover:text-blue-800 transition-colors"
        >
          ← Back to Our Work
        </Link>

        {/* Main project content */}
        <div className="mb-8">
          <div className="rounded-2xl overflow-hidden mb-6 shadow-lg">
            <Image
              src={ourWork || "/placeholder.svg"}
              alt={currentProject.title}
              className="w-full h-auto object-cover"
              priority
            />
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl lg:text-4xl font-bold leading-tight">{currentProject.title}</h1>

            <div className="flex flex-wrap items-center gap-2">
              {currentProject.tags.map((tag: string, index: number) => (
                <span key={index} className="text-sm text-gray-600">
                  {index > 0 && <span className="text-gray-400 mr-2">•</span>}
                  {tag}
                </span>
              ))}
              <span className="text-gray-400 mx-2">•</span>
              <span className="text-sm text-gray-500">July 18, 2025</span>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-3">Project Overview</h2>
              <p className="text-gray-700 leading-relaxed max-w-3xl">
                {currentProject.overview || "No description available."}
              </p>
            </div>
          </div>
        </div>

        {/* Similar Projects Section */}
        {similarProjects.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-semibold mb-8">Related Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarProjects.map((project: any) => (
                <Link key={project.id} href={`/our-work/${project.id}`}>
                  <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={ourWork || "/placeholder.svg"}
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
                      <span className="inline-block text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {project.category}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      <FooterSection />
    </div>
  )
}

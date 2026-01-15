import { DMSans } from "@/fonts/font"
import Navbar from "@/components/navbar/Navbar"
import FooterSection from "@/components/footer/FooterSection"
import Link from "next/link"

export default function ProjectNotFound() {
  return (
    <div className={`${DMSans.className} bg-[#F5F5F5] text-[#333335]`}>
      <Navbar />
      <div className="max-w-6xl mx-auto py-24 px-6">
        <Link href="/portfolio" className="text-sm text-blue-600 underline mb-4 inline-block">
          ← Go Back
        </Link>
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold mb-4">Project not found</h1>
          <p className="text-gray-600 mb-6">The project you&apos;re looking for doesn&apos;t exist.</p>
          <Link
            href="/portfolio"
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

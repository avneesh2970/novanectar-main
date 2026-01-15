import Link from "next/link"
import { ArrowLeft, Sparkles } from "lucide-react"
import FooterSection from "@/components/footer/FooterSection"
import Navbar from "@/components/navbar/Navbar"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      <Navbar />
      <div className="max-w-md mx-auto mt-16 px-4">
        <div className="text-center p-8 bg-red-50 border border-red-200 rounded-2xl shadow-lg">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-red-700 mb-4">Article Not Found</h2>
          <p className="text-red-600 leading-relaxed mb-6">
            The article you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
          <Link
            href="/news"
            className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to News
          </Link>
        </div>
      </div>
      <FooterSection />
    </div>
  )
}

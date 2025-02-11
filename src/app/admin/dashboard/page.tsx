"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AdminDashboard() {
  const router = useRouter()

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("adminLoggedIn")
    if (!isLoggedIn) {
      router.push("/admin")
    }
  }, [router])

  const handleLogout = () => {
    sessionStorage.removeItem("adminLoggedIn")
    router.push("/admin")
  }

  return (
    <div className="min-h-screen text-gray-700 flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <p className="mb-6">Welcome to the admin dashboard!</p>
      <button onClick={handleLogout} className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">
        Logout
      </button>
    </div>
  )
}


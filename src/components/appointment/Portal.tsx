"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import type React from "react" // Added import for React

export function Portal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  return mounted ? createPortal(children, document.querySelector("#portal-root") || document.body) : null
}


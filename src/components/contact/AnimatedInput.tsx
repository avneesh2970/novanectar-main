"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"

interface AnimatedInputProps {
  register: any
  type: string
  placeholder: string
  error: any
  value?: string
}

export const AnimatedInput: React.FC<AnimatedInputProps> = ({ register, type, placeholder, error, value = "" }) => {
  const [inputValue, setInputValue] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const { onChange, onBlur, name } = register

  const [showCursor, setShowCursor] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isFocused) {
      setShowCursor(true)
      interval = setInterval(() => {
        setShowCursor((prev) => !prev)
      }, 500)
    } else {
      setShowCursor(false)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isFocused])

  // Sync local state with form value
  useEffect(() => {
    setInputValue(value)
  }, [value])

  const baseInputClasses = `w-full p-3 rounded-lg bg-white bg-opacity-50 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-gray-700`

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    onChange({ target: { name, value } })
  }

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false)
    onBlur(e)
  }

  const handleDisplayClick = () => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  if (type === "textarea") {
    return (
      <div className="relative">
        {/* Visible display area */}
        <div
          onClick={handleDisplayClick}
          className={`${baseInputClasses} min-h-[96px] cursor-text ${
            isFocused ? "border-blue-500 ring-2 ring-blue-200" : ""
          }`}
        >
          {inputValue ? (
            <div className="whitespace-pre-wrap break-words leading-relaxed">
              {inputValue}
              <span
                className={`inline-block w-0 h-5 border-r-2 border-blue-500 ml-0.5 ${
                  isFocused && showCursor ? "opacity-100" : "opacity-0"
                }`}
                style={{ transition: "opacity 0.1s" }}
              />
            </div>
          ) : (
            <div className="text-gray-400 leading-relaxed relative">
              {!isFocused && placeholder}
              {isFocused && (
                <span
                  className={`inline-block w-0 h-5 border-r-2 border-blue-500 ${
                    showCursor ? "opacity-100" : "opacity-0"
                  }`}
                  style={{ transition: "opacity 0.1s" }}
                />
              )}
            </div>
          )}
        </div>

        {/* Hidden input field */}
        <input
          ref={inputRef}
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="absolute inset-0 opacity-0 w-full h-full cursor-text"
          style={{ zIndex: 1 }}
        />

        {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
      </div>
    )
  }

  return (
    <div>
      <input {...register} type={type} placeholder={placeholder} className={baseInputClasses} />
      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  )
}

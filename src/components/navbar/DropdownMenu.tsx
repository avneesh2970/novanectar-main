'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface DropdownItem {
  title: string
  href: string
  subItems?: DropdownItem[]
}

interface DropdownMenuProps {
  title: string
  items: DropdownItem[]
  mobile?: boolean
  onClick?: () => void
  className?: string
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ title, items, mobile = false, onClick, className }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mobile) {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false)
        }
      }

      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }
  }, [mobile])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <button
        className="flex items-center space-x-1 py-2 text-gray-800 hover:text-blue-600 transition-colors duration-200"
        onClick={toggleMenu}
      >
        <span>{title}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className={`${
              mobile ? 'mt-2 bg-white' : 'absolute left-0 top-full mt-2 bg-white'
            } w-48 rounded-md shadow-lg py-1 z-20`}
          >
            {items.map((item, index) => (
              <div key={index}>
                <Link
                  href={item.href}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                  onClick={onClick}
                >
                  <span>{item.title}</span>
                </Link>
                {item.subItems && (
                  <div className="pl-4">
                    {item.subItems.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        href={subItem.href}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                        onClick={onClick}
                      >
                        <span>{subItem.title}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default DropdownMenu


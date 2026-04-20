'use client'

interface HamburgerIconProps {
  isOpen: boolean
  toggleMenu: () => void
}

const HamburgerIcon: React.FC<HamburgerIconProps> = ({ isOpen, toggleMenu }) => {
  return (
    <button
      type="button"
      className="w-10 h-10 inline-flex flex-col items-center justify-center gap-1.5 rounded-md"
      onClick={toggleMenu}
      aria-label="Toggle menu"
      aria-expanded={isOpen}
    >
      <span
        className={`block h-0.5 w-6 rounded-full bg-gray-800 transition-transform duration-200 ${
          isOpen ? "translate-y-2 rotate-45" : ""
        }`}
      />
      <span
        className={`block h-0.5 w-6 rounded-full bg-gray-800 transition-opacity duration-200 ${
          isOpen ? "opacity-0" : "opacity-100"
        }`}
      />
      <span
        className={`block h-0.5 w-6 rounded-full bg-gray-800 transition-transform duration-200 ${
          isOpen ? "-translate-y-2 -rotate-45" : ""
        }`}
      />
    </button>
  )
}

export default HamburgerIcon

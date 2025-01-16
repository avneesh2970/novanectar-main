"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import HamburgerIcon from "./HambergerIcon";
import { gsap } from "gsap";
import { ContactPopup } from "../contact/ContactPopup";

interface NavItem {
  label: string;
  href: string;
  items?: { label: string; href: string }[];
}

const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  {
    href: "/",
    label: "Services",
    items: [
      { label: "Website Development", href: "/services/web-development" },
      { label: "App Development", href: "/services/mobile-development" },
      { label: "Graphic Design", href: "/services/graphic-design" },
      { label: "Digital Marketing", href: "/services/digital-marketing" },
      { label: "Ecommerce", href: "/services/ecommerce" },
      { label: "SEO", href: "/services/seo" },
    ],
  },
  { href: "/", label: "Our Work" },
  {
    href: "https://edu.novanectar.co.in/internships",
    label: "Internship",
    items: [
      {
        label: "Web Development",
        href: "https://edu.novanectar.co.in/internships",
      },
      {
        label: "Mobile Development",
        href: "https://edu.novanectar.co.in/internships",
      },
      {
        label: "UI/UX Design",
        href: "https://edu.novanectar.co.in/internships",
      },
    ],
  },
  {
    href: "https://edu.novanectar.co.in",
    label: "Training",
    items: [
      { label: "Frontend Development", href: "https://edu.novanectar.co.in" },
      { label: "Backend Development", href: "https://edu.novanectar.co.in" },
      { label: "Full Stack Development", href: "https://edu.novanectar.co.in" },
    ],
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";

      // Slower and smoother GSAP animation
      gsap.fromTo(
        mobileMenuRef.current,
        {
          opacity: 0,
          height: 0,
        },
        {
          opacity: 1,
          height: "100vh",
          duration: 0.8, // Increased duration
          ease: "power2.inOut",
        }
      );
    } else {
      document.body.style.overflow = "unset";
      setExpandedItem(null);

      if (mobileMenuRef.current) {
        gsap.to(mobileMenuRef.current, {
          opacity: 0,
          height: 0,
          duration: 0.8, // Increased duration
          ease: "power2.inOut",
        });
      }
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleContactPopup = () => setIsContactPopupOpen(!isContactPopupOpen);

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 w-full bg-white shadow-md z-50"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/logo.png"
                alt="Novanectar Logo"
                width={200}
                height={50}
                className="w-auto h-12"
                priority
              />
            </Link>

            {/* Center navigation items */}
            <div className="hidden lg:flex items-center justify-center flex-1 mx-8">
              {navItems.map((item) => (
                <NavItem
                  key={item.label}
                  item={item}
                  scrollToSection={scrollToSection}
                />
              ))}
            </div>

            {/* Contact button aligned to right */}
            <button
              // href="#"
              onClick={(e) => {
                e.preventDefault();
                toggleContactPopup();
              }}
              className="hidden lg:block px-6 py-2 rounded-md bg-[#4169E1] text-white font-medium hover:bg-blue-600 transition-colors"
            >
              Contact
            </button>

            <div className="lg:hidden z-50">
              <HamburgerIcon isOpen={isOpen} toggleMenu={toggleMenu} />
            </div>
          </div>
        </div>

        <div
          ref={mobileMenuRef}
          className="lg:hidden overflow-hidden"
          style={{ height: 0 }}
        >
          <div className="bg-[#F8F9FA] h-screen overflow-y-auto">
            <div className="px-4 pt-4 pb-20">
              {" "}
              {/* Added padding bottom for scroll space */}
              <div className="space-y-4">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: index * 0.15, // Increased delay for smoother stagger
                      duration: 0.6, // Increased duration
                      ease: [0.4, 0, 0.2, 1], // Custom easing
                    }}
                    className="border-b border-gray-200"
                  >
                    {item.items ? (
                      <div>
                        <button
                          onClick={() => {
                            if (expandedItem === item.label) {
                              setExpandedItem(null);
                            } else {
                              setExpandedItem(item.label);
                            }
                          }}
                          className="flex items-center justify-between w-full py-4 text-gray-800"
                        >
                          <span className="text-base">{item.label}</span>
                          <motion.div
                            animate={{
                              rotate: expandedItem === item.label ? 180 : 0,
                            }}
                            transition={{
                              duration: 0.6,
                              ease: [0.4, 0, 0.2, 1],
                            }}
                          >
                            <ChevronDown className="w-5 h-5 text-gray-500" />
                          </motion.div>
                        </button>
                        <AnimatePresence>
                          {expandedItem === item.label && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{
                                height: "auto",
                                opacity: 1,
                                transition: {
                                  height: {
                                    duration: 0.6,
                                    ease: [0.4, 0, 0.2, 1],
                                  },
                                  opacity: { duration: 0.4, delay: 0.2 },
                                },
                              }}
                              exit={{
                                height: 0,
                                opacity: 0,
                                transition: {
                                  height: {
                                    duration: 0.6,
                                    ease: [0.4, 0, 0.2, 1],
                                  },
                                  opacity: { duration: 0.2 },
                                },
                              }}
                              className="overflow-hidden"
                            >
                              <div className="pb-4 space-y-4">
                                {item.items.map((subItem, subIndex) => (
                                  <motion.div
                                    key={subItem.label}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{
                                      opacity: 1,
                                      y: 0,
                                      transition: {
                                        delay: subIndex * 0.1,
                                        duration: 0.6,
                                        ease: [0.4, 0, 0.2, 1],
                                      },
                                    }}
                                  >
                                    <Link
                                      href={subItem.href}
                                      onClick={toggleMenu}
                                      className="block py-2 pl-4 text-gray-600 hover:text-blue-600 transition-colors"
                                    >
                                      {subItem.label}
                                    </Link>
                                  </motion.div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={toggleMenu}
                        className="block py-4 text-gray-800"
                      >
                        {item.label}
                      </Link>
                    )}
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: navItems.length * 0.15,
                    duration: 0.6,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  className="pt-4" // Added padding top for better spacing
                >
                  {/* <Link
                  href="/"
                  onClick={toggleMenu}
                  className="block w-full py-4 text-center rounded-md bg-[#4169E1] text-white font-medium hover:bg-blue-600 transition-colors"
                >
                  Contact
                </Link> */}
                  <button
                    // href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleMenu();
                      toggleContactPopup();
                    }}
                    className="block w-full py-4 text-center rounded-md bg-[#4169E1] text-white font-medium hover:bg-blue-600 transition-colors"
                  >
                    Contact
                  </button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <ContactPopup isOpen={isContactPopupOpen} onClose={toggleContactPopup} />
    </>
  );
}

function NavItem({
  item,
  scrollToSection,
}: {
  item: NavItem;
  scrollToSection: (sectionId: string) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (item.label === "Our Work") {
      e.preventDefault();
      scrollToSection("project-section");
    }
  };
  return (
    <div
      className="relative px-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        href={item.href}
        className="flex items-center space-x-1 py-2 text-gray-800 hover:text-blue-600 transition-colors"
        onClick={handleClick}
      >
        <span>{item.label}</span>
        {item.items && (
          <motion.div
            animate={{ rotate: isHovered ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        )}
      </Link>

      {item.items && (
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 top-full pt-2"
            >
              <div className="bg-white rounded-md shadow-lg py-2 min-w-[200px]">
                {item.items.map((subItem) => (
                  <Link
                    key={subItem.label}
                    href={subItem.href}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                  >
                    {subItem.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}

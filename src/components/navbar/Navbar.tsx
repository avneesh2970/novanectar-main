"use client";

import { useEffect, useMemo, useState, lazy, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import HamburgerIcon from "./HambergerIcon";
import { DMSans } from "@/fonts/font";

const ContactPopup = lazy(() =>
  import("../contact/ContactPopup").then((mod) => ({
    default: mod.ContactPopup,
  })),
);

const navItems = [
  { href: "/", label: "Home" },
  {
    href: "/",
    label: "Services",
    items: [
      { label: "Website Development", href: "/services/web-development" },
      { label: "App Development", href: "/services/mobile-development" },
      { label: "Graphic Design", href: "/services/graphic-designing" },
      { label: "Digital Marketing", href: "/services/digital-marketing" },
      {
        label: "Social Media Management",
        href: "/services/social-media-management",
      },
      { label: "SEO", href: "/services/seo" },
    ],
  },
  { href: "/portfolio", label: "Our work" },
  { href: "/about-us", label: "About us" },
  {
    href: "/blog",
    label: "Resources",
    items: [
      { label: "Blog", href: "/blog" },
      { label: "Event", href: "/event" },
      { label: "News", href: "/news" },
    ],
  },
  {
    href: "https://edu.novanectar.co.in/internships",
    label: "Career",
    items: [
      {
        label: "Internship",
        href: "https://edu.novanectar.co.in/internships",
      },
      {
        label: "Training",
        href: "https://edu.novanectar.co.in",
      },
    ],
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const desktopNav = useMemo(
    () =>
      navItems.map((item) => (
        <NavItem key={item.label} item={item} />
      )),
    [],
  );

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90 shadow-sm z-50 ${DMSans.className}`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/novanectar.png"
                alt="Novanectar Logo"
                width={200}
                height={50}
                className="w-auto h-12"
                priority
              />
            </Link>

            <div className="hidden lg:flex items-center justify-center flex-1 mx-8">
              {desktopNav}
            </div>

            <button
              onClick={() => setIsContactPopupOpen(true)}
              className="hidden lg:block px-4 py-2 rounded-md bg-[#4169E1] text-white font-medium hover:bg-blue-600 transition-colors"
            >
              Contact
            </button>

            <div className="lg:hidden">
              <HamburgerIcon
                isOpen={isOpen}
                toggleMenu={() => setIsOpen((prev) => !prev)}
              />
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-[#F8F9FA] max-h-[calc(100vh-5rem)] overflow-y-auto">
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <div key={item.label} className="border-b border-gray-200">
                  {item.items ? (
                    <div>
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedItem((prev) =>
                            prev === item.label ? null : item.label,
                          )
                        }
                        className="flex items-center justify-between w-full py-4 text-gray-800"
                      >
                        <span className="text-base">{item.label}</span>
                        <ChevronDown
                          className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                            expandedItem === item.label ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {expandedItem === item.label && (
                        <div className="pb-4 space-y-2">
                          {item.items.map((subItem) => (
                            <Link
                              key={subItem.label}
                              href={subItem.href}
                              onClick={() => setIsOpen(false)}
                              className="block py-2 pl-4 text-gray-600 hover:text-blue-600 transition-colors"
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="block py-4 text-gray-800"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}

              <div className="pt-4">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setIsContactPopupOpen(true);
                  }}
                  className="block w-full py-4 text-center rounded-md bg-[#4169E1] text-white font-medium hover:bg-blue-600 transition-colors"
                >
                  Contact
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {isContactPopupOpen && (
        <Suspense fallback={null}>
          <ContactPopup
            isOpen={isContactPopupOpen}
            onClose={() => setIsContactPopupOpen(false)}
          />
        </Suspense>
      )}
    </>
  );
}

function NavItem({
  item,
}: {
  item: {
    href: string;
    label: string;
    items?: { label: string; href: string }[];
  };
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative px-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        href={item.href}
        className="flex items-center space-x-1 py-2 text-gray-800 hover:text-blue-600 transition-colors"
      >
        <span className="whitespace-nowrap">{item.label}</span>
        {item.items && (
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              isHovered ? "rotate-180" : ""
            }`}
          />
        )}
      </Link>

      {item.items && isHovered && (
        <div className="absolute left-0 top-full pt-2">
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
        </div>
      )}
    </div>
  );
}

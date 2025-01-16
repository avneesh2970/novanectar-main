"use client"
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import gsap from "gsap";
import ellipse from "@/assets/footer/ellipse.png";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { DMSans } from "@/fonts/font";

const FooterSection = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (footerRef.current) {
      const ellipses = footerRef.current.querySelectorAll(".ellipse");
      gsap.to(ellipses, {
        y: -20,
        duration: 2,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
        stagger: {
          each: 0.5,
          from: "random",
        },
      });
    }
  }, []);

  const linkVariants = {
    hover: {
      y: -2,
      transition: {
        duration: 0.2,
      },
    },
  };

  const socialIcons = [
    {
      name: "Facebook",
      icon: Facebook,
      href: "https://www.facebook.com/share/a6ob9vX4d6uEAd3B/?mibextid=qi2Omg",
    },
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://www.instagram.com/novanectar_services_pvt.ltd?igsh=MXRoaHN3MGM5czYxZw==",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://www.linkedin.com/company/novanectar/",
    },
    {
      name: "YouTube",
      icon: Youtube,
      href: "https://youtube.com/@novanectarservicespvt.ltd.?si=NVJY1MQc_NfoVoSi",
    },
  ];

  return (
    <footer
      ref={footerRef}
      className={`relative bg-[#020817] text-white py-16 overflow-hidden ${DMSans.className}`}
    >
      {/* Floating Ellipses */}
      <div className="absolute left-0 top-0 ellipse">
        <Image
          src={ellipse || "/placeholder.svg"}
          alt="Decorative ellipse"
          width={100}
          height={100}
          className="opacity-50 blur-sm"
        />
      </div>
      <div className="absolute right-0 bottom-0 ellipse">
        <Image
          src={ellipse || "/placeholder.svg"}
          alt="Decorative ellipse"
          width={100}
          height={100}
          className="opacity-50 blur-sm"
        />
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="col-span-2 sm:col-span-2 md:col-span-1 md:text-start">
            <h2 className="text-2xl font-medium mb-4">NOVANECTAR</h2>
            <p className="text-sm text-gray-400">IT Services & IT Consulting</p>
            <div className="mt-4">
              <p className="text-sm text-gray-400">VISIT US</p>
              <p className="text-sm text-gray-400">GMS Road Dehradun</p>
              <p className="text-sm text-gray-400">Uttarakhand, India</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:text-start">
            <h3 className="text-sm font-medium mb-4">QUICK LINKS</h3>
            <ul className="space-y-2">
              {["Home", "About", "Services"].map((item) => (
                <motion.li
                  key={item}
                  variants={linkVariants}
                  whileHover="hover"
                  className="text-sm"
                >
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div className="md:text-start">
            <h3 className="text-sm font-medium mb-4">SOLUTIONS</h3>
            <ul className="space-y-2">
              {[
                "Web Development",
                "App Development",
                "UI/UX Design",
                "Graphic Design",
                "SEO",
                "Digital Marketing",
              ].map((item) => (
                <motion.li
                  key={item}
                  variants={linkVariants}
                  whileHover="hover"
                  className="text-sm"
                >
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Career and Legal */}
          <div className="md:text-start">
            <div className="mb-8">
              <h3 className="text-sm font-medium mb-4">CAREER</h3>
              <ul className="space-y-2">
                {["Jobs", "Internship", "Training"].map((item) => (
                  <motion.li
                    key={item}
                    variants={linkVariants}
                    whileHover="hover"
                    className="text-sm"
                  >
                    <Link
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {item}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-4">LEGAL</h3>
              <ul className="space-y-2">
                {["Privacy Policy", "Terms of Service"].map((item) => (
                  <motion.li
                    key={item}
                    variants={linkVariants}
                    whileHover="hover"
                    className="text-sm"
                  >
                    <Link
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {item}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          {/* Follow Us */}
          <div className="col-span-1 sm:col-span-2 md:col-span-1 md:text-start">
            <h3 className="text-sm font-medium mb-4">FOLLOW US</h3>
            <div className="flex flex-wrap gap-4">
              {socialIcons.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  variants={linkVariants}
                  whileHover="hover"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <social.icon className="w-6 h-6" />
                  <span className="sr-only">{social.name}</span>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;

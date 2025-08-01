"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import gsap from "gsap";
import ellipse from "@/assets/footer/ellipse.png";
import { Facebook, Instagram, Linkedin, Youtube, Twitter } from "lucide-react";
import { DMSans } from "@/fonts/font";
// import { scrollToSection } from "@/helpers/utils";

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
    {
      name: "Twitter",
      icon: Twitter,
      href: "https://x.com/nova_necta80067",
    },
  ];

  return (
    <footer
      ref={footerRef}
      className={`relative bg-[#020817] text-white pt-16 pb-8 overflow-hidden ${DMSans.className}`}
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
          <div className="col-span-2 sm:col-span-2 md:col-span-1 md:text-start text-center">
            <h2 className="text-2xl font-medium md:mb-4 mb-2 underline md:no-underline">
              NOVANECTAR
            </h2>
            <p className="text-sm text-gray-400">IT Services & IT Consulting</p>
            <div className="mt-4 hidden md:block">
              <p className="text-sm text-gray-400">VISIT US</p>
              <p className="text-sm text-gray-400">GMS Road Dehradun</p>
              <p className="text-sm text-gray-400">
                Uttarakhand, India - 248001
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:text-start">
            <h3 className="text-sm font-medium mb-4">QUICK LINKS</h3>
            <ul className="space-y-2">
              {[
                { name: "Home", id: "home-section" },
                { name: "About", id: "about-section" },
                { name: "Services", id: "services-section" },
              ].map((item) => (
                <motion.li
                  key={item.id}
                  variants={linkVariants}
                  whileHover="hover"
                  className="text-sm"
                >
                  <Link
                    href={`#${item.id}`}
                    className="text-gray-400 hover:text-white transition-colors"
                    // onClick={() => scrollToSection(item.id)}
                  >
                    {item.name}
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
                { name: "Web Development", id: "web-development" },
                { name: "App Development", id: "mobile-development" },
                { name: "Graphic Designing", id: "graphic-designing" },
                { name: "Digital Marketing", id: "digital-marketing" },
                {
                  name: "Social Media Management",
                  id: "social-media-management",
                },
                { name: "SEO", id: "seo" },
              ].map((item) => (
                <motion.li
                  key={item.id}
                  variants={linkVariants}
                  whileHover="hover"
                  className="text-sm"
                >
                  <Link
                    href={`/services/${item.id}`}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Career and Legal */}
          <div className="md:text-start">
            <div className="mb-4">
              <h3 className="text-sm font-medium mb-4">CAREER</h3>
              <ul className="space-y-2">
                {[
                  { name: "Jobs", link: "/career" },
                  {
                    name: "Internship",
                    link: "https://edu.novanectar.co.in/internships",
                  },
                  {
                    name: "Training",
                    link: "https://edu.novanectar.co.in/courses",
                  },
                ].map((item) => (
                  <motion.li
                    key={item.name}
                    variants={linkVariants}
                    whileHover="hover"
                    className="text-sm"
                  >
                    <Link
                      href={item.link}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {item.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className="hidden sm:block">
              <h4 className="text-sm font-medium mb-4">LEGAL</h4>
              <ul className="space-y-2">
                {/* {["Privacy Policy", "Terms of Service"].map((item) => ( */}
                {["Privacy Policy"].map((item) => (
                  <motion.li
                    key={item}
                    variants={linkVariants}
                    whileHover="hover"
                    className="text-sm"
                  >
                    <Link
                      href="/privacy"
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
          <div className="hidden sm:block col-span-1 sm:col-span-2 md:col-span-1 md:text-start">
            <h4 className="text-sm font-medium mb-4">FOLLOW US</h4>
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

          <div className="sm:hidden">
            <h3 className="text-sm font-medium mb-4">LEGAL</h3>
            <ul className="space-y-2">
              {/* {["Privacy Policy", "Terms of Service"].map((item) => ( */}
              {["Privacy Policy"].map((item) => (
                <motion.li
                  key={item}
                  variants={linkVariants}
                  whileHover="hover"
                  className="text-sm"
                >
                  <Link
                    href="/privacy"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
          <div className="sm:hidden col-span-1 sm:col-span-2 md:col-span-1 md:text-start">
            <h3 className="text-sm font-medium mb-4">FOLLOW US</h3>
            <div className="flex flex-wrap gap-4 w-60">
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
        <div className="mt-10 text-center sm:hidden">
          <p className="text-sm text-gray-400">VISIT US</p>
          <p className="text-sm text-gray-400">
            GMS Road Dehradun, Kamla Palace Chowk
          </p>
          <p className="text-sm text-gray-400">Uttarakhand, India - 248001</p>
        </div>
      </div>
      <div className="text-center mt-8">
        <p className="text-gray-400 text-xs sm:text-base">
          © {new Date().getFullYear()} All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;

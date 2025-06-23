"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Navbar from "@/components/navbar/Navbar";
import { DMSans } from "@/fonts/font";
import {
  Plus,
  CheckCircle,
  BarChart2,
  Users,
  Camera,
  MessageCircle,
  Target,
  Calendar,
} from "lucide-react";
import { Suspense } from "react";
import LoadingSpinner from "@/components/ui/loading-spinner";
import FAQSection from "@/components/faq/FaqSection";
import FooterSection from "@/components/footer/FooterSection";
import ContactForm from "@/components/contact/contact";
import { socialMediaFaqs } from "@/data/faqsData";

import ecommBg from "@/assets/services/socialMedia/ecommBg.webp";
import novanectarLogo from "@/assets/services/web-dev/novanectarLogo.webp";
import social1 from "@/assets/services/socialMedia/social1.webp";
import social2 from "@/assets/services/socialMedia/social2.webp";
import social3 from "@/assets/services/socialMedia/social3.webp";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// const iconFloat = {
//   y: [-5, 5, -5],
//   transition: {
//     duration: 2,
//     repeat: Number.POSITIVE_INFINITY,
//     ease: "easeInOut",
//   },
// }

const iconPulse = {
  scale: [1, 1.1, 1],
  transition: {
    duration: 2,
    repeat: Number.POSITIVE_INFINITY,
    ease: "easeInOut",
  },
};

const scaleOnHover = {
  scale: 1.02,
  transition: { duration: 0.2, ease: "easeInOut" },
};

export default function SocialMediaManagementPage() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  // Refs for scroll animations
  const heroRef = useRef(null);
  const introRef = useRef(null);
  const whyChooseRef = useRef(null);
  const servicesRef = useRef(null);
  const benefitsRef = useRef(null);
  const ctaRef = useRef(null);

  // InView hooks
  const heroInView = useInView(heroRef, { once: true, amount: 0.2 });
  const introInView = useInView(introRef, { once: true, amount: 0.2 });
  const whyChooseInView = useInView(whyChooseRef, { once: true, amount: 0.2 });
  const servicesInView = useInView(servicesRef, { once: true, amount: 0.1 });
  const benefitsInView = useInView(benefitsRef, { once: true, amount: 0.2 });
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.2 });

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const whyChooseItems = [
    {
      title: "Tailored Strategies",
      content:
        "We create custom strategies for your brand, not generic templates that everyone uses.",
      icon: <Target className="w-5 h-5" />,
    },
    {
      title: "Creative Excellence",
      content:
        "Compelling designs, reels, videos & carousels that make your brand stand out.",
      icon: <Camera className="w-5 h-5" />,
    },
    {
      title: "Full Account Management",
      content:
        "Complete management of accounts & ad campaigns so you can focus on your business.",
      icon: <Users className="w-5 h-5" />,
    },
    {
      title: "Real-time Engagement",
      content:
        "We engage with your audience in real-time, building trust and community.",
      icon: <MessageCircle className="w-5 h-5" />,
    },
    {
      title: "Transparent Reporting",
      content:
        "Monthly reports that focus on actual growth, not just vanity metrics.",
      icon: <BarChart2 className="w-5 h-5" />,
    },
  ];

  const socialMediaServices = [
    {
      title: "Strategy & Planning",
      description:
        "We begin by getting to know your brand, your voice, your audience and then we build a content plan to fit. From goal setting to picking the best platforms, we do it all.",
      icon: <Target className="w-6 h-6" />,
    },
    {
      title: "Content Creation & Designing",
      description: (
        <>
          Visuals matter most. Our team creates beautiful creatives,
          brand-centric{" "}
          <a
            href="https://novanectar.co.in/services/graphic-designing"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold font-sans hover:text-blue-500 transition-colors duration-150"
          >
            graphics
          </a>
          , captivating reels, and video content that resonates with your
          identity.
        </>
      ),

      icon: <Camera className="w-6 h-6" />,
    },
    {
      title: "Captions, Hashtags & Scheduling",
      description: (
        <>
          We create human-centric,{" "}
          <a
            href="https://en.wikipedia.org/wiki/Search_engine_optimization"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold font-sans hover:text-blue-500 transition-colors duration-150"
          >
            SEO-friendly
          </a>{" "}
          captions and engage relevant hashtags to help you get noticed—at the
          right moment, by the right people.,
        </>
      ),

      icon: <Calendar className="w-6 h-6" />,
    },
    {
      title: "Community Management",
      description:
        "We answer DMs, comments, mentions, and even complaints. It's all about establishing trust and demonstrating your brand is responsive and listening.",
      icon: <MessageCircle className="w-6 h-6" />,
    },
    {
      title: "Analytics & Reporting",
      description:
        "Data doesn't lie. Every month, we'll share a detailed report of how your content is performing so you see what's working and where we can improve.",
      icon: <BarChart2 className="w-6 h-6" />,
    },
  ];

  const benefits = [
    {
      title: "Smart, Strategic Thinking",
      content:
        "We are not just creatives, we are digital marketers who understand brand value.",
      icon: "🧠",
    },
    {
      title: "Client Collaboration",
      content: "Your feedback counts. We treat your business like our own.",
      icon: "🤝",
    },
    {
      title: "Tech-Driven Insights",
      content:
        "Driven by tools, analytics & AI suggestions for better results.",
      icon: "📊",
    },
    {
      title: "Time Saving",
      content: "Let us handle content while you focus on your core work.",
      icon: "⏰",
    },
    {
      title: "Scalable Plans",
      content:
        "Whether you are solopreneur or a multi-location business, we scale with your needs.",
      icon: "📈",
    },
  ];

  const ctaFeatures = [
    "Strategic planning",
    "Creative content",
    "Real-time engagement",
    "Growth-focused results",
  ];

  return (
    <>
      <style jsx global>{`
        .hero-heading {
          font-size: 4.7rem;
          line-height: 1.5;
          font-weight: 700;
          letter-spacing: 0.02em;
        }

        @media (max-width: 1024px) {
          .hero-heading {
            font-size: 4rem;
          }
        }

        @media (max-width: 768px) {
          .hero-heading {
            font-size: 3.5rem;
            line-height: 1.3;
          }
        }

        @media (max-width: 640px) {
          .hero-heading {
            font-size: 2.75rem;
            line-height: 1.2;
          }
        }

        @media (max-width: 480px) {
          .hero-heading {
            font-size: 2.25rem;
          }
        }

        .services-sticky-container {
          min-height: 100vh;
        }

        .services-sticky-heading {
          position: sticky;
          top: 8rem;
          height: fit-content;
        }

        @media (max-width: 1024px) {
          .services-sticky-heading {
            position: static;
            margin-bottom: 2rem;
          }
        }
      `}</style>
      <Navbar />
      <div className={`mt-20 min-h-screen bg-white ${DMSans.className}`}>
        {/* Hero Section */}
        <motion.div
          ref={heroRef}
          className="relative w-full py-10 md:py-16 lg:py-20 overflow-hidden"
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
        >
          <motion.div
            className="absolute z-10 right-0 top-4 md:top-8 px-4 md:px-8"
            initial={{ opacity: 0, x: 50 }}
            animate={heroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="text-white">
              <Image
                src={novanectarLogo}
                alt="NovaNectar Services Pvt. Ltd."
                width={240}
                height={60}
                className="object-contain w-[180px] md:w-[240px]"
                priority
              />
            </div>
          </motion.div>

          {/* Background pattern overlay */}
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.1, opacity: 0 }}
            animate={
              heroInView ? { scale: 1, opacity: 1 } : { scale: 1.1, opacity: 0 }
            }
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#4878AF] via-[#3a5f8a] to-[#2d4a6b]" />
            <div className="absolute inset-0 opacity-90">
              <Image
                src={ecommBg}
                alt="Social Media Background"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="mt-16 md:mt-20">
              <motion.h1
                className="hero-heading text-white mb-6 md:mb-10"
                variants={fadeInUp}
                initial="hidden"
                animate={heroInView ? "visible" : "hidden"}
                transition={{ delay: 0.3 }}
              >
                Social Media Management
                <br />
                with Smart IT Solution
              </motion.h1>

              <motion.div
                className="inline-block"
                initial={{ opacity: 0, y: 30 }}
                animate={
                  heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="tel:+918979891703"
                    className="inline-flex items-center bg-[#0A0A0A40] text-white px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base hover:bg-[#0A0A0A60] transition-colors duration-300"
                  >
                    BOOST YOUR SOCIAL MEDIA PRESENCE TODAY
                    <motion.svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 sm:h-5 sm:w-5 ml-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7 17L17 7M7 7h10v10"
                      />
                    </motion.svg>
                  </Link>
                </motion.div>
              </motion.div>

              <motion.div
                className="mt-6 md:mt-8 text-white text-xs sm:text-sm opacity-80"
                initial={{ opacity: 0 }}
                animate={heroInView ? { opacity: 0.8 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <Link
                  href="/"
                  className="hover:underline transition-all duration-200"
                >
                  https://novanectar.co.in/
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Introduction Section */}
        <motion.div
          ref={introRef}
          className="py-10 sm:py-12 md:py-16 bg-[#EDF6FF] overflow-hidden"
          initial="hidden"
          animate={introInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <motion.div className="w-full md:w-1/2" variants={fadeInLeft}>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0a0a0a] mb-4 md:mb-6">
                  Transform Your Social Media Presence
                </h2>
                <p className="text-[#424242] text-base sm:text-lg leading-relaxed mb-4">
                  In the fast-paced digital age today, having a robust presence
                  on social media is not a choice, it&apos;s a necessity. At{" "}
                  <a
                    href="https://novanectar.co.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold font-sans hover:text-blue-500 transition-colors duration-150"
                  >
                    NovaNectar
                  </a>
                  , we provide a{" "}
                  <a
                    href="https://novanectar.co.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold font-sans hover:text-blue-500 transition-colors duration-150"
                  >
                    Smart IT Solution
                  </a>{" "}
                  that integrates the strengths of creative content, strategic
                  planning, and data-driven insights to provide your brand with
                  a significant presence on social platforms such as Instagram,{" "}
                  <a
                    href="https://www.facebook.com/people/Novanectar-Services-Pvt-Ltd/61565824312345/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold font-sans hover:text-blue-500 transition-colors duration-150"
                  >
                    Facebook
                  </a>
                  ,{" "}
                  <a
                    href="https://www.linkedin.com/company/novanectar/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold font-sans hover:text-blue-500 transition-colors duration-150"
                  >
                    LinkedIn
                  </a>
                  ,{" "}
                  <a
                    href="https://www.youtube.com/@novanectarservicespvt.ltd."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold font-sans hover:text-blue-500 transition-colors duration-150"
                  >
                    YouTube
                  </a>
                  ,{" "}
                  <a
                    href="https://x.com/nova_necta80067"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold font-sans hover:text-blue-500 transition-colors duration-150"
                  >
                    Twitter
                  </a>
                  , and others.
                </p>
                <p className="text-[#424242] text-base sm:text-lg leading-relaxed">
                  Whether you&apos;re a startup trying to grow awareness or an
                  enterprise brand looking to scale your digital voice, our{" "}
                  <a
                    href="https://novanectar.co.in/services/social-media-management"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold font-sans hover:text-blue-500 transition-colors duration-150"
                  >
                    Social Media Management services
                  </a>{" "}
                  are designed to drive engagement, attract loyal customers, and
                  boost your online credibility.
                </p>
              </motion.div>
              <motion.div
                className="w-full md:w-1/2 mt-6 md:mt-0"
                variants={fadeInRight}
              >
                <div className="relative">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={social1}
                      alt="Social Media Management Dashboard"
                      width={600}
                      height={400}
                      className="w-full h-auto rounded-lg shadow-xl"
                    />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Why Choose Section */}
        <motion.div
          ref={whyChooseRef}
          className="py-10 sm:py-12 md:py-16 bg-[#EDF6FF] overflow-hidden"
          initial="hidden"
          animate={whyChooseInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col-reverse md:flex-row items-start gap-8 md:gap-12">
              <motion.div
                className="w-full md:w-1/2 mt-6 md:mt-0"
                variants={fadeInLeft}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={social2}
                  alt="Social Media Strategy Planning"
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-lg shadow-xl"
                  loading="lazy"
                />
              </motion.div>
              <motion.div
                className="w-full md:w-1/2 flex flex-col justify-center"
                variants={fadeInRight}
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0a0a0a] mb-4 md:mb-6">
                  What Makes NovaNectar a Smart IT Solution for Social Media?
                </h2>

                <p className="text-[#424242] text-base sm:text-lg leading-relaxed mb-6">
                  When you hire{" "}
                  <a
                    href="https://novanectar.co.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold font-sans hover:text-blue-500 transition-colors duration-150"
                  >
                    NovaNectar Smart IT Solution
                  </a>{" "}
                  , you&apos;re not only hiring a social media manager
                  —you&apos;re hiring a digital growth partner.
                </p>

                <motion.div className="space-y-2" variants={staggerContainer}>
                  {whyChooseItems.map((item, index) => (
                    <motion.div
                      key={index}
                      className="border-b border-gray-200 last:border-b-0"
                      variants={cardVariant}
                    >
                      <motion.button
                        className="w-full flex items-center justify-between py-3 text-left focus:outline-none group"
                        onClick={() => toggleAccordion(index)}
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span className="font-semibold text-[#0a0a0a] flex items-center text-sm sm:text-base">
                          <motion.span
                            className="flex items-center justify-center w-8 h-8 rounded-full bg-[#4878AF] text-white mr-3 group-hover:bg-[#3a5f8a] transition-colors duration-200"
                            animate={iconPulse}
                          >
                            {item.icon}
                          </motion.span>
                          {item.title}
                        </span>
                        <motion.span
                          className="text-[#4878AF] group-hover:text-[#3a5f8a] transition-colors duration-200"
                          animate={{ rotate: openAccordion === index ? 45 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Plus size={18} />
                        </motion.span>
                      </motion.button>

                      <AnimatePresence>
                        {openAccordion === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="pb-3 pl-11 text-[#424242] text-sm sm:text-base leading-relaxed">
                              {item.content}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Services Section */}
        <motion.div
          ref={servicesRef}
          className="py-10 sm:py-12 md:py-16 bg-white"
          initial="hidden"
          animate={servicesInView ? "visible" : "hidden"}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="services-sticky-container flex flex-col lg:flex-row gap-6 lg:gap-16">
              {/* Left side - Sticky Heading */}
              <motion.div className="w-full lg:w-5/12" variants={fadeInLeft}>
                <div className="services-sticky-heading">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0a0a0a]">
                    Our Social Media
                    <br className="hidden sm:block" />
                    Management Services
                    <br className="hidden sm:block" />
                    Include
                  </h2>
                </div>
              </motion.div>

              {/* Right side - Service Cards */}
              <motion.div
                className="w-full lg:w-7/12"
                variants={staggerContainer}
              >
                <div className="space-y-6 md:space-y-8">
                  {socialMediaServices.map((service, index) => (
                    <motion.div
                      key={index}
                      className="bg-white p-5 sm:p-6 md:p-8 rounded-xl border-2 border-[#4878AF] shadow-sm hover:shadow-md transition-shadow duration-300"
                      variants={cardVariant}
                      whileHover={scaleOnHover}
                    >
                      <div className="flex items-center gap-4 mb-3">
                        <motion.div
                          className="flex items-center justify-center w-10 h-10 rounded-full bg-[#4878AF] text-white text-xl"
                          // animate={iconFloat}
                          whileHover={{ scale: 1.2 }}
                        >
                          {service.icon}
                        </motion.div>
                        <h3 className="text-lg sm:text-xl font-bold text-[#0a0a0a]">
                          {service.title}
                        </h3>
                      </div>
                      <p className="text-[#424242] text-sm sm:text-base leading-relaxed">
                        {service.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          ref={benefitsRef}
          className="py-10 sm:py-12 md:py-16 bg-[#EDF6FF] overflow-hidden"
          initial="hidden"
          animate={benefitsInView ? "visible" : "hidden"}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-8 md:mb-12"
              variants={fadeInUp}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0a0a0a] mb-4 md:mb-6">
                Why Brands Choose NovaNectar Smart IT Solution?
              </h2>
              <p className="text-[#424242] text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
                We are a Smart IT Solution Company and that is what makes our
                social media services smarter, faster and more effective.
              </p>
            </motion.div>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
              variants={staggerContainer}
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-4 md:p-6 rounded-lg border-2 border-[#4878AF] text-center hover:shadow-md transition-shadow duration-300"
                  variants={cardVariant}
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div className="text-3xl mb-2">
                    {benefit.icon}
                  </motion.div>
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold text-[#0a0a0a] mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-[#424242] text-xs sm:text-sm">
                    {benefit.content}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          ref={ctaRef}
          className="py-10 sm:py-12 md:py-16 bg-[#EDF6FF] overflow-hidden"
          initial="hidden"
          animate={ctaInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="bg-white p-6 md:p-10 rounded-xl shadow-lg"
              variants={cardVariant}
            >
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                <motion.div
                  className="w-full md:w-1/2"
                  variants={fadeInLeft}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={social3}
                    alt="Social Media Growth Chart"
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-lg shadow-md"
                    loading="lazy"
                  />
                </motion.div>
                <motion.div className="w-full md:w-1/2" variants={fadeInRight}>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0a0a0a] mb-4 md:mb-6">
                    Ready to Grow Your Social Media Presence?
                  </h2>
                  <p className="text-[#424242] text-base sm:text-lg leading-relaxed mb-6">
                    Join hundreds of brands that have transformed their social
                    media presence with our strategic approach and creative
                    excellence.
                  </p>

                  <motion.div
                    className="grid grid-cols-2 gap-4 mb-6"
                    variants={staggerContainer}
                  >
                    {ctaFeatures.map((feature, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center"
                        variants={cardVariant}
                        whileHover={{ x: 5, color: "#4878AF" }}
                        transition={{ duration: 0.2 }}
                      >
                        <motion.div>
                          <CheckCircle className="text-[#4878AF] mr-2 w-5 h-5" />
                        </motion.div>
                        <span className="text-[#0a0a0a]">{feature}</span>
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href="tel:+918979891703"
                      className="inline-flex items-center bg-[#4878AF] text-white px-6 py-3 text-base hover:bg-[#3a5f8a] transition-colors duration-300 rounded-lg"
                    >
                      Get Your Free Social Media Audit
                      <motion.svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 ml-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        animate={{ x: [0, 3, 0] }}
                        transition={{
                          duration: 1.5,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7 17L17 7M7 7h10v10"
                        />
                      </motion.svg>
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* FAQ Section */}
      <Suspense fallback={<LoadingSpinner />}>
        <div className="content-visibility-auto">
          <FAQSection faqs={socialMediaFaqs} />
        </div>
      </Suspense>
      <ContactForm />
      <FooterSection />
    </>
  );
}

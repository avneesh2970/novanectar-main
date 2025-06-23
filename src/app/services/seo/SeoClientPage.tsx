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
  Search,
  Users,
  FileText,
  MapPin,
} from "lucide-react";
import { Suspense } from "react";
import LoadingSpinner from "@/components/ui/loading-spinner";
import FAQSection from "@/components/faq/FaqSection";
import FooterSection from "@/components/footer/FooterSection";
import { seoFaqs } from "@/data/faqsData";
import seoBg from "@/assets/services/seo/seoBg.webp";
import novanectarLogo from "@/assets/services/web-dev/novanectarLogo.webp";
import seo1 from "@/assets/services/seo/seo1.webp";
import seo2 from "@/assets/services/seo/seo2.webp";
import seo3 from "@/assets/services/seo/seo3.webp";
import ContactForm from "@/components/contact/contact";

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

const iconPulse = {
  scale: [1, 1.1, 1],
  transition: {
    duration: 2,
    repeat: Number.POSITIVE_INFINITY,
    ease: "easeInOut",
  },
};

export default function SeoServicePage() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  // Refs for scroll animations
  const heroRef = useRef(null);
  const introRef = useRef(null);
  const whyChooseRef = useRef(null);
  const processRef = useRef(null);
  const industriesRef = useRef(null);
  const resultsRef = useRef(null);
  const ctaRef = useRef(null);

  // InView hooks
  const heroInView = useInView(heroRef, { once: true, amount: 0.2 });
  const introInView = useInView(introRef, { once: true, amount: 0.2 });
  const whyChooseInView = useInView(whyChooseRef, { once: true, amount: 0.2 });
  const processInView = useInView(processRef, { once: true, amount: 0.1 });
  const industriesInView = useInView(industriesRef, {
    once: true,
    amount: 0.2,
  });
  const resultsInView = useInView(resultsRef, { once: true, amount: 0.2 });
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.2 });

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const accordionItems = [
    {
      title: "Decades of SEO Mastery",
      content: (
        <>
          Our senior consultants have been optimizing{" "}
          {/* <a
            href="https://novanectar.co.in/services/seo"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold font-sans hover:text-blue-500 transition-colors duration-150"
          > */}
          websites
          {/* </a>{" "} */}
          since the early days of search engines.
        </>
      ),
      icon: <BarChart2 className="w-5 h-5" />,
    },
    {
      title: "Local Expertise",
      content: (
        <>
          As an established{" "}
          {/* <a
            href="https://novanectar.co.in/services/seo"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold font-sans hover:text-blue-500 transition-colors duration-150"
          > */}
          SEO consultant in Dehradun
          {/* </a> */}, we understand regional markets and user intent deeply.
        </>
      ),
      icon: <MapPin className="w-5 h-5" />,
    },
    {
      title: "solutions",
      content:
        "We do not believe in templates. Every client get a custom built seo plan based on their business and competition",
      icon: <FileText className="w-5 h-5" />,
    },
    {
      title: "Transparent Communication",
      content:
        "You get monthly progress reports, keyword rank tracking and constant support.",
      icon: <Users className="w-5 h-5" />,
    },
  ];

  const seoProcess = [
    {
      title: "Website Audit & Competitive Analysis",
      description: (
        <>
          At{" "}
          <a
            href="https://novanectar.co.in"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold font-sans hover:text-blue-500 transition-colors duration-150"
          >
            Novanectar Smart IT Solution
          </a>{" "}
          we assess your current site, analyze and competitors and Build a
          Winning Roadmap, icon: <Search className="w-6 h-6" />,
        </>
      ),
    },
    {
      title: "Keyword Research & Content Planning",
      description: (
        <>
          We Find the{" "}
          <a
            href="https://business.google.com/in/ad-tools/keyword-planner/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold font-sans hover:text-blue-500 transition-colors duration-150"
          >
            best keywords
          </a>{" "}
          to target.
        </>
      ),
      icon: <FileText className="w-6 h-6" />,
    },
    {
      title: "On-Page SEO",
      description: (
        <>
          We create quality backlinks via guest blogs, business citations,
          outreach, and {""}
          {/* <a
            href="https://en.wikipedia.org/wiki/Online_presence_management"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold font-sans hover:text-blue-500 transition-colors duration-150"
          > */}
          online PR.
          {/* </a> */}
        </>
      ),
      icon: <BarChart2 className="w-6 h-6" />,
    },
    {
      title: "Local SEO",
      description: (
        <>
          We enhance your local search visibility by optimizing your{" "}
          <a
            href="https://g.co/kgs/3XBPS4S"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold font-sans hover:text-blue-500 transition-colors duration-150"
          >
            Google Business Profile
          </a>
          , local directories, and map listings.
        </>
      ),

      icon: <MapPin className="w-6 h-6" />,
    },
    {
      title: "Performance Tracking & Monthly Reports",
      description:
        "You receive in-depth information about keyword rankings, web traffic, and conversion optimization.",
      icon: <Users className="w-6 h-6" />,
    },
  ];

  const industries = [
    {
      name: "Real Estate",
      icon: "🏢",
    },
    {
      name: "Education & Coaching",
      icon: "🎓",
    },
    {
      name: "Travel & Tourism",
      icon: "✈️",
    },
    {
      name: "Fashion & eCommerce",
      icon: "👕",
    },
    {
      name: "Healthcare & Clinics",
      icon: "🏥",
    },
    {
      name: "Local Service Providers",
      icon: "🔧",
    },
    {
      name: "Startups & SaaS Companies",
      icon: "🚀",
    },
  ];

  const benefits = [
    "Expert consultation",
    "Transparent pricing",
    "Custom strategy",
    "Long-term support",
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
        a {
          /* font-family: sans-serif; */
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

        .process-timeline::before {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          left: 50%;
          width: 2px;
          background-color: #4878af;
          transform: translateX(-50%);
        }

        @media (max-width: 768px) {
          .process-timeline::before {
            left: 20px;
          }
        }

        .stats-card {
          position: relative;
          overflow: hidden;
        }

        .stats-card::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: linear-gradient(90deg, #4878af 0%, #3a5f8a 100%);
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
                src={novanectarLogo || "/placeholder.svg"}
                alt="Novanectar Services Pvt. Ltd."
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
                src={seoBg || "/placeholder.svg"}
                alt="SEO Background"
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
                SEO Service with
                <br />
                Smart IT Solution
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
                    BOOST YOUR SEARCH RANKINGS TODAY
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
                  Rank Higher with Smart IT Solution
                </h2>
                <p className="text-[#424242] text-base sm:text-lg leading-relaxed mb-4">
                  In Today digital first world your online presence is the most
                  valuable asset. At Smart IT Solution we NONANECTAR bring over
                  10 years of combined SEO Experience to the table, offering
                  premium{" "}
                  <a
                    href="https://novanectar.co.in/services/seo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold font-sans hover:text-blue-500 transition-colors duration-150"
                  >
                    SEO Service in dehradun
                  </a>{" "}
                  that help business grow organically and sustainably.
                </p>
                <p className="text-[#424242] text-base sm:text-lg leading-relaxed">
                  Whether you are a small local business or a large enterprise.
                  Our{" "}
                  <a
                    href="https://novanectar.co.in/services/seo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold font-sans hover:text-blue-500 transition-colors duration-150"
                  >
                    seo strategies
                  </a>{" "}
                  are data driven, time tested and designed for long term
                  success.
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
                      src={seo1 || "/placeholder.svg"}
                      alt="SEO analytics dashboard"
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

        {/* Why Choose Section - MODERNIZED WITH ACCORDION */}
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
                  src={seo2 || "/placeholder.svg"}
                  alt="SEO expert analyzing website"
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
                  What Makes Us the Best SEO Company in Dehradun?
                </h2>

                <p className="text-[#424242] text-base sm:text-lg leading-relaxed mb-6">
                  With decades of experience, we have seen SEO evolve and have
                  been involved with it. Here&apos;s why over 200+ businesses
                  trust{" "}
                  <a
                    href="https://novanectar.co.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold font-sans hover:text-blue-500 transition-colors duration-150"
                  >
                    Smart IT Solution
                  </a>
                  :
                </p>

                <motion.div className="space-y-2" variants={staggerContainer}>
                  {accordionItems.map((item, index) => (
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

        {/* SEO Process Section */}

        <motion.div
          ref={processRef}
          className="py-10 sm:py-12 md:py-16 bg-white"
          initial="hidden"
          animate={processInView ? "visible" : "hidden"}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-16">
              {/* Left side - Sticky Heading */}
              <motion.div className="w-full lg:w-5/12" variants={fadeInLeft}>
                <div className="sticky top-24">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0a0a0a]">
                    Our Proven
                    <br className="hidden sm:block" />
                    SEO Process
                  </h2>
                  <p className="text-[#424242] text-base sm:text-lg mt-4">
                    We follow 360{" "}
                    <a
                      href="https://en.wikipedia.org/wiki/Search_engine_optimization"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold font-sans hover:text-blue-500 transition-colors duration-150"
                    >
                      SEO Framework
                    </a>{" "}
                    that gets result
                  </p>
                </div>
              </motion.div>

              {/* Right side - Process Cards */}
              <motion.div
                className="w-full lg:w-7/12"
                variants={staggerContainer}
              >
                <div className="space-y-6 md:space-y-8">
                  {seoProcess.map((process, index) => (
                    <motion.div
                      key={index}
                      className="bg-white p-5 sm:p-6 md:p-8 rounded-xl border-2 border-[#4878AF] shadow-sm hover:shadow-md transition-shadow duration-300"
                      variants={cardVariant}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center gap-4 mb-3">
                        <motion.div
                          className="flex items-center justify-center w-10 h-10 rounded-full bg-[#4878AF] text-white text-xl"
                          whileHover={{ scale: 1.2 }}
                        >
                          {process.icon}
                        </motion.div>
                        <h3 className="text-lg sm:text-xl font-bold text-[#0a0a0a]">
                          {process.title}
                        </h3>
                      </div>
                      <p className="text-[#424242] text-sm sm:text-base leading-relaxed">
                        {process.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Industries Section */}
        <motion.div
          ref={industriesRef}
          className="py-10 sm:py-12 md:py-16 bg-[#EDF6FF] overflow-hidden"
          initial="hidden"
          animate={industriesInView ? "visible" : "hidden"}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-8 md:mb-12"
              variants={fadeInUp}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0a0a0a] mb-4 md:mb-6">
                Who Can Benefit from Our SEO Services in Dehradun?
              </h2>
              <p className="text-[#424242] text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
                We have helped over 200 clients from industries like:
              </p>
            </motion.div>
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6"
              variants={staggerContainer}
            >
              {industries.map((industry, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-4 md:p-6 rounded-lg border-2 border-[#4878AF] text-center hover:shadow-md transition-shadow duration-300"
                  variants={cardVariant}
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div className="text-3xl mb-2">
                    {industry.icon}
                  </motion.div>
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold text-[#0a0a0a]">
                    {industry.name}
                  </h3>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Results Section */}
        <motion.div
          ref={resultsRef}
          className="py-10 sm:py-12 md:py-16 bg-white overflow-hidden"
          initial="hidden"
          animate={resultsInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-8 md:mb-12"
              variants={fadeInUp}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0a0a0a] mb-4 md:mb-6">
                Trusted by Dehradun&apos;s Top Brands
              </h2>
              <p className="text-[#424242] text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
                Our work does the talking. Smart IT Solution has ranked 100+
                websites on Page 1 of Google. Clients in Dehradun and elsewhere
                have seen a 300%+ boost in organic traffic and 2x to 5x growth
                in leads.
              </p>
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
                    src={seo3 || "/placeholder.svg"}
                    alt="SEO growth chart"
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-lg shadow-md"
                    loading="lazy"
                  />
                </motion.div>
                <motion.div className="w-full md:w-1/2" variants={fadeInRight}>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0a0a0a] mb-4 md:mb-6">
                    Ready to Rank? Let&apos;s Grow Together
                  </h2>
                  <p className="text-[#424242] text-base sm:text-lg leading-relaxed mb-6">
                    Join the 200+ businesses that have transformed their online
                    presence with our proven SEO strategies.
                  </p>

                  <motion.div
                    className="grid grid-cols-2 gap-4 mb-6"
                    variants={staggerContainer}
                  >
                    {benefits.map((benefit, index) => (
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
                        <span className="text-[#0a0a0a]">{benefit}</span>
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
                      Get Your Free SEO Audit
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
          <FAQSection faqs={seoFaqs} />
        </div>
      </Suspense>
      <ContactForm />
      <FooterSection />
    </>
  );
}

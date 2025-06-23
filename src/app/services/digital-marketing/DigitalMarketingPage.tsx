"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { DMSans } from "@/fonts/font";
import FooterSection from "@/components/footer/FooterSection";
import Navbar from "@/components/navbar/Navbar";
import { Suspense } from "react";
import FAQSection from "@/components/faq/FaqSection";
import LoadingSpinner from "@/components/ui/loading-spinner";
import {
  Search,
  MessageCircle,
  MousePointer,
  FileText,
  Mail,
  Star,
  Globe,
  Smartphone,
  Palette,
  ShoppingCart,
  MapPin,
  BarChart2,
  Store,
  Briefcase,
  Scissors,
  BookOpen,
  CheckCircle,
} from "lucide-react";
import digitalMarkBg from "@/assets/services/digital-marketing/digitalMarkBg.webp";
import novanectarLogo from "@/assets/services/web-dev/novanectarLogo.webp";
import digitalMark1 from "@/assets/services/digital-marketing/digitalMark1.webp";
import digitalMark2 from "@/assets/services/digital-marketing/digitalMark2.webp";
import digitalMark3 from "@/assets/services/digital-marketing/digitalMark3.webp";
import digitalMark4 from "@/assets/services/digital-marketing/digitalMark4.webp";
import { digitalMarketingFaqs } from "@/data/faqsData";
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

const scaleOnHover = {
  scale: 1.02,
  transition: { duration: 0.2, ease: "easeInOut" },
};

export default function DigitalMarketingClientPage() {
  // Refs for scroll animations
  const heroRef = useRef(null);
  const introRef = useRef(null);
  const whyChooseRef = useRef(null);
  const servicesRef = useRef(null);
  const expertiseRef = useRef(null);
  const clientsRef = useRef(null);
  const processRef = useRef(null);
  const ctaRef = useRef(null);

  // InView hooks
  const heroInView = useInView(heroRef, { once: true, amount: 0.2 });
  const introInView = useInView(introRef, { once: true, amount: 0.2 });
  const whyChooseInView = useInView(whyChooseRef, { once: true, amount: 0.2 });
  const servicesInView = useInView(servicesRef, { once: true, amount: 0.1 });
  const expertiseInView = useInView(expertiseRef, { once: true, amount: 0.2 });
  const clientsInView = useInView(clientsRef, { once: true, amount: 0.2 });
  const processInView = useInView(processRef, { once: true, amount: 0.2 });
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.2 });

  const digitalMarketingServices = [
    {
      title: "Search Engine Optimization (SEO)",
      description: (
        <>
          <a
            href="https://novanectar.co.in/services/seo"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold font-sans hover:text-blue-500 transition-colors duration-150"
          >
            Search Engine Optimization{" "}
          </a>
          makes your site come up on the first page of Google when customers
          look for your services or products. We optimize your website
          structure, content, and online profile to achieve more traffic and
          quality leads naturally.
        </>
      ),
      icon: <Search className="w-6 h-6" />,
    },
    {
      title: "Social Media Marketing (SMM)",
      description: (
        <>
          We advertise your business on sites such as{" "}
          <a
            href="https://www.instagram.com/novanectar_services_pvt.ltd"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold font-sans hover:text-blue-500 transition-colors duration-150"
          >
            Instagram
          </a>
          ,{" "}
          <a
            href="https://www.facebook.com/people/Novanectar-Services-Pvt-Ltd/61565824312345/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold font-sans hover:text-blue-500 transition-colors duration-150"
          >
            Facebook
          </a>
          , and LinkedIn. This creates brand awareness, engages your audience,
          and drives new customers through creative posts and sponsored
          advertisements. So this is actually known as{" "}
          <a
            href="https://novanectar.co.in/services/social-media-management"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold font-sans hover:text-blue-500 transition-colors duration-150"
          >
            SMM
          </a>{" "}
        </>
      ),
      icon: <MessageCircle className="w-6 h-6" />,
    },
    {
      title: "Google & Facebook Ads (PPC)",
      description: (
        <>
          {/* <a
            href="https://en.wikipedia.org/wiki/Advertising"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold font-sans hover:text-blue-500 transition-colors duration-150"
          > */}
          Paid ads
          {/* </a>{" "} */}
          bring instant visibility to your business. We run targeted ad
          campaigns on Google and social media to generate high-quality leads
          within your budget, and track every rupee spent for better {" "}<a
            href="https://en.wikipedia.org/wiki/Return_on_investment"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold font-sans hover:text-blue-500 transition-colors duration-150"
          >
            ROI
          </a>
        </>
      ),
      icon: <MousePointer className="w-6 h-6" />,
    },
    {
      title: "Content Marketing",
      description: (
        <>
          Good content builds trust. We write blogs, product descriptions, and
          web pages that educate, attract, and convert your audience. Our
          content is also optimized for SEO to improve Google ranking.
        </>
      ),
      icon: <FileText className="w-6 h-6" />,
    },
    {
      title: "Email Marketing",
      description:
        "Email marketing helps you stay connected with your customers. We set up automated emails, newsletters, and promotions to drive repeat business and customer loyalty.",
      icon: <Mail className="w-6 h-6" />,
    },
    {
      title: "Online Reputation Management (ORM)",
      description:
        "What people say about your brand online matters. We help you manage reviews, ratings, and mentions to maintain a positive brand image and win customer trust.",
      icon: <Star className="w-6 h-6" />,
    },
    {
      title: "Website Development",
      description: (
        <>
          Your{" "}
          {/* <a
            href="https://novanectar.co.in/services/web-development"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold font-sans hover:text-blue-500 transition-colors duration-150"
          > */}
          website
          {/* </a>{" "} */} is your digital storefront, we make sure it leaves a
          lasting impression. From fast-loading pages to mobile responsiveness
          and SEO-readiness, we build modern, conversion-focused websites that
          reflect your brand and drive results.
        </>
      ),
      icon: <Globe className="w-6 h-6" />,
    },
    {
      title: "App Development",
      description: (
        <>
          We develop high-performance{" "}
          <a
            href="https://novanectar.co.in/services/mobile-development"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold font-sans hover:text-blue-500 transition-colors duration-150"
          >
            Android and iOS applications
          </a>{" "}
          that are intuitive, feature-rich, and tailored to your business goals.
          Whether you&apos;re launching a new startup or expanding your
          services, we turn your app idea into a reality.
        </>
      ),
      icon: <Smartphone className="w-6 h-6" />,
    },
    {
      title: "Graphic Design",
      description: (
        <>
          Our creative team{" "}
          <a
            href="https://novanectar.co.in/services/graphic-designing"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold font-sans hover:text-blue-500 transition-colors duration-150"
          >
            designs
          </a>{" "}
          everything from logos, social media creatives, brochures, banners, to
          full brand identity kits. Clean, consistent, and compelling graphics
          to elevate your brand presence across all platforms.
        </>
      ),
      icon: <Palette className="w-6 h-6" />,
    },
    {
      title: "eCommerce Solutions",
      description: (
        <>
          Ready to sell online? We build{" "}
          {/* <a
            href="https://novanectar.co.in/services/social-media-management"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold font-sans hover:text-blue-500 transition-colors duration-150"
          > */}
          powerful eCommerce platforms
          {/* </a> */} with secure payment integration, product management, and
          user-friendly interfaces. From Shopify and WooCommerce to custom
          builds, we help you grow your online store and drive sales 24/7.
        </>
      ),
      icon: <ShoppingCart className="w-6 h-6" />,
    },
  ];

  const clientTypes = [
    {
      name: "Local stores wanting more foot traffic",
      icon: <Store className="w-8 h-8" />,
    },
    {
      name: "Startups requiring visibility",
      icon: <Briefcase className="w-8 h-8" />,
    },
    {
      name: "Service providers such as yoga classes, salons, clinics",
      icon: <Scissors className="w-8 h-8" />,
    },
    {
      name: "Educational institutions, tour operators, etc.",
      icon: <BookOpen className="w-8 h-8" />,
    },
  ];

  const processSteps = [
    "Free business understanding consultation",
    "Website and social audit",
    "Tailor-made strategy planning",
    "Execution by professionals",
    "Monthly progress and growth monitoring",
  ];

  const benefits = [
    "Local Expertise",
    "Proven Results",
    "Transparent Reporting",
    "Dedicated Support",
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
            <div className="absolute inset-0 bg-gradient-to-br from-[#4a4b4b] via-[#303336] to-[#494949]" />
            <div className="absolute inset-0 opacity-50">
              <Image
                src={digitalMarkBg || "/placeholder.svg"}
                alt="Digital Marketing Background"
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
                Digital Marketing Services with Smart IT Solution
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
                    GROW YOUR BUSINESS ONLINE TODAY
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
                  Grow Your Business with Smart IT Solution
                </h2>
                <p className="text-[#424242] text-base sm:text-lg leading-relaxed">
                  At{" "}
                  <a
                    href="https://novanectar.co.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold font-sans hover:text-blue-500 transition-colors duration-150"
                  >
                    Smart IT Solution
                  </a>
                  , we assist companies in growing online through proven{" "}
                  <a
                    href="https://novanectar.co.in/services/digital-marketing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold font-sans hover:text-blue-500 transition-colors duration-150"
                  >
                    digital marketing companies in dehradun
                  </a>{" "}
                  strategies. From driving your website traffic to converting
                  ads, we provide end-to-end solutions under one umbrella.
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
                      src={digitalMark1 || "/placeholder.svg"}
                      alt="Digital Marketing Team"
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
          className="py-10 sm:py-12 md:py-16 bg-white overflow-hidden"
          initial="hidden"
          animate={whyChooseInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12">
              <motion.div
                className="w-full md:w-1/2 mt-6 md:mt-0"
                variants={fadeInLeft}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={digitalMark2 || "/placeholder.svg"}
                  alt="Digital Marketing Strategy"
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-lg shadow-xl"
                  loading="lazy"
                />
              </motion.div>
              <motion.div className="w-full md:w-1/2" variants={fadeInRight}>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0a0a0a] mb-4 md:mb-6">
                  Why Choose Our Digital Marketing Services?
                </h2>
                <p className="text-[#424242] text-base sm:text-lg leading-relaxed">
                  We know the local market, have a talented team, and provide
                  measurable results. From SEO, social media, to paid ads, we
                  develop tailored strategies according to your business
                  objectives and budget. And, we give you complete transparency
                  in what we do and report. So We are the best Digital Marketing
                  Companies in dehradun.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Services Section - With Sticky Scroll */}
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
                    Our Core Digital
                    <br className="hidden sm:block" />
                    Marketing Services
                  </h2>
                </div>
              </motion.div>

              {/* Right side - Service Cards */}
              <motion.div
                className="w-full lg:w-7/12"
                variants={staggerContainer}
              >
                <div className="space-y-6 md:space-y-8">
                  {digitalMarketingServices.map((service, index) => (
                    <motion.div
                      key={index}
                      className="bg-white p-5 sm:p-6 md:p-8 rounded-xl border-2 border-[#4878AF] shadow-sm hover:shadow-md transition-shadow duration-300"
                      variants={cardVariant}
                      whileHover={scaleOnHover}
                    >
                      <div className="flex items-start">
                        <motion.div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#4878AF] text-white mr-4 flex-shrink-0">
                          {service.icon}
                        </motion.div>
                        <div>
                          <h3 className="text-lg sm:text-xl font-bold text-[#0a0a0a] mb-3 md:mb-4">
                            {service.title}
                          </h3>
                          <p className="text-[#424242] text-sm sm:text-base leading-relaxed">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Local Expertise & Data-Driven Approach Section */}
        <motion.div
          ref={expertiseRef}
          className="py-10 sm:py-12 md:py-16 bg-[#EDF6FF] overflow-hidden"
          initial="hidden"
          animate={expertiseInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <motion.div
                className="bg-white p-6 md:p-8 rounded-xl border-2 border-[#4878AF] shadow-sm"
                variants={cardVariant}
                whileHover={scaleOnHover}
              >
                <div className="flex items-center mb-4">
                  <motion.div>
                    <MapPin className="w-8 h-8 text-[#4878AF] mr-3" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-[#0a0a0a]">
                    Local Expertise That Makes a Difference
                  </h3>
                </div>
                <p className="text-[#424242] text-base leading-relaxed">
                  We are based in Dehradun, we understand local customer
                  behaviour, trends and competition. This Help us Design more
                  relevant campaigns that speak to your local audience and get
                  the faster result
                </p>
              </motion.div>

              <motion.div
                className="bg-white p-6 md:p-8 rounded-xl border-2 border-[#4878AF] shadow-sm"
                variants={cardVariant}
                whileHover={scaleOnHover}
              >
                <div className="flex items-center mb-4">
                  <motion.div>
                    <BarChart2 className="w-8 h-8 text-[#4878AF] mr-3" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-[#0a0a0a]">
                    Data-Driven & Transparent Approach
                  </h3>
                </div>
                <p className="text-[#424242] text-base leading-relaxed">
                  So we do not run campaigns. We track everything, from website
                  visits to conversions,we share monthly reports so you know
                  exactly how your marketing is performing. No guesswork, just
                  clear insights
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Who Do We Work With Section */}
        <motion.div
          ref={clientsRef}
          className="py-10 sm:py-12 md:py-16 bg-[#EDF6FF] overflow-hidden"
          initial="hidden"
          animate={clientsInView ? "visible" : "hidden"}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-8 md:mb-12"
              variants={fadeInUp}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0a0a0a] mb-4 md:mb-6">
                Who Do We Work With?
              </h2>
              <p className="text-[#424242] text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
                So we work with:
              </p>
            </motion.div>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
              variants={staggerContainer}
            >
              {clientTypes.map((client, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-4 md:p-6 rounded-lg border-2 border-[#4878AF] text-center hover:shadow-md transition-shadow duration-300"
                  variants={cardVariant}
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div className="text-[#4878AF] mb-3 flex justify-center">
                    {client.icon}
                  </motion.div>
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold text-[#0a0a0a]">
                    {client.name}
                  </h3>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Process Section */}
        <motion.div
          ref={processRef}
          className="py-10 sm:py-12 md:py-16 bg-white overflow-hidden"
          initial="hidden"
          animate={processInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <motion.div className="w-full md:w-1/2" variants={fadeInLeft}>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0a0a0a] mb-4 md:mb-6">
                  How We Work (Our Process)
                </h2>
                <motion.div className="space-y-4" variants={staggerContainer}>
                  {processSteps.map((step, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center"
                      variants={cardVariant}
                    >
                      <motion.div
                        className="flex items-center justify-center w-8 h-8 rounded-full bg-[#4878AF] text-white font-bold text-sm mr-4 flex-shrink-0"
                        whileHover={{ scale: 1.1 }}
                      >
                        {index + 1}
                      </motion.div>
                      <p className="text-[#424242] text-base">{step}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
              <motion.div
                className="w-full md:w-1/2 mt-6 md:mt-0"
                variants={fadeInRight}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={digitalMark3 || "/placeholder.svg"}
                  alt="Digital Marketing Companies in Dehradun"
                  width={600}
                  height={400}
                  className="w-full h-[25rem] rounded-lg shadow-xl"
                />
              </motion.div>
            </div>
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
                    src={digitalMark4 || "/placeholder.svg"}
                    alt="Digital Marketing Analytics"
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-lg shadow-md"
                    loading="lazy"
                  />
                </motion.div>
                <motion.div className="w-full md:w-1/2" variants={fadeInRight}>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0a0a0a] mb-4 md:mb-6">
                    Ready to Grow Your Business Online?
                  </h2>
                  <p className="text-[#424242] text-base sm:text-lg leading-relaxed mb-6">
                    Join the 150+ businesses that have transformed their online
                    presence with our proven digital marketing strategies.
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
                      >
                        <CheckCircle className="text-[#4878AF] mr-2 w-5 h-5" />
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
                      Get Your Free Digital Marketing Consultation
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
      <ContactForm />
      {/* FAQ Section */}
      <Suspense fallback={<LoadingSpinner />}>
        <div className="content-visibility-auto">
          <FAQSection faqs={digitalMarketingFaqs} />
        </div>
      </Suspense>

      <FooterSection />
    </>
  );
}

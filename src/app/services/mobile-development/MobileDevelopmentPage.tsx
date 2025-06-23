"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Navbar from "@/components/navbar/Navbar";
import { DMSans } from "@/fonts/font";
import { Plus } from "lucide-react";
import { Suspense } from "react";
import LoadingSpinner from "@/components/ui/loading-spinner";
import FAQSection from "@/components/faq/FaqSection";
import FooterSection from "@/components/footer/FooterSection";
import mobileDevBg from "@/assets/services/mobile-dev/mobleBg.webp";
import novanecatrLogo from "@/assets/services/web-dev/novanectarLogo.webp";
import mobileDev1 from "@/assets/services/mobile-dev/mobileDev1.webp";
import mobileDev2 from "@/assets/services/mobile-dev/mobileDev2.webp";
import mobileDev3 from "@/assets/services/mobile-dev/mobileDev3.webp";
import { mobileDevFaqs } from "@/data/faqsData";
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

export default function MobileDevelopmentPage() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  // Refs for scroll animations
  const heroRef = useRef(null);
  const transformRef = useRef(null);
  const whyChooseRef = useRef(null);
  const servicesRef = useRef(null);
  const industriesRef = useRef(null);
  const technologiesRef = useRef(null);
  const ctaRef = useRef(null);

  // InView hooks
  const heroInView = useInView(heroRef, { once: true, amount: 0.2 });
  const transformInView = useInView(transformRef, { once: true, amount: 0.2 });
  const whyChooseInView = useInView(whyChooseRef, { once: true, amount: 0.2 });
  const servicesInView = useInView(servicesRef, { once: true, amount: 0.1 });
  const industriesInView = useInView(industriesRef, {
    once: true,
    amount: 0.2,
  });
  const technologiesInView = useInView(technologiesRef, {
    once: true,
    amount: 0.2,
  });
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.2 });

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const accordionItems = [
    {
      title: "Local Expertise with Global Standards",
      content: (
        <>
          As a Dehradun-based company, we understand the local market while
          staying updated with global tech trends. Our focus on Smart IT
          Solutions ensures your app is both beautifully designed and
          technologically strong.
        </>
      ),
    },
    {
      title: "Expert Team Collaboration",
      content: (
        <>
          Our team includes expert developers,{" "}
          <a
            href="https://novanectar.co.in/services/graphic-design"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold font-sans hover:text-blue-500 transition-colors duration-150"
          >
            UI/UX
          </a>{" "}
          designers project managers, and QA specialists who collaborate to
          deliver high-quality applications that create digital experiences your
          users will love.
        </>
      ),
    },
    {
      title: "Full-Service Development",
      content: (
        <>
          We provide complete{" "}
          <a
            href="https://novanectar.co.in/services/mobile-development"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold font-sans hover:text-blue-500 transition-colors duration-150"
          >
            app development
          </a>{" "}
          solutions from planning and designing to development, testing, and
          maintenance, ensuring your project success from start to finish.
        </>
      ),
    },
    {
      title: "Cross-Platform Excellence",
      content: (
        <>
          We use cutting-edge technologies like Flutter and React Native to
          develop apps that work smoothly on both platforms, saving you time and
          cost while maximizing reach.,
        </>
      ),
    },
  ];

  const services = [
    {
      title: "iOS and App Development",
      description: (
        <>
          At {" "}
          <a
            href="https://novanectar.co.in"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold font-sans hover:text-blue-500 transition-colors duration-150"
          >
            Novanectar{" "}
          </a>
           we provide high quality apps that deliver seamless
          experience across iPhones and Android devices.
        </>
      ),
    },
    {
      title: "App Development",
      description: (
        <>
          We use technologies like Flutter and{" "}
          <a
            href="https://en.wikipedia.org/wiki/React_Native"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold font-sans hover:text-blue-500 transition-colors duration-150"
          >
            React Native{" "}
          </a>{" "}
          to develop apps that work smoothly on both platforms, saving time and
          cost.,
        </>
      ),
    },
    {
      title: "Web App Development",
      description: (
        <>
          Scalable and responsive{" "}
          <a
            href="https://novanectar.co.in/services/web-development"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold font-sans hover:text-blue-500 transition-colors duration-150"
          >
            web applications{" "}
          </a>
          that easily adapt to your business needs and grow with your company.
        </>
      ),
    },
    {
      title: "Custom App Solutions",
      description: (
        <>
          Frome-commerce to booking apps, we develop each and every solution
          that aligns with your business goal.
        </>
      ),
    },
    {
      title: "App Maintenance & Support",
      description:
        "Novanectar provides long-term support to keep your app secure, updated, and running smoothly with regular maintenance.",
    },
  ];

  const industries = [
    "Education",
    "Healthcare",
    "Retail & Ecommerce",
    "Tourism & Travel",
    "Real Estate",
    "Finance & Banking",
  ];

  const technologies = [
    <>
      <a
        href="https://flutter.dev"
        target="_blank"
        rel="noopener noreferrer"
        className="font-bold font-sans hover:text-blue-500 transition-colors duration-150"
      >
        Flutter
      </a>
      , React Native, Kotlin, Swift
    </>,
    "Node.js, PHP, Python",
    "Firebase, AWS, MongoDB, MySQL",
    "Figma, Adobe XD for UI/UX design",
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
                src={novanecatrLogo || "/placeholder.svg?height=60&width=240"}
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
            <div className="absolute inset-0 opacity-70">
              <Image
                src={mobileDevBg || "/placeholder.svg?height=800&width=1200"}
                alt="Mobile Development Background"
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
                Mobile App Development
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
                    DISCUSS YOUR MOBILE APP PROJECT
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

        {/* Transform Section */}
        <motion.div
          ref={transformRef}
          className="py-10 sm:py-12 md:py-16 bg-[#EDF6FF] overflow-hidden"
          initial="hidden"
          animate={transformInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <motion.div className="w-full md:w-1/2" variants={fadeInLeft}>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0a0a0a] mb-4 md:mb-6">
                  Smart IT Solutions for Your Business Growth
                </h2>
                <p className="text-[#424242] text-base sm:text-lg leading-relaxed mb-4">
                  Looking for reliable and innovative{" "}
                  <a
                    href="https://novanectar.co.in/services/mobile-development"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold font-sans hover:text-blue-500 transition-colors duration-150"
                  >
                    App development in Dehradun
                  </a>
                  ? NovaNectar offers professional mobile and web app
                  development services that help businesses grow, engage
                  customers and streamline their operations. As a company
                  focused on delivering Smart IT solutions, we combine strategy,
                  design and technology to realize digital ideas.
                </p>
                <p className="text-[#424242] text-base sm:text-lg leading-relaxed">
                  In today&apos;s world, businesses need
                  functional,user-friendly apps. Whether you are a startup
                  company, established company, or entrepreneur with a unique
                  concept, our app development services are designed to meet
                  your specific requirements.
                </p>
              </motion.div>
              <motion.div
                className="w-full md:w-1/2 mt-6 md:mt-0"
                variants={fadeInRight}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={mobileDev1 || "/placeholder.svg?height=400&width=600"}
                  alt="App development in dehradun"
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-lg shadow-xl"
                />
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
                  src={mobileDev2 || "/placeholder.svg?height=400&width=600"}
                  alt="Professional mobile app developer"
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
                  Why Choose Novanectar?
                </h2>

                <p className="text-[#424242] text-base sm:text-lg leading-relaxed mb-6">
                  We don&apos;t just build apps - we create digital experiences
                  that your users will love and that drive real business
                  results.
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
                            className="flex items-center justify-center w-5 h-5 rounded-full bg-[#4878AF] text-white text-xs mr-3 group-hover:bg-[#3a5f8a] transition-colors duration-200"
                            whileHover={{ scale: 1.1 }}
                          >
                            {index + 1}
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
                            <div className="pb-3 pl-8 text-[#424242] text-sm sm:text-base leading-relaxed">
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

        {/* Services Section - Updated with Sticky Scroll */}
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
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0a0a0a] mb-4">
                    What We Offer
                  </h2>
                  <p className="text-[#424242] text-base sm:text-lg leading-relaxed">
                    At Novanectar Smart IT Solution, we provide full app
                    development solutions from planning and designing to
                    development, testing and maintenance.
                  </p>
                </div>
              </motion.div>

              {/* Right side - Service Cards */}
              <motion.div
                className="w-full lg:w-7/12"
                variants={staggerContainer}
              >
                <div className="space-y-6 md:space-y-8">
                  {services.map((service, index) => (
                    <motion.div
                      key={index}
                      className="bg-white p-5 sm:p-6 md:p-8 rounded-xl border-2 border-[#4878AF] shadow-sm hover:shadow-md transition-shadow duration-300"
                      variants={cardVariant}
                      whileHover={scaleOnHover}
                    >
                      <h3 className="text-lg sm:text-xl font-bold text-[#0a0a0a] mb-3 md:mb-4">
                        {service.title}
                      </h3>
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
                Industries We Serve
              </h2>
              <p className="text-[#424242] text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
                We have worked with clients from a variety of sectors,
                delivering tailored solutions for each industry&apos;s unique
                needs.
              </p>
            </motion.div>
            <motion.div
              className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
              variants={staggerContainer}
            >
              {industries.map((industry, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-4 md:p-6 rounded-lg border-2 border-[#4878AF] text-center hover:shadow-md transition-shadow duration-300"
                  variants={cardVariant}
                  whileHover={scaleOnHover}
                >
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold text-[#0a0a0a]">
                    {industry}
                  </h3>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Technologies Section */}
        <motion.div
          ref={technologiesRef}
          className="py-10 sm:py-12 md:py-16 bg-white overflow-hidden"
          initial="hidden"
          animate={technologiesInView ? "visible" : "hidden"}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-8 md:mb-12"
              variants={fadeInUp}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0a0a0a] mb-4 md:mb-6">
                Technologies Novanectar Uses
              </h2>
              <p className="text-[#424242] text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
                We work with the latest technologies to ensure your app is built
                with cutting-edge tools and frameworks.
              </p>
            </motion.div>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
              variants={staggerContainer}
            >
              {technologies.map((tech, index) => (
                <motion.div
                  key={index}
                  className="bg-[#EDF6FF] p-6 md:p-8 rounded-xl border-2 border-[#4878AF] hover:shadow-md transition-shadow duration-300"
                  variants={cardVariant}
                  whileHover={scaleOnHover}
                >
                  <p className="text-[#0a0a0a] text-base sm:text-lg font-medium text-center">
                    {tech}
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
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <motion.div
                className="w-full md:w-1/2"
                variants={fadeInLeft}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={mobileDev3 || "/placeholder.svg?height=400&width=600"}
                  alt="Mobile app development success"
                  width={600}
                  height={400}
                  className="w-full h-80 rounded-lg shadow-xl"
                  loading="lazy"
                />
              </motion.div>
              <motion.div className="w-full md:w-1/2" variants={fadeInRight}>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0a0a0a] mb-4 md:mb-6">
                  Get Started With Novanectar
                </h2>
                <p className="text-[#424242] text-base sm:text-lg leading-relaxed mb-6">
                  If you are looking for app development in Dehradun focusing on
                  quality, innovation and results, NovaNectar is here to help.
                  We create apps that bring your ideas to life and support your
                  long-term success.
                </p>
                <p className="text-[#424242] text-base sm:text-lg leading-relaxed mb-6">
                  Contact us today. Together, we create digital solutions that
                  distinguish your brand.
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="tel:+918979891703"
                    className="inline-flex items-center bg-[#4878AF] text-white px-6 py-3 text-base hover:bg-[#3a5f8a] transition-colors duration-300 rounded-lg"
                  >
                    Start Your Project Today
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
          </div>
        </motion.div>
      </div>
      <ContactForm />
      {/* FAQ Section */}
      <Suspense fallback={<LoadingSpinner />}>
        <div className="content-visibility-auto">
          <FAQSection faqs={mobileDevFaqs} />
        </div>
      </Suspense>

      <FooterSection />
    </>
  );
}

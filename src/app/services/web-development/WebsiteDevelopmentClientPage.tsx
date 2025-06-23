"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import logo from "@/assets/services/web-dev/novanectarLogo.webp";
import webDevBg from "@/assets/services/web-dev/webdev.webp";
import webDev1 from "@/assets/services/web-dev/webdev1.webp";
import webDev2 from "@/assets/services/web-dev/webdev2.webp";
import webDev3 from "@/assets/services/web-dev/webdev3.webp";
import { DMSans } from "@/fonts/font";
import FooterSection from "@/components/footer/FooterSection";
import Navbar from "@/components/navbar/Navbar";
import { Suspense } from "react";
import FAQSection from "@/components/faq/FaqSection";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { WebDevFaqs } from "@/data/faqsData";
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

export default function WebsiteDevelopmentClientPage() {
  const heroRef = useRef(null);
  const transformRef = useRef(null);
  const whyChooseRef = useRef(null);
  const servicesRef = useRef(null);
  const advantagesRef = useRef(null);
  const ctaRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, amount: 0.2 });
  const transformInView = useInView(transformRef, { once: true, amount: 0.2 });
  const whyChooseInView = useInView(whyChooseRef, { once: true, amount: 0.2 });
  const servicesInView = useInView(servicesRef, { once: true, amount: 0.1 });
  const advantagesInView = useInView(advantagesRef, {
    once: true,
    amount: 0.2,
  });
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.2 });

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
                src={logo || "/placeholder.svg"}
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
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${webDevBg.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </motion.div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="mt-16 md:mt-20">
              <motion.h2
                className="hero-heading text-white mb-6 md:mb-10"
                variants={fadeInUp}
                initial="hidden"
                animate={heroInView ? "visible" : "hidden"}
                transition={{ delay: 0.3 }}
              >
                Website Development
                <br />
                with Smart IT Solution
              </motion.h2>

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
                    DISCUSS YOUR WEBSITE DEVELOPMENT PROJECT
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
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0a0a0a] mb-4 md:mb-6">
                  Website Development in Dehradun with smart IT {""}
                  <br className="hidden md:block" />
                  Solution
                </h1>
                <p className="text-[#424242] text-base sm:text-lg leading-relaxed">
                  Are you looking for dependable{" "}
                  <a
                    href="https://novanectar.co.in/services/web-development"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold font-sans hover:text-blue-500 transition-colors duration-150"
                  >
                    website development in Dehradun
                  </a>{" "}
                  ? Your search ends here! At{" "}
                  <a
                    href="https://novanectar.co.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold hover:text-blue-500 transition-colors duration-150"
                  >
                    Smart IT Solution
                  </a>
                  , we specialize in creating high-quality, custom websites that
                  enable businesses in Dehradun India to shine and thrive in the
                  digital World.
                </p>
              </motion.div>
              <motion.div
                className="w-full md:w-1/2 mt-6 md:mt-0"
                variants={fadeInRight}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={webDev1 || "/placeholder.svg"}
                  alt="website development in dehradun"
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-lg shadow-xl"
                />
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
            <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12">
              <motion.div
                className="w-full md:w-1/2 mt-6 md:mt-0"
                variants={fadeInLeft}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={webDev2 || "/placeholder.svg"}
                  alt="website development in dehradun"
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-lg shadow-xl"
                />
              </motion.div>
              <motion.div className="w-full md:w-1/2" variants={fadeInRight}>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0a0a0a] mb-4 md:mb-6">
                  Why Choose Smart IT
                  <br className="hidden sm:block" />
                  Solution for your Website
                </h2>
                <p className="text-[#424242] text-base sm:text-lg leading-relaxed">
                  {" "}
                  <a
                    href="https://novanectar.co.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold font-sans hover:text-blue-500 transition-colors duration-150"
                  >
                    Novanectar Smart IT Solution
                  </a>{" "}
                  , one of the leading website development firms in Dehradun ,
                  is cognizant of the unique requirements of regional companies.
                  Our team of seasoned professionals creates websites that are
                  not only visually appealing but also practical and easy to use
                  by fusing technology, creativity, and domain knowledge.
                </p>
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
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0a0a0a]">
                    Our Website
                    <br className="hidden sm:block" />
                    Development Services
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
                  {[
                    {
                      title: "Custom Website Design",
                      content: `As one of the top web development company in Dehradun, Smart IT Solution is well aware of the special needs of business houses here. Our expert and highly skilled professionals blend imagination, technology to create Custom Website Design.`,
                      link: "https://novanectar.co.in/services/web-development",
                      linkText: "Custom Website Design",
                    },
                    {
                      title: "Ecommerce Website Development",
                      content: `Put your business online with a secure, scalable, and feature-rich e-commerce site. We integrate payment gateways, inventory management, and easy-to-use product catalogs to drive your sales.`,
                      link: "https://novanectar.co.in/services/web-development",
                      linkText: "e-commerce site",
                    },
                    {
                      title: "SEO-Friendly Web Development",
                      content: `All websites we create are search engine optimized. From quick loading times to clean code and content rich in keywords, we ensure your business is found online.`,
                      link: "https://novanectar.co.in/services/seo",
                      linkText: "search engine optimized",
                    },
                    {
                      title: "Content Management System (CMS)",
                      content: `Update your website easily using our CMS options. We have experience working with custom coded websites, WordPress, Joomla, and more to provide you with complete control of your content.`,
                      link: "https://en.wikipedia.org/wiki/WordPress",
                      linkText: "WordPress",
                    },
                    {
                      title: "Website Maintenance and Support",
                      content: `Our relationship doesn't stop at launch. We provide ongoing website maintenance, updates, and technical support to ensure your site is secure and running its best.`,
                    },
                    {
                      title: "UI & UX Design",
                      content: `We are user experience designers that make sure your users have a seamless navigation, clean calls-to-action, and an aesthetically pleasing interface.`,
                      link: "https://novanectar.co.in/services/graphic-design",
                      linkText: "user experience designers",
                    },
                  ].map((service, index) => (
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
                        {service.content
                          .split(service.linkText || "")
                          .map((part, i, arr) => (
                            <span key={i}>
                              {part}
                              {i < arr.length - 1 && service.link && (
                                <a
                                  href={service.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="font-bold font-sans hover:text-blue-500 transition-colors duration-150"
                                >
                                  {service.linkText}
                                </a>
                              )}
                            </span>
                          ))}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Advantages Section */}
        <motion.div
          ref={advantagesRef}
          className="py-10 sm:py-12 md:py-16 bg-[#EDF6FF] overflow-hidden"
          initial="hidden"
          animate={advantagesInView ? "visible" : "hidden"}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0a0a0a] text-center mb-8 md:mb-12"
              variants={fadeInUp}
            >
              Novanectar Smart IT Solution Advantage
            </motion.h2>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
              variants={staggerContainer}
            >
              {[
                {
                  title: "Local Expertise",
                  content:
                    "We know the Dehradun marketplace and customize our services to suit local business requirements.",
                },
                {
                  title: "Affordable Packages",
                  content:
                    "Get the best value for your investment with transparent pricing and no hidden costs.",
                },
                {
                  title: "Cutting-Edge Technology",
                  content:
                    "We leverage the most advanced web development tools and methods to provide high-performance websites.",
                },
                {
                  title: "Dedicated Support",
                  content:
                    "Our experts are always at hand to help you, from initial consultation to regular maintenance.",
                },
              ].map((advantage, index) => (
                <motion.div
                  key={index}
                  className="border-2 border-[#4878AF] p-4 sm:p-6 rounded-3xl bg-white hover:shadow-md transition-shadow duration-300"
                  variants={cardVariant}
                  whileHover={scaleOnHover}
                >
                  <h3 className="text-base sm:text-lg font-bold text-[#0a0a0a] mb-2 sm:mb-3">
                    {advantage.title}
                  </h3>
                  <p className="text-[#424242] text-xs sm:text-sm mt-14">
                    {advantage.content}
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
                  src={webDev3 || "/placeholder.svg"}
                  alt="website development in dehradun"
                  width={600}
                  height={400}
                  className="w-full h-80 rounded-lg shadow-xl"
                />
              </motion.div>
              <motion.div className="w-full md:w-1/2" variants={fadeInRight}>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0a0a0a] mb-4 md:mb-6">
                  Grow Your Business Online
                </h2>
                <p className="text-[#424242] text-base sm:text-lg leading-relaxed">
                  Reach us at Smart IT Solution today for the finest website
                  development in Dehradun . We help you develop a website that
                  brings customers, establishes trust, and ensures business
                  growth.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      <ContactForm />

      {/* FAQ section */}
      <Suspense fallback={<LoadingSpinner />}>
        <div className="content-visibility-auto">
          <FAQSection faqs={WebDevFaqs} />
        </div>
      </Suspense>
      <FooterSection />
    </>
  );
}

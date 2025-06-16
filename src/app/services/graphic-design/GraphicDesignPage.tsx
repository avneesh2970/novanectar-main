"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Navbar from "@/components/navbar/Navbar";
import { DMSans } from "@/fonts/font";
import logo from "@/assets/services/web-dev/novanectarLogo.webp";
import graphicDesignBg from "@/assets/services/graphic-design/graphicDesign.webp";
import graphicDesign1 from "@/assets/services/graphic-design/graphicDesign1.webp";
import graphicDesign2 from "@/assets/services/graphic-design/graphicDesign2.webp";
import graphicDesign3 from "@/assets/services/graphic-design/graphicDesign3.webp";
import { Plus } from "lucide-react";
import { Suspense } from "react";
import LoadingSpinner from "@/components/ui/loading-spinner";
import FAQSection from "@/components/faq/FaqSection";
import FooterSection from "@/components/footer/FooterSection";
import { GraphicDesignFaqs } from "@/data/faqsData";
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

const listItemVariant = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export default function GraphicDesigningPage() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  // Refs for scroll animations
  const heroRef = useRef(null);
  const transformRef = useRef(null);
  const whyChooseRef = useRef(null);
  const servicesRef = useRef(null);
  const ctaRef = useRef(null);

  // InView hooks
  const heroInView = useInView(heroRef, { once: true, amount: 0.2 });
  const transformInView = useInView(transformRef, { once: true, amount: 0.2 });
  const whyChooseInView = useInView(whyChooseRef, { once: true, amount: 0.2 });
  const servicesInView = useInView(servicesRef, { once: true, amount: 0.1 });
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.2 });

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const accordionItems = [
    {
      title: "Local Expertise",
      content:
        "As a graphic design company based in Dehradun, we understand local markets and trends. Our design has a target group located beyond Uttarakhand.",
    },
    {
      title: "Customized Design",
      content:
        "No templates are used. Each project is created from scratch to reflect the personality, goals and message of the brand.",
    },
    {
      title: "Quick Turnaround Time",
      content:
        "Deliver your design quickly. Our design process is optimized to provide high quality editions with strict deadlines.",
    },
    {
      title: "Affordable Pricing",
      content:
        "Our packages are transparent and budget-friendly. There are no hidden fees. Only high quality designs to provide results.",
    },
  ];

  const services = [
    {
      title: "Logo Design",
      content: (
        <>
          A great logo builds trust and brand recognition. Our experienced
          designers create unique and timeless logos for Dehradun companies,{" "}
          <a
            href="https://en.wikipedia.org/wiki/Startup_company#:~:text=A%20startup%20or%20start%2Dup,validate%20a%20scalable%20business%20model."
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold font-sans hover:text-blue-500 transition-colors duration-150"
          >
            startups
          </a>{" "}
          and{" "}
          <a
            href="https://en.wikipedia.org/wiki/Personal_branding"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold font-sans hover:text-blue-500 transition-colors duration-150"
          >
            personal brands
          </a>
          .
        </>
      ),
    },
    {
      title: "Social Media Post Design",
      content:
        "Create engaging and consistent social media graphics for Instagram, Facebook, LinkedIn, and more. Increase your online visibility with our monthly creative plan.",
    },
    {
      title: "Flyer Design",
      content:
        "Apply the services with Strike Flyer and Brochure. Perfect for local events, product launches, schools and real estate.",
    },
    {
      title: "Website Banners and UI Graphics",
      content:
        "We design breathtaking website banners, symbols and UI elements to improve the user experience and make your website look professional.",
    },
    {
      title: "Hoardings, poster and Banner",
      content:
        "Perfect for offline marketing at Dehradun or all over india. We offer high resolution printing designs that will attract attention at a glance.",
    },
    {
      title: "T-shirt & Merchandise Design",
      content:
        "Need graphics for merchandise or uniforms? We create custom designs for T-shirts, mugs, packaging, and more.",
    },
  ];

  const benefits = [
    "Visually powerful",
    "Marketing-friendly",
    "seo-compliant (for webgraphs)",
    "According to brand identity",
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
      <div
        className={`mt-20 min-h-screen bg-white ${DMSans.className}`}
      >
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
                backgroundImage: `url(${graphicDesignBg.src})`,
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
                Graphic Designing with
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
                    DISCUSS YOUR GRAPHIC DESIGN PROJECT
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
                  Stand Out with Top Graphic Design Experts
                </h2>
                <p className="text-[#424242] text-base sm:text-lg leading-relaxed">
                  Are you looking for a professional{" "}
                  <a
                    href="https://novanectar.co.in/services/graphic-design"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold font-sans hover:text-blue-500 transition-colors duration-150"
                  >
                    graphic designer in Dehradun
                  </a>{" "}
                  to give your brand the momentum you need? Your Wait is over!
                  Novanectar Smart It Solution offers first-class, creative and
                  inexpensive graphic designer in dehradun services that meet
                  your business requirements. Logo, social media updates,
                  banners or brochures. Our qualified designers will shape your
                  company into compelling graphics.
                </p>
              </motion.div>
              <motion.div
                className="w-full md:w-1/2 mt-6 md:mt-0"
                variants={fadeInRight}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={graphicDesign1 || "/placeholder.svg"}
                  alt="smart IT Solution website development"
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
                  src={graphicDesign2 || "/placeholder.svg"}
                  alt="Professional working on website"
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
                  Why Choose Smart IT Solution as your Graphic Designer?
                </h2>

                <p className="text-[#424242] text-base sm:text-lg leading-relaxed mb-6">
                  Novanectar{" "}
                  <a
                    href="https://novanectar.co.in/services/seo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold font-sans hover:text-blue-500 transition-colors duration-150"
                  >
                    Smart IT solutions
                  </a>{" "}
                  combine creativity, strategy and market understanding to
                  provide relevant designs to your audience and drive business
                  growth.
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
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0a0a0a]">
                    Novanectar
                    <br className="hidden sm:block" />
                    Graphic Design
                    <br className="hidden sm:block" />
                    Service
                  </h2>
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
                        {service.content}
                      </p>
                    </motion.div>
                  ))}
                </div>
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
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <motion.div
                className="w-full md:w-1/2"
                variants={fadeInLeft}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={graphicDesign3 || "/placeholder.svg"}
                  alt="Laptop with code"
                  width={600}
                  height={400}
                  className="w-full h-80 rounded-lg shadow-xl"
                  loading="lazy"
                />
              </motion.div>
              <motion.div className="w-full md:w-1/2" variants={fadeInRight}>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0a0a0a] mb-4 md:mb-6">
                  Why Smart IT Solution is Trusted
                </h2>
                <p className="text-[#424242] text-base sm:text-lg leading-relaxed mb-6">
                  We are more than just graphic designers at Novanectar- we are
                  your creative partner. So we have years of experience, Smart
                  It Solutions Designs offers the designs that reflect from this
                  result.
                </p>
                <motion.ul
                  className="text-[#424242]"
                  variants={staggerContainer}
                >
                  {benefits.map((benefit, index) => (
                    <motion.li
                      key={index}
                      className="border-b border-gray-500 pb-2 mt-4"
                      variants={listItemVariant}
                      whileHover={{ x: 5, color: "#4878AF" }}
                      transition={{ duration: 0.2 }}
                    >
                      {benefit}
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
      <ContactForm />
      {/* FAQ section */}
      <Suspense fallback={<LoadingSpinner />}>
        <div className="content-visibility-auto">
          <FAQSection faqs={GraphicDesignFaqs} />
        </div>
      </Suspense>
      <FooterSection />
    </>
  );
}

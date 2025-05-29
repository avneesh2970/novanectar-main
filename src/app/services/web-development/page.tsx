"use client"

import Image from "next/image"
import Link from "next/link"
import logo from "@/assets/services/web-dev/novanectarLogo.webp"
import webDevBg from "@/assets/services/web-dev/webdev.webp"
import webDev1 from "@/assets/services/web-dev/webdev1.webp"
import webDev2 from "@/assets/services/web-dev/webdev2.webp"
import webDev3 from "@/assets/services/web-dev/webdev3.webp"
import { DMSans } from "@/fonts/font"
import ContactForm from "@/components/contact/contact"
import FooterSection from "@/components/footer/FooterSection"
import Navbar from "@/components/navbar/Navbar"
import { useEffect } from "react"
import { useSearchParams } from "next/navigation"

export default function WebsiteDevelopmentPage() {
  const searchParams = useSearchParams()

  useEffect(() => {
    // Check if we already have the reload parameter
    const hasReloaded = searchParams.get("reloaded")

    if (!hasReloaded) {
      // Add reload parameter and reload
      const currentUrl = new URL(window.location.href)
      currentUrl.searchParams.set("reloaded", "true")
      window.location.href = currentUrl.toString()
    }
  }, [searchParams])

  return (
    <>
      <style jsx global>{`
        .hero-heading {
          font-size: 4.7rem;
          line-height: 1.5;
          font-weight: 700;
          letter-spacing: 0.02em;
        }

        @media (max-width: 768px) {
          .hero-heading {
            font-size: 3.5rem;
          }
        }

        @media (max-width: 640px) {
          .hero-heading {
            font-size: 2.75rem;
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
          }
        }
      `}</style>
      <Navbar />
      <div className={`mt-20 min-h-screen bg-white ${DMSans.className}`}>
        {/* Hero Section */}
        <div className="relative w-full py-10 overflow-hidden">
          <div className="absolute z-10 right-0">
            <div className="text-white">
              <Image
                src={logo || "/placeholder.svg"}
                alt="Novanectar Services Pvt. Ltd."
                width={240}
                height={60}
                className="object-contain"
                priority
              />
            </div>
          </div>
          {/* Background pattern overlay */}
          <div className="absolute inset-0">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${webDevBg.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </div>

          <div className="container mx-auto px-8 relative z-10">
            <div className="mt-20">
              <h2 className="hero-heading text-white mb-10">
                Website Development
                <br />
                in Dehradun
              </h2>

              <div className="inline-block">
                <Link
                  href="/contact"
                  className="inline-flex items-center bg-[#0A0A0A40] text-white px-6 py-3 hover:bg-[#0A0A0A60] transition-colors duration-300"
                >
                  DISCUSS YOUR WEBSITE DEVELOPMENT PROJECT
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
                  </svg>
                </Link>
              </div>

              <div className="mt-8 text-white text-sm opacity-80">
                <Link href="/" className="hover:underline transition-all duration-200">
                  https://novanectar.co.in/
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Transform Section */}
        <div className="py-16 bg-blue-100">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="w-full md:w-1/2">
                <h2 className="text-3xl md:text-4xl font-bold text-[#0a0a0a] mb-6">
                  Transform your online
                  <br />
                  presence with smart IT
                  <br />
                  Solution
                </h2>
                <p className="text-[#424242] text-lg leading-relaxed">
                  Are you looking for dependable website development in Dehradun? Your search ends here! At Smart IT
                  Solution, we specialize in creating high-quality, custom websites that enable businesses in Dehradun
                  India to shine and thrive in the digital World.
                </p>
              </div>
              <div className="w-full md:w-1/2">
                <Image
                  src={webDev1 || "/placeholder.svg"}
                  alt="smart IT Solution website development"
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Section */}
        <div className="py-16 bg-blue-100">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="w-full md:w-1/2">
                <Image
                  src={webDev2 || "/placeholder.svg"}
                  alt="Professional working on website"
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-lg shadow-xl"
                />
              </div>
              <div className="w-full md:w-1/2">
                <h2 className="text-3xl md:text-4xl font-bold text-[#0a0a0a] mb-6">
                  Why Choose Smart IT
                  <br />
                  Solution for your Website
                </h2>
                <p className="text-[#424242] text-lg leading-relaxed">
                  Novanectar Smart IT Solution, one of the leading website development firms in Dehradun, is cognizant
                  of the unique requirements of regional companies. Our team of seasoned professionals creates websites
                  that are not only visually appealing but also practical and easy to use by fusing technology,
                  creativity, and domain knowledge.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Services Section - Updated with Sticky Scroll */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="services-sticky-container flex flex-col lg:flex-row gap-8 lg:gap-16">
              {/* Left side - Sticky Heading */}
              <div className="w-full lg:w-5/12">
                <div className="services-sticky-heading">
                  <h2 className="text-3xl md:text-4xl font-bold text-[#0a0a0a]">
                    Our Website
                    <br />
                    Development Services
                    <br />
                    Include
                  </h2>
                </div>
              </div>

              {/* Right side - Service Cards */}
              <div className="w-full lg:w-7/12">
                <div className="space-y-8">
                  {/* Custom Website Design */}
                  <div className="bg-white p-8 rounded-xl border-2 border-[#4878AF] shadow-sm hover:shadow-md transition-shadow duration-300">
                    <h3 className="text-xl font-bold text-[#0a0a0a] mb-4">Custom Website Design</h3>
                    <p className="text-[#424242] text-base leading-relaxed">
                      As one of the top web development company in Dehradun, Smart IT Solution is well aware of the
                      special needs of business houses here. Our expert and highly skilled professionals blend
                      imagination, technology, and domain expertise to create websites that not only look stunning but
                      also deliver exceptional user experiences.
                    </p>
                  </div>

                  {/* Ecommerce Website Development */}
                  <div className="bg-white p-8 rounded-xl border-2 border-[#4878AF] shadow-sm hover:shadow-md transition-shadow duration-300">
                    <h3 className="text-xl font-bold text-[#0a0a0a] mb-4">Ecommerce Website Development</h3>
                    <p className="text-[#424242] text-base leading-relaxed">
                      Put your business online with a secure, scalable, and feature-rich e-commerce site. We integrate
                      payment gateways, inventory management, and easy-to-use product catalogs to drive your sales. Our
                      e-commerce solutions are designed to provide seamless shopping experiences that convert visitors
                      into loyal customers.
                    </p>
                  </div>

                  {/* SEO-Friendly Web Development */}
                  <div className="bg-white p-8 rounded-xl border-2 border-[#4878AF] shadow-sm hover:shadow-md transition-shadow duration-300">
                    <h3 className="text-xl font-bold text-[#0a0a0a] mb-4">SEO-Friendly Web Development</h3>
                    <p className="text-[#424242] text-base leading-relaxed">
                      All websites we create are search engine optimized. From quick loading times to clean code and
                      content rich in keywords, we ensure your business is found online. Our SEO-friendly approach
                      includes proper meta tags, structured data, mobile optimization, and performance enhancements that
                      boost your search engine rankings.
                    </p>
                  </div>

                  {/*Content Management System (CMS) */}
                  <div className="bg-white p-8 rounded-xl border-2 border-[#4878AF] shadow-sm hover:shadow-md transition-shadow duration-300">
                    <h3 className="text-xl font-bold text-[#0a0a0a] mb-4">Content Management System (CMS)</h3>
                    <p className="text-[#424242] text-base leading-relaxed">
                      Update your website easily using our CMS options. We have experience working with custom coded
                      websites, WordPress, Joomla, and more to provide you with complete control of your content. Our
                      CMS solutions are user-friendly and allow you to manage your website content without technical
                      expertise.
                    </p>
                  </div>

                  {/* Website maintenance and support */}
                  <div className="bg-white p-8 rounded-xl border-2 border-[#4878AF] shadow-sm hover:shadow-md transition-shadow duration-300">
                    <h3 className="text-xl font-bold text-[#0a0a0a] mb-4">Website Maintenance and Support</h3>
                    <p className="text-[#424242] text-base leading-relaxed">
                      Our relationship doesn&apos;t stop at launch. We provide ongoing website maintenance, updates, and
                      technical support to ensure your site is secure and running its best. Our comprehensive support
                      includes regular backups, security updates, performance monitoring, and 24/7 technical assistance.
                    </p>
                  </div>

                  {/* UI & UX Design*/}
                  <div className="bg-white p-8 rounded-xl border-2 border-[#4878AF] shadow-sm hover:shadow-md transition-shadow duration-300">
                    <h3 className="text-xl font-bold text-[#0a0a0a] mb-4">UI & UX Design</h3>
                    <p className="text-[#424242] text-base leading-relaxed">
                      We are user experience designers that make sure your users have a seamless navigation, clean
                      calls-to-action, and an aesthetically pleasing interface. Our design process focuses on creating
                      intuitive user journeys that enhance engagement and drive conversions while maintaining brand
                      consistency across all touchpoints.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Advantages Section */}
        <div className="py-16 bg-blue-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0a0a0a] text-center mb-12">
              Novanectar Smart IT Solution Advantage
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="border-2 border-[#4878AF] p-6 rounded-lg bg-white hover:shadow-md transition-shadow duration-300">
                <h3 className="text-lg font-bold text-[#0a0a0a] mb-3">Local Expertise</h3>
                <p className="text-[#424242] text-sm">
                  We know the Dehradun marketplace and customize our services to suit local business requirements.
                </p>
              </div>

              <div className="border-2 border-[#4878AF] p-6 rounded-lg bg-white hover:shadow-md transition-shadow duration-300">
                <h3 className="text-lg font-bold text-[#0a0a0a] mb-3">Affordable Packages</h3>
                <p className="text-[#424242] text-sm">
                  Get the best value for your investment with transparent pricing and no hidden costs.
                </p>
              </div>

              <div className="border-2 border-[#4878AF] p-6 rounded-lg bg-white hover:shadow-md transition-shadow duration-300">
                <h3 className="text-lg font-bold text-[#0a0a0a] mb-3">Cutting-Edge Technology</h3>
                <p className="text-[#424242] text-sm">
                  We leverage the most advanced web development tools and methods to provide high-performance websites.
                </p>
              </div>

              <div className="border-2 border-[#4878AF] p-6 rounded-lg bg-white hover:shadow-md transition-shadow duration-300">
                <h3 className="text-lg font-bold text-[#0a0a0a] mb-3">Dedicated Support</h3>
                <p className="text-[#424242] text-sm">
                  Our experts are always at hand to help you, from initial consultation to regular maintenance.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-16 bg-blue-100">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="w-full md:w-1/2">
                <Image
                  src={webDev3 || "/placeholder.svg"}
                  alt="Laptop with code"
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-lg shadow-xl"
                />
              </div>
              <div className="w-full md:w-1/2">
                <h2 className="text-3xl md:text-4xl font-bold text-[#0a0a0a] mb-6">Grow Your Business Online</h2>
                <p className="text-[#424242] text-lg leading-relaxed">
                  Reach us at Smart IT Solution today for the finest website development in Dehradun. We help you
                  develop a website that brings customers, establishes trust, and ensures business growth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* contact section  */}
      <ContactForm />
      <FooterSection />
    </>
  )
}

"use client"

// import type { Metadata } from "next";
import { use, useEffect, useState } from "react";
import Image from "next/image";
// import { notFound } from "next/navigation";
import { getServiceById } from "@/lib/services-data";
import ServiceContent from "@/components/services/ServiceContent";
import FooterSection from "@/components/footer/FooterSection";
import Script from "next/script";
import Navbar from "@/components/navbar/Navbar";
// import { FloatingShapes } from "@/components/contact/FloatingShapes";
import { motion, useAnimation } from "framer-motion";
import { DMSans } from "@/fonts/font";
import { useForm, type SubmitHandler } from "react-hook-form";
import { AnimatedInput } from "@/components/contact/AnimatedInput";

// type Props = {
//   params: Promise<{ id: string }>;
// };


// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const resolvedParams = await params;
//   const service = getServiceById(resolvedParams.id);

//   if (!service) {
//     return notFound();
//   }

//   return {
//     title: `${service.title} | Novanectar Services`,
//     description: service.description,
//     openGraph: {
//       title: service.title,
//       description: service.description,
//       url: `https://novanectar.co.in/services/${resolvedParams.id}`,
//       images: [
//         {
//           url: "https://novanectar.co.in/twitter-image.jpg",
//           width: 1200,
//           height: 630,
//           alt: service.title,
//         },
//       ],
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: service.title,
//       description: service.description,
//       images: ["https://novanectar.co.in/twitter-image.jpg"],
//     },
//     alternates: {
//       canonical: `https://novanectar.co.in/services/${resolvedParams.id}`,
//     },
//   };
// }

// Add structured data for the service
function getServiceStructuredData(service: ReturnType<typeof getServiceById>) {
  if (!service) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: {
      "@type": "Organization",
      name: "Novanectar Services Pvt. Ltd.",
      url: "https://novanectar.co.in",
    },
    image: service.coverImage,
    url: `https://novanectar.co.in/services/${service.id}`,
  };
}

export default function ServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const service = getServiceById(resolvedParams.id);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );
  const controls = useAnimation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<any>();

  useEffect(() => {
    controls.start({
      opacity: [0, 0.2, 0.4, 0.6, 0.8, 1],
      transition: { duration: 2, ease: "easeInOut" },
    });
  }, [controls]);
  
  if (!service) {
    return <div>Service not found</div>;
  }


  const onSubmit: SubmitHandler<any> = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus("success");
        reset();
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.log("error in api call:", error);
      setSubmitStatus("error");
    }
    setIsSubmitting(false);
  };

  return (
    <>
      <Script
        id="service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getServiceStructuredData(service)),
        }}
      />
      <main className="min-h-screen">
        <Navbar />
        <div
          className="relative w-full"
          style={{ height: "calc(100vw / (16 / 9))" }}
        >
          <Image
            src={service.coverImage}
            alt={service.title}
            fill
            className="object-contain"
            sizes="100vw"
            priority
          />
        </div>
        <ServiceContent service={service} />

        {/* add copied contact form here-- start */}

        <div
          className={`relative w-full h-full bg-gradient-to-br from-blue-50 to-purple-50 overflow-hidden p-2 sm:p-4 pb-8 ${DMSans.className}`}
        >
          {/* <FloatingShapes /> */}
          <div className="max-w-6xl mx-auto relative z-10 pt-16">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-center mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-gray-800"
              >
                Start your{" "}
              </motion.span>
              <motion.span
                className="relative inline-block"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <motion.span
                  className="text-blue-600"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  project
                </motion.span>
                <motion.svg
                  viewBox="0 0 100 20"
                  className="absolute -bottom-2 left-0 w-full h-2"
                  preserveAspectRatio="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.8, ease: "easeInOut" }}
                >
                  <motion.path
                    d="M0,10 Q50,10 85,8 T100,4"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    className="text-blue-600"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                      delay: 0.9,
                      duration: 0.8,
                      ease: "easeInOut",
                    }}
                  />
                </motion.svg>
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="text-gray-800"
              >
                {" "}
                Today!
              </motion.span>
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white bg-opacity-80 backdrop-blur-sm p-6 rounded-xl shadow-lg"
              >
                <h2 className="text-gray-800 font-bold mb-4 text-lg md:text-xl">
                  CONTACT
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <svg
                      className="w-5 h-5 text-gray-800"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-gray-800 text-sm md:text-base lg:text-lg">
                      info@novanectar.co.in
                    </span>
                  </div>
                  <div className="flex space-x-3">
                    <svg
                      className="w-5 h-5 text-gray-800 mt-[4px]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <div className="flex flex-col gap-1 md:gap-2 text-gray-800 text-sm md:text-base lg:text-lg">
                      <span className="block">+91 8979891703</span>
                      <span className="block">+91 8979891705</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="bg-white bg-opacity-80 backdrop-blur-sm p-6 rounded-xl shadow-lg"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="space-y-4">
                  <AnimatedInput
                    register={register("name", {
                      required: "Name is required",
                    })}
                    type="text"
                    placeholder="Enter Your Name"
                    error={errors.name}
                  />
                  <AnimatedInput
                    register={register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    type="email"
                    placeholder="Your Email"
                    error={errors.email}
                  />
                  <AnimatedInput
                    register={register("contact", {
                      required: "Contact number is required",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Invalid contact number",
                      },
                    })}
                    type="tel"
                    placeholder="Your Contact"
                    error={errors.contact}
                  />
                  <AnimatedInput
                    register={register("subject", {
                      required: "Subject is required",
                    })}
                    type="text"
                    placeholder="Subject"
                    error={errors.subject}
                  />
                  <AnimatedInput
                    register={register("message", {
                      required: "Message is required",
                    })}
                    type="textarea"
                    placeholder="Message"
                    error={errors.message}
                  />

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm md:text-base"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </motion.button>

                  {submitStatus === "success" && (
                    <p className="text-green-500 text-center">
                      Form submitted successfully!
                    </p>
                  )}
                  {submitStatus === "error" && (
                    <p className="text-red-500 text-center">
                      An error occurred. Please try again.
                    </p>
                  )}
                </div>
              </motion.form>
            </div>
          </div>
        </div>

        {/* add copied contact form here-- end */}

        <FooterSection />
      </main>
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useForm, type SubmitHandler } from "react-hook-form";
import { DMSans } from "@/fonts/font";
// import { FloatingShapes } from "./FloatingShapes";
import { AnimatedInput } from "./AnimatedInput";
import { HiMail } from "react-icons/hi";
import { Phone } from "lucide-react";
import { FaLocationDot } from "react-icons/fa6";
// import contact from "@/assets/contact/contact.jpg";
// import Image from "next/image";

interface IFormInput {
  name: string;
  email: string;
  contact: string;
  subject: string;
  message: string;
}

const ContactForm = () => {
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
    watch,
  } = useForm<IFormInput>();

  // Watch all form values
  const watchedValues = watch();

  useEffect(() => {
    controls.start({
      opacity: [0, 0.2, 0.4, 0.6, 0.8, 1],
      transition: { duration: 2, ease: "easeInOut" },
    });
  }, [controls]);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
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
    <div
      className={`relative w-full h-full bg-[#f6f4f0] overflow-hidden p-2 sm:p-4 pb-8 ${DMSans.className}`}
    >
      {/* <FloatingShapes /> */}
      <div className="max-w-6xl mx-auto relative z-10 pt-16">
        <motion.h1
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
                transition={{ delay: 0.9, duration: 0.8, ease: "easeInOut" }}
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
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 px-6 md:px-12 lg:px-20 py-16">
          {/* Contact Info */}
          <motion.div
            className="flex"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-col w-full">
              <motion.div
                className="bg-white rounded-xl shadow-lg overflow-hidden h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                {/* Image with overlay */}
                <div className="relative h-64 overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3444.5105195261544!2d78.00362147458128!3d30.307993406037497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39092be94375e729%3A0xc160311fe8cb82d6!2sNovaNectar%20Services%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1748350315124!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent pointer-events-none"></div>
                </div>
                <div className="p-6">
                  {/* Address Section */}
                  <motion.div
                    className="mb-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                  >
                    <motion.h3
                      className="text-lg font-semibold text-gray-700 flex items-center"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.9, duration: 0.5 }}
                    >
                      <div className="bg-blue-100 p-2 rounded-full mr-3">
                        <FaLocationDot className="w-5 h-5 text-blue-600" />
                      </div>
                      Address
                    </motion.h3>

                    <div className="flex flex-col space-y-3 pl-12">
                      <motion.div
                        className="flex items-center space-x-3 group"
                        initial={{ x: -30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 1.0, duration: 0.5 }}
                        whileHover={{ x: 5 }}
                        whileTap={{ x: 2 }}
                      >
                        <a
                          href="https://www.google.com/maps/place/NovaNectar+Services+Pvt.+Ltd./@30.307989,78.006196,15z/data=!4m6!3m5!1s0x39092be94375e729:0xc160311fe8cb82d6!8m2!3d30.3079888!4d78.0061964!16s%2Fg%2F11vyydyk88?hl=en&entry=ttu&g_ep=EgoyMDI1MDUyNy4wIKXMDSoASAFQAw%3D%3D"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 group-hover:text-blue-600 transition-colors duration-150 text-sm cursor-pointer"
                        >
                          GMS Rd, Haripuram, Kanwali, Dehradun, Uttarakhand
                          248001
                        </a>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Email Section */}
                  <motion.div
                    className="mb-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                  >
                    <motion.h3
                      className="text-lg font-semibold text-gray-700 flex items-center"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.9, duration: 0.5 }}
                    >
                      <div className="bg-blue-100 p-2 rounded-full mr-3">
                        <HiMail className="w-5 h-5 text-blue-600" />
                      </div>
                      Email
                    </motion.h3>

                    <div className="flex flex-col space-y-3 pl-12">
                      <motion.div
                        className="flex items-center space-x-3 group"
                        initial={{ x: -30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 1.0, duration: 0.5 }}
                        whileHover={{ x: 5 }}
                        whileTap={{ x: 2 }}
                      >
                        <a
                          href="mailto:info@novanectar.co.in"
                          className="text-gray-600 group-hover:text-blue-600 transition-colors duration-150 text-sm cursor-pointer"
                        >
                          info@novanectar.co.in
                        </a>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Phone Section */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                  >
                    <motion.h3
                      className="text-lg font-semibold text-gray-700 flex items-center"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 1.3, duration: 0.5 }}
                    >
                      <div className="bg-blue-100 p-2 rounded-full mr-3">
                        <Phone className="w-5 h-5 text-blue-600" />
                      </div>
                      Phone Number
                    </motion.h3>

                    <div className="flex flex-col pl-12 text-sm">
                      <motion.div
                        className="flex items-center space-x-3 group"
                        initial={{ x: -30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 1.4, duration: 0.5 }}
                        whileHover={{ x: 5 }}
                        whileTap={{ x: 2 }}
                      >
                        <a
                          href="tel:+918979891703"
                          className="text-gray-600 group-hover:text-blue-600 transition-colors duration-150 cursor-pointer"
                        >
                          +91 8979891703
                        </a>
                      </motion.div>

                      <motion.div
                        className="flex items-center space-x-3 group"
                        initial={{ x: -30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 1.5, duration: 0.5 }}
                        whileHover={{ x: 5 }}
                        whileTap={{ x: 2 }}
                      >
                        <a
                          href="tel:+918979891705"
                          className="text-gray-600 group-hover:text-blue-600 transition-colors duration-150 cursor-pointer"
                        >
                          +91 8979891705
                        </a>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/*Form side */}
          <form
            className="bg-white bg-opacity-80 backdrop-blur-sm p-6 rounded-xl shadow-lg"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="space-y-4">
              <AnimatedInput
                register={register("name", { required: "Name is required" })}
                type="text"
                placeholder="Enter Your Name"
                error={errors.name}
                value={watchedValues.name || ""}
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
                value={watchedValues.email || ""}
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
                value={watchedValues.contact || ""}
              />
              <AnimatedInput
                register={register("subject", {
                  required: "Subject is required",
                })}
                type="text"
                placeholder="Subject"
                error={errors.subject}
                value={watchedValues.subject || ""}
              />
              <AnimatedInput
                register={register("message", {
                  required: "Message is required",
                })}
                type="textarea"
                placeholder="Message"
                error={errors.message}
                value={watchedValues.message || ""}
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;

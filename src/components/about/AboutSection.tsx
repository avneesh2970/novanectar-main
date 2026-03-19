import Image from "next/image";
import about from "@/assets/about/about.webp";
import { DMSans400 } from "@/fonts/font";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div
      className={`${DMSans400.className} bg-[#F5F5F5] py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8`}
    >
      <div className="max-w-[1400px] mx-auto bg-[#FFFFFF] px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* ✅ IMAGE FIRST */}
          <div className="relative">
            <div className="w-full rounded-lg shadow-lg">
              <Image
                src={about}
                alt="Smart IT solution services"
                width={800}
                height={500}
                priority
                className="object-cover object-center w-full h-auto rounded-lg shadow-lg"
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={70}
              />
            </div>
          </div>

          {/* ✅ TEXT SECOND */}
          <div className="space-y-4 sm:space-y-6">
            <div className="space-y-3 sm:space-y-4">
              <p className="text-xs sm:text-sm font-medium text-gray-500 tracking-wider uppercase">
                ABOUT US
              </p>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                We provide Smart IT Solution to help your Business Grow
              </h1>
            </div>

            <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed font-medium">
               Novanectar Services Private Limited is a provider of technology
              solutions that work to equip individuals and organizations with
              graphic design, web design, app development and improving all
              artifacts. Fueling Progress with Smart IT Solutions, we offer high
              quality digital solutions that are often thought out to meet the
              various requirements of our Clients.
            </p>

            <div className="pt-2 sm:pt-4">
              <Link
                href="/about-us"
                className="inline-block bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold text-sm sm:text-base shadow-md hover:bg-blue-700 hover:scale-105 transition-all duration-300 ease-in-out"
              >
                See More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import Image from "next/image";

const TeamSection = () => {
  const teamData = [
    { name: "Avneesh Kumar", position: "Director", image: "/avneeshSir.jpg" },
    { name: "Shivam Rai", position: "CEO", image: "/shivamSir2.jpg" },
    { name: "Nitish Kumar", position: "Manager", image: "/nitishSir.jpg" },
  ];

  return (
    <section className="pb-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4">
          Our Leader
        </h2>
        <p className="text-lg text-gray-600 text-left mb-12 mx-auto">
          Behind NovaNectar&apos;s success is a passionate and visionary team
          dedicated to creating purposeful digital experiences. At the
          leadership of our team is{" "}
          <span className="relative font-medium text-gray-800 bg-gradient-to-r from-blue-100/50 to-teal-100/50 rounded-md px-2 py-0.5 transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-200/70 hover:to-teal-200/70">
            Shivam Rai
          </span>
          , our CEO whose strategic vision and hands-on leadership drive the
          company&apos;s development and long-term horizon. With him is{" "}
          <span className="relative font-medium text-gray-800 bg-gradient-to-r from-blue-100/50 to-teal-100/50 rounded-md px-2 py-0.5 transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-200/70 hover:to-teal-200/70">
            Avneesh Kumar
          </span>
          , our Director who contributes deep understanding and leadership
          depth, making sure that each project reflects our values and quality
          standards.{" "}
          <span className="relative font-medium text-gray-800 bg-gradient-to-r from-blue-100/50 to-teal-100/50 rounded-md px-2 py-0.5 transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-200/70 hover:to-teal-200/70">
            Nitish Kumar
          </span>
          , our Manager is actively involved in everyday operations and
          coordination of the team to ensure delivery remains seamless and
          communication remains robust within and with clients.
        </p>
        <div className="flex flex-col items-center">
          <div
            className={`grid grid-cols-1 md:grid-cols-3 ${
              teamData.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"
            } gap-8 max-w-5xl w-full`}
          >
            {teamData.map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto mb-4 aspect-[3/4]">
                  <Image
                    src={member.image}
                    alt={`${member.name} - ${member.position}`}
                    fill
                    className="rounded-lg object-cover"
                  />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 px-2">
                  {member.name}
                </h3>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 px-2">
                  {member.position}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;

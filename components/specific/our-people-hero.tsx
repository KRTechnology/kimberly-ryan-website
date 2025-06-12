"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface LeadershipMember {
  name: string;
  position: string;
  imageUrl: string;
}

const leadershipTeam: LeadershipMember[] = [
  {
    name: "Tony Onwu",
    position: "Chairman",
    imageUrl: "/images/tony-onwu.png",
  },
  {
    name: "Paul Onwuanibe",
    position: "Board Member",
    imageUrl: "/images/paul-onwuanibe.png",
  },
  {
    name: "Chris Osondu",
    position: "Board Member",
    imageUrl: "/images/chris-osondu.png",
  },
  {
    name: "Toyosi Kolawole",
    position: "Director",
    imageUrl: "/images/toyosi-kolawole.png",
  },
];

const OurPeopleHero = () => {
  return (
    <>
      {/* Hero Text Section with Dark Background */}
      <section
        className="pt-20 pb-16 lg:pb-24"
        style={{ backgroundColor: "#363433" }}
      >
        {/* Additional spacing after fixed header - 36px from Figma */}
        <div className="pt-9">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                {/* Breadcrumb */}
                <p className="text-sm font-medium text-sunset-200">
                  Our People
                </p>

                {/* Main Heading */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-amberwood-50 font-plex leading-tight">
                  Our leadership
                </h1>

                {/* Description */}
                <div className="max-w-3xl">
                  <p className="text-lg md:text-xl text-sunset-50 font-sans leading-relaxed">
                    To be the company our customers want us to be, it takes an
                    eclectic group of passionate operators. Get to know the
                    people leading the way at Kimberly-Ryan.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Images Section with White Background */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Desktop Grid Layout */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadershipTeam.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.6 }}
                className="text-center"
              >
                {/* Profile Image */}
                <div className="relative mb-6 aspect-square overflow-hidden">
                  <Image
                    src={member.imageUrl}
                    alt={member.name}
                    fill
                    className="object-cover"
                    style={{ objectPosition: "50% 20%" }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>

                {/* Member Info */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-900 font-sans">
                    {member.name}
                  </h3>
                  <p className="text-sm text-sunset-200 font-medium">
                    {member.position}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile Stack Layout */}
          <div className="md:hidden space-y-8">
            {leadershipTeam.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.6 }}
                className="text-left"
              >
                {/* Profile Image */}
                <div className="relative mb-4 w-full aspect-[4/3] overflow-hidden">
                  <Image
                    src={member.imageUrl}
                    alt={member.name}
                    fill
                    className="object-cover"
                    style={{ objectPosition: "50% 20%" }}
                    sizes="100vw"
                  />
                </div>

                {/* Member Info */}
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-gray-900 font-sans">
                    {member.name}
                  </h3>
                  <p className="text-sm text-sunset-200 font-medium">
                    {member.position}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default OurPeopleHero;

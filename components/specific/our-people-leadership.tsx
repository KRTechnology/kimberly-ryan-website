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

const OurPeopleLeadership = () => {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Desktop Grid Layout */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {leadershipTeam.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
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
              transition={{ duration: 0.5, delay: index * 0.1 }}
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
  );
};

export default OurPeopleLeadership;

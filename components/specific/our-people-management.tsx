"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface ManagementMember {
  name: string;
  position: string;
  imageUrl: string;
}

const managementTeam: ManagementMember[] = [
  {
    name: "Vivian Agunabor",
    position: "Chief Operating Officer",
    imageUrl: "/images/vivian-agunabor.png",
  },
  {
    name: "Adaobi Okeke",
    position: "People Services Manager",
    imageUrl: "/images/adaobi-okeke.png",
  },
  {
    name: "Nsikak Udo",
    position: "Finance Manager",
    imageUrl: "/images/nsikak-udo.png",
  },
  {
    name: "Fasina Adewole",
    position: "Outsourcing Manager",
    imageUrl: "/images/fasina-adewole.png",
  },
  {
    name: "Chinyere Onukogu",
    position: "Head of Sales",
    imageUrl: "/images/chinyere-onukogu.png",
  },
  {
    name: "Wilson Olubayo",
    position: "Advisory Manager",
    imageUrl: "/images/wilson-olubayo.png",
  },
  {
    name: "Princewill Nwaogaz",
    position: "Recruitment Manager",
    imageUrl: "/images/princewill-nwaogaz.png",
  },
];

const OurPeopleManagement = () => {
  return (
    <section className="bg-slate-50">
      {/* Header Section with slate-50 background */}
      <div className="pt-9 pb-6">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Breadcrumb */}
              <p className="text-sm font-medium text-sunset-200">Our People</p>

              {/* Main Heading */}
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 font-plex leading-tight">
                Our Management
              </h2>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Images Section with white background */}
      <div className="bg-white pt-6 pb-9">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Management Team Grid */}
          <div>
            {/* Desktop Grid Layout - 3 columns */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
              {managementTeam.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  {/* Profile Image */}
                  <div className="relative mb-6 aspect-[4/3] overflow-hidden">
                    <Image
                      src={member.imageUrl}
                      alt={member.name}
                      fill
                      className="object-cover"
                      style={{ objectPosition: "50% 20%" }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
              {managementTeam.map((member, index) => (
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
        </div>
      </div>
    </section>
  );
};

export default OurPeopleManagement;

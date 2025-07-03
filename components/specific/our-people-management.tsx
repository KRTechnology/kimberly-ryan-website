"use client";

import { urlFor } from "@/lib/sanity";
import { Person } from "@/types/sanity";
import { motion } from "framer-motion";
import Image from "next/image";

interface OurPeopleManagementProps {
  managementTeam: Person[];
}

const OurPeopleManagement = ({ managementTeam }: OurPeopleManagementProps) => {
  // Show loading state if no management team is provided
  if (!managementTeam || managementTeam.length === 0) {
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
                <p className="text-sm font-medium text-sunset-200">
                  Our People
                </p>

                {/* Main Heading */}
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 font-plex leading-tight">
                  Our Management
                </h2>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Empty Management Section */}
        <div className="bg-white pt-6 pb-9">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center">
              <p className="text-gray-600">
                No management team members available at the moment.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

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
                  key={member._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  {/* Profile Image */}
                  <div className="relative mb-6 aspect-[4/3] overflow-hidden">
                    <Image
                      src={urlFor(member.image).url()}
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

                    {/* Optional: Show department if different from position */}
                    {/* {member.department &&
                      member.department !== "management" && (
                        <p className="text-xs text-gray-500 capitalize">
                          {member.department.replace("_", " ")} Department
                        </p>
                      )} */}

                    {/* Optional: Show years of experience if available */}
                    {member.yearsOfExperience && (
                      <p className="text-xs text-gray-500">
                        {member.yearsOfExperience}+ years experience
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Mobile Stack Layout */}
            <div className="md:hidden space-y-8">
              {managementTeam.map((member, index) => (
                <motion.div
                  key={member._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-left"
                >
                  {/* Profile Image */}
                  <div className="relative mb-4 w-full aspect-[4/3] overflow-hidden">
                    <Image
                      src={urlFor(member.image).url()}
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

                    {/* Optional: Show bio on mobile if available */}
                    {member.bio && (
                      <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                        {member.bio}
                      </p>
                    )}

                    {/* Optional: Show expertise areas if available */}
                    {member.expertise && member.expertise.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs text-gray-500 mb-1">Expertise:</p>
                        <div className="flex flex-wrap gap-1">
                          {member.expertise
                            .slice(0, 3)
                            .map((skill, skillIndex) => (
                              <span
                                key={skillIndex}
                                className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                              >
                                {skill
                                  .replace("_", " ")
                                  .replace(/\b\w/g, (l) => l.toUpperCase())}
                              </span>
                            ))}
                          {member.expertise.length > 3 && (
                            <span className="text-xs text-gray-500">
                              +{member.expertise.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}
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

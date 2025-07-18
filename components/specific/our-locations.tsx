"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin } from "lucide-react";

const locations = [
  {
    id: "lagos",
    name: "Lagos",
    hours: "Mon-Sat 9am to 5pm.",
    address: "Plot 3/4 Water Corporation Road, Oniru, Victoria Island, Lagos",
    phone: "+234 913 582 7236",
    email: "info@kimberly-ryan.net",
  },
  {
    id: "abuja",
    name: "Abuja",
    hours: "Mon-Fri 9am to 5pm.",
    address:
      "No. 3 Atbara Street, off Cairo Street, Ademola Adetokunbo Crescent, Wuse 2, Abuja",
    phone: "+234 913 582 7236",
    email: "info@kimberly-ryan.net",
  },
  {
    id: "kenya",
    name: "Kenya",
    hours: "Mon-Fri 9am to 5pm.",
    address: "3 Elgeyo Marakwet Close, Off Ngong Road Kilimani, Kenya",
    phone: "+254 733 844 132",
    email: "info@kimberly-ryan.net",
  },
  {
    id: "uganda",
    name: "Uganda",
    hours: "Mon-Sat 9am to 5pm.",
    address: "7th Floor, Course View Towers, Yusuf Lule Road",
    phone: "+256 312 314 412",
    email: "info@kimberly-ryan.net",
  },
  {
    id: "ghana",
    name: "Ghana",
    hours: "Mon-Fri 9am to 5pm.",
    address: "F 60/8 Abafun Crescent Labone Accra, PMB 52 Kanda Accra",
    phone: "",
    email: "info@kimberly-ryan.net",
  },
  {
    id: "sierra-leone",
    name: "Sierra Leone",
    hours: "Mon-Fri 9am to 5pm.",
    address: "9 Pademba Road, Freetown, Sierra Leone",
    phone: "",
    email: "info@kimberly-ryan.net",
  },
  {
    id: "united-kingdom",
    name: "United Kingdom",
    hours: "Mon-Fri 9am to 5pm.",
    address: "36 St John Street, Mayfair, London, W1S 2FW, UK",
    phone: "",
    email: "info@kimberly-ryan.net",
  },
];

export default function OurLocations() {
  return (
    <section className="py-16 lg:py-24" style={{ backgroundColor: "#363433" }}>
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center lg:text-left mb-12 lg:mb-16"
        >
          <p className="text-sunset-50 text-sm font-semibold mb-2 tracking-wide uppercase">
            Contact us
          </p>
          <h2 className="text-3xl lg:text-4xl font-semibold text-amberwood-50 mb-4">
            Our locations
          </h2>
          <p className="text-sunset-50 text-lg max-w-xl">
            Come visit our friendly team at one of our offices.
          </p>
        </motion.div>

        {/* Desktop Layout - Map + Locations */}
        <div className="hidden lg:block">
          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <div className="relative w-full h-[400px] flex items-center justify-center">
              <Image
                src="/images/contact-us-map.png"
                alt="Global map showing our office locations"
                fill
                className="object-contain"
                priority
              />
            </div>
          </motion.div>

          {/* Locations Grid - Desktop */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {locations.map((location, index) => (
              <motion.div
                key={location.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="text-center"
              >
                {/* Location Icon */}
                <div className="flex justify-center mb-4">
                  {/* <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center"> */}
                  <MapPin size={24} className="text-sunset-200" />
                  {/* </div> */}
                </div>

                {/* Location Details */}
                <h3 className="text-xl font-semibold text-amberwood-50 mb-2">
                  {location.name}
                </h3>
                <p className="text-terra-50 text-sm mb-3">{location.hours}</p>
                <p className="text-sunset-50 text-sm mb-3 leading-relaxed">
                  {location.address}
                </p>
                {location.phone && (
                  <p className="text-sunset-50 text-sm mb-2">
                    {location.phone}
                  </p>
                )}
                <a
                  href={`mailto:${location.email}`}
                  className="text-sunset-50 text-sm hover:text-sunset-200 transition-colors duration-200 underline"
                >
                  {location.email}
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Mobile Layout - Locations Only */}
        <div className="lg:hidden">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {locations.map((location, index) => (
              <motion.div
                key={location.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="text-center"
              >
                {/* Location Icon */}
                <div className="flex justify-center mb-4">
                  {/* <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center"> */}
                  <MapPin size={24} className="text-sunset-200" />
                  {/* </div> */}
                </div>

                {/* Location Details */}
                <h3 className="text-xl font-semibold text-amberwood-50 mb-2">
                  {location.name}
                </h3>
                <p className="text-terra-50 text-sm mb-3">{location.hours}</p>
                <p className="text-sunset-50 text-sm mb-3 leading-relaxed">
                  {location.address}
                </p>
                {location.phone && (
                  <p className="text-sunset-50 text-sm mb-2">
                    {location.phone}
                  </p>
                )}
                <a
                  href={`mailto:${location.email}`}
                  className="text-sunset-50 text-sm hover:text-sunset-200 transition-colors duration-200 underline"
                >
                  {location.email}
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";

const TrainingEventDetails = () => {
  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: "#373433" }}>
      <div className="container mx-auto px-4">
        {/* Desktop Layout */}
        <div className="hidden md:block">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Content */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {/* Main Heading */}
              <motion.h2
                className="text-white font-plex font-semibold"
                style={{ fontSize: "36px" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Event Details
              </motion.h2>

              {/* Duration Section */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-plex font-semibold text-lg mb-1">
                      Duration
                    </h3>
                    <p className="text-amberwood-50 font-inter text-base">
                      3 Days
                    </p>
                    <p className="text-white font-inter text-sm mt-2">
                      hi@untitledui.com
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Venue Section */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-plex font-semibold text-lg mb-1">
                      Venue
                    </h3>
                    <p className="text-amberwood-50 font-inter text-base mb-3">
                      Come say hello at our office HQ.
                    </p>
                    <p className="text-white font-inter text-sm">
                      100 Smith Street
                      <br />
                      Collingwood VIC 3066 AU
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Map */}
            <motion.div
              className="h-[400px] lg:h-[500px] rounded-lg overflow-hidden"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.7557388574375!2d3.4243315739621994!3d6.423830624045444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2d7a2e3c43%3A0xa9b9d8c6d7e5f4c3!2sLandmark%20Village%2C%20Victoria%20Island%2C%20Lagos%2C%20Nigeria!5e0!3m2!1sen!2sus!4v1701234567890!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Kimberly Ryan Office Location - Landmark Village, Victoria Island, Lagos"
              />
            </motion.div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden space-y-8">
          {/* Main Heading */}
          <motion.h2
            className="text-white font-plex font-semibold"
            style={{ fontSize: "36px" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Event Details
          </motion.h2>

          {/* Duration Section */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-plex font-semibold text-lg mb-1">
                  Duration
                </h3>
                <p className="text-amberwood-50 font-inter text-base">3 Days</p>
                <p className="text-white font-inter text-sm mt-2">
                  hi@untitledui.com
                </p>
              </div>
            </div>
          </motion.div>

          {/* Venue Section */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-plex font-semibold text-lg mb-1">
                  Venue
                </h3>
                <p className="text-amberwood-50 font-inter text-base mb-3">
                  Come say hello at our office HQ.
                </p>
                <p className="text-white font-inter text-sm">
                  100 Smith Street
                  <br />
                  Collingwood VIC 3066 AU
                </p>
              </div>
            </div>
          </motion.div>

          {/* Mobile Map */}
          <motion.div
            className="h-[300px] rounded-lg overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.7557388574375!2d3.4243315739621994!3d6.423830624045444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2d7a2e3c43%3A0xa9b9d8c6d7e5f4c3!2sLandmark%20Village%2C%20Victoria%20Island%2C%20Lagos%2C%20Nigeria!5e0!3m2!1sen!2sus!4v1701234567890!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Kimberly Ryan Office Location - Landmark Village, Victoria Island, Lagos"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TrainingEventDetails;

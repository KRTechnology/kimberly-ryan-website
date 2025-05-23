"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative min-h-screen pt-20 flex items-center">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            className="order-2 md:order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Your People & Your Business Are Our Business
            </h1>
            <p className="text-lg text-slate-600 mb-8">
              We excel at empowering businesses with tailored HR Solutions for
              optimal growth and success.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link
                href="/consultation"
                className="inline-block px-8 py-3 bg-sunset-200 text-white rounded-md hover:bg-sunset-300 transition-colors duration-300 text-lg font-semibold"
              >
                Schedule a consultation
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="order-1 md:order-2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden">
              <Image
                src="/images/hero-image.jpg"
                alt="Business professionals in a meeting"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-lg"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

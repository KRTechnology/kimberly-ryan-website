"use client";

import { motion } from "framer-motion";

const CoreValuesSection = () => {
  return (
    <section
      className="relative py-16 md:py-24"
      style={{ backgroundColor: "#311501" }}
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Desktop Layout */}
          <div className="hidden md:block">
            <div
              className="hidden md:grid lg:hidden"
              style={{
                gridTemplateColumns: "28fr 62fr",
                gap: "clamp(32px, 4vw, 48px)",
              }}
            >
              {/* Left Column - Main Content */}
              <motion.div
                className="flex flex-col justify-start"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <motion.h2
                  className="text-[28px] md:text-[32px] font-semibold text-white leading-tight font-plex mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  Theres a <span className="italic">TRIIQ</span> to how we
                  operate within the Kimberly Ryan Ecosystem
                </motion.h2>

                <motion.p
                  className="text-[14px] md:text-[16px] leading-relaxed text-amberwood-50 font-inter mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  These Core Values are how we identify ourselves as a brand,
                  how we carry out our business dealings and how we relate to
                  colleagues internally.
                </motion.p>

                <motion.p
                  className="text-[14px] md:text-[16px] text-amberwood-50 font-inter"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                >
                  --- Its in our DNA.
                </motion.p>
              </motion.div>

              {/* Right Column - Core Values */}
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {/* Top Row - Team Work and Responsiveness */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Team Work */}
                  <motion.div
                    className="space-y-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-amberwood-200 rounded-full"></div>
                      <h3 className="text-[16px] font-semibold text-white font-plex">
                        TEAM WORK
                      </h3>
                    </div>
                    <p className="text-[12px] md:text-[14px] leading-relaxed text-amberwood-50 font-inter">
                      Working well in a team improves productivity on all
                      levels. We encourage the spirit of togetherness and team
                      work among our employees. We promote the culture of open
                      communication and respect among our employees whilst
                      working towards the fulfilment of our clients' needs.
                    </p>
                  </motion.div>

                  {/* Responsiveness */}
                  <motion.div
                    className="space-y-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-amberwood-200 rounded-full"></div>
                      <h3 className="text-[16px] font-semibold text-white font-plex">
                        RESPONSIVENESS
                      </h3>
                    </div>
                    <p className="text-[12px] md:text-[14px] leading-relaxed text-amberwood-50 font-inter">
                      Responsiveness is a key element to ensure that the client
                      has a great consulting experience. This is how we at
                      Kimberly Ryan Limited take prompt actions to meet the
                      needs of our clients.
                    </p>
                  </motion.div>
                </div>

                {/* Bottom Row - Integrity and Innovation */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Integrity */}
                  <motion.div
                    className="space-y-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-amberwood-200 rounded-full"></div>
                      <h3 className="text-[16px] font-semibold text-white font-plex">
                        INTEGRITY
                      </h3>
                    </div>
                    <p className="text-[12px] md:text-[14px] leading-relaxed text-amberwood-50 font-inter">
                      At Kimberly Ryan Limited we intentionally and constantly
                      aim to be a solution provider that clients are proud to be
                      associated with due to our transparency and strong ethical
                      values.
                    </p>
                  </motion.div>

                  {/* Innovation */}
                  <motion.div
                    className="space-y-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.4 }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-amberwood-200 rounded-full"></div>
                      <h3 className="text-[16px] font-semibold text-white font-plex">
                        INNOVATION
                      </h3>
                    </div>
                    <p className="text-[12px] md:text-[14px] leading-relaxed text-amberwood-50 font-inter">
                      The culture here at Kimberly Ryan Limited provides room
                      for individual and corporate creativity. Our employees
                      rely on this core value and the results are evident in the
                      quality of our bespoke solutions.
                    </p>
                  </motion.div>
                </div>

                {/* Quality - Spanning Integrity and Innovation columns */}
                <motion.div
                  className="space-y-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.6 }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-amberwood-200 rounded-full"></div>
                    <h3 className="text-[16px] font-semibold text-white font-plex">
                      QUALITY
                    </h3>
                  </div>
                  <p className="text-[12px] md:text-[14px] leading-relaxed text-amberwood-50 font-inter">
                    We strive to achieve optimal client satisfaction by
                    challenging the status quo and continuous improvement of our
                    services. It is embedded in all activities and processes, at
                    the forefront of all decisions taken.
                  </p>
                </motion.div>
              </motion.div>
            </div>

            {/* Large Tablet/Small Desktop Layout (1024px - 1279px) */}
            <div
              className="hidden lg:grid xl:hidden"
              style={{
                gridTemplateColumns: "30fr 60fr",
                gap: "clamp(48px, 4.5vw, 80px)",
              }}
            >
              {/* Left Column - Main Content */}
              <motion.div
                className="flex flex-col justify-start"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <motion.h2
                  className="text-[32px] lg:text-[36px] font-semibold text-white leading-tight font-plex mb-7 max-w-[320px]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  Theres a <span className="italic">TRIIQ</span> to how we
                  operate within the Kimberly Ryan Ecosystem
                </motion.h2>

                <motion.p
                  className="text-[15px] lg:text-[17px] leading-relaxed text-amberwood-50 font-inter mb-7 max-w-[320px]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  These Core Values are how we identify ourselves as a brand,
                  how we carry out our business dealings and how we relate to
                  colleagues internally.
                </motion.p>

                <motion.p
                  className="text-[15px] lg:text-[17px] text-amberwood-50 font-inter"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                >
                  --- Its in our DNA.
                </motion.p>
              </motion.div>

              {/* Right Column - Core Values */}
              <motion.div
                className="space-y-7"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {/* Top Row - Team Work and Responsiveness */}
                <div className="grid grid-cols-2 gap-5 lg:gap-6">
                  {/* Team Work */}
                  <motion.div
                    className="space-y-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-amberwood-200 rounded-full"></div>
                      <h3 className="text-[17px] lg:text-[19px] font-semibold text-white font-plex">
                        TEAM WORK
                      </h3>
                    </div>
                    <p className="text-[13px] lg:text-[15px] leading-relaxed text-amberwood-50 font-inter">
                      Working well in a team improves productivity on all
                      levels. We encourage the spirit of togetherness and team
                      work among our employees. We promote the culture of open
                      communication and respect among our employees whilst
                      working towards the fulfilment of our clients' needs.
                    </p>
                  </motion.div>

                  {/* Responsiveness */}
                  <motion.div
                    className="space-y-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-amberwood-200 rounded-full"></div>
                      <h3 className="text-[17px] lg:text-[19px] font-semibold text-white font-plex">
                        RESPONSIVENESS
                      </h3>
                    </div>
                    <p className="text-[13px] lg:text-[15px] leading-relaxed text-amberwood-50 font-inter">
                      Responsiveness is a key element to ensure that the client
                      has a great consulting experience. This is how we at
                      Kimberly Ryan Limited take prompt actions to meet the
                      needs of our clients.
                    </p>
                  </motion.div>
                </div>

                {/* Bottom Row - Integrity and Innovation */}
                <div className="grid grid-cols-2 gap-5 lg:gap-6">
                  {/* Integrity */}
                  <motion.div
                    className="space-y-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-amberwood-200 rounded-full"></div>
                      <h3 className="text-[17px] lg:text-[19px] font-semibold text-white font-plex">
                        INTEGRITY
                      </h3>
                    </div>
                    <p className="text-[13px] lg:text-[15px] leading-relaxed text-amberwood-50 font-inter">
                      At Kimberly Ryan Limited we intentionally and constantly
                      aim to be a solution provider that clients are proud to be
                      associated with due to our transparency and strong ethical
                      values.
                    </p>
                  </motion.div>

                  {/* Innovation */}
                  <motion.div
                    className="space-y-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.4 }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-amberwood-200 rounded-full"></div>
                      <h3 className="text-[17px] lg:text-[19px] font-semibold text-white font-plex">
                        INNOVATION
                      </h3>
                    </div>
                    <p className="text-[13px] lg:text-[15px] leading-relaxed text-amberwood-50 font-inter">
                      The culture here at Kimberly Ryan Limited provides room
                      for individual and corporate creativity. Our employees
                      rely on this core value and the results are evident in the
                      quality of our bespoke solutions.
                    </p>
                  </motion.div>
                </div>

                {/* Quality - Spanning Integrity and Innovation columns */}
                <motion.div
                  className="space-y-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.6 }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-amberwood-200 rounded-full"></div>
                    <h3 className="text-[17px] lg:text-[19px] font-semibold text-white font-plex">
                      QUALITY
                    </h3>
                  </div>
                  <p className="text-[13px] lg:text-[15px] leading-relaxed text-amberwood-50 font-inter max-w-[480px]">
                    We strive to achieve optimal client satisfaction by
                    challenging the status quo and continuous improvement of our
                    services. It is embedded in all activities and processes, at
                    the forefront of all decisions taken.
                  </p>
                </motion.div>
              </motion.div>
            </div>

            {/* Extra Large Desktop Layout (≥1280px) */}
            <div
              className="hidden xl:grid"
              style={{
                gridTemplateColumns: "360px 792px",
                gap: "clamp(64px, 5vw, 120px)",
              }}
            >
              {/* Left Column - Main Content */}
              <motion.div
                className="flex flex-col justify-start"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <motion.h2
                  className="text-[36px] md:text-[42px] lg:text-[48px] font-semibold text-white leading-tight font-plex mb-8 max-w-[360px]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  Theres a <span className="italic">TRIIQ</span> to how we
                  operate within the Kimberly Ryan Ecosystem
                </motion.h2>

                <motion.p
                  className="text-[16px] md:text-[18px] leading-relaxed text-amberwood-50 font-inter mb-8 max-w-[360px]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  These Core Values are how we identify ourselves as a brand,
                  how we carry out our business dealings and how we relate to
                  colleagues internally.
                </motion.p>

                <motion.p
                  className="text-[16px] md:text-[18px] text-amberwood-50 font-inter"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                >
                  --- Its in our DNA.
                </motion.p>
              </motion.div>

              {/* Right Column - Core Values */}
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {/* Top Row - Team Work and Responsiveness */}
                <div className="grid grid-cols-2 gap-6 lg:gap-8">
                  {/* Team Work */}
                  <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-amberwood-200 rounded-full"></div>
                      <h3 className="text-[18px] md:text-[20px] font-semibold text-white font-plex">
                        TEAM WORK
                      </h3>
                    </div>
                    <p className="text-[14px] md:text-[16px] leading-relaxed text-amberwood-50 font-inter">
                      Working well in a team improves productivity on all
                      levels. We encourage the spirit of togetherness and team
                      work among our employees. We promote the culture of open
                      communication and respect among our employees whilst
                      working towards the fulfilment of our clients' needs.
                    </p>
                  </motion.div>

                  {/* Responsiveness */}
                  <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-amberwood-200 rounded-full"></div>
                      <h3 className="text-[18px] md:text-[20px] font-semibold text-white font-plex">
                        RESPONSIVENESS
                      </h3>
                    </div>
                    <p className="text-[14px] md:text-[16px] leading-relaxed text-amberwood-50 font-inter">
                      Responsiveness is a key element to ensure that the client
                      has a great consulting experience. This is how we at
                      Kimberly Ryan Limited take prompt actions to meet the
                      needs of our clients.
                    </p>
                  </motion.div>
                </div>

                {/* Bottom Row - Integrity and Innovation */}
                <div className="grid grid-cols-2 gap-6 lg:gap-8">
                  {/* Integrity */}
                  <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-amberwood-200 rounded-full"></div>
                      <h3 className="text-[18px] md:text-[20px] font-semibold text-white font-plex">
                        INTEGRITY
                      </h3>
                    </div>
                    <p className="text-[14px] md:text-[16px] leading-relaxed text-amberwood-50 font-inter">
                      At Kimberly Ryan Limited we intentionally and constantly
                      aim to be a solution provider that clients are proud to be
                      associated with due to our transparency and strong ethical
                      values.
                    </p>
                  </motion.div>

                  {/* Innovation */}
                  <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.4 }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-amberwood-200 rounded-full"></div>
                      <h3 className="text-[18px] md:text-[20px] font-semibold text-white font-plex">
                        INNOVATION
                      </h3>
                    </div>
                    <p className="text-[14px] md:text-[16px] leading-relaxed text-amberwood-50 font-inter">
                      The culture here at Kimberly Ryan Limited provides room
                      for individual and corporate creativity. Our employees
                      rely on this core value and the results are evident in the
                      quality of our bespoke solutions.
                    </p>
                  </motion.div>
                </div>

                {/* Quality - Spanning Integrity and Innovation columns */}
                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.6 }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-amberwood-200 rounded-full"></div>
                    <h3 className="text-[18px] md:text-[20px] font-semibold text-white font-plex">
                      QUALITY
                    </h3>
                  </div>
                  <p className="text-[14px] md:text-[16px] leading-relaxed text-amberwood-50 font-inter max-w-[560px]">
                    We strive to achieve optimal client satisfaction by
                    challenging the status quo and continuous improvement of our
                    services. It is embedded in all activities and processes, at
                    the forefront of all decisions taken.
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden space-y-8">
            {/* Main Heading */}
            <motion.h2
              className="text-[30px] font-semibold text-white leading-tight font-plex"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Theres a <span className="italic">TRIIQ</span> to how we
              operate within the Kimberly Ryan Ecosystem
            </motion.h2>

            {/* Description */}
            <motion.p
              className="text-[16px] leading-relaxed text-amberwood-50 font-inter"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              These Core Values are how we identify ourselves as a brand, how we
              carry out our business dealings and how we relate to colleagues
              internally.
            </motion.p>

            <motion.p
              className="text-[16px] text-amberwood-50 font-inter"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              --- Its in our DNA.
            </motion.p>

            {/* Core Values List */}
            <div className="space-y-8 mt-12">
              {/* Team Work */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                <h3 className="text-[20px] font-semibold text-white font-plex">
                  TEAM WORK
                </h3>
                <p
                  className="text-[16px] leading-relaxed font-inter"
                  style={{ color: "#E9D7FE" }}
                >
                  Working well in a team improves productivity on all levels. We
                  encourage the spirit of togetherness and team work among our
                  employees. We promote the culture of open communication and
                  respect among our employees whilst working towards the
                  fulfilment of our clients' needs.
                </p>
              </motion.div>

              {/* Responsiveness */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <h3 className="text-[20px] font-semibold text-white font-plex">
                  RESPONSIVENESS
                </h3>
                <p
                  className="text-[16px] leading-relaxed font-inter"
                  style={{ color: "#E9D7FE" }}
                >
                  Responsiveness is a key element to ensure that the client has
                  a great consulting experience. This is how we at Kimberly Ryan
                  Limited take prompt actions to meet the needs of our clients.
                </p>
              </motion.div>

              {/* Integrity */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 }}
              >
                <h3 className="text-[20px] font-semibold text-white font-plex">
                  INTEGRITY
                </h3>
                <p
                  className="text-[16px] leading-relaxed font-inter"
                  style={{ color: "#E9D7FE" }}
                >
                  At Kimberly Ryan Limited we intentionally and constantly aim
                  to be a solution provider that clients are proud to be
                  associated with due to our transparency and strong ethical
                  values.
                </p>
              </motion.div>

              {/* Innovation */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.6 }}
              >
                <h3 className="text-[20px] font-semibold text-white font-plex">
                  INNOVATION
                </h3>
                <p
                  className="text-[16px] leading-relaxed font-inter"
                  style={{ color: "#E9D7FE" }}
                >
                  The culture here at Kimberly Ryan Limited provides room for
                  individual and corporate creativity. Our employees rely on
                  this core value and the results are evident in the quality of
                  our bespoke solutions.
                </p>
              </motion.div>

              {/* Quality */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.8 }}
              >
                <h3 className="text-[20px] font-semibold text-white font-plex">
                  QUALITY
                </h3>
                <p
                  className="text-[16px] leading-relaxed font-inter"
                  style={{ color: "#E9D7FE" }}
                >
                  We strive to achieve optimal client satisfaction by
                  challenging the status quo and continuous improvement of our
                  services. It is embedded in all activities and processes, at
                  the forefront of all decisions taken.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CoreValuesSection;

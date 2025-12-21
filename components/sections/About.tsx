"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import SectionHeader from "../ui/SectionHeader";

export default function EventInformation() {
  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section id="about" className="py-12 sm:py-16 px-4 md:px-0 bg-white/5">
      <div className="container mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <SectionHeader title="Event Information" />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {/* Event Images */}
          <div className="lg:col-span-1 space-y-4 sm:space-y-6">
            {/* Top Image */}
            <motion.div
              variants={fadeInUp}
              className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-linear-to-br from-green-800/80 to-green-900/80 backdrop-blur-sm border border-gray-700/50"
            >
              <div className="relative h-64 sm:h-80 md:h-96">
                <Image
                  src="/image_3.jpg"
                  alt="Event venue"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>
            </motion.div>

            {/* Bottom Images Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <motion.div
                variants={fadeInUp}
                className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-linear-to-br from-green-800/80 to-green-900/80 backdrop-blur-sm border border-gray-700/50"
              >
                <div className="relative aspect-square">
                  <Image
                    src="/image_1.jpg"
                    alt="Event atmosphere"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 16vw"
                  />
                </div>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-linear-to-br from-green-800/80 to-green-900/80 backdrop-blur-sm border border-gray-700/50"
              >
                <div className="relative aspect-square">
                  <Image
                    src="/image_2.jpg"
                    alt="Event highlights"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 16vw"
                  />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Event Details */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Venue Section */}
            <motion.div
              variants={fadeInUp}
              className="bg-linear-to-br from-green-800/40 to-green-900/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-700/50"
            >
              <h2 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">
                Venue
              </h2>
              <div className="space-y-3">
                <h3 className="text-base sm:text-lg font-semibold text-white">
                  TBC
                </h3>
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-orange-400 mt-1 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <p className="text-white font-semibold text-sm sm:text-base">
                      Venue Address:
                    </p>
                    <p className="text-gray-300 text-sm">TBC</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* On The Evening Section */}
            <motion.div
              variants={fadeInUp}
              className="bg-linear-to-br from-green-800/40 to-green-900/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-700/50"
            >
              <h2 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">
                On The Evening
              </h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 shrink-0"></div>
                  <p className="text-gray-300 text-sm sm:text-base">
                    Luxury dinner
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 shrink-0"></div>
                  <p className="text-gray-300 text-sm sm:text-base">
                    DJ and entertainment
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 shrink-0"></div>
                  <p className="text-gray-300 text-sm sm:text-base">
                    Networking with the best of the iGaming Community
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-700/50">
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <div>
                    <p className="text-white font-semibold text-sm sm:text-base">
                      Dress code:
                    </p>
                    <p className="text-gray-300 text-sm">
                      Smart Casual/Lounge Suites/Cocktail Dresses
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

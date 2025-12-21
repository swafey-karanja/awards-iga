"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  centered = true,
}) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
    variants={fadeInUp}
    className={`mb-8 sm:mb-12 md:mb-16 px-4 ${centered ? "text-center" : ""}`}
  >
    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 bg-linear-to-r from-white to-white/60 bg-clip-text text-transparent">
      {title}
    </h2>
    {subtitle && (
      <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
        {subtitle}
      </p>
    )}
  </motion.div>
);

export default SectionHeader;

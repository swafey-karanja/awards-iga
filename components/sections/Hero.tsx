"use client";

import { motion, Variants } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Button from "../ui/Button";

interface StatItem {
  value: string;
  label: string;
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// Animation variants with proper typing
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
  },
};

// Hero Section
const Hero: React.FC = () => {
  const stats: StatItem[] = [
    { value: "15+", label: "Years Experience" },
    { value: "25+", label: "Awards Won" },
    { value: "10M+", label: "Active Users" },
    { value: "12+", label: "Countries" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-white/5">
      <div className="relative z-10 conatiner mx-auto px-6 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
          >
            Join The Inagural Edition of
            <br />
            <span className="bg-linear-to-r from-green-500 to-green-700 bg-clip-text text-transparent">
              iGaming Afrika Awards
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto"
          >
            Celebrating Excellence and Innovation in the African iGaming
            Industry. Recognizing the Pioneers Shaping the Future of Gaming on
            the Continent.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap justify-center mb-20"
          >
            <Button>
              Explore the awards up for grabs and more information about the
              event <ArrowDown className="inline ml-2" size={20} />
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {stats.map((stat: StatItem, index: number) => (
              <motion.div
                key={index}
                variants={scaleIn}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-orange-500/50 transition-all"
              >
                <div className="text-4xl font-bold text-green-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

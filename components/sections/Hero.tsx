"use client";

import { motion, Variants } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Button from "../ui/Button";

interface StatItem {
  value: string;
  label: string;
}

interface HeroProps {
  title?: string;
  highlightedText?: string;
  description?: string;
  buttonText?: string;
  showButton?: boolean;
  showStats?: boolean;
  showDescription?: boolean;
  backgroundImage?: string;
  backgroundOverlay?: boolean;
  overlayOpacity?: number;
  stats?: StatItem[];
  containerClassName?: string;
  titleClassName?: string;
  isHomePage?: boolean;
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

const Hero: React.FC<HeroProps> = ({
  title = "Join The Inaugural Edition of",
  highlightedText = "iGaming Afrika Awards",
  description = "Celebrating Excellence and Innovation in the African iGaming Industry. Recognizing the Pioneers Shaping the Future of Gaming on the Continent.",
  buttonText = "Explore the awards up for grabs and more information about the event",
  showButton = true,
  showStats = true,
  showDescription = true,
  backgroundImage,
  backgroundOverlay = true,
  overlayOpacity = 0.5,
  stats = [
    { value: "3500+", label: "Delegates" },
    { value: "100+", label: "Speakers" },
    { value: "350+", label: "Affiliates" },
    { value: "500+", label: "Operators" },
    { value: "100+", label: "Exhibitors & Sponsors" },
  ],
  containerClassName = "",
  titleClassName = "",
  isHomePage = true,
}) => {
  return (
    <section
      className={`relative ${
        isHomePage ? "min-h-screen" : "min-h-[70vh]"
      } flex items-center justify-center overflow-hidden pt-24 sm:pt-32`}
    >
      {/* Background Image */}
      {backgroundImage && (
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      )}

      {/* Background Overlay */}
      {backgroundImage && backgroundOverlay && (
        <div
          className="absolute inset-0 z-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      )}

      {/* Fallback background */}
      {!backgroundImage && <div className="absolute inset-0 z-0 bg-white/5" />}

      <div
        className={`relative z-10 container mx-auto px-4 sm:px-6 text-center ${containerClassName}`}
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1
            variants={fadeInUp}
            className={`text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 leading-tight ${titleClassName}`}
          >
            {title}
            <br />
            <span className="bg-linear-to-r from-green-500 to-green-700 bg-clip-text text-transparent">
              {highlightedText}
            </span>
          </motion.h1>

          {showDescription && (
            <motion.p
              variants={fadeInUp}
              className="text-base sm:text-lg md:text-xl text-white mb-8 sm:mb-12 max-w-3xl mx-auto px-4"
            >
              {description}
            </motion.p>
          )}

          {showButton && (
            <motion.div
              variants={fadeInUp}
              className="flex justify-center mb-12 sm:mb-16 md:mb-20 px-4"
            >
              <Button className="text-sm sm:text-base">
                <span className="hidden sm:inline">{buttonText}</span>
                <span className="sm:hidden">Explore Awards</span>
                {/* <ArrowDown className="inline ml-2" size={20} /> */}
              </Button>
            </motion.div>
          )}

          {/* Stats */}
          {showStats && stats && stats.length > 0 && (
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 md:gap-6 max-w-5xl mx-auto px-4"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:border-green-500/50 transition-all"
                >
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-600 mb-1 sm:mb-2">
                    {stat.value}
                  </div>
                  <div className="text-white text-xs sm:text-sm leading-tight">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

"use client";

import { motion, Variants } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Button from "../ui/Button";

interface StatItem {
  value: string;
  label: string;
}

interface HeroProps {
  // Content configuration
  title?: string;
  highlightedText?: string;
  description?: string;
  buttonText?: string;

  // Display toggles
  showButton?: boolean;
  showStats?: boolean;
  showDescription?: boolean;

  // Background configuration
  backgroundImage?: string;
  backgroundOverlay?: boolean;
  overlayOpacity?: number;

  // Stats configuration
  stats?: StatItem[];

  // Custom classes
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
    { value: "15+", label: "Years Experience" },
    { value: "25+", label: "Awards Won" },
    { value: "10M+", label: "Active Users" },
    { value: "12+", label: "Countries" },
  ],
  containerClassName = "",
  titleClassName = "",
  isHomePage = true,
}) => {
  return (
    <section
      className={`relative ${
        isHomePage ? "min-h-screen" : "min-h-[65vh]"
      } flex items-center justify-center overflow-hidden pt-20`}
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

      {/* Fallback background if no image */}
      {!backgroundImage && <div className="absolute inset-0 z-0 bg-white/5" />}

      <div
        className={`relative z-10 container mx-auto px-6 text-center ${containerClassName}`}
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1
            variants={fadeInUp}
            className={`text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight ${titleClassName}`}
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
              className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto"
            >
              {description}
            </motion.p>
          )}

          {showButton && (
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap justify-center mb-20"
            >
              <Button>
                {buttonText} <ArrowDown className="inline ml-2" size={20} />
              </Button>
            </motion.div>
          )}

          {/* Stats */}
          {showStats && stats && stats.length > 0 && (
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
            >
              {stats.map((stat: StatItem, index: number) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-green-500/50 transition-all"
                >
                  <div className="text-4xl font-bold text-green-600 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
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

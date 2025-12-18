"use client";

import { motion, Variants } from "framer-motion";
import Button from "../ui/Button";

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

// About Section
const About: React.FC = () => {
  return (
    <section id="about" className="py-16 px-6 bg-white/5">
      <div className="container mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-16 items-center"
        >
          <motion.div variants={fadeInUp}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Transforming Ideas into
              <span className="text-green-600"> Digital Success</span>
            </h2>
            <p className="text-gray-400 text-lg mb-6">
              With over 15 years of experience, we&apos;ve helped hundreds of
              brands establish their digital presence and achieve remarkable
              growth through innovative solutions.
            </p>
            <p className="text-gray-400 text-lg mb-8">
              Our team of creative experts is passionate about pushing
              boundaries and delivering results that exceed expectations.
            </p>
            <Button>Learn More About Us</Button>
          </motion.div>

          <motion.div variants={fadeInUp} className="relative">
            <div className="aspect-video bg-linear-to-br from-orange-500/20 to-purple-500/20 rounded-2xl border border-white/10 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
                  aria-label="Play video"
                >
                  <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1"></div>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;

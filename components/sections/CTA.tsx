"use client";

import { motion, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
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

// Animation variants with proper typing
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// CTA Section
const CTA: React.FC = () => {
  return (
    <section className="py-16 px-6 bg-linear-to-br from-green-500/10 to-purple-500/10">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Empower Your Brand
            <br />
            <span className="text-green-500">With Creative Today</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-xl text-gray-400 mb-12">
            Let&apos;s create something amazing together. Start your journey to
            digital excellence.
          </motion.p>
          <motion.div
            variants={fadeInUp}
            className="flex gap-4 justify-center flex-wrap"
          >
            <Button>
              Get Started Now <ArrowRight className="inline ml-2" size={20} />
            </Button>
            <Button variant="secondary">Schedule a Call</Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;

"use client";

import { motion } from "framer-motion";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
  },
};

const Card: React.FC<CardProps> = ({
  children,
  className = "",
  hover = true,
}) => (
  <motion.div
    variants={scaleIn}
    whileHover={hover ? { y: -4, scale: 1.02 } : {}}
    className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 transition-all duration-300 ${
      hover
        ? "hover:border-green-500/50 hover:shadow-xl hover:shadow-green-500/10"
        : ""
    } ${className}`}
  >
    {children}
  </motion.div>
);

export default Card;

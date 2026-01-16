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
    whileHover={hover ? { y: -2, scale: 1.02 } : {}}
    className={`bg-green-100/90 backdrop-blur-sm border border-green-200/60 rounded-2xl p-8 transition-all duration-300 shadow-sm ${
      hover
        ? "hover:border-green-600/60 hover:shadow-sm hover:shadow-green-600/20"
        : ""
    } ${className}`}
  >
    {children}
  </motion.div>
);

export default Card;

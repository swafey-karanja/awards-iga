import React from "react";
import { motion, Variants } from "framer-motion";
import Button from "./Button";
import { ArrowRight, Award, X } from "lucide-react";
import Link from "next/link";

interface AwardCategory {
  id: number;
  title: string;
  description: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  award: AwardCategory | null;
}

const Modal: React.FC<ModalProps> = ({ onClose, award }) => {
  if (!award) return null;

  const modalVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } },
  };

  const backdropVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <motion.div
        className="relative bg-green-900/95 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 max-w-4xl w-full max-h-[90vh] sm:max-h-[85vh] overflow-y-auto border border-green-500/20 shadow-2xl shadow-green-500/10"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute cursor-pointer top-3 right-3 sm:top-4 sm:right-4 w-9 h-9 sm:w-10 sm:h-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200 border border-white/10 hover:border-green-500/50"
          aria-label="Close modal"
        >
          <X size={18} className="sm:w-5 sm:h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6 sm:mb-8 pr-8">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 flex-wrap">
            <span className="px-3 sm:px-4 py-1 bg-purple-500/10 border border-purple-500/30 rounded-full text-xs sm:text-sm text-purple-400 font-semibold">
              Category #{award.id}
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 flex items-start gap-3">
            <Award
              size={28}
              className="text-green-500 shrink-0 sm:w-9 sm:h-9"
            />
            <span className="leading-tight">{award.title}</span>
          </h3>

          <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed">
            {award.description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-white/10">
          <Button
            variant="secondary"
            onClick={onClose}
            className="w-full sm:w-auto order-2 sm:order-1"
          >
            Close
          </Button>
          <Link href="/awards" className="w-full sm:w-auto order-1 sm:order-2">
            <Button className="w-full sm:w-auto">
              Submit Nomination
              <ArrowRight className="inline ml-2" size={18} />
            </Button>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Modal;

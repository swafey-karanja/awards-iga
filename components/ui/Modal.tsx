import React from "react";
import { motion, Variants } from "framer-motion";
import Button from "./Button";
import { ArrowRight, Award, X } from "lucide-react";

interface AwardCategory {
  id: number;
  title: string;
  description: string;
}

/// Portfolio Modal Component
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <motion.div
        className="relative  bg-green-900/95 backdrop-blur-lg rounded-3xl p-8 max-w-4xl w-full max-h-[85vh] overflow-y-auto border border-orange-500/20 shadow-2xl shadow-orange-500/10"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute cursor-pointer top-4 right-4 w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200 border border-white/10 hover:border-green-500/50"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            {/* <span className="px-4 py-1 bg-orange-500/10 border border-orange-500/30 rounded-full text-sm text-orange-400 font-semibold">
              {award.category}
            </span> */}
            <span className="px-4 py-1 bg-purple-500/10 border border-purple-500/30 rounded-full text-sm text-purple-400 font-semibold">
              Category #{award.id}
            </span>
          </div>

          <h3 className="text-4xl font-bold text-white mb-4 flex items-center">
            <Award size={36} className="text-orange-500 mr-4" />
            {award.title}
          </h3>

          <p className="text-lg text-gray-300 leading-relaxed">
            {award.description}
          </p>
        </div>

        {/* Nominees Section */}
        {/* {award.nominees && award.nominees.length > 0 && (
          <div className="mb-8">
            <h4 className="text-xl font-bold text-white mb-4 flex items-center">
              <Users size={20} className="text-orange-500 mr-2" />
              Nominees
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {award.nominees.map((nominee: string, index: number) => (
                <motion.div
                  key={index}
                  className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-orange-500/30 transition-all duration-300"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <p className="text-white font-semibold">{nominee}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )} */}

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 pt-6 border-t border-white/10">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary">
            Submit Nomination <ArrowRight className="inline ml-2" size={18} />
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Modal;

import React from "react";
import { motion, Variants } from "framer-motion";
import Button from "./Button";
import { Award, Trophy, X, Crown, Star } from "lucide-react";
import { AwardCategory } from "@/lib/types";
import Image from "next/image";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  award: AwardCategory | null;
}

const Modal: React.FC<ModalProps> = ({ onClose, award }) => {
  if (!award) return null;

  const backdropVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  const winnerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 0.2 },
    },
  };

  const hasWinner = award.winner && award.winner.name;

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
        className="absolute inset-0 bg-black/50 dark:bg-green-950/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        className="relative bg-green-900/95 dark:bg-green-950/95 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 max-w-4xl w-full max-h-[90vh] sm:max-h-[85vh] overflow-y-auto border border-green-500/20 dark:border-green-600/30 shadow-2xl shadow-green-500/10 dark:shadow-green-600/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute cursor-pointer top-3 right-3 sm:top-4 sm:right-4 w-9 h-9 sm:w-10 sm:h-10 bg-white/5 dark:bg-gray-800/50 hover:bg-white/10 dark:hover:bg-gray-700/50 rounded-full flex items-center justify-center text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-200 transition-all duration-200 border border-white/10 dark:border-gray-700/50 hover:border-green-500/50 dark:hover:border-green-600/50"
          aria-label="Close modal"
        >
          <X size={18} className="sm:w-5 sm:h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6 sm:mb-8 pr-8">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 flex-wrap">
            <span className="px-3 sm:px-4 py-1 bg-purple-500/10 dark:bg-purple-600/20 border border-purple-500/30 dark:border-purple-600/40 rounded-full text-xs sm:text-sm text-purple-400 dark:text-purple-300 font-semibold">
              Category #{award.category_id}
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 flex items-start gap-3">
            <Award
              size={28}
              className="text-green-500 dark:text-green-400 shrink-0 sm:w-9 sm:h-9"
            />
            <span className="leading-tight">{award.category_title}</span>
          </h3>

          <p className="text-sm sm:text-base md:text-lg text-gray-300 dark:text-gray-400 leading-relaxed">
            {award.description}
          </p>
        </div>

        {/* ── WINNER SECTION ── */}
        {hasWinner && (
          <motion.div
            className="mb-6 sm:mb-8"
            variants={winnerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Section label */}
            <div className="flex items-center gap-2 mb-4">
              <Crown size={18} className="text-amber-400" />
              <h4 className="text-base sm:text-xl font-bold text-white">
                Winner
              </h4>
            </div>

            {/* Winner card */}
            <div className="relative overflow-hidden rounded-2xl border border-amber-500/30 bg-linear-to-br from-amber-500/10 via-yellow-500/5 to-green-900/40 p-5 sm:p-6">
              {/* Decorative glow */}
              <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-amber-400/10 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-yellow-400/10 blur-2xl" />

              <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-5">
                {/* Winner image */}
                <div className="shrink-0">
                  <div className="relative w-62 h-24 ring-1 ring-green-400/50 ring-offset-1 ring-offset-transparent overflow-hidden bg-green-100">
                    {award.winner?.image_url ? (
                      <Image
                        src={award.winner.image_url}
                        alt={award.winner.name}
                        fill
                        className="object-contain"
                        sizes="250px"
                        quality={100}
                      />
                    ) : (
                      /* Fallback avatar when no image is provided */
                      <div className="w-full h-full flex items-center justify-center bg-amber-500/20">
                        <Star
                          size={36}
                          className="text-amber-400 opacity-70"
                          fill="currentColor"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Winner details */}
                <div className="flex-1 text-center sm:text-left">
                  <p className="text-xs font-semibold uppercase tracking-widest text-amber-400/80 mb-1">
                    🏆 Award Winner
                  </p>
                  <h5 className="text-2xl sm:text-3xl font-bold text-white mb-2 leading-tight">
                    {award.winner?.name}
                  </h5>
                </div>
              </div>
            </div>

            {/* Divider between winner and nominees */}
            <div className="mt-6 flex items-center gap-3">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-xs text-gray-500 font-medium uppercase tracking-widest">
                Nominees
              </span>
              <div className="flex-1 h-px bg-white/10" />
            </div>
          </motion.div>
        )}

        {/* Nominees */}
        {award.nominees && award.nominees.length > 0 && (
          <div className="mb-6 sm:mb-8">
            {/* Only show the nominees header when there's no winner (winner section already has the divider) */}
            {!hasWinner && (
              <div className="flex items-center gap-2 mb-4">
                <Trophy size={18} className="text-green-400" />
                <h4 className="text-base sm:text-xl font-bold text-white">
                  Shortlisted Nominees
                </h4>
                <span className="ml-auto text-xs text-gray-400 font-medium">
                  {award.nominees.length} nominees
                </span>
              </div>
            )}

            {hasWinner && (
              <div className="flex items-center gap-2 mb-4 mt-4">
                <Trophy size={18} className="text-green-400" />
                <h4 className="text-base sm:text-xl font-bold text-white">
                  Shortlisted Nominees
                </h4>
                <span className="ml-auto text-xs text-gray-400 font-medium">
                  {award.nominees.length} nominees
                </span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {award.nominees.map((nom, index) => {
                const isWinner =
                  hasWinner &&
                  award.winner?.name.toLowerCase() ===
                    nom.nominee.toLowerCase();

                return (
                  <div
                    key={nom.nominee_id}
                    className={`flex items-center gap-3 border rounded-xl px-4 py-3 transition-all duration-200 group ${
                      isWinner
                        ? "bg-amber-500/10 border-amber-500/40"
                        : "bg-white/5 border-white/10"
                    }`}
                  >
                    <span
                      className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center shrink-0 transition-colors ${
                        isWinner
                          ? "bg-amber-500/30 border border-amber-400/50 text-amber-300"
                          : "bg-green-500/20 border border-green-500/30 text-green-400"
                      }`}
                    >
                      {isWinner ? (
                        <Crown size={12} fill="currentColor" />
                      ) : (
                        index + 1
                      )}
                    </span>
                    <span
                      className={`text-lg leading-snug font-semibold transition-colors ${
                        isWinner ? "text-amber-200" : "text-gray-200"
                      }`}
                    >
                      {nom.nominee}
                    </span>
                    {isWinner && (
                      <span className="ml-auto text-xs text-amber-400/80 font-medium">
                        Winner
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-white/10 dark:border-gray-700/50">
          <Button
            variant="secondary"
            onClick={onClose}
            className="w-full sm:w-auto order-2 sm:order-1"
          >
            Close
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default Modal;

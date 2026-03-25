"use client";

import { motion } from "framer-motion";
import { Vote } from "lucide-react";

interface SubmitBarProps {
  voteCount: number;
  isSubmitting: boolean;
  onSubmit: () => void;
}

export default function SubmitBar({
  voteCount,
  isSubmitting,
  onSubmit,
}: SubmitBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="sticky bottom-4"
    >
      <div className="bg-green-500/80 dark:bg-gray-900/90 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-2xl p-4 shadow-xl shadow-black/10 dark:shadow-black/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-lg font-semibold text-gray-800 dark:text-gray-400">
          {voteCount === 0 ? (
            "Select nominees above to cast your votes"
          ) : (
            <>
              <span className="font-bold text-black dark:text-white">
                {voteCount}
              </span>{" "}
              categor
              {voteCount === 1 ? "y" : "ies"} voted
            </>
          )}
        </p>

        <button
          onClick={onSubmit}
          disabled={isSubmitting}
          className={`w-full sm:w-auto px-8 py-3 rounded-full font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
            isSubmitting
              ? "bg-green-400 text-white cursor-not-allowed"
              : "bg-green-700 hover:bg-green-700 text-white cursor-pointer hover:-translate-y-0.5"
          }`}
        >
          {isSubmitting ? (
            <>
              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              Submitting…
            </>
          ) : (
            <>
              <Vote size={20} />
              Submit{" "}
              {voteCount > 0
                ? `${voteCount} Vote${voteCount !== 1 ? "s" : ""}`
                : "Votes"}
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}

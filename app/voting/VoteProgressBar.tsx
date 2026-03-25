"use client";

import { motion } from "framer-motion";
import { Trophy } from "lucide-react";

interface VoteProgressBarProps {
  voteCount: number;
  totalCategories: number;
}

export default function VoteProgressBar({
  voteCount,
  totalCategories,
}: VoteProgressBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.15 }}
      className="mb-5"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
          <Trophy size={13} className="text-green-600" />
          Award Categories
        </span>
        <span className="text-xs font-bold text-green-600">
          {voteCount} / {totalCategories} voted
        </span>
      </div>
      <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-green-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${(voteCount / totalCategories) * 100}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>
    </motion.div>
  );
}

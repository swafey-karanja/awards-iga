"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import { awardsCategories } from "@/lib/Appdata";

interface CategoryCardProps {
  category: (typeof awardsCategories)[0];
  selection: string | undefined;
  onSelect: (
    categoryId: number,
    categoryTitle: string,
    nominee: string,
  ) => void;
  isExpanded: boolean;
  onToggle: () => void;
  index: number;
}

export default function CategoryCard({
  category,
  selection,
  onSelect,
  isExpanded,
  onToggle,
  index,
}: CategoryCardProps) {
  const nominees = category.nominees ?? [];
  const hasVote = !!selection;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.4 }}
      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
        hasVote
          ? "border-green-500 bg-green-50 dark:bg-green-950/40 shadow-md shadow-green-200 dark:shadow-green-900/30"
          : "border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/60"
      }`}
    >
      {/* Card Header */}
      <button
        onClick={onToggle}
        className="w-full text-left px-5 py-4 flex items-center justify-between gap-3 group"
      >
        <div className="flex items-center gap-3 min-w-0">
          {/* Numbered / check badge */}
          <span
            className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
              hasVote
                ? "bg-green-600 text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 group-hover:bg-green-100 dark:group-hover:bg-green-900/30 group-hover:text-green-700 dark:group-hover:text-green-400"
            }`}
          >
            {hasVote ? <CheckCircle2 size={16} /> : index + 1}
          </span>

          <div className="min-w-0">
            <p className="font-semibold text-md text-gray-900 dark:text-white truncate pr-4">
              {category.title}
            </p>
            {hasVote && (
              <p className="text-sm text-green-700 dark:text-green-400 font-medium mt-0.5 truncate">
                ✓ {selection}
              </p>
            )}
          </div>
        </div>

        <span className="shrink-0 text-gray-400 dark:text-gray-500">
          {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </span>
      </button>

      {/* Expanded Nominee List */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-1">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 leading-relaxed">
                {category.description}
              </p>
              <div className="flex flex-col gap-2">
                {nominees.map((nominee) => {
                  const isSelected = selection === nominee;
                  return (
                    <button
                      key={nominee}
                      onClick={() =>
                        onSelect(category.id, category.title, nominee)
                      }
                      className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200 ${
                        isSelected
                          ? "bg-green-600 border-green-600 text-white shadow-sm"
                          : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-green-400 dark:hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-950/30"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {isSelected && (
                          <CheckCircle2 size={14} className="shrink-0" />
                        )}
                        {nominee}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

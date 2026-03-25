"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export interface VoteSelection {
  categoryId: number;
  categoryTitle: string;
  nominee: string;
}

interface VoteSuccessScreenProps {
  voterName: string;
  selections: Record<number, VoteSelection>;
}

export default function VoteSuccessScreen({
  voterName,
  selections,
}: VoteSuccessScreenProps) {
  const votes = Object.values(selections);

  return (
    <section className="min-h-screen py-20 px-4 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-lg w-full text-center"
      >
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={40} className="text-green-600" />
        </div>

        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
          Votes Submitted!
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-2">
          Thank you,{" "}
          <strong className="text-gray-700 dark:text-gray-200">
            {voterName}
          </strong>
          . Your <strong className="text-green-600">{votes.length}</strong> vote
          {votes.length !== 1 ? "s have" : " has"} been recorded.
        </p>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-4">
          Results will be announced at the iGaming AFRIKA Summit — May 4, 2026
          in Nairobi.
        </p>

        <div className="mt-8 p-4 rounded-xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800">
          <p className="text-xs font-semibold uppercase tracking-widest text-green-700 dark:text-green-400 mb-3">
            Your votes
          </p>
          <ul className="space-y-2">
            {votes.map((s) => (
              <li key={s.categoryId} className="text-sm text-left flex gap-2">
                <span className="text-green-500 shrink-0">✓</span>
                <span className="text-gray-600 dark:text-gray-300">
                  <span className="font-medium text-gray-900 dark:text-white">
                    {s.nominee}
                  </span>
                  {" — "}
                  <span className="text-gray-500 dark:text-gray-400">
                    {s.categoryTitle}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  );
}

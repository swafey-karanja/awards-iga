"use client";

import { motion } from "framer-motion";
import { AlertCircle, Mail, User } from "lucide-react";

interface VoterInfo {
  name: string;
  email: string;
}

interface VotingFormErrors {
  name?: string;
  email?: string;
  votes?: string;
}

interface VoterInfoCardProps {
  voter: VoterInfo;
  errors: VotingFormErrors;
  onChange: (field: keyof VoterInfo, value: string) => void;
}

export default function VoterInfoCard({
  voter,
  errors,
  onChange,
}: VoterInfoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 mb-6 shadow-sm"
    >
      <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4 flex items-center gap-2">
        <User size={14} />
        Your Details
      </h2>

      <div className="grid sm:grid-cols-2 gap-4">
        {/* Name */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Jane Doe"
            value={voter.name}
            onChange={(e) => onChange("name", e.target.value)}
            className={`w-full px-4 py-3 rounded-xl border text-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500 outline-none transition-colors ${
              errors.name
                ? "border-red-400 focus:border-red-500"
                : "border-gray-200 dark:border-gray-700 focus:border-green-500"
            }`}
          />
          {errors.name && (
            <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
              <AlertCircle size={12} /> {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
            Company Email <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail
              size={14}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
            <input
              type="email"
              placeholder="Company email"
              value={voter.email}
              onChange={(e) => onChange("email", e.target.value)}
              className={`w-full pl-9 pr-4 py-3 rounded-xl border text-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500 outline-none transition-colors ${
                errors.email
                  ? "border-red-400 focus:border-red-500"
                  : "border-gray-200 dark:border-gray-700 focus:border-green-500"
              }`}
            />
          </div>
          {errors.email && (
            <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
              <AlertCircle size={12} /> {errors.email}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

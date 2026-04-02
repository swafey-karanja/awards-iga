"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Building,
  CheckCircle2,
  Mail,
  MailCheck,
  Send,
  Trophy,
  User,
  X,
} from "lucide-react";
import { AwardCategory, Nominees } from "@/lib/types";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface VoteSelection {
  categoryId: number;
  categoryTitle: string;
  nomineeId: number;
  nominee: string;
}

export interface VoterInfo {
  name: string;
  email: string;
  companyName: string;
  jobTitle: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  companyName?: string;
  jobTitle?: string;
  categories?: string;
  votes?: string;
}

const STEPS = [
  { id: 1, label: "Your Details" },
  { id: 2, label: "Categories" },
  { id: 3, label: "Cast your Votes" },
  { id: 4, label: "Review" },
];

// ── Step Indicator ────────────────────────────────────────────────────────────

export function StepNav({ current }: { current: number }) {
  return (
    <div className="flex mb-10 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-600">
      {STEPS.map((step) => {
        const done = current > step.id;
        const active = current === step.id;
        return (
          <div
            key={step.id}
            className={`flex-1 py-4 px-3 text-center text-xs font-semibold uppercase tracking-widest transition-colors duration-300 border-r last:border-r-0 border-gray-200 dark:border-gray-800
              ${active ? "bg-green-600 hover:bg-green-600/90 dark:bg-green-700 dark:hover:bg-green-700/90 text-white" : ""}
              ${done ? "bg-green-50 dark:bg-green-950/40 text-green-700 dark:text-green-400" : ""}
              ${!active && !done ? "text-gray-700 dark:text-gray-200 bg-white dark:bg-green-950" : ""}
            `}
          >
            <span
              className={`block font-bold text-lg xl:text-2xl leading-none mb-1
              ${active ? "text-white" : ""}
              ${done ? "text-green-500" : ""}
              ${!active && !done ? "text-gray-600 dark:text-gray-200" : ""}
            `}
            >
              {done ? (
                <CheckCircle2 size={22} className="mx-auto text-green-500" />
              ) : (
                `0${step.id}`
              )}
            </span>
            {step.label}
          </div>
        );
      })}
    </div>
  );
}

// ── Step 1: Voter Details ─────────────────────────────────────────────────────

export function StepDetails({
  voter,
  errors,
  onChange,
  onNext,
}: {
  voter: VoterInfo;
  errors: FormErrors;
  onChange: (field: keyof VoterInfo, value: string) => void;
  onNext: () => void;
}) {
  return (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white leading-tight">
          Voter Information
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 italic">
          Your details are kept strictly confidential and used only to verify
          your ballot.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-5 mb-8">
        <div>
          <label className="block text-md font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
            <input
              type="text"
              placeholder="Jane Doe"
              value={voter.name}
              onChange={(e) => onChange("name", e.target.value)}
              className={`w-full pl-9 pr-4 py-4 rounded-lg border text-md text-gray-900 dark:text-white bg-gray-50 dark:bg-green-950 placeholder-gray-400 dark:placeholder-gray-500 outline-none transition-colors
                ${errors.name ? "border-red-400 focus:border-red-500" : "border-gray-300 focus:border-green-500"}`}
            />
          </div>
          {errors.name && (
            <p className="text-sm text-red-500 mt-1.5 flex items-center gap-1">
              <AlertCircle size={12} /> {errors.name}
            </p>
          )}
        </div>

        <div>
          <label className="block text-md font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">
            Company Email <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
            <input
              type="email"
              placeholder="you@company.com"
              value={voter.email}
              onChange={(e) => onChange("email", e.target.value)}
              className={`w-full pl-9 pr-4 py-4 rounded-lg border text-md text-gray-900 dark:text-white bg-gray-50 dark:bg-green-950 placeholder-gray-400 dark:placeholder-gray-500 outline-none transition-colors
                ${errors.email ? "border-red-400 focus:border-red-500" : "border-gray-300 focus:border-green-500"}`}
            />
          </div>
          {errors.email && (
            <p className="text-sm text-red-500 mt-1.5 flex items-center gap-1">
              <AlertCircle size={12} /> {errors.email}
            </p>
          )}
        </div>

        <div>
          <label className="block text-md font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">
            Company Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Building
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
            <input
              type="text"
              placeholder="your company's name"
              value={voter.companyName}
              onChange={(e) => onChange("companyName", e.target.value)}
              className={`w-full pl-9 pr-4 py-4 rounded-lg border text-md text-gray-900 dark:text-white bg-gray-50 dark:bg-green-950 placeholder-gray-400 dark:placeholder-gray-500 outline-none transition-colors
                ${errors.companyName ? "border-red-400 focus:border-red-500" : "border-gray-300 focus:border-green-500"}`}
            />
          </div>
          {errors.companyName && (
            <p className="text-sm text-red-500 mt-1.5 flex items-center gap-1">
              <AlertCircle size={12} /> {errors.companyName}
            </p>
          )}
        </div>

        <div>
          <label className="block text-md font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">
            Job Title <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Briefcase
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
            <input
              type="text"
              placeholder="your job title"
              value={voter.jobTitle}
              onChange={(e) => onChange("jobTitle", e.target.value)}
              className={`w-full pl-9 pr-4 py-4 rounded-lg border text-md text-gray-900 dark:text-white bg-gray-50 dark:bg-green-950 placeholder-gray-400 dark:placeholder-gray-500 outline-none transition-colors
                ${errors.jobTitle ? "border-red-400 focus:border-red-500" : "border-gray-300 focus:border-green-500"}`}
            />
          </div>
          {errors.jobTitle && (
            <p className="text-sm text-red-500 mt-1.5 flex items-center gap-1">
              <AlertCircle size={12} /> {errors.jobTitle}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={onNext}
          className="inline-flex items-center gap-2 px-7 py-3 rounded-lg bg-green-600 hover:bg-green-600/90 dark:bg-green-700 dark:hover:bg-green-700/90 text-white text-md font-semibold transition-all duration-200 shadow-md shadow-green-200 dark:shadow-green-900/40 hover:shadow-lg hover:-translate-y-0.5"
        >
          Continue to Categories <ArrowRight size={15} />
        </button>
      </div>
    </motion.div>
  );
}

// ── Step 2: Category Selection ────────────────────────────────────────────────

export function StepCategories({
  categories,
  selectedIds,
  errors,
  onToggle,
  onNext,
  onBack,
}: {
  categories: AwardCategory[];
  selectedIds: Set<number>;
  errors: FormErrors;
  onToggle: (id: number) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white leading-tight">
          Choose your categories
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 italic">
          Select one or more categories you wish to cast a vote in.
        </p>
      </div>

      {errors.categories && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs text-red-500 mb-4 flex items-center gap-1"
        >
          <AlertCircle size={12} /> {errors.categories}
        </motion.p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
        {categories.map((cat) => {
          const selected = selectedIds.has(cat.category_id);
          return (
            <button
              key={cat.category_id}
              onClick={() => onToggle(cat.category_id)}
              className={`relative text-left p-6 border transition-all duration-200
                ${
                  selected
                    ? "border-green-500 bg-green-600 hover:bg-green-600/90 dark:bg-green-700 dark:hover:bg-green-700/90 text-white shadow-md shadow-green-200 dark:shadow-green-900/30"
                    : "border-gray-200 dark:border-gray-400/70 bg-white dark:bg-green-950/60 hover:border-green-400 dark:hover:border-green-600 hover:shadow-sm"
                }`}
            >
              {selected && (
                <span className="absolute top-3 right-3">
                  <CheckCircle2 size={15} className="text-white/80" />
                </span>
              )}
              <p
                className={`text-xl font-bold leading-tight mt-1 pr-4 ${selected ? "text-white" : "text-gray-800 dark:text-gray-200"}`}
              >
                {cat.category_title}
              </p>
              <p
                className={`text-sm mt-1.5 ${selected ? "text-green-100" : "text-gray-400 dark:text-gray-300"}`}
              >
                {cat.nominees?.length ?? 0} nominees
              </p>
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-200 dark:border-gray-500 text-md font-semibold text-gray-600 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-900 dark:hover:text-white transition-all duration-200"
        >
          <ArrowLeft size={15} /> Back
        </button>
        <button
          onClick={onNext}
          className="inline-flex items-center gap-2 px-7 py-3 rounded-lg bg-green-600 hover:bg-green-600/90 dark:bg-green-700 dark:hover:bg-green-700/90 text-white text-md font-semibold transition-all duration-200 shadow-md shadow-green-200 dark:shadow-green-900/40 hover:shadow-lg hover:-translate-y-0.5"
        >
          Proceed to Voting <ArrowRight size={15} />
        </button>
      </div>
    </motion.div>
  );
}

// ── Step 3: Cast Votes ────────────────────────────────────────────────────────

export function StepCastVotes({
  categories,
  selectedIds,
  selections,
  errors,
  onSelect,
  onNext,
  onBack,
}: {
  categories: AwardCategory[];
  selectedIds: Set<number>;
  selections: Record<number, VoteSelection>;
  errors: FormErrors;
  onSelect: (
    categoryId: number,
    categoryTitle: string,
    nominee: Nominees,
  ) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const selectedCategories = categories.filter((c) =>
    selectedIds.has(c.category_id),
  );
  const votedCount = selectedCategories.filter(
    (c) => selections[c.category_id],
  ).length;

  return (
    <motion.div
      key="step3"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-6">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white leading-tight">
          Cast your votes
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 italic">
          Select one nominee per category. You must vote in all selected
          categories.
        </p>
      </div>

      {/* Progress bar */}
      <div className="flex items-center gap-3 mb-6 p-3 rounded-xl bg-gray-50 dark:bg-green-950 border border-gray-200 dark:border-gray-500">
        <Trophy size={18} className="text-green-600 shrink-0" />
        <div className="flex-1 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-green-500 rounded-full"
            animate={{
              width: `${(votedCount / selectedCategories.length) * 100}%`,
            }}
            transition={{ duration: 0.4 }}
          />
        </div>
        <span className="text-lg font-bold text-green-600 shrink-0">
          {votedCount}/{selectedCategories.length}
        </span>
      </div>

      {errors.votes && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs text-red-500 mb-4 flex items-center gap-1"
        >
          <AlertCircle size={12} /> {errors.votes}
        </motion.p>
      )}

      <div className="flex flex-col gap-4 mb-8">
        {selectedCategories.map((cat) => {
          const nominees: Nominees[] = cat.nominees ?? [];
          const currentSelection = selections[cat.category_id];
          const voted = currentSelection?.nominee;

          return (
            <div
              key={cat.category_id}
              className={`rounded-2xl border overflow-hidden transition-all duration-200 ${
                voted
                  ? "border-green-500 shadow-sm shadow-green-200 dark:shadow-green-900/20"
                  : "border-gray-200 dark:border-gray-500"
              }`}
            >
              {/* Category header */}
              <div
                className={`px-5 py-3 flex items-center gap-3 justify-between ${
                  voted
                    ? "bg-green-600 dark:bg-green-700"
                    : "bg-green-600/90 dark:bg-green-700/90"
                }`}
              >
                <h3 className="text-lg font-bold text-white flex-1">
                  {cat.category_title}
                </h3>
                <span
                  className={`text-md font-semibold shrink-0 ${voted ? "text-green-100" : "text-gray-200"}`}
                >
                  {voted ? "✓ Voted" : "Choose one"}
                </span>
              </div>

              {/* Nominees */}
              <ul className="divide-y divide-gray-100 dark:divide-gray-600 bg-white dark:bg-green-950">
                {nominees.map((nomineeObj: Nominees) => {
                  const isSelected =
                    currentSelection?.nomineeId === nomineeObj.nominee_id;
                  const initials = nomineeObj.nominee
                    .split(" ")
                    .map((w) => w[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase();

                  return (
                    <li key={nomineeObj.nominee_id}>
                      <button
                        onClick={() =>
                          onSelect(
                            cat.category_id,
                            cat.category_title,
                            nomineeObj,
                          )
                        }
                        className={`w-full flex items-center gap-4 px-5 py-4 text-left transition-colors duration-150
                          ${
                            isSelected
                              ? "bg-green-50 dark:bg-green-950/30"
                              : "hover:bg-gray-50 dark:hover:bg-green-950/60"
                          }`}
                      >
                        {/* Radio */}
                        <span
                          className={`shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                            isSelected
                              ? "border-green-600 bg-green-600"
                              : "border-gray-300 dark:border-gray-600"
                          }`}
                        >
                          {isSelected && (
                            <span className="w-2 h-2 bg-white rounded-full" />
                          )}
                        </span>

                        {/* Initials avatar */}
                        <span
                          className={`shrink-0 w-9 h-9 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all
                          ${
                            isSelected
                              ? "border-green-500 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300"
                              : "border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-green-950 text-gray-500 dark:text-gray-400"
                          }`}
                        >
                          {initials}
                        </span>

                        {/* Name */}
                        <span
                          className={`flex-1 text-md font-medium ${
                            isSelected
                              ? "text-gray-900 dark:text-white"
                              : "text-gray-700 dark:text-gray-300"
                          }`}
                        >
                          {nomineeObj.nominee}
                        </span>

                        {isSelected && (
                          <span className="shrink-0 text-xs font-semibold text-green-600 dark:text-green-400 uppercase tracking-wider">
                            Your Pick
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-200 dark:border-gray-500 text-md font-semibold text-gray-600 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-900 dark:hover:text-white transition-all duration-200"
        >
          <ArrowLeft size={15} /> Back
        </button>
        <button
          onClick={onNext}
          className="inline-flex items-center gap-2 px-7 py-3 rounded-lg bg-green-600 hover:bg-green-600/90 dark:bg-green-700 dark:hover:bg-green-700/90 text-white text-md font-semibold transition-all duration-200 shadow-md shadow-green-200 dark:shadow-green-900/40 hover:shadow-lg hover:-translate-y-0.5"
        >
          Review My Votes <ArrowRight size={15} />
        </button>
      </div>
    </motion.div>
  );
}

// ── Step 4: Review ────────────────────────────────────────────────────────────

export function StepReview({
  categories,
  voter,
  selectedIds,
  selections,
  isSubmitting,
  onSubmit,
  onBack,
}: {
  categories: AwardCategory[];
  voter: VoterInfo;
  selectedIds: Set<number>;
  selections: Record<number, VoteSelection>;
  isSubmitting: boolean;
  onSubmit: () => void;
  onBack: () => void;
}) {
  const selectedCategories = categories.filter((c) =>
    selectedIds.has(c.category_id),
  );

  return (
    <motion.div
      key="step4"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-6">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white leading-tight">
          Review your votes
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 italic">
          Please confirm your selections before submitting. This action cannot
          be undone.
        </p>
      </div>

      {/* Voter summary */}
      <div className="flex items-center justify-between gap-4 bg-green-600 dark:bg-green-700/90 rounded-2xl px-6 py-4 mb-6 flex-wrap">
        <div>
          <p className="font-bold text-white text-2xl">{voter.name}</p>
          <p className="text-md text-gray-200 mt-0.5">{voter.email}</p>
        </div>
        <div className="text-right">
          <p className="text-4xl font-black text-green-100 leading-none">
            {selectedCategories.length}
          </p>
          <p className="text-xs uppercase tracking-widest text-gray-200 mt-1">
            {selectedCategories.length === 1 ? "category" : "categories"} voted
          </p>
        </div>
      </div>

      {/* Vote review cards */}
      <div className="grid sm:grid-cols-2 gap-3 mb-8">
        {selectedCategories.map((cat) => {
          const selection = selections[cat.category_id];
          const nomineeName = selection?.nominee ?? "";
          const initials = nomineeName
            .split(" ")
            .map((w) => w[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();

          return (
            <div
              key={cat.category_id}
              className="rounded-xl border border-gray-200 dark:border-gray-500 overflow-hidden bg-white dark:bg-green-950"
            >
              <div className="px-4 py-3.5 bg-gray-50 dark:bg-green-950 border-b border-gray-200 dark:border-gray-700">
                <p className="text-md font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 truncate">
                  {cat.category_title}
                </p>
              </div>
              <div className="px-4 py-3 flex items-center gap-3">
                <span className="shrink-0 w-9 h-9 rounded-full bg-green-100 dark:bg-green-900/40 border-2 border-green-600 flex items-center justify-center text-xs font-bold text-green-700 dark:text-green-300">
                  {initials}
                </span>
                <p className="font-semibold text-gray-900 dark:text-white text-md leading-tight">
                  {nomineeName}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Email verification disclaimer ── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.35 }}
        className="mb-6 rounded-xl border-2 border-amber-400 dark:border-amber-500 bg-amber-50 dark:bg-amber-950/30 px-5 py-4 flex gap-4 items-start"
      >
        <span className="shrink-0 mt-0.5 w-9 h-9 rounded-full bg-amber-100 dark:bg-amber-900/40 border-2 border-amber-400 dark:border-amber-500 flex items-center justify-center">
          <MailCheck size={18} className="text-amber-600 dark:text-amber-400" />
        </span>
        <div>
          <p className="text-sm font-bold text-amber-800 dark:text-amber-300 uppercase tracking-widest mb-1">
            Email Verification Temporarily Unavailable
          </p>
          <p className="text-sm text-amber-700 dark:text-amber-400 leading-relaxed">
            Our email verification system is currently experiencing an issue.
            You may still submit your votes — a verification email will be sent
            to <strong className="font-bold">{voter.email}</strong> once the
            issue has been resolved.
          </p>
          <p className="text-xs text-amber-600 dark:text-amber-500 mt-2 font-medium">
            We apologise for the inconvenience. Please keep an eye on your inbox
            in the meantime.
          </p>
        </div>
      </motion.div>

      <div className="flex items-center justify-between gap-4">
        <button
          onClick={onBack}
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-200 dark:border-gray-500 text-md font-semibold text-gray-600 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-900 dark:hover:text-white transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ArrowLeft size={16} /> Edit Votes
        </button>
        <button
          onClick={onSubmit}
          disabled={isSubmitting}
          className={`inline-flex items-center gap-2 px-8 py-3 rounded-lg text-md font-semibold transition-all duration-200
            ${
              isSubmitting
                ? "bg-green-400 text-white cursor-not-allowed"
                : "bg-green-700 hover:bg-green-700/80 text-white shadow-md shadow-green-200 dark:shadow-green-900/40 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
            }`}
        >
          {isSubmitting ? (
            <>
              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              Submitting…
            </>
          ) : (
            <>
              <Send size={15} /> Submit My Votes
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}

// ── Success Screen ────────────────────────────────────────────────────────────

export function SuccessScreen({
  categories,
  selectedIds,
  selections,
  voterEmail,
}: {
  categories: AwardCategory[];
  selectedIds: Set<number>;
  selections: Record<number, VoteSelection>;
  voterEmail?: string;
}) {
  const votes = categories.filter((c) => selectedIds.has(c.category_id));
  const [modalOpen, setModalOpen] = useState(true);

  return (
    <section className="min-h-screen py-20 px-4 flex items-center justify-center bg-gray-50 dark:bg-green-950">
      {/* ── Email verification modal ── */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            key="email-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              key="email-modal"
              initial={{ opacity: 0, scale: 0.88, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="relative w-full max-w-md rounded-2xl bg-white dark:bg-green-950 border-2 border-amber-400 dark:border-amber-500 shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header */}
              <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/50">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/50 border-2 border-amber-400 dark:border-amber-500 flex items-center justify-center shrink-0">
                    <MailCheck
                      size={20}
                      className="text-amber-600 dark:text-amber-400"
                    />
                  </span>
                  <p className="text-sm font-bold uppercase tracking-widest text-amber-800 dark:text-amber-300">
                    Email Verification — Service Notice
                  </p>
                </div>
                <button
                  onClick={() => setModalOpen(false)}
                  aria-label="Close notification"
                  className="w-8 h-8 rounded-full flex items-center justify-center text-amber-600 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/40 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Modal body */}
              <div className="px-6 py-5">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 leading-snug">
                  Email verification is temporarily unavailable
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  Your votes have been received. However, our email verification
                  system is currently experiencing an issue — the confirmation
                  email to{" "}
                  {voterEmail ? (
                    <strong className="font-bold text-gray-900 dark:text-white break-all">
                      {voterEmail}
                    </strong>
                  ) : (
                    "the address you provided"
                  )}{" "}
                  will be sent once the issue has been resolved. No action is
                  required from you right now.
                </p>

                {/* Steps */}
                <ol className="space-y-2.5 mb-5">
                  {[
                    "Our team is working to resolve the issue as quickly as possible",
                    "A verification email will be sent to you automatically once it is fixed",
                    "Click the link in that email when it arrives to confirm your votes",
                  ].map((step, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300"
                    >
                      <span className="shrink-0 w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/40 border border-green-400 dark:border-green-600 flex items-center justify-center text-xs font-bold text-green-700 dark:text-green-400 mt-0.5">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>

                <p className="text-xs text-gray-400 dark:text-gray-500 mb-5">
                  We apologise for the inconvenience. Your votes are safe and
                  will be tallied once your identity has been verified via
                  email.
                </p>

                <button
                  onClick={() => setModalOpen(false)}
                  className="w-full py-3 rounded-xl bg-green-600 hover:bg-green-600/90 dark:bg-green-700 dark:hover:bg-green-700/90 text-white text-sm font-bold tracking-wide transition-colors shadow-md shadow-green-200 dark:shadow-green-900/40"
                >
                  Understood — I&apos;ll wait for the email
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Page content ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-4xl w-full text-center"
      >
        <div className="w-40 h-40 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center mx-auto mb-6">
          <Trophy size={56} className="text-green-600" />
        </div>
        <h2 className="text-xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-3">
          Votes Received! Please check the email that you provided to verify
          your identity and allow us to tally your vote
          {votes.length !== 1 ? "s" : ""}.
        </h2>
        <p className="text-lg text-gray-400 dark:text-gray-500 mt-4">
          The results will be announced at the iGaming AFRIKA Summit — May 4,
          2026 in Nairobi.
        </p>

        {/* ── Inline email reminder banner ── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.35 }}
          className="mt-6 rounded-xl border-2 border-amber-400 dark:border-amber-500 bg-amber-50 dark:bg-amber-950/30 px-5 py-4 flex gap-4 items-start text-left"
        >
          <span className="shrink-0 mt-0.5 w-9 h-9 rounded-full bg-amber-100 dark:bg-amber-900/40 border-2 border-amber-400 dark:border-amber-500 flex items-center justify-center">
            <Mail size={16} className="text-amber-600 dark:text-amber-400" />
          </span>
          <div>
            <p className="text-sm font-bold text-amber-800 dark:text-amber-300 uppercase tracking-widest mb-1">
              Email Verification is Temporarily Unavailable
            </p>
            <p className="text-sm text-amber-700 dark:text-amber-400 leading-relaxed">
              Our email verification system is currently experiencing an issue.
              A confirmation email will be sent to{" "}
              {voterEmail ? (
                <strong className="font-bold">{voterEmail}</strong>
              ) : (
                "your email address"
              )}{" "}
              automatically once the issue has been resolved.
            </p>
            <p className="text-xs text-amber-600 dark:text-amber-500 mt-1.5 font-medium">
              We apologise for the inconvenience. Your votes are safe and no
              action is required from you right now.
            </p>
          </div>
        </motion.div>

        <div className="mt-8 rounded-2xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/30 overflow-hidden">
          <p className="text-md font-bold uppercase tracking-widest text-green-700 dark:text-green-400 py-3 px-5 border-b border-green-200 dark:border-green-800">
            Your Votes
          </p>
          <ul className="divide-y divide-green-100 dark:divide-green-900">
            {votes.map((cat) => (
              <li
                key={cat.category_id}
                className="flex items-center justify-between gap-4 px-5 py-3"
              >
                <span className="text-md text-gray-700 dark:text-gray-300 uppercase tracking-wide truncate">
                  {cat.category_title}
                </span>
                <span className="text-md font-semibold text-gray-900 dark:text-white shrink-0">
                  {selections[cat.category_id]?.nominee}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  );
}

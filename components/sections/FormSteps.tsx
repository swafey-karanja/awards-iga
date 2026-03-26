"use client";

import { motion } from "framer-motion";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Mail,
  Send,
  Trophy,
  User,
} from "lucide-react";

import { awardsCategories } from "@/lib/Appdata";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface VoteSelection {
  categoryId: number;
  categoryTitle: string;
  nominee: string;
}

export interface VoterInfo {
  name: string;
  email: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  categories?: string;
  votes?: string;
}

const STEPS = [
  { id: 1, label: "Your Details" },
  { id: 2, label: "Categories" },
  { id: 3, label: "Cast Votes" },
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
              className={`block font-bold text-2xl leading-none mb-1
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
  selectedIds,
  errors,
  onToggle,
  onNext,
  onBack,
}: {
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
        {awardsCategories.map((cat) => {
          const selected = selectedIds.has(cat.id);
          return (
            <button
              key={cat.id}
              onClick={() => onToggle(cat.id)}
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
              <span className="block text-xl mb-5 leading-none">
                {cat.emoji}
              </span>
              <p
                className={`text-xl font-bold leading-tight mt-1 pr-4 ${selected ? "text-white" : "text-gray-800 dark:text-gray-200"}`}
              >
                {cat.title}
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
  selectedIds,
  selections,
  errors,
  onSelect,
  onNext,
  onBack,
}: {
  selectedIds: Set<number>;
  selections: Record<number, VoteSelection>;
  errors: FormErrors;
  onSelect: (
    categoryId: number,
    categoryTitle: string,
    nominee: string,
  ) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const selectedCategories = awardsCategories.filter((c) =>
    selectedIds.has(c.id),
  );
  const votedCount = selectedCategories.filter((c) => selections[c.id]).length;

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
          const nominees = cat.nominees ?? [];
          const voted = selections[cat.id]?.nominee;
          return (
            <div
              key={cat.id}
              className={`rounded-2xl border overflow-hidden transition-all duration-200 ${voted ? "border-green-500 shadow-sm shadow-green-200 dark:shadow-green-900/20" : "border-gray-200 dark:border-gray-500"}`}
            >
              <div
                className={`px-5 py-3 flex items-center justify-between ${voted ? "bg-green-600 dark:bg-green-700" : "bg-green-600/90 dark:bg-green-700/90"}`}
              >
                <span className="block text-xl mb-5 leading-none">
                  {cat.emoji}
                </span>
                <h3 className="text-lg font-bold text-white">{cat.title}</h3>
                <span
                  className={`text-md font-semibold ${voted ? "text-green-100" : "text-gray-200"}`}
                >
                  {voted ? "✓ Voted" : "Choose one"}
                </span>
              </div>
              <ul className="divide-y divide-gray-100 dark:divide-gray-600 bg-white dark:bg-green-950">
                {nominees.map((nominee) => {
                  const isSelected = voted === nominee;
                  return (
                    <li key={nominee}>
                      <button
                        onClick={() => onSelect(cat.id, cat.title, nominee)}
                        className={`w-full flex items-center gap-4 px-5 py-4 text-left transition-colors duration-150
                          ${isSelected ? "bg-green-50 dark:bg-green-950/30" : "hover:bg-gray-50 dark:hover:bg-green-950/60"}`}
                      >
                        <span
                          className={`shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? "border-green-600 bg-green-600" : "border-gray-300 dark:border-gray-600"}`}
                        >
                          {isSelected && (
                            <span className="w-2 h-2 bg-white rounded-full" />
                          )}
                        </span>
                        <span
                          className={`shrink-0 w-9 h-9 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all
                          ${isSelected ? "border-green-500 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300" : "border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-green-950 text-gray-500 dark:text-gray-400"}`}
                        >
                          {nominee
                            .split(" ")
                            .map((w) => w[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()}
                        </span>
                        <span
                          className={`flex-1 text-md font-medium ${isSelected ? "text-gray-900 dark:text-white" : "text-gray-700 dark:text-gray-300"}`}
                        >
                          {nominee}
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
  voter,
  selectedIds,
  selections,
  isSubmitting,
  onSubmit,
  onBack,
}: {
  voter: VoterInfo;
  selectedIds: Set<number>;
  selections: Record<number, VoteSelection>;
  isSubmitting: boolean;
  onSubmit: () => void;
  onBack: () => void;
}) {
  const selectedCategories = awardsCategories.filter((c) =>
    selectedIds.has(c.id),
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
          const nominee = selections[cat.id]?.nominee ?? "";
          const initials = nominee
            .split(" ")
            .map((w) => w[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();
          return (
            <div
              key={cat.id}
              className="rounded-xl border border-gray-200 dark:border-gray-500 overflow-hidden bg-white dark:bg-green-950"
            >
              <div className="px-4 py-3.5 bg-gray-50 dark:bg-green-950 border-b border-gray-200 dark:border-gray-700">
                <span className="block text-xl mb-5 leading-none">
                  {cat.emoji}
                </span>
                <p className="text-md font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 truncate">
                  {cat.title}
                </p>
              </div>
              <div className="px-4 py-3 flex items-center gap-3">
                <span className="shrink-0 w-9 h-9 rounded-full bg-green-100 dark:bg-green-900/40 border-2 border-green-600 flex items-center justify-center text-xs font-bold text-green-700 dark:text-green-300">
                  {initials}
                </span>
                <p className="font-semibold text-gray-900 dark:text-white text-md leading-tight">
                  {nominee}
                </p>
              </div>
            </div>
          );
        })}
      </div>

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
  voterName,
  selectedIds,
  selections,
}: {
  voterName: string;
  selectedIds: Set<number>;
  selections: Record<number, VoteSelection>;
}) {
  const votes = awardsCategories.filter((c) => selectedIds.has(c.id));

  return (
    <section className="min-h-screen py-20 px-4 flex items-center justify-center bg-gray-50 dark:bg-green-950">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-3xl w-full text-center"
      >
        <div className="w-40 h-40 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center mx-auto mb-6">
          <Trophy size={56} className="text-green-600" />
        </div>
        <h2 className="text-3xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-3">
          Votes Received!
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-2 text-xl">
          Thank you,{" "}
          <strong className="text-gray-700 dark:text-gray-200">
            {voterName}
          </strong>
          . Your <strong className="text-green-600">{votes.length}</strong> vote
          {votes.length !== 1 ? "s have" : " has"} been recorded.
        </p>
        <p className="text-lg text-gray-400 dark:text-gray-500 mt-4">
          Results will be announced at the iGaming AFRIKA Summit — May 4, 2026
          in Nairobi.
        </p>
        <div className="mt-8 rounded-2xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/30 overflow-hidden">
          <p className="text-md font-bold uppercase tracking-widest text-green-700 dark:text-green-400 py-3 px-5 border-b border-green-200 dark:border-green-800">
            Your Votes
          </p>
          <ul className="divide-y divide-green-100 dark:divide-green-900">
            {votes.map((cat) => (
              <li
                key={cat.id}
                className="flex items-center justify-between gap-4 px-5 py-3"
              >
                <span className="text-md text-gray-700 dark:text-gray-300 uppercase tracking-wide truncate">
                  {cat.title}
                </span>
                <span className="text-md font-semibold text-gray-900 dark:text-white shrink-0">
                  {selections[cat.id]?.nominee}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  );
}

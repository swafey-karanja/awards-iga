"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { AlertCircle, Vote } from "lucide-react";

import { awardsCategories } from "@/lib/Appdata";
import { fetchCSRFToken, API_CONFIG } from "@/app/services/api";
import { toast } from "sonner";

import { isCompanyEmail } from "../../app/voting/EmailUtils";
import CategoryCard from "../../app/voting/CategoryCard";
import VoterInfoCard from "../../app/voting/VoterInfoCard";
import VoteProgressBar from "../../app/voting/VoteProgressBar";
import SubmitBar from "../../app/voting/SubmitBar";
import VoteSuccessScreen from "../../app/voting/VoteSuccessscreen";
import SectionHeader from "./SectionHeader";

export interface VoteSelection {
  categoryId: number;
  categoryTitle: string;
  nominee: string;
}

export interface VoterInfo {
  name: string;
  email: string;
}

export interface VotingFormErrors {
  name?: string;
  email?: string;
  votes?: string;
}

export default function VotingForm() {
  const [voter, setVoter] = useState<VoterInfo>({ name: "", email: "" });
  const [selections, setSelections] = useState<Record<number, VoteSelection>>(
    {},
  );
  const [expandedId, setExpandedId] = useState<number | null>(1);
  const [errors, setErrors] = useState<VotingFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const voteCount = Object.keys(selections).length;

  // ── Handlers ──────────────────────────────────────────────────────────────────

  const handleVoterChange = useCallback(
    (field: keyof VoterInfo, value: string) => {
      setVoter((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    },
    [],
  );

  const handleSelect = useCallback(
    (categoryId: number, categoryTitle: string, nominee: string) => {
      setSelections((prev) => ({
        ...prev,
        [categoryId]: { categoryId, categoryTitle, nominee },
      }));
      // Auto-advance to next category
      const currentIdx = awardsCategories.findIndex((c) => c.id === categoryId);
      const next = awardsCategories[currentIdx + 1];
      if (next) setExpandedId(next.id);
    },
    [],
  );

  const handleToggle = useCallback((categoryId: number) => {
    setExpandedId((prev) => (prev === categoryId ? null : categoryId));
  }, []);

  // ── Validation ────────────────────────────────────────────────────────────────

  const validate = (): boolean => {
    const newErrors: VotingFormErrors = {};

    if (!voter.name.trim()) {
      newErrors.name = "Please enter your full name.";
    }

    if (!voter.email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(voter.email)) {
      newErrors.email = "Please enter a valid email address.";
    } else if (!isCompanyEmail(voter.email)) {
      newErrors.email =
        "Please use your company email. Personal email addresses (Gmail, Yahoo, Hotmail, etc.) are not accepted.";
    }

    if (voteCount === 0) {
      newErrors.votes =
        "Please vote in at least one category before submitting.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ── Submission ────────────────────────────────────────────────────────────────

  const handleSubmit = async () => {
    if (!validate()) return;
    setIsSubmitting(true);

    try {
      //   const { csrfToken } = await fetchCSRFToken();

      const payload = {
        voter_name: voter.name.trim(),
        voter_email: voter.email.trim().toLowerCase(),
        votes: Object.values(selections).map((s) => ({
          category_id: s.categoryId,
          category_title: s.categoryTitle,
          nominee: s.nominee,
        })),
      };

      console.log({ payload });

      //   const response = await fetch(`${API_CONFIG.BASE_URL}votes/submit/`, {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //       "X-CSRFToken": csrfToken,
      //     },
      //     body: JSON.stringify(payload),
      //   });

      //   if (!response.ok) {
      //     const errorData = await response.json().catch(() => ({}));
      //     const message =
      //       (errorData as { message?: string }).message ||
      //       "Something went wrong. Please try again.";
      //     throw new Error(message);
      //   }

      //   setSubmitted(true);
      //   toast.success("Your votes have been submitted successfully!");
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Submission failed. Please try again.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────────

  if (submitted) {
    return <VoteSuccessScreen voterName={voter.name} selections={selections} />;
  }

  return (
    <section className="py-16 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4">
            <Vote size={14} />
            Community Vote
          </span>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            // variants={staggerContainer}
          >
            <SectionHeader
              title="Cast Your Vote"
              subtitle=" Vote for your favourite nominees across any of the 25 award categories."
            />
          </motion.div>
        </motion.div>

        {/* Voter details */}
        <VoterInfoCard
          voter={voter}
          errors={errors}
          onChange={handleVoterChange}
        />

        {/* Progress */}
        <VoteProgressBar
          voteCount={voteCount}
          totalCategories={awardsCategories.length}
        />

        {/* Vote-count error */}
        {errors.votes && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-red-500 mb-4 flex items-center gap-1"
          >
            <AlertCircle size={12} /> {errors.votes}
          </motion.p>
        )}

        {/* Category cards */}
        <div className="flex flex-col gap-3 mb-8">
          {awardsCategories.map((category, index) => (
            <CategoryCard
              key={category.id}
              category={category}
              selection={selections[category.id]?.nominee}
              onSelect={handleSelect}
              isExpanded={expandedId === category.id}
              onToggle={() => handleToggle(category.id)}
              index={index}
            />
          ))}
        </div>

        {/* Sticky submit bar */}
        <SubmitBar
          voteCount={voteCount}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
        />
      </div>
    </section>
  );
}

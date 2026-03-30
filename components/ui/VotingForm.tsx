"use client";

import { useCallback, useState } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { Vote } from "lucide-react";
import { IoIosArrowBack } from "react-icons/io";
import { toast } from "sonner";

import { fetchCSRFToken, API_CONFIG } from "@/app/services/api";
import { isCompanyEmail } from "../../lib/EmailUtils";

import {
  FormErrors,
  StepCastVotes,
  StepCategories,
  StepDetails,
  StepNav,
  StepReview,
  SuccessScreen,
  VoterInfo,
  VoteSelection,
} from "../sections/FormSteps";
import { useAwardsCategories } from "@/app/hooks/useAwardsCategories";
import { Nominees } from "@/lib/types";

export default function VotingForm() {
  const {
    categories,
    isLoading,
    error: fetchError,
    refetch,
  } = useAwardsCategories();

  const [step, setStep] = useState(1);
  const [voter, setVoter] = useState<VoterInfo>({
    name: "",
    email: "",
    companyName: "",
    jobTitle: "",
  });
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [selections, setSelections] = useState<Record<number, VoteSelection>>(
    {},
  );
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // ── Handlers ────────────────────────────────────────────────────────────────

  const handleVoterChange = useCallback(
    (field: keyof VoterInfo, value: string) => {
      setVoter((p) => ({ ...p, [field]: value }));
      setErrors((p) => ({ ...p, [field]: undefined }));
    },
    [],
  );

  const handleToggleCategory = useCallback((id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        setSelections((s) => {
          const c = { ...s };
          delete c[id];
          return c;
        });
      } else {
        next.add(id);
      }
      return next;
    });
    setErrors((p) => ({ ...p, categories: undefined }));
  }, []);

  // Receives a full Nominee object to capture nominee_id for the payload
  const handleSelect = useCallback(
    (categoryId: number, categoryTitle: string, nominee: Nominees) => {
      setSelections((p) => ({
        ...p,
        [categoryId]: {
          categoryId,
          categoryTitle,
          nomineeId: nominee.nominee_id,
          nominee: nominee.nominee,
        },
      }));
      setErrors((p) => ({ ...p, votes: undefined }));
    },
    [],
  );

  // ── Navigation & validation ──────────────────────────────────────────────────

  const goNext = useCallback(() => {
    if (step === 1) {
      const newErrors: FormErrors = {};
      if (!voter.name.trim()) newErrors.name = "Please enter your full name.";
      if (!voter.companyName.trim())
        newErrors.companyName = "Please enter your company name.";
      if (!voter.jobTitle.trim())
        newErrors.jobTitle = "Please enter your job title.";
      if (!voter.email.trim()) {
        newErrors.email = "Please enter your email address.";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(voter.email)) {
        newErrors.email = "Please enter a valid email address.";
      } else if (!isCompanyEmail(voter.email)) {
        newErrors.email =
          "Please use your company email. Personal addresses (Gmail, Yahoo, etc.) are not accepted.";
      }
      if (Object.keys(newErrors).length) {
        setErrors(newErrors);
        return;
      }
    }

    if (step === 2 && selectedIds.size === 0) {
      setErrors({
        categories: "Please select at least one category to continue.",
      });
      return;
    }

    if (step === 3) {
      const unvoted = [...selectedIds].filter((id) => !selections[id]);
      if (unvoted.length > 0) {
        setErrors({
          votes:
            "Please cast a vote in each of your selected categories before continuing.",
        });
        return;
      }
    }

    setErrors({});
    setStep((s) => s + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step, voter, selectedIds, selections]);

  const goBack = useCallback(() => {
    setErrors({});
    setStep((s) => s - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // ── Submission ───────────────────────────────────────────────────────────────

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const { csrfToken } = await fetchCSRFToken();

      const payload = {
        voter_name: voter.name.trim(),
        voter_email: voter.email.trim().toLowerCase(),
        company: voter.companyName.trim(),
        position: voter.jobTitle.trim(),
        votes: Object.values(selections).map((s) => ({
          category_id: s.categoryId,
          category_title: s.categoryTitle,
          nominee_id: s.nomineeId,
          nominee: s.nominee,
        })),
      };

      const response = await fetch(`${API_CONFIG.BASE_URL}awards/votes/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          (errorData as { message?: string }).message ||
            "Something went wrong. Please try again.",
        );
      }

      setSubmitted(true);
      toast.success("Your ballot has been submitted successfully!");
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Submission failed. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNavigateHome = () => {
    window.location.href = "/";
  };

  // ── Loading state ────────────────────────────────────────────────────────────

  if (isLoading) {
    return (
      <section className="py-16 px-4 min-h-screen bg-gray-50 dark:bg-green-950 flex items-center justify-center">
        <div className="text-center">
          <span className="w-10 h-10 border-4 border-green-200 border-t-green-600 rounded-full animate-spin block mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
            Loading award categories…
          </p>
        </div>
      </section>
    );
  }

  // ── Fetch error state ────────────────────────────────────────────────────────

  if (fetchError) {
    return (
      <section className="py-16 px-4 min-h-screen bg-gray-50 dark:bg-green-950 flex items-center justify-center">
        <div className="text-center max-w-sm">
          <p className="text-red-500 font-semibold mb-2">
            Failed to load categories
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
            {fetchError}
          </p>
          <button
            onClick={refetch}
            className="px-5 py-2.5 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-semibold transition-colors"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  // ── Success screen ───────────────────────────────────────────────────────────

  if (submitted) {
    return (
      <SuccessScreen
        categories={categories}
        selectedIds={selectedIds}
        selections={selections}
      />
    );
  }

  // ── Form ─────────────────────────────────────────────────────────────────────

  return (
    <section className="py-16 px-4 min-h-screen bg-gray-50 dark:bg-green-950">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 container mx-auto h-auto z-10">
          <span className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4">
            <Vote size={14} /> Community Vote
          </span>
          <button
            type="button"
            onClick={handleNavigateHome}
            className="flex items-center text-green-700 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 mb-4 transition-colors font-bold cursor-pointer"
            aria-label="Navigate to home page"
          >
            <IoIosArrowBack className="mr-2" aria-hidden="true" />
            Back to home page
          </button>
          <h1 className="text-2xl md:text-4xl font-bold bg-linear-to-r from-green-700 to-green-600 dark:from-green-400 dark:to-green-500 bg-clip-text text-transparent py-2">
            Cast Your Votes
          </h1>
          <p className="text-gray-700 dark:text-gray-300 max-w-3xl text-xs md:text-[14px] font-semibold">
            Vote for your favourite nominees across any of the{" "}
            {categories.length} award categories.
          </p>
        </div>

        <StepNav current={step} />

        <div className="bg-gray-50 dark:bg-green-950">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <StepDetails
                voter={voter}
                errors={errors}
                onChange={handleVoterChange}
                onNext={goNext}
              />
            )}
            {step === 2 && (
              <StepCategories
                categories={categories}
                selectedIds={selectedIds}
                errors={errors}
                onToggle={handleToggleCategory}
                onNext={goNext}
                onBack={goBack}
              />
            )}
            {step === 3 && (
              <StepCastVotes
                categories={categories}
                selectedIds={selectedIds}
                selections={selections}
                errors={errors}
                onSelect={handleSelect}
                onNext={goNext}
                onBack={goBack}
              />
            )}
            {step === 4 && (
              <StepReview
                categories={categories}
                voter={voter}
                selectedIds={selectedIds}
                selections={selections}
                isSubmitting={isSubmitting}
                onSubmit={handleSubmit}
                onBack={goBack}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

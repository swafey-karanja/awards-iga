"use client";

import { AnimatePresence, motion, Variants } from "framer-motion";
import SectionHeader from "../ui/SectionHeader";
import Card from "../ui/Card";
import Modal from "../ui/Modal";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { AwardCategory } from "@/lib/types";
import { useAwardsCategories } from "@/app/hooks/useAwardsCategories";

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const AwardsCategories: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedAwardsCategory, setSelectedAwardsCategory] =
    useState<AwardCategory | null>(null);

  const handleCardClick = (awardsCategory: AwardCategory) => {
    setSelectedAwardsCategory(awardsCategory);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAwardsCategory(null);
  };

  const {
    categories,
    isLoading,
    error: fetchError,
    refetch,
  } = useAwardsCategories();

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

  return (
    <section
      id="work"
      className="py-12 sm:py-16 px-4 lg:px-8 border-b-5 border-green-600 bg-green-50 dark:bg-green-950"
    >
      <div className="container mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <SectionHeader
            title="Awards Categories"
            subtitle="Explore the awards available at the iGaming Afrika Awards 2026"
          />

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {categories.map((awardsCategory: AwardCategory) => (
              <Card
                key={awardsCategory.category_id}
                className="cursor-pointer"
                hover={true}
              >
                <div
                  onClick={() => handleCardClick(awardsCategory)}
                  className="space-y-12 sm:space-y-20 h-full relative"
                >
                  {/* Trophy image */}
                  <div className="aspect-video rounded-lg sm:rounded-xl mb-4 sm:mb-5 relative overflow-hidden flex items-center justify-center bg-linear-to-br from-green-600/20 to-green-700/20 dark:from-green-500/20 dark:to-green-600/20">
                    <Image
                      src="/IGA-Award-design-final-22.png"
                      alt={`${awardsCategory.category_title} trophy`}
                      className="w-full h-[70%] sm:h-[80%] object-contain opacity-90"
                      width={200}
                      height={200}
                      loading="eager"
                    />
                  </div>

                  {/* Category title */}
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white line-clamp-2">
                    {awardsCategory.category_title}
                  </h3>

                  {/* View details link */}
                  <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-green-200/60 dark:border-green-700/60 absolute bottom-0 left-0 w-full">
                    <span className="text-green-700 dark:text-green-500 text-xs sm:text-sm font-semibold flex items-center hover:text-green-800 dark:hover:text-green-400 transition-colors">
                      View Nominees <ArrowRight className="ml-2" size={16} />
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <Modal
            isOpen={isModalOpen}
            onClose={closeModal}
            award={selectedAwardsCategory}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default AwardsCategories;

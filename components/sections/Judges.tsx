"use client";

import { useState } from "react";
import { IoMdRefresh } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import JudgeModal from "../ui/JudgesModal";
import SectionHeader from "../ui/SectionHeader";
import Card from "../ui/Card";
import { ArrowRight } from "lucide-react";
import { judgesList } from "@/lib/Appdata";

interface SocialLinks {
  twitter?: string;
  linkedin?: string;
  instagram?: string;
  facebook?: string;
  website?: string;
}

interface Judge {
  name: string;
  company: string;
  bio: string;
  role: string;
  image: string;
  social: SocialLinks;
}

const Judges: React.FC = () => {
  const [selectedJudge, setSelectedJudge] = useState<Judge | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [visibleCount, setVisibleCount] = useState<number>(8);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const openModal = (judge: Judge): void => {
    setSelectedJudge(judge);
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
    setSelectedJudge(null);
  };

  const visibleJudges = judgesList.slice(0, visibleCount);

  const handleShowMore = (): void => {
    setVisibleCount((prev) => prev + 8);
  };

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-0 bg-white/5">
      <div className="container mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <SectionHeader title="Judges" subtitle="The List of Judges 2026" />
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={container}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
        >
          {visibleJudges.map((judge, index) => (
            <Card key={index} hover={true}>
              <div
                onClick={() => openModal(judge)}
                className="flex items-center justify-center flex-col cursor-pointer space-y-12 sm:space-y-20 h-full relative"
              >
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 mb-4 sm:mb-6 rounded-full bg-linear-to-br from-green-500/20 to-purple-500/20 overflow-hidden flex items-center justify-center border-4 border-green-500/20 hover:border-green-500/50 transition-colors">
                  {judge.image ? (
                    <Image
                      src={judge.image}
                      alt={judge.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 112px, (max-width: 768px) 128px, 144px"
                      unoptimized
                    />
                  ) : (
                    <svg
                      className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  )}
                </div>

                <h3 className="text-base sm:text-lg md:text-xl font-bold text-white text-center line-clamp-2 px-2">
                  {judge.name}
                </h3>

                <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/10 absolute bottom-0 left-0 w-full">
                  <span className="text-green-600 text-xs sm:text-sm font-semibold flex items-center hover:text-green-500 transition-colors">
                    View Details <ArrowRight className="ml-2" size={16} />
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </motion.div>

        {visibleCount < judgesList.length && (
          <div className="flex justify-center mt-8 sm:mt-12">
            <button
              onClick={handleShowMore}
              className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-white border border-white/30 hover:border-green-600 hover:bg-linear-to-br hover:from-green-800/40 hover:to-green-900/50 rounded-lg px-6 py-3 transition-all duration-300"
            >
              Show More
              <IoMdRefresh className="text-lg" />
            </button>
          </div>
        )}

        {visibleCount >= judgesList.length && judgesList.length > 0 && (
          <div className="text-center mt-8 sm:mt-10 text-sm text-gray-400">
            <p>You&apos;ve reached the end of the judges list</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <JudgeModal
            isModalOpen={isModalOpen}
            selectedJudge={selectedJudge}
            closeModal={closeModal}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Judges;

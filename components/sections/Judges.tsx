"use client";

import { useState, useCallback, useEffect } from "react";
import { IoMdRefresh } from "react-icons/io";
import { motion } from "framer-motion";
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
  const [visibleCount, setVisibleCount] = useState<number>(10);
  const [isMobile, setIsMobile] = useState<boolean>(false);

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

  const checkScreenSize = useCallback((): void => {
    setIsMobile(window.innerWidth < 640);
  }, []);

  useEffect(() => {
    // checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [checkScreenSize]);

  const visibleJudges = judgesList.slice(0, visibleCount);

  const handleShowMore = (): void => {
    setVisibleCount((prev) => prev + (isMobile ? 6 : 10));
  };

  return (
    <div className="h-auto px-4 py-16 bg-white/5">
      <div className="container mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="text-center mb-12"
        >
          <SectionHeader title="Judges" subtitle="The List of Judges 2026" />
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={container}
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4 sm:gap-12"
        >
          {visibleJudges.map((judge, index) => (
            <Card key={index}>
              <div
                onClick={() => openModal(judge)}
                className=" flex items-center justify-center flex-col"
              >
                <div className="relative w-30 h-30 sm:w-40 sm:h-40 mb-3 sm:mb-8 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center">
                  {judge.image ? (
                    <Image
                      src={judge.image}
                      alt={judge.name}
                      className="absolute h-full w-full object-cover"
                      style={{
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        minWidth: "100%",
                        minHeight: "100%",
                      }}
                      width={0}
                      height={0}
                      sizes="100vw"
                      unoptimized
                    />
                  ) : (
                    <svg
                      className="w-12 h-12 sm:w-16 sm:h-16 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      ></path>
                    </svg>
                  )}
                </div>
                <h3 className="text-2xl font-bold mb-2 text-white">
                  {judge.name}
                </h3>

                <div className="mt-4 pt-4 border-t border-white/10">
                  <span className="text-green-600 text-sm font-semibold flex items-center">
                    View Details <ArrowRight className="ml-2" size={16} />
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </motion.div>

        {visibleCount < judgesList.length && (
          <div className="flex flex-col items-center justify-center gap-8 sm:flex-row mt-12">
            <button
              onClick={handleShowMore}
              className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-white hover:text-md border border-gray-100 hover:bg-linear-to-br hover:from-green-800/80 hover:to-green-900/80 hover:border-green-600 hover:text-white rounded-lg px-4 py-2"
            >
              Show More
              <IoMdRefresh />
            </button>
          </div>
        )}

        {visibleCount >= judgesList.length && judgesList.length > 0 && (
          <div className="text-center mt-8 sm:mt-10 md:mt-12 text-sm text-gray-600">
            <p>You&apos;ve reached the end of the judges list</p>
          </div>
        )}
      </div>

      <JudgeModal
        isModalOpen={isModalOpen}
        selectedJudge={selectedJudge}
        closeModal={closeModal}
      />

      {/* <hr className="text-green-700 p-2 mt-16 w-full" /> */}
    </div>
  );
};

export default Judges;

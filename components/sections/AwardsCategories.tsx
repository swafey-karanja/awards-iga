"use client";

import { AnimatePresence, motion, Variants } from "framer-motion";
import SectionHeader from "../ui/SectionHeader";
import Card from "../ui/Card";
import Modal from "../ui/Modal";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { awardsCategories } from "@/lib/Appdata";
import Image from "next/image";

interface AwardCategory {
  id: number;
  title: string;
  description: string;
  focusAreas?: string[];
}

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

  return (
    <section id="work" className="py-12 sm:py-16 px-4 sm:px-0">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {awardsCategories.map((awardsCategory: AwardCategory) => (
              <Card
                key={awardsCategory.id}
                className="cursor-pointer"
                hover={true}
              >
                <div
                  onClick={() => handleCardClick(awardsCategory)}
                  className="space-y-3 sm:space-y-4"
                >
                  <div className="aspect-video rounded-lg sm:rounded-xl mb-4 sm:mb-6 relative overflow-hidden flex items-center justify-center bg-linear-to-br from-green-500/10 to-purple-500/10">
                    <Image
                      src="/trophy.png"
                      alt={`${awardsCategory.title} trophy`}
                      className="w-full h-[70%] sm:h-[80%] object-contain opacity-80"
                      width={200}
                      height={200}
                    />
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white line-clamp-2">
                    {awardsCategory.title}
                  </h3>

                  <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/10">
                    <span className="text-green-600 text-xs sm:text-sm font-semibold flex items-center hover:text-green-500 transition-colors">
                      View Details <ArrowRight className="ml-2" size={16} />
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

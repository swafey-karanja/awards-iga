"use client";

import { AnimatePresence, motion, Variants } from "framer-motion";
import SectionHeader from "../ui/SectionHeader";
import Card from "../ui/Card";
import Modal from "../ui/Modal";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { awardsCategories } from "@/lib/Appdata";

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

// Portfolio Section
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
    <section id="work" className="py-16 px-6">
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {awardsCategories.map(
              (awardsCategory: AwardCategory, index: number) => (
                <Card key={index} className="cursor-pointer">
                  <div
                    onClick={() => handleCardClick(awardsCategory)}
                    className="space-y-4"
                  >
                    <div className="aspect-video bg-linear-to-br from-orange-500/10 to-purple-500/10 rounded-xl mb-6"></div>
                    <h3 className="text-2xl font-bold mb-2 text-white">
                      {awardsCategory.title}
                    </h3>
                    {/* <p className="text-gray-400 mb-4">
                      {awardsCategory.description}
                    </p> */}

                    <div className="mt-4 pt-4 border-t border-white/10">
                      <span className="text-green-600 text-sm font-semibold flex items-center">
                        View Details <ArrowRight className="ml-2" size={16} />
                      </span>
                    </div>
                  </div>
                </Card>
              )
            )}
          </div>
        </motion.div>
      </div>

      {/* Portfolio Modal */}
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

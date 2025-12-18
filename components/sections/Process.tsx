"use client";

import { motion, Variants } from "framer-motion";
import { Code, Palette, Target, Zap } from "lucide-react";
import SectionHeader from "../ui/SectionHeader";
import Card from "../ui/Card";

interface ProcessStep {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
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

// Process Section
const Process: React.FC = () => {
  const steps: ProcessStep[] = [
    {
      number: "01",
      icon: <Target size={32} />,
      title: "Discovery",
      description:
        "Understanding your goals, audience, and market to create a strategic foundation",
    },
    {
      number: "02",
      icon: <Palette size={32} />,
      title: "Design",
      description:
        "Crafting beautiful, intuitive experiences that engage and delight users",
    },
    {
      number: "03",
      icon: <Code size={32} />,
      title: "Development",
      description:
        "Building robust solutions with clean code and cutting-edge technology",
    },
    {
      number: "04",
      icon: <Zap size={32} />,
      title: "Launch",
      description:
        "Deploying your project and ensuring a smooth, successful launch",
    },
  ];

  return (
    <section className="py-16 px-6 bg-white/5">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <SectionHeader
            title="Simple Steps to Achieve Great Results"
            subtitle="Our proven process ensures your project's success from start to finish"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step: ProcessStep, index: number) => (
              <Card key={index} hover={false}>
                <div className="text-6xl font-bold text-orange-500/20 mb-4">
                  {step.number}
                </div>
                <div className="text-orange-500 mb-4">{step.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-white">
                  {step.title}
                </h3>
                <p className="text-gray-400">{step.description}</p>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Process;

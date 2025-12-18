"use client";

import { motion, Variants } from "framer-motion";
import SectionHeader from "../ui/SectionHeader";
import Card from "../ui/Card";
import { Check } from "lucide-react";
import Button from "../ui/Button";

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted: boolean;
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

// Pricing Section
const Pricing: React.FC = () => {
  const plans: PricingPlan[] = [
    {
      name: "Basic",
      price: "$150",
      period: "/month",
      description: "Perfect for startups",
      features: [
        "Brand Strategy",
        "Logo Design",
        "Social Media Kit",
        "Basic Support",
        "2 Revisions",
      ],
      highlighted: false,
    },
    {
      name: "Standard",
      price: "$175",
      period: "/month",
      description: "Most popular choice",
      features: [
        "Everything in Basic",
        "Website Design",
        "Content Creation",
        "Priority Support",
        "Unlimited Revisions",
        "Analytics Dashboard",
      ],
      highlighted: true,
    },
    {
      name: "Premium",
      price: "$225",
      period: "/month",
      description: "For growing businesses",
      features: [
        "Everything in Standard",
        "Custom Development",
        "SEO Optimization",
        "Dedicated Manager",
        "Monthly Consultations",
        "Advanced Analytics",
      ],
      highlighted: false,
    },
  ];

  return (
    <section id="pricing" className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <SectionHeader
            title="Affordable Pricing Plans for Every Creative Need"
            subtitle="Choose the perfect plan for your business and scale as you grow"
          />

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan: PricingPlan, index: number) => (
              <Card
                key={index}
                className={
                  plan.highlighted
                    ? "border-orange-500 scale-105 relative"
                    : "relative"
                }
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2 text-white">
                  {plan.name}
                </h3>
                <p className="text-gray-400 mb-6">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-white">
                    {plan.price}
                  </span>
                  <span className="text-gray-400">{plan.period}</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature: string, i: number) => (
                    <li key={i} className="flex items-center text-gray-300">
                      <Check
                        size={20}
                        className="text-orange-500 mr-3 shrink-0"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.highlighted ? "primary" : "dark"}
                  className="w-full"
                >
                  Get Started
                </Button>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;

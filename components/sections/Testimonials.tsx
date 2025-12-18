"use client";

import { motion, Variants } from "framer-motion";
import SectionHeader from "../ui/SectionHeader";
import Card from "../ui/Card";
import { Star } from "lucide-react";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  rating: number;
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

// Testimonials Section
const Testimonials: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      quote:
        "The team's creativity and attention to detail transformed our brand. Our engagement increased by 300% in just three months!",
      author: "Sarah Johnson",
      role: "CEO, TechStart Inc.",
      rating: 5,
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
            title="What People Say About Our Work"
            subtitle="Don't just take our word for it - hear from our satisfied clients"
          />

          <div className="max-w-4xl mx-auto">
            {testimonials.map((testimonial: Testimonial, index: number) => (
              <Card key={index} className="text-center">
                <div className="flex justify-center mb-6">
                  {Array.from({ length: testimonial.rating }).map(
                    (_, i: number) => (
                      <Star
                        key={i}
                        className="text-orange-500 fill-orange-500"
                        size={24}
                      />
                    )
                  )}
                </div>
                <p className="text-2xl text-gray-300 mb-8 italic">
                  &quot;{testimonial.quote}&quot;
                </p>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-16 h-16 bg-linear-to-br from-orange-500 to-purple-500 rounded-full"></div>
                  <div className="text-left">
                    <div className="font-bold text-white">
                      {testimonial.author}
                    </div>
                    <div className="text-gray-400 text-sm">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;

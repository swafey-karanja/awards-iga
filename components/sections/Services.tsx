"use client";

import { motion, Variants } from "framer-motion";
import { Code, Palette, Sparkles, TrendingUp } from "lucide-react";
import SectionHeader from "../ui/SectionHeader";
import Card from "../ui/Card";

interface Service {
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

// Services Section
const Services: React.FC = () => {
  const services: Service[] = [
    {
      icon: <Sparkles size={32} />,
      title: "Brand Identity",
      description:
        "Crafting unique brand identities that resonate with your target audience and stand out in the market.",
    },
    {
      icon: <Palette size={32} />,
      title: "Web Design",
      description:
        "Creating stunning, user-friendly websites that deliver exceptional experiences across all devices.",
    },
    {
      icon: <Code size={32} />,
      title: "Development",
      description:
        "Building robust, scalable solutions with cutting-edge technologies and best practices.",
    },
    {
      icon: <TrendingUp size={32} />,
      title: "Digital Marketing",
      description:
        "Driving growth through data-driven marketing strategies and creative campaigns.",
    },
  ];

  return (
    <section id="services" className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <SectionHeader
            title="Delivering Impactful Digital Solutions"
            subtitle="We combine creativity, strategy, and technology to help your brand thrive in the digital landscape"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service: Service, index: number) => (
              <Card key={index}>
                <div className="text-orange-500 mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-white">
                  {service.title}
                </h3>
                <p className="text-gray-400">{service.description}</p>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;

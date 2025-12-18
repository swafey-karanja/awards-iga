"use client";

import { useState } from "react";
import { faqs } from "@/lib/Appdata";
import SectionHeader from "../ui/SectionHeader";

// Define FAQ type
interface FAQ {
  question: string;
  answer: string;
}

const FAQs: React.FC = () => {
  // activeIndex can be null when no FAQ is expanded
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const renderTextWithLinks = (text: string) => {
    const urlPattern = /(https?:\/\/[^\s)]+)/g;
    const parts = text.split(urlPattern);

    return parts.map((part, index) => {
      if (urlPattern.test(part)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            {part}
          </a>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <section id="faqs" className="container mx-auto py-16">
      <SectionHeader
        title="Frequently Asked Questions"
        subtitle="Find answers to common questions about the iGaming Afrika Summit 2026."
      />

      <div className="grid grid-cols-1 gap-x-10 gap-y-4">
        {faqs.map((faq: FAQ, index: number) => (
          <div key={index} className="mb-2">
            <button
              onClick={() => toggleFAQ(index)}
              className="flex justify-between items-center w-full text-left py-4 px-6 focus:outline-none cursor-pointer bg-white/5 border border-white/10 rounded-full transition-colors"
            >
              <h2 className="text-lg font-semibold text-white">
                {faq.question}
              </h2>
              <svg
                className={`w-5 h-5 text-white transition-transform duration-200 shrink-0 ml-4 ${
                  activeIndex === index ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <div
              className={`overflow-hidden transition-all duration-500 ${
                activeIndex === index
                  ? "max-h-96 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-gray-200 mt-4 text-md px-8">
                {renderTextWithLinks(faq.answer)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQs;

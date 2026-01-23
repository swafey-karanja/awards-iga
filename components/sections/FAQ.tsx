"use client";

import { useState } from "react";
import { faqs } from "@/lib/Appdata";
import SectionHeader from "../ui/SectionHeader";

interface FAQ {
  question: string;
  answer: string;
}

const FAQs: React.FC = () => {
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
            className="text-green-700 dark:text-green-500 hover:text-green-800 dark:hover:text-green-400 underline break-all font-medium"
          >
            {part}
          </a>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <section
      id="faqs"
      className="py-12 sm:py-16 px-4 lg:px-8 bg-green-50 dark:bg-green-950 border-b-5 border-green-600"
    >
      <div className="container mx-auto">
        <SectionHeader
          title="Frequently Asked Questions"
          subtitle="Find answers to common questions about the iGaming Afrika Summit 2026."
        />

        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq: FAQ, index: number) => (
            <div
              key={index}
              className="bg-white/90 dark:bg-green-900 border border-green-200/60 dark:border-green-700/60 rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 hover:border-green-600/60 dark:hover:border-green-500/60 shadow-sm"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center w-full text-left py-4 sm:py-5 px-4 sm:px-6 focus:outline-none cursor-pointer transition-colors hover:bg-white/50 dark:hover:bg-green-900"
                aria-expanded={activeIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <h2 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 dark:text-white pr-4">
                  {faq.question}
                </h2>
                <svg
                  className={`w-5 h-5 sm:w-6 sm:h-6 text-green-700 dark:text-green-500 transition-transform duration-300 shrink-0 ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <div
                id={`faq-answer-${index}`}
                className={`transition-all duration-300 ease-in-out ${
                  activeIndex === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-4 sm:px-6 pb-4 sm:pb-5 pt-2">
                  <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                    {renderTextWithLinks(faq.answer)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQs;

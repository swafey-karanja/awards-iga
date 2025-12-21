"use client";

import React from "react";
import SectionHeader from "../ui/SectionHeader";
import Card from "../ui/Card";

const timelineData = [
  {
    stage: "Self Nominations",
    dates: "14 Dec 2025 – 15 Jan 2026",
    description: "Submission of nominations across categories.",
  },
  {
    stage: "Shortlisting",
    dates: "16 Jan 2026 – 31 Jan 2026",
    description: "Evaluation and selection of finalists.",
  },
  {
    stage: "Supporting Statements",
    dates: "28 Feb 2026",
    description: "Shortlisted nominees submit supporting evidence.",
  },
  {
    stage: "Judging & Voting",
    dates: "1 Mar 2026 – 10 Mar 2026",
    description: "Panel votes for winners.",
  },
  {
    stage: "Shortlist Reveal",
    dates: "13 Mar 2026",
    description: "Announcement of finalists.",
  },
  {
    stage: "Final Awards",
    dates: "5 May 2026",
    description: "Grand winners' announcement and celebration.",
  },
];

const Timeline: React.FC = () => {
  return (
    <section className="w-full py-12 sm:py-16 px-4 sm:px-6">
      <div className=" w-full">
        <SectionHeader
          title="Timeline"
          subtitle="Key Dates for the iGaming Afrika Awards 2026"
        />

        {/* Timeline - Desktop (XL and above) */}
        <div className="hidden xl:block">
          <div className="relative">
            {/* Horizontal timeline line */}
            <div className="absolute left-0 right-0 top-8 h-1 bg-linear-to-r from-green-600/20 via-green-600/50 to-green-600/20"></div>

            <div className="relative flex justify-between px-4">
              {timelineData.map((item, index) => (
                <div key={index} className="text-center w-64">
                  {/* Dot with connector */}
                  <div className="relative mx-auto mb-12">
                    <div className="w-5 h-5 bg-green-600 rounded-full mx-auto border-4 border-gray-900 shadow-lg shadow-green-600/50"></div>
                    <div className="absolute top-5 left-1/2 transform -translate-x-1/2 w-0.5 h-12 bg-linear-to-b from-green-600/50 to-transparent"></div>
                  </div>

                  <Card hover={false}>
                    <div className="text-sm text-green-500 font-semibold mb-2">
                      {item.dates}
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-white">
                      {item.stage}
                    </h3>
                    <p className="text-gray-400 text-sm">{item.description}</p>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline - Vertical (Below XL) */}
        <div className="xl:hidden space-y-6 sm:space-y-8 max-w-2xl mx-auto">
          {timelineData.map((item, index) => (
            <div key={index} className="flex gap-4 sm:gap-6">
              {/* Vertical line and dot */}
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-600 flex items-center justify-center shrink-0 border-4 border-gray-900 shadow-lg shadow-green-600/30">
                  <span className="font-bold text-white text-sm sm:text-base">
                    {index + 1}
                  </span>
                </div>
                {index < timelineData.length - 1 && (
                  <div className="w-0.5 flex-1 bg-linear-to-b from-green-600/50 to-green-600/20 min-h-15"></div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pb-6">
                <div className="text-xs sm:text-sm text-green-500 font-semibold mb-1">
                  {item.dates}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                  {item.stage}
                </h3>
                <p className="text-sm sm:text-base text-gray-400">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;

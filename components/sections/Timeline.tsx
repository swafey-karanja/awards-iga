// components/MiniTimeline.tsx
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
    <div className="w-full py-16">
      <div className="">
        {/* Header */}
        <SectionHeader
          title="Timeline"
          subtitle="Key Dates for the iGaming Afrika Awards 2026"
        />

        {/* Timeline - Desktop */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 right-0 top-8 h-1 bg-gray-200"></div>

            <div className="relative flex justify-between px-20">
              {timelineData.map((item, index) => (
                <div key={index} className="text-center w-72">
                  {/* Dot */}
                  <div className="relative mx-auto mb-12">
                    <div className="w-4 h-4 bg-green-600 rounded-full mx-auto"></div>
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-0.5 h-12 bg-gray-300"></div>
                  </div>

                  <Card key={index}>
                    {/* <div className="text-orange-500 mb-4">{item.icon}</div> */}
                    <h3 className="text-xl font-bold mb-3 text-white">
                      {item.stage}
                    </h3>
                    <p className="text-gray-400">{item.description}</p>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline - Mobile */}
        <div className="md:hidden space-y-8">
          {timelineData.map((item, index) => (
            <div key={index} className="flex items-start">
              {/* Number */}
              <div className="shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <span className="font-bold text-blue-600">{index + 1}</span>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="text-sm text-gray-500 mb-1">{item.dates}</div>
                <h3 className="font-bold text-gray-900 mb-2">{item.stage}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;

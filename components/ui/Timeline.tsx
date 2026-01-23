"use client";

import React from "react";

interface TimelineItem {
  dates: string;
  title: string;
  description?: string;
}

const timelineData: TimelineItem[] = [
  {
    title: "Self Nominations",
    dates: "16 Jan 2025 – 29 Jan 2026",
    description: "Submission of nominations across categories.",
  },
  {
    title: "Shortlisting",
    dates: "30 Jan 2026 – 31 Jan 2026",
    description: "Evaluation and selection of finalists.",
  },
  {
    title: "Supporting Statements",
    dates: "28 Feb 2026",
    description: "Shortlisted nominees submit supporting evidence.",
  },
  {
    title: "Judging & Voting",
    dates: "1 Mar 2026 – 10 Mar 2026",
    description: "Panel votes for winners.",
  },
  {
    title: "Shortlist Reveal",
    dates: "13 Mar 2026",
    description: "Announcement of finalists.",
  },
  {
    title: "Final Awards",
    dates: "5 May 2026",
    description: "Grand winners' announcement and celebration.",
  },
];

// Component for items BELOW the timeline line
const TimelineItemBelow: React.FC<{ item: TimelineItem }> = ({ item }) => {
  return (
    <div className="absolute left-1/2 transform -translate-x-1/2 w-64 top-1/2 mt-20">
      {/* Connector line - goes UP from dot to card */}
      <div className="absolute left-1/2 bottom-full transform -translate-x-1/2 w-0.5 h-20 bg-linear-to-t from-green-600/60 dark:from-green-500/60 via-green-600/40 dark:via-green-500/40 to-transparent"></div>

      {/* Time badge */}
      <div className="flex justify-center items-center mb-2">
        <span className="inline-block px-3 text-center py-1 bg-green-50 /30 text-green-700 dark:text-green-400 font-medium text-sm rounded-full border border-green-100 dark:border-green-700 shadow-sm">
          {item.dates}
        </span>
      </div>

      {/* Content box */}
      <div className="p-1 duration-300 w-[90%] ">
        <h3 className="font-bold text-gray-900 dark:text-white mb-1 text-center">
          {item.title}
        </h3>
        {item.description && (
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 text-center">
            {item.description}
          </p>
        )}
      </div>
    </div>
  );
};

// Component for items ABOVE the timeline line
const TimelineItemAbove: React.FC<{ item: TimelineItem }> = ({ item }) => {
  return (
    <div className="absolute left-1/2 transform -translate-x-1/2 w-64 top-1/2 -translate-y-[calc(100%+5rem)]">
      {/* Connector line - goes DOWN from dot to card */}
      <div className="absolute left-1/2 top-full transform -translate-x-1/2 w-0.5 h-20 bg-linear-to-b from-green-600/60 dark:from-green-500/60 via-green-600/40 dark:via-green-500/40 to-transparent"></div>

      {/* Content box */}
      <div className="rounded-lg p-1 transition-shadow duration-300">
        <h3 className="font-bold text-gray-900 dark:text-white mb-1 text-center">
          {item.title}
        </h3>
        {item.description && (
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 text-center">
            {item.description}
          </p>
        )}
      </div>

      {/* Time badge */}
      <div className="flex justify-center mt-2">
        <span className="inline-block px-3 py-1 bg-green-50 /30 text-green-700 dark:text-green-400 font-medium text-sm rounded-full border border-green-100 dark:border-green-700 shadow-sm">
          {item.dates}
        </span>
      </div>
    </div>
  );
};

// Timeline Dot Component (reusable)
const TimelineDot: React.FC = () => {
  return (
    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
      <div className="relative">
        {/* Outer glow */}
        <div className="absolute -inset-2 bg-green-500/20 dark:bg-green-600/20 rounded-full blur-sm"></div>
        {/* Main dot */}
        <div className="relative w-4 h-4 bg-green-600 dark:bg-green-500 rounded-full border-2 border-white dark:border-gray-900 shadow-lg"></div>
      </div>
    </div>
  );
};

const Timeline: React.FC = () => {
  const totalItems = timelineData.length;

  return (
    <div className=" hidden md:block w-full py-8 sm:py-12 md:py-40 ml-20">
      {/* Desktop Timeline */}

      <div className="relative">
        {/* Main horizontal timeline line - spans full width */}
        <div className="absolute left-0 right-0 top-1/2 h-1 bg-linear-to-r from-green-500 dark:from-green-600 via-green-600 dark:via-green-500 to-green-500 dark:to-green-600 transform -translate-y-1/2 w-[90%]"></div>

        <div className="relative flex">
          {timelineData.map((item, index) => {
            const isEven = index % 2 === 0;

            // Calculate position: first at 0%, last at 100%, others evenly spaced
            let leftPosition = 0;
            if (totalItems === 1) {
              leftPosition = 50;
            } else {
              leftPosition = (index / (totalItems - 1)) * 90;
            }

            return (
              <div
                key={index}
                className="absolute"
                style={{
                  left: `${leftPosition}%`,
                  transform: "translateX(-50%)",
                }}
              >
                {/* Timeline dot */}
                <TimelineDot />

                {/* Render either above or below component */}
                {isEven ? (
                  <TimelineItemBelow item={item} />
                ) : (
                  <TimelineItemAbove item={item} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Timeline;

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
    dates: "14 Dec 2025 – 15 Jan 2026",
    description: "Submission of nominations across categories.",
  },
  {
    title: "Shortlisting",
    dates: "16 Jan 2026 – 31 Jan 2026",
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

// Timeline Item Component for left side
const TimelineItemLeft: React.FC<{ item: TimelineItem }> = ({ item }) => {
  return (
    <div className="absolute right-[calc(50%+2rem)] w-40 top-1/2 -translate-y-1/2">
      {/* Connector line to the dot */}
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-5 h-0.5 bg-linear-to-r from-green-600/60 dark:from-green-500/60 via-green-600/40 dark:via-green-500/40 to-transparent"></div>

      {/* Content box */}
      <div className="bg-green-50 dark:bg-transparent rounded-lg p-4 border dark:border-none mr-2">
        <h3 className="font-bold text-gray-900 dark:text-white mb-1 text-left">
          {item.title}
        </h3>
        {item.description && (
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 text-left">
            {item.description}
          </p>
        )}

        {/* Time badge */}
        <div className="mt-3">
          <span className="inline-block px-3 py-1 bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 font-medium text-sm rounded-full border border-green-100 dark:border-green-700 shadow-sm">
            {item.dates}
          </span>
        </div>
      </div>
    </div>
  );
};

// Timeline Item Component for right side
const TimelineItemRight: React.FC<{ item: TimelineItem }> = ({ item }) => {
  return (
    <div className="absolute left-[calc(50%+2rem)] w-40 top-1/2 -translate-y-1/2">
      {/* Connector line to the dot */}
      <div className="absolute left-0 top-1/2 transform -translate-y-3/4 w-2 h-0.5 bg-linear-to-l from-green-600/60 dark:from-green-500/60 via-green-600/40 dark:via-green-500/40 to-transparent"></div>

      {/* Content box */}
      <div className="bg-green-50 dark:bg-transparent rounded-lg p-4 border dark:border-none ml-2">
        <h3 className="font-bold text-gray-900 dark:text-white mb-1 text-left">
          {item.title}
        </h3>
        {item.description && (
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 text-left">
            {item.description}
          </p>
        )}

        {/* Time badge */}
        <div className="mt-3">
          <span className="inline-block px-3 py-1 bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 font-medium text-sm rounded-full border border-green-100 dark:border-green-700 shadow-sm">
            {item.dates}
          </span>
        </div>
      </div>
    </div>
  );
};

const MobileTimeline: React.FC = () => {
  const totalItems = timelineData.length;
  const itemHeight = 180; // Approximate height of each timeline segment

  return (
    <div className="w-full py-8 px-4 xl:hidden">
      <div className="relative">
        {/* Main vertical timeline line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-linear-to-b from-green-500 dark:from-green-600 via-green-600 dark:via-green-500 to-green-500 dark:to-green-600 transform -translate-x-1/2"></div>

        <div className="relative">
          {timelineData.map((item, index) => {
            const isLeftSide = index % 2 === 0;
            const topPosition = index * itemHeight;

            return (
              <div
                key={index}
                className="absolute w-full"
                style={{
                  top: `${topPosition}px`,
                  height: `${itemHeight}px`,
                }}
              >
                {/* Timeline dot */}
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="relative">
                    <div className="absolute -inset-2 bg-green-500/20 dark:bg-green-600/20 rounded-full blur-sm"></div>
                    <div className="relative w-4 h-4 bg-green-600 dark:bg-green-500 rounded-full border-2 border-white dark:border-gray-900 shadow-lg"></div>
                  </div>
                </div>

                {/* Render item on left or right side */}
                {isLeftSide ? (
                  <TimelineItemLeft item={item} />
                ) : (
                  <TimelineItemRight item={item} />
                )}
              </div>
            );
          })}

          {/* Add extra space at the bottom for the last item */}
          <div style={{ height: `${(totalItems - 0.5) * itemHeight}px` }}></div>
        </div>
      </div>
    </div>
  );
};

export default MobileTimeline;

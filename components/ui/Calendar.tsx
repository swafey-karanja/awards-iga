"use client";

import { CalendarPlus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export const CalendarDropdown = ({
  showText = false, // whether to show "Add to Calendar" text
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [closeTimeout, setCloseTimeout] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);

  const handleMouseEnter = () => {
    if (closeTimeout) clearTimeout(closeTimeout);
    setCloseTimeout(null);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => setIsOpen(false), 300);
    setCloseTimeout(timeout);
  };

  // Event details
  const eventTitle = "iGaming Afrika Summit Awards 2026";
  const eventLocation = "TBC";
  const eventDescription =
    "The Heart of Gaming in Africa - With expected attendees from over 100 countries";
  const date = "20260504T090000";

  // Calendar URLs
  const generateGoogleCalendarUrl = () => {
    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: eventTitle,
      dates: `${date}`,
      details: eventDescription,
      location: eventLocation,
    });
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  };

  const generateICalFile = () => {
    const icsContent = `BEGIN:VCALENDAR
    VERSION:2.0
    PRODID:-//iGaming Afrika//Summit 2026//EN
    BEGIN:VEVENT
    DTSTART:${date}
    DTEND:${date}
    SUMMARY:${eventTitle}
    DESCRIPTION:${eventDescription}
    LOCATION:${eventLocation}
    STATUS:CONFIRMED
    END:VEVENT
    END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "igaming-afrika-summit-2026.ics";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const generateOutlookWebUrl = () => {
    const params = new URLSearchParams({
      path: "/calendar/action/compose",
      rru: "addevent",
      subject: eventTitle,
      startdt: date,
      enddt: date,
      body: eventDescription,
      location: eventLocation,
    });
    return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
  };

  const generateYahooCalendarUrl = () => {
    const params = new URLSearchParams({
      v: "60",
      title: eventTitle,
      st: date,
      et: date,
      desc: eventDescription,
      in_loc: eventLocation,
    });
    return `https://calendar.yahoo.com/?${params.toString()}`;
  };

  const calendarOptions = [
    {
      name: "Google Calendar",
      icon: "/google.png",
      color: "text-red-600 dark:text-red-500",
      action: () => window.open(generateGoogleCalendarUrl(), "_blank"),
    },
    {
      name: "Apple iCal",
      icon: "/apple.png",
      color: "text-gray-700 dark:text-gray-400",
      action: generateICalFile,
    },
    {
      name: "Outlook Desktop",
      icon: "/outlook desktop.png",
      color: "text-yellow-500 dark:text-yellow-400",
      action: generateICalFile,
    },
    {
      name: "Outlook Web",
      icon: "/outlook web.png",
      color: "text-blue-600 dark:text-blue-500",
      action: () => window.open(generateOutlookWebUrl(), "_blank"),
    },
    {
      name: "Yahoo Calendar",
      icon: "/yahoo.png",
      color: "text-purple-600 dark:text-purple-500",
      action: () => window.open(generateYahooCalendarUrl(), "_blank"),
    },
  ];

  return (
    <div className="relative inline-block">
      <button
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="bg-[#14a45c] dark:bg-green-700 text-white md:px-3.25 md:py-2 px-2.5 py-1 rounded-full shadow-lg flex items-center gap-2 hover:bg-green-700 dark:hover:bg-green-600 transition-colors"
        aria-label="Add to calendar"
      >
        <span className="scale-90 sm:scale-100 md:scale-100 lg:scale-120 transition-transform">
          <CalendarPlus size={15} />
        </span>
        {showText && (
          <span className="font-semibold text-xs md:text-sm">
            Add to Calendar
          </span>
        )}
      </button>

      {isOpen && (
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="absolute top-full right-0 mt-2 w-46 md:w-56 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50"
        >
          {calendarOptions.map((option, index) => (
            <button
              key={index}
              onClick={option.action}
              className="w-full px-4 py-2 text-left hover:bg-green-50 dark:hover:bg-gray-700 transition-colors duration-150 flex items-center gap-3 cursor-pointer"
            >
              <Image
                src={option.icon}
                alt={option.name}
                className="h-4 w-4 md:h-6 md:w-6"
                width={24}
                height={24}
              />
              <span
                className={`text-sm md:text-[14px] font-bold ${option.color}`}
              >
                {option.name}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

"use client";

import Image from "next/image";
import { CalendarDropdown } from "../ui/Calendar";
// import Link from "next/link";
// import Button from "../ui/Button";
import { useEffect, useState } from "react";

interface HeroProps {
  variant?: "default" | "dark-centered";
  page?: string;
}

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const Hero = ({ variant = "default", page = "home" }: HeroProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const timeUnits: (keyof TimeLeft)[] = ["days", "hours", "minutes", "seconds"];

  // Determine variant based on page if not explicitly set
  const heroVariant =
    variant || (page === "home" ? "default" : "dark-centered");

  // Calculate time left until the event (May 4, 2026)
  useEffect(() => {
    const calculateTimeLeft = () => {
      const eventDate = new Date("May 5, 2026").getTime();
      const now = new Date().getTime();
      const difference = eventDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          ),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft(); // Initial calculation

    return () => clearInterval(timer);
  }, []);

  // Default Hero (Original Design)
  if (heroVariant === "default") {
    return (
      <section className="relative py-8 sm:py-12 xl:py-0 overflow-hidden bg-black border-b-5 border-green-600">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-40"
          >
            <source src="/background-pattern-video.mp4" type="video/mp4" />
            <Image
              src="/fallback.webp"
              alt="Background"
              fill
              className="object-cover"
              priority
            />
          </video>
          <div className="absolute inset-0 bg-transparent dark:bg-green-700/20"></div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center px-4 mx-auto container relative sm:px-4 pt-30 min-h-[70vh] xl:min-h-screen z-10">
          {/* Left Content Column */}
          <div className="w-full lg:w-1/2 mb-10 lg:mb-0 lg:pr-8 xl:pr-16">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-semibold text-white text-center lg:text-left leading-tight lg:leading-tight">
              <span className="text-green-500 block lg:inline">
                iGA Awards 2026
              </span>
            </h1>

            <p className="mt-4 sm:mt-6 text-sm sm:text-base text-gray-200 leading-relaxed text-center lg:text-left">
              The{" "}
              <span className="font-semibold text-gray-300">
                iGaming AFRIKA Summit Awards 2026
              </span>{" "}
              for B2B, B2C and industry professionals is designed to celebrate
              excellence and innovation within the African Gaming industry. The
              awards process will be transparent, inclusive, and rigorous,
              involving multiple stages to ensure merited recognition. The
              timeline spans from the initiation of nominations in early 2025 to
              the grand winners&apos; announcement on 5th May 2026.
            </p>

            <div className="mt-6 sm:mt-8 mb-6 sm:mb-8 pt-6 sm:pt-8 border-t border-gray-600">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                <div className="flex items-start gap-3 p-3 sm:p-0">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 shrink-0 mt-0.5 sm:mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-400">Date</p>
                    <p className="text-white font-semibold text-sm sm:text-base">
                      5th May 2026
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 sm:p-0">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 shrink-0 mt-0.5 sm:mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-400">Time</p>
                    <p className="text-white font-semibold text-sm sm:text-base">
                      TBC
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 sm:p-0">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 shrink-0 mt-0.5 sm:mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-400">Venue</p>
                    <p className="text-white font-semibold text-sm sm:text-base">
                      Nairobi, Kenya
                    </p>
                  </div>
                </div>

                <div className="block md:hidden sm:col-span-2 lg:col-span-3 mt-4 sm:mt-6">
                  <div className="flex justify-start">
                    <CalendarDropdown showText={true} />
                  </div>
                </div>
              </div>
            </div>
            {/* Countdown Timer */}
            <div className="flex justify-center flex-wrap md:justify-start gap-3 md:gap-4 lg:gap-6 mt-6">
              {timeUnits.map((unit) => (
                <div
                  key={unit}
                  className="text-center py-3 sm:py-6 bg-transparent border-3 border-[#14a45c] rounded-lg min-w-20 xl:min-w-25"
                >
                  <div className="text-xl font-bold text-[#14a45c]">
                    {timeLeft[unit]}
                  </div>
                  <div className="text-xs sm:text-md text-[#14a45c] font-semibold uppercase mt-1">
                    {unit}
                  </div>
                </div>
              ))}
            </div>

            <div className="hidden md:block sm:col-span-2 lg:col-span-3 mt-6">
              <div className="flex justify-center md:justify-start">
                <CalendarDropdown showText={true} />
              </div>
            </div>
          </div>

          {/* Right Image Column */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end items-center">
            <div className="relative h-48 sm:h-80 xl:h-200 w-full">
              <Image
                className="relative"
                src="/IGA-Award-design-final-22.png"
                alt="IGA 2026 Event"
                fill
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 70vw, 50vw"
                style={{ objectFit: "contain" }}
                unoptimized
                priority
              />
            </div>
          </div>

          {/* <div className="flex md:hidden items-center mt-5">
            <Link href="/awards">
            <Button>Nominations closed</Button>
            </Link>
          </div> */}
        </div>

        {/* Animated Scroll Indicator */}
        <div className="hidden xl:block absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <div className="flex flex-col items-center gap-2">
            <p className="text-green-400 text-xl font-bold">Scroll Down</p>
            <svg
              className="w-12 h-16 text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="5"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>

        <style jsx>{`
          @keyframes bounce {
            0%,
            100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }
          .animate-bounce {
            animation: bounce 2s infinite;
          }
        `}</style>
      </section>
    );
  }
  // Dark Centered Hero (Matching the image)
  return (
    <section className="relative py-20 pt-50 overflow-hidden min-h-[45vh] flex items-center border-b-5 border-green-600">
      {/* Background Image */}
      <div className="inset-0 absolute z-0">
        <Image
          src="https://images.unsplash.com/photo-1764874298962-ac0c84307fc0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Awards Background"
          fill
          className="object-cover"
          unoptimized
          loading="eager"
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-linear-to-br from-gray-900/85 via-green-900/75 to-gray-900/85"></div>
      </div>

      {/* Decorative Elements - Starburst patterns like in the image */}
      <div className="absolute top-10 left-20 w-32 h-32 opacity-20">
        <svg viewBox="0 0 100 100" className="w-full h-full text-yellow-400">
          <g>
            {[...Array(12)].map((_, i) => (
              <line
                key={i}
                x1="50"
                y1="50"
                x2="50"
                y2="10"
                stroke="currentColor"
                strokeWidth="0.5"
                transform={`rotate(${i * 30} 50 50)`}
              />
            ))}
          </g>
        </svg>
      </div>

      <div className="absolute bottom-20 right-20 w-40 h-40 opacity-15">
        <svg viewBox="0 0 100 100" className="w-full h-full text-yellow-400">
          <g>
            {[...Array(16)].map((_, i) => (
              <line
                key={i}
                x1="50"
                y1="50"
                x2="50"
                y2="5"
                stroke="currentColor"
                strokeWidth="0.5"
                transform={`rotate(${i * 22.5} 50 50)`}
              />
            ))}
          </g>
        </svg>
      </div>

      {/* Main Content */}
      <div className="px-4 mx-auto relative sm:px-6 lg:px-8 container max-w-6xl">
        <div className="text-center">
          {/* Subtitle - smaller text at top */}
          <p className="text-gray-300 text-sm md:text-base mb-4 uppercase tracking-wider">
            iGaming Afrika Summit Awards 2026
          </p>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight mb-6 px-4">
            Celebrating iGaming Excellence in Africa.
            {/* <br />
            <span className="text-gray-300">in the iGaming Industry.</span> */}
          </h1>
        </div>
      </div>

      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-black/40 to-transparent"></div>
    </section>
  );
};

export default Hero;

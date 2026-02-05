"use client";

import Hero from "@/components/sections/Hero";
import NominationsClosed from "@/components/sections/NominationsClosed";
// import NominationForm from "@/components/sections/NominationForm";

const AwardsPage = () => {
  return (
    <div className="bg-green-50 dark:bg-green-950 border-b-5 border-green-600">
      {/* Minimal hero with background */}
      <Hero variant="dark-centered" />
      <NominationsClosed />
      {/* <NominationForm /> */}
    </div>
  );
};

export default AwardsPage;

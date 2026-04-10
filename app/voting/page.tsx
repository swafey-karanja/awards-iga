"use client";

import Hero from "@/components/sections/Hero";
import VotingClosed from "@/components/sections/VotingClosed";
// import VotingForm from "@/components/ui/VotingForm";

const VotePage = () => {
  return (
    <div className="bg-green-50 dark:bg-gray-800 border-b-5 border-green-600">
      <Hero variant="dark-centered" />
      {/* <VotingForm /> */}
      <VotingClosed />
    </div>
  );
};

export default VotePage;

"use client";

import Hero from "@/components/sections/Hero";
import VotingForm from "@/components/ui/VotingForm";

const VotePage = () => {
  return (
    <div className="bg-green-50 dark:bg-gray-800 border-b-5 border-green-600">
      <Hero variant="dark-centered" />
      <VotingForm />
    </div>
  );
};

export default VotePage;

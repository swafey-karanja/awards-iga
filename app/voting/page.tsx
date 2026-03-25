"use client";

import Hero from "@/components/sections/Hero";
import VotingForm from "@/components/ui/VotingForm";

const VotePage = () => {
  return (
    <div className="bg-white dark:bg-black border-b-5 border-green-600">
      <Hero variant="dark-centered" />
      <VotingForm />
    </div>
  );
};

export default VotePage;

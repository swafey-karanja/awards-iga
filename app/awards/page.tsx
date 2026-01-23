import Hero from "@/components/sections/Hero";
import NominationForm from "@/components/sections/NominationForm";
import React from "react";

const AwardsPage = () => {
  return (
    <div className="bg-green-50 dark:bg-green-950 border-b-5 border-green-600">
      {/* Minimal hero with background */}
      <Hero variant="dark-centered" />
      <NominationForm />
    </div>
  );
};

export default AwardsPage;

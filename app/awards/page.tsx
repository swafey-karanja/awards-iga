import Hero from "@/components/sections/Hero";
import NominationForm from "@/components/sections/NominationForm";
import React from "react";

const AwardsPage = () => {
  return (
    <div className="bg-green-900/30 px-6 md:px-0">
      {/* Minimal hero with background */}
      <Hero
        showStats={false}
        showButton={false}
        description="Nominate a company or individual excelling in the African iGaming industry. Celebrate innovation, leadership, and excellence across diverse categories."
        backgroundImage="https://images.unsplash.com/photo-1764874298962-ac0c84307fc0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        isHomePage={false}
      />
      <NominationForm />
    </div>
  );
};

export default AwardsPage;

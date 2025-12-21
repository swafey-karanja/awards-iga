import About from "@/components/sections/About";
// import CTA from "@/components/sections/CTA";
import Hero from "@/components/sections/Hero";
import Portfolio from "@/components/sections/AwardsCategories";
import Timeline from "@/components/sections/Timeline";
import Judges from "@/components/sections/Judges";
import FAQs from "@/components/sections/FAQ";

export default function Home() {
  return (
    <div className="bg-green-900/30 text-white min-h-screen">
      <Hero backgroundImage="https://images.unsplash.com/photo-1764874298962-ac0c84307fc0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
      <Timeline />
      <About />
      <Portfolio />
      <Judges />
      <FAQs />
      {/* <CTA /> */}
    </div>
  );
}

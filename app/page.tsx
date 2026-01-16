import About from "@/components/sections/About";
// import CTA from "@/components/sections/CTA";
import Hero from "@/components/sections/Hero";
import Portfolio from "@/components/sections/AwardsCategories";
// import Timeline from "@/components/ui/Timeline";
import Judges from "@/components/sections/Judges";
import FAQs from "@/components/sections/FAQ";
import NewsSection from "@/components/sections/News";

export default function Home() {
  return (
    <div className="bg-green-50 min-h-screen">
      <Hero />
      {/* <Timeline /> */}
      <About />
      <Portfolio />
      <Judges />
      <NewsSection />
      <FAQs />
      {/* <CTA /> */}
    </div>
  );
}

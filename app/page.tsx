import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import About from "@/components/sections/About";
import CTA from "@/components/sections/CTA";
// import FAQ from "@/components/sections/FAQ";
import Hero from "@/components/sections/Hero";
import Portfolio from "@/components/sections/AwardsCategories";
// import Pricing from "@/components/sections/Pricing";
// import Process from "@/components/sections/Process";
// import Services from "@/components/sections/Services";
// import Testimonials from "@/components/sections/Testimonials";
import Timeline from "@/components/sections/Timeline";
import Judges from "@/components/sections/Judges";
import FAQs from "@/components/sections/FAQ";

export default function Home() {
  return (
    <div className="bg-green-900/30 text-white min-h-screen">
      <Navbar />
      <Hero />
      <Timeline />
      {/* <Services /> */}
      <About />
      <Portfolio />
      <Judges />
      {/* <Process /> */}
      {/* <Pricing /> */}
      {/* <Testimonials /> */}
      <FAQs />
      <CTA />
      <Footer />
    </div>
  );
}

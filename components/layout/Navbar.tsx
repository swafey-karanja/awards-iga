"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu } from "lucide-react";
import Button from "../ui/Button";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  // const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // useEffect(() => {
  //   const handleScroll = () => setIsScrolled(window.scrollY > 50);
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  // const navLinks = ["Home", "About Us", "Services", "Pages", "Contact Us"];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 py-2 px-6 md:px-0 bg-gray-300/30 backdrop-blur-2xl">
      <div className={`container mx-auto transition-all duration-300`}>
        <div className="">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="shrink-0">
              <Image
                className="w-auto h-12 sm:h-16 md:h-20 lg:h-24"
                src="/IGA-Logo.png"
                alt="iGaming Afrika"
                width={160}
                height={100}
                priority
              />
            </Link>

            {/* Desktop CTA Button */}
            <div className="hidden md:block">
              <Link href="/awards">
                <Button>Submit a Nomination</Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-green-600 p-2 hover:bg-white/10 rounded-full transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="md:hidden overflow-hidden"
              >
                <div className="mt-4 pb-4 border-t border-white/10 pt-4 space-y-2">
                  {/* {navLinks.map((link) => (
                    <a
                      key={link}
                      href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                      className="block py-2 px-2 text-gray-300 hover:text-white hover:bg-white/5 rounded transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link}
                    </a>
                  ))} */}
                  <Link href="/awards" className="block pt-2">
                    <Button
                      className="w-full"
                      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                      Submit a Nomination
                    </Button>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { X, Menu } from "lucide-react";
import Button from "../ui/Button";

// Navbar Component
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = ["Home", "About Us", "Services", "Pages", "Contact Us"];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-6 pt-6 backdrop-blur-2xl ${
        isScrolled ? "" : " "
      }`}
    >
      <div
        className={`container mx-auto transition-all duration-300 rounded-full ${
          isScrolled
            ? "bg-green-800/30 border border-white/30"
            : " border border-white/30"
        } `}
      >
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">
              <span className="text-white">creastie</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-gray-300 hover:text-green-600 transition-colors text-xl font-medium"
                >
                  {link}
                </a>
              ))}
            </div>

            <div className="hidden md:block">
              <Button>Submit a Nomination</Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="md:hidden mt-4 pb-4 border-t border-white/10 pt-4"
            >
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                  className="block py-2 text-gray-300 hover:text-white transition-colors text-sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link}
                </a>
              ))}
              <Button className="w-full mt-4">Let&apos;s Talk</Button>
            </motion.div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

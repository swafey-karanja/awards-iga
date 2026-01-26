"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu } from "lucide-react";
import Button from "../ui/Button";
import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "../ui/ThemeToggle";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 py-2 px-6 md:px-0 bg-gray-300/30 dark:bg-black/30 backdrop-blur-3xl overflow-hidden">
      <div className={`container mx-auto transition-all duration-300`}>
        <div className="">
          <div className="flex items-center justify-between overflow-hidden">
            {/* Logo */}
            <Link href="/" className="shrink-0">
              <Image
                className="w-auto h-12 sm:h-16 md:h-20"
                src="/Awards-logo-final.png"
                alt="iGaming Afrika"
                width={160}
                height={120}
                priority
              />
            </Link>

            {/* Desktop - Theme Toggle & CTA Button */}
            <div className="hidden md:flex items-center gap-4">
              <Link href="/awards">
                <Button>Submit a Nomination</Button>
              </Link>
              <ModeToggle />
            </div>

            {/* Mobile - Theme Toggle & Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              <ModeToggle />
              <button
                className="text-green-600 p-2 hover:bg-white/10 dark:hover:bg-black/10 rounded-full transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
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

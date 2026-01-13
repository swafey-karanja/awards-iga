import Image from "next/image";
import SocialMediaLinks from "../ui/SocilaMediaLinks";

const Footer = () => {
  const footerLinks = {
    Company: ["About", "Services", "Work", "Careers"],
    Resources: ["Blog", "Case Studies", "Documentation", "Support"],
    Legal: ["Privacy", "Terms", "Cookies", "Licenses"],
  };

  return (
    <footer className="bg-green-900/20 border-t border-white/10 py-12 sm:py-16 px-4 sm:px-6">
      <div className="container mx-auto flex flex-col items-center justify-center">
        <div className="gap-8 sm:gap-10 mb-8 sm:mb-12">
          {/* Logo and Description */}
          <div className="sm:col-span-2 lg:col-span-1 flex flex-col items-center text-center">
            <Image
              className="w-auto h-20 sm:h-40 mb-4"
              src="/IGA-Logo.png"
              alt="iGaming Afrika"
              width={160}
              height={100}
              priority
            />
            <p className="text-gray-400 mb-6 text-sm sm:text-base">
              Empowering iGaming Excellence in Africa.
            </p>
            <SocialMediaLinks />
          </div>

          {/* Footer Links */}
          {/* {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-bold text-white mb-3 sm:mb-4 text-base sm:text-lg">
                {category}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))} */}
        </div>

        {/* Copyright */}
        <div className="w-full pt-6 sm:pt-8 border-t border-white/10 text-center text-gray-400 text-xs sm:text-sm">
          <p>
            &copy; {new Date().getFullYear()} iGaming Afrika Summit. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

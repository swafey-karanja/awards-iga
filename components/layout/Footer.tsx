import { Heart } from "lucide-react";

// Footer Component
const Footer = () => {
  const footerLinks = {
    Company: ["About", "Services", "Work", "Careers"],
    Resources: ["Blog", "Case Studies", "Documentation", "Support"],
    Legal: ["Privacy", "Terms", "Cookies", "Licenses"],
  };

  return (
    <footer className="bg-green-900/20 border-t border-white/10 py-16 px-6">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="text-2xl font-bold mb-4">
              <span className="text-white">creative</span>
              <span className="text-green-500">.</span>
            </div>
            <p className="text-gray-400 mb-6">
              Empowering brands with creative digital solutions since 2010.
            </p>
            <div className="flex gap-4">
              {["twitter", "instagram", "linkedin", "github"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-green-500 hover:border-green-500 transition-colors"
                >
                  <Heart size={18} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-bold text-white mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-white/10 text-center text-gray-400">
          <p>&copy; 2025 Creative Agency. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

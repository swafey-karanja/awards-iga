import { motion } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import {
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaFacebook,
  FaGlobe,
} from "react-icons/fa";

interface SocialLinks {
  twitter?: string;
  linkedin?: string;
  instagram?: string;
  facebook?: string;
  website?: string;
}

interface Judge {
  name: string;
  company: string;
  bio: string;
  role: string;
  image: string;
  social: SocialLinks;
}

interface JudgeModalProps {
  isModalOpen: boolean;
  selectedJudge: Judge | null;
  closeModal: () => void;
}

const JudgeModal: React.FC<JudgeModalProps> = ({
  isModalOpen,
  selectedJudge,
  closeModal,
}) => {
  if (!isModalOpen || !selectedJudge) return null;

  const scaleUp = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/60 bg-green-50 dark:bg-green-950/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeModal}
      />

      {/* Modal Content */}
      <motion.div
        className="relative bg-green-900/95 bg-green-50 dark:bg-green-950/95 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 max-w-3xl w-full max-h-[90vh] sm:max-h-[85vh] overflow-y-auto border border-green-500/20 dark:border-green-600/30 shadow-2xl shadow-green-500/10 dark:shadow-green-600/20"
        variants={scaleUp}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute cursor-pointer top-3 right-3 sm:top-4 sm:right-4 w-9 h-9 sm:w-10 sm:h-10 bg-white/5 dark:bg-gray-800/50 hover:bg-white/10 dark:hover:bg-gray-700/50 rounded-full flex items-center justify-center text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-200 transition-all duration-200 border border-white/10 dark:border-gray-700/50 hover:border-green-500/50 dark:hover:border-green-600/50"
          aria-label="Close modal"
        >
          <X size={18} className="sm:w-5 sm:h-5" />
        </button>

        {/* Content */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center sm:items-start">
          {/* Profile Image */}
          <motion.div
            className="shrink-0 w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full bg-linear-to-br from-green-500/20 to-purple-500/20 dark:from-green-600/20 dark:to-purple-600/20 flex items-center justify-center overflow-hidden relative border-4 border-green-500/30 dark:border-green-600/40"
            whileHover={{ scale: 1.05 }}
          >
            {selectedJudge.image ? (
              <Image
                src={selectedJudge.image}
                alt={selectedJudge.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 112px, 160px"
                unoptimized
              />
            ) : (
              <svg
                className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 dark:text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            )}
          </motion.div>

          {/* Details */}
          <motion.div
            className="flex-1 text-center sm:text-left"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
              {selectedJudge.name}
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-green-400 dark:text-green-500 font-medium mt-1 sm:mt-2">
              {selectedJudge.role}
            </p>
            <p className="text-sm sm:text-base text-gray-300 dark:text-gray-400 font-medium">
              {selectedJudge.company}
            </p>

            <p className="mt-3 sm:mt-4 text-gray-200 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
              {selectedJudge.bio}
            </p>

            {/* Social Links */}
            {(selectedJudge.social.twitter ||
              selectedJudge.social.linkedin ||
              selectedJudge.social.facebook ||
              selectedJudge.social.instagram ||
              selectedJudge.social.website) && (
              <div className="mt-4 sm:mt-6 flex justify-center sm:justify-start gap-3 sm:gap-4">
                {selectedJudge.social.twitter && (
                  <motion.a
                    href={selectedJudge.social.twitter}
                    className="text-white dark:text-gray-300 text-xl sm:text-2xl hover:text-blue-400 dark:hover:text-blue-500 transition-colors"
                    whileHover={{ y: -2 }}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter"
                  >
                    <FaTwitter />
                  </motion.a>
                )}

                {selectedJudge.social.linkedin && (
                  <motion.a
                    href={selectedJudge.social.linkedin}
                    className="text-white dark:text-gray-300 text-xl sm:text-2xl hover:text-blue-600 dark:hover:text-blue-500 transition-colors"
                    whileHover={{ y: -2 }}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin />
                  </motion.a>
                )}

                {selectedJudge.social.facebook && (
                  <motion.a
                    href={selectedJudge.social.facebook}
                    className="text-white dark:text-gray-300 text-xl sm:text-2xl hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                    whileHover={{ y: -2 }}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                  >
                    <FaFacebook />
                  </motion.a>
                )}

                {selectedJudge.social.instagram && (
                  <motion.a
                    href={selectedJudge.social.instagram}
                    className="text-white dark:text-gray-300 text-xl sm:text-2xl hover:text-pink-500 dark:hover:text-pink-400 transition-colors"
                    whileHover={{ y: -2 }}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                    <FaInstagram />
                  </motion.a>
                )}

                {selectedJudge.social.website && (
                  <motion.a
                    href={selectedJudge.social.website}
                    className="text-white dark:text-gray-300 text-xl sm:text-2xl hover:text-green-400 dark:hover:text-green-500 transition-colors"
                    whileHover={{ y: -2 }}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Website"
                  >
                    <FaGlobe />
                  </motion.a>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default JudgeModal;

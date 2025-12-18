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
  const scaleUp = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className={`fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 ${
        isModalOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isModalOpen ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="absolute inset-0 bg-black/60"
        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
        animate={{
          opacity: isModalOpen ? 1 : 0,
          backdropFilter: isModalOpen ? "blur(6px)" : "blur(0px)",
        }}
        transition={{ duration: 0.3 }}
        onClick={closeModal}
      />

      <motion.div
        className="relative  bg-green-900/95 backdrop-blur-lg rounded-3xl p-8 max-w-4xl w-full max-h-[85vh] overflow-y-auto border border-orange-500/20 shadow-2xl shadow-orange-500/10"
        initial="hidden"
        animate={isModalOpen ? "visible" : "hidden"}
        variants={scaleUp}
      >
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute cursor-pointer top-4 right-4 w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200 border border-white/10 hover:border-green-500/50"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <motion.div
          className="p-4 sm:p-6 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <motion.div
              className="mx-auto sm:mx-0 shrink-0 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden relative"
              whileHover={{ scale: 1.05 }}
            >
              {selectedJudge?.image ? (
                <Image
                  src={selectedJudge.image}
                  alt={selectedJudge.name}
                  className="absolute h-full w-full object-cover"
                  style={{
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    minWidth: "100%",
                    minHeight: "100%",
                  }}
                  width={0}
                  height={0}
                  sizes="100vw"
                  unoptimized
                />
              ) : (
                <svg
                  className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  ></path>
                </svg>
              )}
            </motion.div>

            <motion.div
              className="text-center sm:text-left"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                {selectedJudge?.name}
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-white font-medium mt-1">
                {selectedJudge?.role} at {selectedJudge?.company}
              </p>

              <p className="mt-3 sm:mt-4 text-white text-xs sm:text-sm">
                {selectedJudge?.bio}
              </p>

              <div className="mt-4 sm:mt-6 flex justify-center sm:justify-start space-x-3 sm:space-x-4">
                {selectedJudge?.social.twitter && (
                  <motion.a
                    href={selectedJudge.social.twitter}
                    className="text-white text-lg sm:text-xl hover:text-blue-400 transition-colors"
                    whileHover={{ y: -2 }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaTwitter />
                  </motion.a>
                )}

                {selectedJudge?.social.linkedin && (
                  <motion.a
                    href={selectedJudge.social.linkedin}
                    className="text-white text-lg sm:text-xl hover:text-blue-600 transition-colors"
                    whileHover={{ y: -2 }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedin />
                  </motion.a>
                )}

                {selectedJudge?.social.facebook && (
                  <motion.a
                    href={selectedJudge.social.facebook}
                    className="text-white text-lg sm:text-xl hover:text-blue-600 transition-colors"
                    whileHover={{ y: -2 }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaFacebook />
                  </motion.a>
                )}

                {selectedJudge?.social.instagram && (
                  <motion.a
                    href={selectedJudge.social.instagram}
                    className="text-white text-lg sm:text-xl hover:text-red-600 transition-colors"
                    whileHover={{ y: -2 }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram />
                  </motion.a>
                )}

                {selectedJudge?.social.website && (
                  <motion.a
                    href={selectedJudge.social.website}
                    className="text-white text-lg sm:text-xl hover:text-red-600 transition-colors"
                    whileHover={{ y: -2 }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGlobe />
                  </motion.a>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default JudgeModal;

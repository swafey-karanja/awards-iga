import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaSpotify,
  FaTelegram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const SocialMediaLinks = () => {
  const socialLinks = [
    {
      href: "https://x.com/iGASummit?t=N8kO_9qtwaBu3YeUUaBQNA&s=09",
      Icon: FaTwitter,
      label: "Twitter",
      hoverColor: "hover:text-[#1DA1F2]",
    },
    {
      href: "https://www.facebook.com/share/1Ay79xHcfi/",
      Icon: FaFacebook,
      label: "Facebook",
      hoverColor: "hover:text-[#1877F2]",
    },
    {
      href: "https://www.instagram.com/igasummit?igsh=MXF6YXdpYXRxdzBoaQ==",
      Icon: FaInstagram,
      label: "Instagram",
      hoverColor: "hover:text-[#E4405F]",
    },
    {
      href: "https://www.linkedin.com/company/igasummit/",
      Icon: FaLinkedin,
      label: "LinkedIn",
      hoverColor: "hover:text-[#0077B5]",
    },
    {
      href: "https://www.youtube.com/@iGASummit",
      Icon: FaYoutube,
      label: "YouTube",
      hoverColor: "hover:text-[#FF0033]",
    },
    {
      href: "https://open.spotify.com/show/11m2XkXyP3MmjHRgXEVgwx?si=8cb7aaae5d2a47bc",
      Icon: FaSpotify,
      label: "Spotify",
      hoverColor: "hover:text-[#1DB954]",
    },
    {
      href: "https://t.me/igamingInAfrica",
      Icon: FaTelegram,
      label: "Telegram",
      hoverColor: "hover:text-[#0088CC]",
    },
  ];

  return (
    <div className="container mx-auto py-3">
      <div className="flex items-center justify-center space-x-4 sm:space-x-6 pt-2">
        {socialLinks.map((social, index) => (
          <a
            key={index}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            className={`text-gray-300 text-xl md:text-[25px] transition-all duration-300 transform hover:scale-125 ${social.hoverColor}`}
          >
            <social.Icon />
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialMediaLinks;

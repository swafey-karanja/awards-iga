interface AwardCategory {
  id: number;
  title: string;
  description: string;
  focusAreas?: string[];
}

export const awardsCategories: AwardCategory[] = [
  {
    id: 1,
    title: "Sports Betting Operator of the Year",
    description:
      "Recognizing the (retail and/or online) operator in Africa that has delivered an exceptional sportsbetting experience over the past 12 months while focusing on product innovation, user experience, Corporate Social Responsibility, Responsible Marketing, Compliance and Responsible Gaming.",
  },
  {
    id: 2,
    title: "Sports Betting Supplier of the Year",
    description:
      "Honouring the provider that has made the most significant impact on the African sports betting industry through cutting-edge technology and innovation.",
  },
  {
    id: 3,
    title: "Casino of the Year",
    description:
      "Recognizing the land-based casino operator that has delivered an exceptional guest experience, strong commercial performance, and innovation.",
  },
  {
    id: 4,
    title: "Casino Supplier of the Year",
    description:
      "Celebrating suppliers delivering outstanding products and services to the African land-based casino sector.",
  },
  {
    id: 5,
    title: "Online Casino of the Year",
    description:
      "Honouring the operator that has delivered an exceptional online gaming experience with strong game portfolios and RG commitment.",
  },
  {
    id: 6,
    title: "Online Slot of the Year",
    description:
      "Celebrating the most outstanding slot game launched in Africa over the past 12 months.",
  },
  {
    id: 7,
    title: "Online Slot Supplier of the Year",
    description:
      "Celebrating the supplier delivering outstanding slot game products in the African region.",
  },
  {
    id: 8,
    title: "Affiliate Platform of the Year",
    description:
      "Honouring companies showcasing exceptional affiliate platform performance, innovation, and service in Africa.",
  },
  {
    id: 9,
    title: "Affiliate Program of the Year",
    description:
      "Recognizing affiliate programs demonstrating strong commitment to mutually beneficial relationships in Africa.",
  },
  {
    id: 10,
    title: "Platform Provider of the Year",
    description:
      "Celebrating suppliers empowering operators with robust, flexible, and secure gaming solutions.",
  },
  {
    id: 11,
    title: "Service Provider of the Year",
    description:
      "Honouring expert service providers across consultancy, legal, compliance, payments, marketing, and support.",
  },
  {
    id: 12,
    title: "Crash Game of the Year",
    description:
      "Celebrating the crash game that has captivated players with fast-paced, high-risk gameplay.",
  },
  {
    id: 13,
    title: "Crash Game Provider of the Year",
    description:
      "Celebrating companies delivering exceptional crash game experiences to African players.",
  },
  {
    id: 14,
    title: "Marketing Campaign of the Year",
    description:
      "Celebrating creative and responsible marketing campaigns delivering measurable success in Africa.",
  },
  {
    id: 15,
    title: "New Operation Launch of the Year",
    description:
      "Spotlighting newly launched operations that enhanced player experience and industry standards.",
  },
  {
    id: 16,
    title: "Emerging Company of the Year",
    description:
      "Recognising companies disrupting the market through innovation, growth, and bold strategy.",
  },
  {
    id: 17,
    title: "Rising Star in Responsible Gambling",
    description:
      "Honouring companies demonstrating exceptional commitment to player protection and sustainability.",
  },
  {
    id: 18,
    title: "Overall Corporate Responsibility Award",
    description:
      "Recognizing companies integrating ethical, social, and environmental stewardship into core operations.",
  },
  {
    id: 19,
    title: "CEO of the Year Award",
    description:
      "Celebrating chief executives driving growth, innovation, and excellence in African gaming.",
  },
  {
    id: 20,
    title: "IGaming AFRIKA Choice – Person of the Year (Male)",
    description:
      "Celebrating a male individual driving positive change in African iGaming.",
  },
  {
    id: 21,
    title: "IGaming AFRIKA Choice – Person of the Year (Female)",
    description:
      "Celebrating a female individual driving positive change in African iGaming.",
  },
  {
    id: 22,
    title: "IGaming AFRIKA Choice – Fairplay Star of the Year",
    description:
      "Celebrating organizations advocating for proper regulation and fair play in African iGaming.",
  },
];

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
// Speakers data without events
export const judgesList: Judge[] = [
  {
    name: "Jeremiah Maangi",
    company: "iGaming Afrika",
    bio: "Founder & CEO, iGaming Afrika",
    role: "Chief Executive Officer",
    image: "https://igamingafrika.com/wp-content/uploads/2023/05/Jere.jpg",
    social: {
      twitter: "https://x.com/jeremiahmaangi",
      linkedin: "https://www.linkedin.com/in/jeremiah-maangi-2b4a85112/",
      website: "https://igamingafrika.com/",
    },
  },
  {
    name: "Geoffrey Muindi",
    company: "Dive Marketing Ltd",
    bio: "CEO Dive Marketing ltd.",
    role: "Chief Executive Officer",
    image:
      "https://igamingafrika.com/wp-content/uploads/2023/05/Geoffrey-1.jpg",
    social: {
      twitter: "https://twitter.com/Geff_Muindi",
      linkedin: "https://www.linkedin.com/in/nixonkanali/",
      website: "https://www.divemarketing.co.ke/",
    },
  },
  {
    name: "David Ukairo",
    company: "Mondogaming SRL",
    bio: "Mondogaming SRL, Business Development Manager (Africa).",
    role: "Business Development Manager",
    image:
      "https://igamingafrika.com/wp-content/uploads/2023/05/David-Ukairo-1.jpg",
    social: {
      twitter: "https://twitter.com/DauDbet",
      linkedin: "https://www.linkedin.com/in/david-ukairo-90637125/",
    },
  },
  {
    name: "Felix Mulandi",
    company: "",
    bio: "IGaming Consultant",
    role: "IGaming Consultant",
    image:
      "https://igamingafrika.com/wp-content/uploads/2023/05/Felix-Mulandi-2.jpg",
    social: {
      twitter: "https://twitter.com/Fmulandi",
      linkedin: "https://www.linkedin.com/in/felix-mulandi-09882a111/",
    },
  },
  {
    name: "Oyindamola Michaels",
    company: "",
    bio: "iGaming Professional",
    role: "iGaming Professional",
    image:
      "https://igamingafrika.com/wp-content/uploads/2023/05/Oyindamola-Michaels-1.jpg",
    social: {
      twitter: "https://twitter.com/oyineski",
      linkedin:
        "https://www.linkedin.com/in/oyindamola-michaels-spoc-ispo-9708a09b/",
    },
  },
  {
    name: "Samuel Ogechi",
    company: "Playlogiq",
    bio: "Sales Manager, Playlogiq",
    role: "Sales Manager",
    image:
      "https://igamingafrika.com/wp-content/uploads/2023/05/Samuel-Ogechi-Moderator.jpg",
    social: {
      twitter: "https://twitter.com/sheriffking5",
      linkedin: "https://www.linkedin.com/in/ogechi-samuel-845378192/",
    },
  },
  {
    name: "Ambani Netshishivhe",
    company: "Highlight Games",
    bio: "Director of Africa, Highlight Games",
    role: "Director of Africa",
    image:
      "https://igamingafrika.com/wp-content/uploads/2023/05/Ambani-Netshishivhe-e1685461724679.jpg",
    social: {
      linkedin: "https://www.linkedin.com/in/ambani-netshishivhe-99aa619b/",
      website: "https://highlight-games.com/",
    },
  },
  {
    name: "Edwin Tarus",
    company: "Tabro Solutions",
    bio: "Lead Consultant, Tabro Solutions.",
    role: "Lead Consultant",
    image:
      "https://igamingafrika.com/wp-content/uploads/2023/05/Edwin-Tarus.jpg",
    social: {
      linkedin: "https://www.linkedin.com/in/edwin-tarus-pmp-14b37b121/",
    },
  },
];

interface FAQItem {
  question: string;
  answer: string;
}
export const faqs: FAQItem[] = [
  {
    question: "What is iGaming AFRIKA Summit?",
    answer:
      "iGaming AFRIKA Summit is Africa's mega gaming event, designed to unite the entire gaming industry players across the world in the stunning city of Nairobi, Kenya in May 2026. This being the inaugural edition of the summit, the event is set to be the largest event in the gaming industry in Africa.",
  },
  {
    question: "What are the scheduled days for the event?",
    answer: "The iGaming AFRIKA Summit will be held from 4th to 6th May, 2026.",
  },
  {
    question: "Where will the iGaming AFRIKA Summit 2026 be held?",
    answer:
      "The summit is taking place in an impressive 3,300 square meter location at Sarit Expo Centre - Nairobi's largest expo centre giving exhibitors and attendees a massive ground to showcase their products, meet and connect with industry players.",
  },
  {
    question: "How do I get access to the iGaming AFRIKA Summit?",
    answer:
      "You can access the IGA Summit website throught: https://summits.igamingafrika.com/ and https://www.igasummit.com/ once registration opens. You can sign up for our newsletter to receive updates about the summit.",
  },
  {
    question: "What is the ticket policy if the event can’t go ahead?",
    answer:
      "If the physical event cannot proceed for any reason, all ticket holders will have the option to transfer their ticket to a future event or receive a full refund in accordance with our ticketing terms and conditions.",
  },
  {
    question: "Can i transfer my ticket if i can no longer attend?",
    answer:
      "Yes, if you are unable to attend, you may transfer your ticket to a substitute delegate at no additional cost. All substitution requests must be submitted via email through events@igamingafrika.com at least 48 hours before the event, including the names, job titles, and contact emails for both the registered and replacement delegates.",
  },
  {
    question: "Will i have access to online delegates?",
    answer: "No. We will not have online delegates.",
  },
];

export const companyTypes = [
  { value: "Affiliate", label: "Affiliate" },
  { value: "Agency", label: "Agency" },
  { value: "Broker", label: "Broker" },
  { value: "Game-provider", label: "Game Provider" },
  { value: "Media", label: "Media" },
  { value: "Investor", label: "Investor" },
  { value: "Legal", label: "Legal" },
  { value: "non-gaming Supplier", label: "Non-gaming Supplier" },
  { value: "Operator", label: "Operator" },
  { value: "Regulator", label: "Regulator" },
  { value: "Start-up", label: "Start Up" },
  { value: "Supplier", label: "Supplier" },
  { value: "Financial Institution", label: "Financial Institution" },
  { value: "Payments", label: "Payments" },
  { value: "Nonprofit", label: "Non Profit" },
  { value: "Other", label: "Other" },
];

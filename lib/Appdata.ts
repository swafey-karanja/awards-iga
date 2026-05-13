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

export const awardWinners = [
  {
    category_id: "23",
    category_title: "Advertising Network of the Year",
    winner: "Kadam",
    img: "/awards/kadam.png",
  },
  {
    category_id: "8",
    category_title: "Affiliate Platform of the Year",
    winner: "Affilka by SOFTSWISS",
    img: "/awards/affilka_by_softswiss.png",
  },
  {
    category_id: "9",
    category_title: "Affiliate Program of the Year",
    winner: "22Bet Partners",
    img: "/awards/22bet_partners.png",
  },
  {
    category_id: "19",
    category_title: "CEO of the Year Award",
    winner: "Mutua Mutava, Betika",
    img: "",
  },
  {
    category_id: "4",
    category_title: "Casino Supplier of the Year",
    winner: "EGT Digital",
    img: "/awards/EGT_digital.png",
  },
  {
    category_id: "3",
    category_title: "Casino of the Year",
    winner: "Sun City Casino, South Africa",
    img: "/awards/sun_city_casino.png",
  },
  {
    category_id: "13",
    category_title: "Crash Game Provider of the Year",
    winner: "Split The Pot",
    img: "/awards/split_the_pot.png",
  },
  {
    category_id: "12",
    category_title: "Crash Game of the Year",
    winner: "JetX by SmartSoft",
    img: "/awards/jetx_by_smartsoft.webp",
  },
  {
    category_id: "16",
    category_title: "Emerging Provider of the Year",
    winner: "TaDa Gaming",
    img: "/awards/tada_gaming.png",
  },
  {
    category_id: "22",
    category_title: "iGaming AFRIKA Choice – Fairplay Organization of the Year",
    winner: "Association of Nigerian Bookmakers (ANB)",
    img: "/awards/ANB.png",
  },
  {
    category_id: "21",
    category_title: "iGaming AFRIKA Choice – Person of the Year (Female)",
    winner: "Lois Bright, Founder, Women in Gaming Africa",
    img: "",
  },
  {
    category_id: "20",
    category_title: "iGaming AFRIKA Choice – Person of the Year (Male)",
    winner: "John Mutua, CEO, Association of Gaming Operators Kenya (AGOK)",
    img: "",
  },
  {
    category_id: "14",
    category_title: "Marketing Campaign of the Year",
    winner: "Play with Champions by SportyBet",
    img: "/awards/sportybet.png",
  },
  {
    category_id: "15",
    category_title: "New Operation Launch of the Year",
    winner: "ChopWin",
    img: "/awards/chopwin.png",
  },
  {
    category_id: "5",
    category_title: "Online Casino of the Year",
    winner: "Mozzart Casino",
    img: "/awards/mozzartbet.png",
  },
  {
    category_id: "6",
    category_title: "Online Slot of the Year",
    winner: "Wild Hot 40 by FAZI",
    img: "/awards/wild_hot_40_FAZI.webp",
  },
  {
    category_id: "7",
    category_title: "Online Slot Supplier of the Year",
    winner: "Amusnet",
    img: "/awards/amusnet.png",
  },
  {
    category_id: "18",
    category_title: "Overall Corporate Social Responsibility Award",
    winner: "SportPesa",
    img: "/awards/sportpesa.png",
  },
  {
    category_id: "24",
    category_title: "Payment Service Provider of the Year",
    winner: "Flexifai",
    img: "/awards/flexifai.png",
  },
  {
    category_id: "10",
    category_title: "Platform Provider of the Year",
    winner: "BetConstruct",
    img: "/awards/betconstruct.png",
  },
  {
    category_id: "25",
    category_title: "Retail Provider of the Year",
    winner: "Stellar Bets",
    img: "/awards/stellarbets.png",
  },
  {
    category_id: "17",
    category_title: "Rising Star in Responsible Gambling",
    winner:
      "Denis Mudene, CEO, National Lotteries and Gaming Regulatory Board (NLGRB)",
    img: "",
  },
  {
    category_id: "11",
    category_title: "Service Provider of the Year",
    winner: "Sumsub",
    img: "/awards/sumsub.png",
  },
  {
    category_id: "1",
    category_title: "Sports Betting Operator of the Year",
    winner: "Betway Africa",
    img: "/awards/betway.png",
  },
  {
    category_id: "2",
    category_title: "Sports Betting Supplier of the Year",
    winner: "OddsMatrix by EveryMatrix",
    img: "/awards/oddsmatrix_by_everymatrix.png",
  },
];

export type EventDetail = {
  label: string;
  value: string;
  note?: string;
};

export type LinkItem = {
  label: string;
  href: string;
};

export type AboutHighlight = {
  title: string;
  description: string;
};

export type AudienceGroup = {
  title: string;
  description: string;
};

export type AgendaSession = {
  title: string;
  location: string;
  speaker?: string;
  speakerSlug?: string;
};

export type AgendaItem = {
  time: string;
  title: string;
  location?: string;
  sponsor?: string;
  description?: string;
  sessions?: AgendaSession[];
};

export type FeaturedActivity = {
  title: string;
  description: string;
};

export type Speaker = {
  slug: string;
  name: string;
  sessionId: string;
  talkTitle: string;
  room: string;
  length: string;
  timeSlot?: string;
  isKeynote?: boolean;
  isAlternate?: boolean;
  photo?: string;
  bio: string;
  summary: string;
};

export type SponsorTier = {
  name: string;
  price: string;
  benefits: string[];
};

export type Sponsor = {
  name: string;
  logo?: string;
  url?: string;
};

export type ArchiveEvent = {
  year: string;
  edition: string;
  summary: string;
  href?: string;
  comingSoon?: boolean;
};

export const conference = {
  name: "BSides RGV",
  hashtag: "#bsidesrgv",
  year: "2026",
  edition: "7th Annual BSides RGV Cybersecurity Conference",
  tagline: "Cybersecurity. Community. South Texas.",
  alternateTagline: "Community-driven. Volunteer-run. For the security community.",
  date: "Saturday, June 27, 2026",
  mainConferenceTime: "9:00 AM – 4:00 PM CDT",
  receptionTime: "5:00 PM – 8:00 PM",
  venue: "Mission Event Center",
  address: "200 North Shary Road, Mission, Texas 78572",
  city: "Mission, Texas",
  registrationUrl:
    "https://www.eventbrite.com/e/bsides-rgv-2026-registration-1984184917501",
  cfpUrl: "https://link.bsidesrgv.com/cfp",
  contactEmail: "BSidesRGV@gmail.com",
  twitterUrl: "https://twitter.com/bsidesrgv",
  twitterHandle: "@BSidesRGV",
  sponsorKitUrl: "/resources/bsides-rgv-2026-sponsorship-kit.pdf",
} as const;

export const primaryLinks: LinkItem[] = [
  {
    label: "Register",
    href: conference.registrationUrl,
  },
  {
    label: "Submit a Talk",
    href: conference.cfpUrl,
  },
  {
    label: "Sponsor BSides RGV",
    href: conference.sponsorKitUrl,
  },
];

export const eventDetails: EventDetail[] = [
  {
    label: "Date",
    value: conference.date,
  },
  {
    label: "Main Conference",
    value: conference.mainConferenceTime,
  },
  {
    label: "Venue",
    value: conference.venue,
  },
  {
    label: "Address",
    value: conference.address,
  },
  {
    label: "Reception",
    value: conference.receptionTime,
    note: "Meet-up reception after the main conference.",
  },
  {
    label: "Contact",
    value: conference.contactEmail,
  },
];

export const aboutHighlights: AboutHighlight[] = [
  {
    title: "Community-driven",
    description:
      "Organized by information security and information technology professionals from public and private sector organizations throughout the Rio Grande Valley.",
  },
  {
    title: "Built for collaboration",
    description:
      "BSides creates an intimate atmosphere where people can present, participate, ask questions, and build trusted relationships with peers.",
  },
  {
    title: "Local talent, real conversations",
    description:
      "The event encourages the local cybersecurity community to attend, submit talks, and share knowledge with the people building security in the region.",
  },
];

export const audienceGroups: AudienceGroup[] = [
  {
    title: "Students and new presenters",
    description:
      "Explore cybersecurity, meet local professionals, and use lightning talks as a lower-pressure way to share what you are learning.",
  },
  {
    title: "IT and security professionals",
    description:
      "Connect with defenders, administrators, analysts, and practitioners working through real infrastructure and security challenges.",
  },
  {
    title: "Developers and builders",
    description:
      "Learn how security thinking applies to software, hardware, web applications, cloud systems, and product engineering.",
  },
  {
    title: "Public and private sector teams",
    description:
      "Build relationships across organizations serving the Rio Grande Valley and strengthen the regional security ecosystem.",
  },
  {
    title: "Sponsors and community partners",
    description:
      "Support a free community event while engaging an active audience of students, practitioners, leaders, and technical talent.",
  },
  {
    title: "Curious community members",
    description:
      "BSides is designed to expand the conversation and make security knowledge more accessible, regardless of background or experience level.",
  },
];

export const featuredActivities: FeaturedActivity[] = [
  {
    title: "Lock Picking Village",
    description:
      "Hands-on physical security learning in the classic BSides village format.",
  },
  {
    title: "RGV Ham Radio Club",
    description:
      "Community radio knowledge and demonstrations from local amateur radio operators.",
  },
];

export const callForPresentations = {
  status: "Now open",
  deadline: "Sunday, May 31, 2026",
  url: conference.cfpUrl,
  details: [
    "Presentation time slots are 30–60 minutes including Q&A.",
    "15-minute lightning talks are permitted to encourage new presenters.",
    "Topics should be within the scope of information security.",
    "Marketing or sales-pitch presentations will be rejected.",
    "Approved submissions will receive a follow-up confirmation email.",
  ],
};

export const volunteerInfo = {
  status: "Closed",
  details: [
    "Volunteer selections will be communicated by email.",
    "Selected volunteers receive a free volunteer t-shirt.",
    "The organizer goal is to staff enough volunteers so helpers can still attend some breakout sessions.",
  ],
};

// The confirmed 2026 speaker lineup (from the organizer schedule).
// Photos and bios are still being collected — placeholders here are filled in
// per speaker as their materials arrive.
export const speakers: Speaker[] = [
  {
    slug: "dirce-e-hernandez",
    name: "Dirce E. Hernandez",
    sessionId: "A1",
    talkTitle:
      "From Texas to RSAC — Community Leadership through Cyber and AI Governance",
    room: "Tangerine",
    length: "45 Minutes",
    timeSlot: "10:00 AM – 10:45 AM",
    bio: "Bio coming soon.",
    summary: "Talk summary coming soon.",
  },
  {
    slug: "steven-ordaz",
    name: "Steven Ordaz",
    sessionId: "A2",
    talkTitle:
      "Building the Bridge to Cybersecurity: A Beginner's Roadmap from IT to Security",
    room: "Lemon",
    length: "30 Minutes",
    timeSlot: "10:00 AM – 10:45 AM",
    bio: "Bio coming soon.",
    summary: "Talk summary coming soon.",
  },
  {
    slug: "damian-villarreal",
    name: "Damian Villarreal",
    sessionId: "A3",
    talkTitle:
      "Smarter SecOps: Leveraging Private, Federated Transfer Learning",
    room: "Key Lime",
    length: "60 Minutes",
    timeSlot: "10:00 AM – 10:45 AM",
    bio: "Bio coming soon.",
    summary: "Talk summary coming soon.",
  },
  {
    slug: "eduardo-robles",
    name: "Eduardo Robles",
    sessionId: "B1",
    talkTitle:
      "Safe by Design: Building Secure AI Agents for Government & Education (Live Demo)",
    room: "Tangerine",
    length: "45 Minutes",
    timeSlot: "11:00 AM – 11:45 AM",
    bio: "Bio coming soon.",
    summary: "Talk summary coming soon.",
  },
  {
    slug: "jaime-luis-cortez",
    name: "Jaime Luis Cortez",
    sessionId: "B2",
    talkTitle: "The Quest for Certification: A Journey Worth Taking",
    room: "Lemon",
    length: "45 Minutes",
    timeSlot: "11:00 AM – 11:45 AM",
    bio: "Bio coming soon.",
    summary: "Talk summary coming soon.",
  },
  {
    slug: "jacob-villarreal",
    name: "Jacob Villarreal",
    sessionId: "B3",
    talkTitle: "Social Engineering Isn't One Call. It's a Campaign.",
    room: "Key Lime",
    length: "45 Minutes",
    timeSlot: "11:00 AM – 11:45 AM",
    bio: "Bio coming soon.",
    summary: "Talk summary coming soon.",
  },
  {
    slug: "brian-lowe",
    name: "Brian Lowe",
    sessionId: "C1",
    talkTitle:
      "Yet Another AI Talk — The Good, The Bad, The Ugly: AI for Pentesters",
    room: "Tangerine",
    length: "45 Minutes",
    timeSlot: "1:15 PM – 2:00 PM",
    bio: "Bio coming soon.",
    summary: "Talk summary coming soon.",
  },
  {
    slug: "nicholas-hinojosa",
    name: "Nicholas Hinojosa",
    sessionId: "C2",
    talkTitle: "South Texas College: Cybersecurity Clinic",
    room: "Lemon",
    length: "30 Minutes",
    timeSlot: "1:15 PM – 2:00 PM",
    bio: "Bio coming soon.",
    summary: "Talk summary coming soon.",
  },
  {
    slug: "alex-mayorga-adame",
    name: "Alex Mayorga Adame",
    sessionId: "C3",
    talkTitle: "Why PQC Readiness is an “Ecosystem” Priority",
    room: "Key Lime",
    length: "30 Minutes",
    timeSlot: "1:15 PM – 2:00 PM",
    bio: "Bio coming soon.",
    summary: "Talk summary coming soon.",
  },
  {
    slug: "james-francis-love",
    name: "James Francis-Love",
    sessionId: "D1",
    talkTitle:
      "From Phish to Blocklist: Real-Time IOC Extraction with Any.Run",
    room: "Tangerine",
    length: "60 Minutes",
    timeSlot: "2:15 PM – 3:00 PM",
    bio: "Bio coming soon.",
    summary: "Talk summary coming soon.",
  },
  {
    slug: "ignacio-gutierrez",
    name: "Ignacio Gutierrez",
    sessionId: "D2",
    talkTitle: "GSM Exploit",
    room: "Lemon",
    length: "30 Minutes",
    timeSlot: "2:15 PM – 3:00 PM",
    bio: "Bio coming soon.",
    summary: "Talk summary coming soon.",
  },
  {
    slug: "eric-rodriguez",
    name: "Eric Rodriguez",
    sessionId: "D3",
    talkTitle:
      "Journey from Vulnerability Management to Attack Surface Management",
    room: "Key Lime",
    length: "60 Minutes",
    timeSlot: "2:15 PM – 3:00 PM",
    bio: "Bio coming soon.",
    summary: "Talk summary coming soon.",
  },
  {
    slug: "cooper",
    name: "Cooper",
    sessionId: "E1",
    talkTitle: "Keynote",
    room: "Main Area",
    length: "45 Minutes",
    timeSlot: "3:15 PM – 4:15 PM",
    isKeynote: true,
    bio: "Bio coming soon.",
    summary: "Keynote details coming soon.",
  },
  {
    slug: "caleb-garza",
    name: "Caleb Garza",
    sessionId: "ALT",
    talkTitle:
      "From IT Technician to Cybersecurity Analyst: Breaking Into the Security Field",
    room: "Alternate",
    length: "45 Minutes",
    isAlternate: true,
    bio: "Bio coming soon.",
    summary: "Talk summary coming soon.",
  },
];

export const agendaItems: AgendaItem[] = [
  {
    time: "09:00 AM – 09:45 AM",
    title: "Registration",
    location: "Main Area",
    sponsor: "SHI",
  },
  {
    time: "09:45 AM – 10:00 AM",
    title: "Welcome",
    location: "Main Area",
  },
  {
    time: "10:00 AM – 10:45 AM",
    title: "Breakout Sessions",
    sessions: [
      {
        title: "From Texas to RSAC — Cyber and AI Governance",
        location: "Tangerine",
        speaker: "Dirce E. Hernandez",
        speakerSlug: "dirce-e-hernandez",
      },
      {
        title: "Building the Bridge to Cybersecurity",
        location: "Lemon",
        speaker: "Steven Ordaz",
        speakerSlug: "steven-ordaz",
      },
      {
        title: "Smarter SecOps: Federated Transfer Learning",
        location: "Key Lime",
        speaker: "Damian Villarreal",
        speakerSlug: "damian-villarreal",
      },
    ],
  },
  {
    time: "10:45 AM – 11:00 AM",
    title: "Break",
    location: "Main Area",
  },
  {
    time: "11:00 AM – 11:45 AM",
    title: "Breakout Sessions",
    sessions: [
      {
        title: "Safe by Design: Secure AI Agents (Live Demo)",
        location: "Tangerine",
        speaker: "Eduardo Robles",
        speakerSlug: "eduardo-robles",
      },
      {
        title: "The Quest for Certification",
        location: "Lemon",
        speaker: "Jaime Luis Cortez",
        speakerSlug: "jaime-luis-cortez",
      },
      {
        title: "Social Engineering Isn't One Call. It's a Campaign.",
        location: "Key Lime",
        speaker: "Jacob Villarreal",
        speakerSlug: "jacob-villarreal",
      },
    ],
  },
  {
    time: "11:45 AM – 01:15 PM",
    title: "Lunch",
    location: "Main Area",
    sponsor: "CISCO",
  },
  {
    time: "01:15 PM – 02:00 PM",
    title: "Breakout Sessions",
    sessions: [
      {
        title: "AI for Pentesters: The Good, The Bad, The Ugly",
        location: "Tangerine",
        speaker: "Brian Lowe",
        speakerSlug: "brian-lowe",
      },
      {
        title: "South Texas College: Cybersecurity Clinic",
        location: "Lemon",
        speaker: "Nicholas Hinojosa",
        speakerSlug: "nicholas-hinojosa",
      },
      {
        title: "Why PQC Readiness is an Ecosystem Priority",
        location: "Key Lime",
        speaker: "Alex Mayorga Adame",
        speakerSlug: "alex-mayorga-adame",
      },
    ],
  },
  {
    time: "02:00 PM – 02:15 PM",
    title: "Break",
    location: "Main Area",
  },
  {
    time: "02:15 PM – 03:00 PM",
    title: "Breakout Sessions",
    sessions: [
      {
        title: "From Phish to Blocklist: Real-Time IOC Extraction",
        location: "Tangerine",
        speaker: "James Francis-Love",
        speakerSlug: "james-francis-love",
      },
      {
        title: "GSM Exploit",
        location: "Lemon",
        speaker: "Ignacio Gutierrez",
        speakerSlug: "ignacio-gutierrez",
      },
      {
        title: "Vulnerability Management to Attack Surface Management",
        location: "Key Lime",
        speaker: "Eric Rodriguez",
        speakerSlug: "eric-rodriguez",
      },
    ],
  },
  {
    time: "03:00 PM – 03:15 PM",
    title: "Break",
    location: "Main Area",
    sponsor: "SHI",
    description: "Refreshments from PJ's Coffee.",
  },
  {
    time: "03:15 PM – 04:15 PM",
    title: "Keynote Presentation",
    location: "Main Area",
    description: "Keynote by Cooper.",
  },
  {
    time: "04:15 PM – 04:30 PM",
    title: "Door Prize Giveaway",
    sponsor: "Communications Etc.",
  },
  {
    time: "05:00 PM – 08:00 PM",
    title: "Meet-Up Reception",
    sponsor: "NetSync",
  },
];

// Confirmed conference sponsors.
export const sponsors: Sponsor[] = [
  {
    name: "Arctic Wolf",
    logo: "/sponsors/arctic-wolf.png",
    url: "https://arcticwolf.com/",
  },
  {
    name: "Cisco",
    logo: "/sponsors/cisco.svg",
    url: "https://www.cisco.com/",
  },
  {
    name: "Fortinet",
    logo: "/sponsors/fortinet.svg",
    url: "https://www.fortinet.com/",
  },
  {
    name: "Sequel Data",
    logo: "/sponsors/sequel-data.png",
    url: "https://www.sequeldata.com/",
  },
  {
    name: "SentinelOne",
    logo: "/sponsors/sentinelone.svg",
    url: "https://www.sentinelone.com/",
  },
  {
    name: "CrowdStrike",
    logo: "/sponsors/crowdstrike.svg",
    url: "https://www.crowdstrike.com/",
  },
  {
    name: "Computer ETC",
  },
];

export const sponsorTiers: SponsorTier[] = [
  {
    name: "Bronze",
    price: "$600+ or in-kind",
    benefits: ["Logo on signage around the event"],
  },
  {
    name: "Silver",
    price: "$800+ or in-kind",
    benefits: [
      "Logo on signage around the event",
      "Announcements during the event and on materials",
      "Booth",
    ],
  },
  {
    name: "Gold",
    price: "$1200+ or in-kind",
    benefits: [
      "Logo on signage around the event",
      "Announcements during the event and on materials",
      "Mention on social media coverage",
      "Prime booth",
      "Banner placement with maximum visibility when provided by sponsor",
    ],
  },
];

export const sponsorReasons: string[] = [
  "Support a free community cybersecurity event in the Rio Grande Valley.",
  "Connect with students, security professionals, IT teams, and industry leaders.",
  "Give back to the local security community while building trusted relationships.",
  "Custom sponsorships may include physical space, food and beverage, contests, giveaways, media support, PR, or other in-kind contributions.",
];


export const navItems: LinkItem[] = [
  { label: "Details", href: "/#details" },
  { label: "CFP", href: "/#cfp" },
  { label: "Agenda", href: "/#agenda" },
  { label: "Speakers", href: "/#speakers" },
  { label: "Activities", href: "/#activities" },
  { label: "Sponsors", href: "/#sponsors" },
  { label: "Venue", href: "/#venue" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Conduct", href: "/#conduct" },
];

export const venueInfo = {
  mapUrl: "https://maps.app.goo.gl/viYJiDxwBFiPNvxVA",
  embedUrl:
    "https://www.google.com/maps?q=Mission+Event+Center+200+North+Shary+Road+Mission+TX+78572&output=embed",
  wifi: "Guest WiFi login information will be provided the day of the event.",
  accommodations:
    "Contact the organizers if additional accommodations are required.",
  parking: "Free on-site parking is available around the Mission Event Center.",
  floorLayout:
    "The stage area will be completely open, while vendor booths and hands-on stations will be partitioned for focused conversations.",
} as const;

export const resourceLinks: LinkItem[] = [
  { label: "Register on Eventbrite", href: conference.registrationUrl },
  { label: "Submit a Presentation", href: conference.cfpUrl },
  { label: "Download Sponsorship Kit", href: conference.sponsorKitUrl },
  { label: "Email Organizers", href: `mailto:${conference.contactEmail}` },
  { label: "Follow @BSidesRGV", href: conference.twitterUrl },
];

// Past editions — scaffolded so future galleries and recaps can deep-link here.
export const archiveEvents: ArchiveEvent[] = [
  {
    year: "2026",
    edition: "7th Annual BSides RGV",
    summary:
      "Mission Event Center, Mission, Texas. Gallery will be posted after the event.",
    comingSoon: true,
  },
  {
    year: "2025",
    edition: "6th Annual BSides RGV",
    summary: "Photos and recap from the 2025 edition will be archived here.",
    comingSoon: true,
  },
  {
    year: "2024",
    edition: "5th Annual BSides RGV",
    summary: "Photos and recap from the 2024 edition will be archived here.",
    comingSoon: true,
  },
];

export const codeOfConduct = {
  pledge:
    "BSides RGV is dedicated to providing a harassment-free conference experience for everyone, regardless of gender, gender identity and expression, age, sexual orientation, disability, physical appearance, body size, race, ethnicity, religion or lack thereof, or technology choices.",
  expected: [
    "Be respectful and considerate in your speech and actions.",
    "Attempt collaboration before conflict.",
    "Refrain from demeaning, discriminatory, or harassing behavior and speech.",
    "Be mindful of your surroundings and of your fellow participants.",
    "Alert conference organizers if you notice a dangerous situation, someone in distress, or a Code of Conduct violation.",
  ],
};

export const talkTopicExamples: string[] = [
  "Offensive security",
  "Defense and detection",
  "Incident response",
  "Application security",
  "Cloud security",
  "Hardware hacking",
  "AI/ML security",
  "Career development",
  "Privacy and policy",
];

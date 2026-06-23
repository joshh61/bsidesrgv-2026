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
  /** Optional outbound link (e.g. an external event or registration page). */
  href?: string;
  /** Label for the link CTA; falls back to a generic call to action. */
  linkLabel?: string;
  /** When true, show the "Powered by Hack The Box" lockup with this activity. */
  poweredByHtb?: boolean;
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
  mainConferenceTime: "9:00 AM – 4:30 PM CDT",
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
    title: "Capture the Flag (CTF)",
    description:
      "A single-player Capture the Flag competition hosted on the Hack The Box CTF platform. The password to join will be shared at the start of the event.",
    href: "https://ctf.hackthebox.com/event/details/bsides-rgv-3451",
    linkLabel: "View the CTF event",
    poweredByHtb: true,
  },
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

// The confirmed 2026 speaker lineup, ordered by schedule slot. Bios and
// headshots come from the organizer's "Bio and Headshots" sheet; speakers
// without a photo yet fall back to a styled initials card automatically.
export const speakers: Speaker[] = [
  {
    slug: "dirce-e-hernandez",
    name: "Dirce E. Hernandez",
    sessionId: "A1",
    talkTitle:
      "From Texas to RSAC: Community Leadership through Cyber and AI Governance",
    room: "Tangerine",
    length: "45 Minutes",
    timeSlot: "10:00 AM – 10:45 AM",
    photo: "/speakers/dirce-e-hernandez.jpg",
    bio: "Dirce E. Hernandez is a Senior Cybersecurity GRC leader in the FinTech and financial services sector, with 18 years of experience spanning Texas state government, higher education, healthcare, and financial services. Her expertise covers cyber threat risk management, cybersecurity IT audit, and security research. She holds a master's in Information Security and Information Assurance Management and certifications including C|CISO, CISA, CISM, CRISC, CPDSE, and CSX. She teaches organizational leadership, cybersecurity, and IT courses at several colleges and universities, contributed to the CCSK v5 certification exam, and served on the San Antonio ISACA leadership board. Her work has been quoted in Bloomberg News and the San Antonio Business Journal.",
    summary:
      "How threat intelligence and AI governance translate into real decisions for GRC leaders and CTI operators, drawn from a path that runs from Texas to the RSA Conference stage.",
  },
  {
    slug: "steven-ordaz",
    name: "Steven Ordaz",
    sessionId: "A2",
    talkTitle:
      "Building the Bridge to Cybersecurity: A Beginner's Roadmap from IT to Security",
    room: "Lemon",
    length: "45 Minutes",
    timeSlot: "10:00 AM – 10:45 AM",
    bio: "Originally from the Rio Grande Valley, Steven Ordaz is a Cybersecurity Operations Analyst II at The University of Texas at San Antonio, where he supports security monitoring, incident response, operational process improvements, and the college internship program. He brings more than 20 years of experience in information technology, spanning customer support, IT services, systems administration, and, most recently, cybersecurity. He holds a BBA in Information Systems and an MS in Information Technology from UTSA, plus an MS in Computer Networking from Wichita State University, along with certifications from Microsoft, Apple, CompTIA, and ISC2. He is recognized for his commitment to service excellence, operational rigor, community service, and mentoring.",
    summary:
      "A practical roadmap for breaking into security from an IT background: what to focus on, what to skip, and how to build confidence quickly. Aimed at beginners and career changers.",
  },
  {
    slug: "damian-villarreal",
    name: "Damian Villarreal",
    sessionId: "A3",
    talkTitle:
      "Smarter SecOps: Leveraging Private, Federated Transfer Learning",
    room: "Key Lime",
    length: "45 Minutes",
    timeSlot: "10:00 AM – 10:45 AM",
    photo: "/speakers/damian-villarreal.jpg",
    bio: "Damian Villarreal is an RSOC Student Analyst III and a Master of Science in Computer Science candidate at UTRGV.",
    summary:
      "A research look at federated transfer learning: training domain-specific LLMs on private threat data without ever sharing the data itself, and what that unlocks for security operations.",
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
    photo: "/speakers/eduardo-robles.jpg",
    bio: "Eduardo Robles is a Cybersecurity Analyst IV for the County of Hidalgo IT department. A Linux nerd interested in information security, open source, tacos, and coffee. Emacs is his way of life and Screen is his serial console of choice. You'll probably catch him burning music to his Sony MiniDisc or living in Emacs for infosec work.",
    summary:
      "Building and deploying AI agents with real safety guardrails for the public sector and education, shown through a live, hands-on demo focused on responsible implementation.",
  },
  {
    slug: "james-francis-love",
    name: "James Francis-Love",
    sessionId: "B2",
    talkTitle:
      "From Phish to Blocklist: Real-Time IOC Extraction with Any.Run",
    room: "Lemon",
    length: "45 Minutes",
    timeSlot: "11:00 AM – 11:45 AM",
    photo: "/speakers/james-francis-love.jpg",
    bio: "A security veteran with 30+ years of experience, James has evolved from executive protection for global leaders to managing critical infrastructure for a major Texas county. Leading a six-person cyber team, he specializes in bridging the gap between physical risk and digital defense. Known for an insightful, engaging style, he teaches organizations how to move past outdated threat feeds and implement real-time, actionable defense using modern sandboxing tools.",
    summary:
      "A live blue-team workflow that runs from a phishing email to sandbox detonation to IOC extraction and immediate blocking. Real-world defensive operations aimed at analysts.",
  },
  {
    slug: "jacob-villarreal",
    name: "Jacob Villarreal",
    sessionId: "B3",
    talkTitle: "Social Engineering Isn't One Call. It's a Campaign.",
    room: "Key Lime",
    length: "45 Minutes",
    timeSlot: "11:00 AM – 11:45 AM",
    photo: "/speakers/jacob-villarreal.jpg",
    bio: "Jacob graduated from South Texas College in 2012 and is currently a Red Teamer at PayPal. He has seven years of IT experience, the last four in offensive security, and has planned and executed real-world offensive engagements to help organizations strengthen their environments. He competed in the DEF CON 32 vishing competition and enjoys volunteering in the cyber community.",
    summary:
      "A red team operator's view of social engineering as a full campaign, not a single call: OSINT profiling, vishing architecture, and the broader offensive lifecycle.",
  },
  {
    slug: "brian-lowe",
    name: "Brian Lowe",
    sessionId: "C1",
    talkTitle:
      "Yet Another AI Talk. The Good, The Bad, The Ugly: AI for Pentesters",
    room: "Tangerine",
    length: "45 Minutes",
    timeSlot: "1:15 PM – 2:00 PM",
    photo: "/speakers/brian-lowe.jpg",
    bio: "Brian Lowe is the Team Lead for Penetration Testing at KirkpatrickPrice, where he runs external, internal, web application, cloud, and red team assessments across regulated industries. Before moving into offensive security he served 23 years in the U.S. Air Force, retiring as a Senior Master Sergeant (E-8), with deployments to Iraq, Afghanistan, the UAE, Kuwait, Saudi Arabia, and Turkey and collaborative work alongside the FBI, U.S. Secret Service, State Department, and Department of Energy. He holds CRTO, GWAPT, PNPT, eCPPTv2, GCIH, and CEH, and is credited with CVE-2025-55817, CVE-2021-40492, and CVE-2021-40353. Outside work, Brian is a Brazilian Jiu-Jitsu black belt under Gustavo Machado, a father of six, and a PopPop of four. His kids think hacking is cool, which is honestly reason enough.",
    summary:
      "A practicing pentester's honest take on AI as a tool of the trade: where it genuinely helps, where it falls down, and the failure stories most talks leave out.",
  },
  {
    slug: "nicholas-hinojosa",
    name: "Nicholas Hinojosa",
    sessionId: "C2",
    talkTitle: "South Texas College: Cybersecurity Clinic",
    room: "Lemon",
    length: "45 Minutes",
    timeSlot: "1:15 PM – 2:00 PM",
    photo: "/speakers/nicholas-hinojosa.jpg",
    bio: "Nicholas Hinojosa is an Assistant Professor in the South Texas College Computer Science Department. He holds an Associate of Science in Mathematics, a Bachelor of Applied Technology in Computer and Information Technologies, and a Master of Science in IT, along with certifications from Oracle, Cisco, CompTIA, the SANS Institute, and Amazon Web Services.",
    summary:
      "An inside look at STC's NSF-funded cybersecurity clinic serving under-resourced organizations across the RGV, and the community impact it creates.",
  },
  {
    slug: "eric-rodriguez",
    name: "Eric Rodriguez",
    sessionId: "C3",
    talkTitle:
      "Journey from Vulnerability Management to Attack Surface Management",
    room: "Key Lime",
    length: "45 Minutes",
    timeSlot: "1:15 PM – 2:00 PM",
    photo: "/speakers/eric-rodriguez.jpg",
    bio: "Eric has spent over 25 years addressing technology challenges for banking, SLED, and retail environments. He has managed data centers, led application development projects, and deployed financial services, always with proper cybersecurity principles at the forefront. That focus led him to flip to the \"dark side\" and pursue roles helping organizations across the state strengthen their technology infrastructure and apply cybersecurity standards.",
    summary:
      "How to evolve from chasing individual vulnerabilities to understanding and reducing your whole attack surface, told through 25+ years across banking, government, and retail.",
  },
  {
    slug: "watson-brown",
    name: "Watson Brown & Kenneth Castillo",
    sessionId: "D1",
    talkTitle: "Today's Hard-Hitting Threats and How to Detect Them",
    room: "Tangerine",
    length: "45 Minutes",
    timeSlot: "2:15 PM – 3:00 PM",
    bio: "Watson Brown is a Senior Security Analyst and Senior Threat Hunter at Recon InfoSec, where he has worked for nearly seven years. His background spans 16 years in IT, with a focus on network and endpoint security, penetration testing, digital forensics, and malware reversal. He also serves as a Cyber Operations Analyst with the Army National Guard and previously worked as a SOC Engineer with U.S. Army Cyber Command, authoring custom intrusion detection rules for network traffic analysis. He co-presents with Kenneth Castillo, a Security Analyst at Recon InfoSec who triages and investigates alerts and takes part in threat hunts and incident response. Kenneth brings over eight years of experience in IT, cybersecurity, and network administration; before Recon InfoSec he was Director of IT at Inspiracom, overseeing security strategy across 23 locations and building a full SIEM stack (Wazuh, Graylog, Fluent Bit, Grafana, and Sysmon).",
    summary:
      "Detection engineering with Texas in the crosshairs: SIGMA and YARA rules for ClickFix and TamperedChef threats actively hitting Texas organizations. Practical, tool-agnostic, and vendor-neutral.",
  },
  {
    slug: "ignacio-gutierrez",
    name: "Ignacio Gutierrez",
    sessionId: "D2",
    talkTitle: "GSM Exploit",
    room: "Lemon",
    length: "45 Minutes",
    timeSlot: "2:15 PM – 3:00 PM",
    bio: "Information security for a federal enterprise with more than 600,000 endpoints and a $442B annual operating budget (not DHS or DOJ). Holds the CySA+ and CISSP certifications.",
    summary:
      "A hands-on, hardware-level offensive talk on a GSM call-diversion exploit, the kind of physical-layer tradecraft most conference lineups never cover.",
  },
  {
    slug: "alex-mayorga-adame",
    name: "Alex Mayorga Adame",
    sessionId: "D3",
    talkTitle: "Why PQC Readiness is an “Ecosystem” Priority",
    room: "Key Lime",
    length: "45 Minutes",
    timeSlot: "2:15 PM – 3:00 PM",
    photo: "/speakers/alex-mayorga-adame.jpg",
    bio: "Alex Mayorga Adame is a Senior Solution Engineer at Thales. He previously spent over seven years at Cloudflare specializing in WAF, Bot Management, CDN, ZTNA, and developer solutions, and 13 years in the financial sector as a Systems Architect at a Fortune 500 banking institution. In the industry since 2004, he started as a programming teacher and has worked across open source, networking, application servers, and security. Born and raised in Zacatecas, México, he now works remotely from Mission, Texas. In his free time he volunteers for Mozilla and ISOC, watches birds and butterflies, and explores nearby gardens and eateries. Alex holds a degree in Information Systems Engineering from ITESM.",
    summary:
      "Why post-quantum readiness is an ecosystem problem, not a checkbox: phased PQC migration, crypto agility, and the harvest-now-decrypt-later risk already in play.",
  },
  {
    slug: "cooper-thompson",
    name: "Cooper Thompson",
    sessionId: "E1",
    talkTitle: "Instant Gratification. Long-Term Risk.",
    room: "Main Area",
    length: "60 Minutes",
    timeSlot: "3:15 PM – 4:15 PM",
    isKeynote: true,
    photo: "/speakers/cooper-thompson.jpg",
    bio: "Cooper Thompson is the owner of Pelican Street Ventures and co-founder of The Fieldhouse. He has spent his career building and scaling financial products used by millions in some of the highest-stakes moments of daily life. While not a cybersecurity practitioner, he brings a product-centric perspective shaped by years of studying user behavior, engagement patterns, and decision-making in embedded finance and digital assets. His work focuses on making financial interactions simpler, faster, and more seamlessly embedded into everyday experiences, which gives him a clear view of the fine line between convenience and compulsion, and how products optimized for frictionless engagement can unintentionally shape risky user behavior.",
    summary:
      "A keynote on the fine line between convenience and compulsion: how products engineered for instant, frictionless engagement can quietly shape risky long-term behavior, and what that means for how we build and secure them.",
  },
];

// Event-day timing for the live schedule. The venue is in Central Time, so the
// "happening now" logic is computed in this zone regardless of the visitor's.
export const eventDate = "2026-06-27"; // ISO, America/Chicago
export const eventTimeZone = "America/Chicago";

// Breakout rooms, used by the track filter on the agenda and live pages.
export const tracks = ["Tangerine", "Lemon", "Key Lime"] as const;
export type Track = (typeof tracks)[number];

export const agendaItems: AgendaItem[] = [
  {
    time: "09:00 AM – 09:45 AM",
    title: "Registration",
    location: "Main Area",
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
        title: "From Texas to RSAC: Cyber and AI Governance",
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
        title: "From Phish to Blocklist: Real-Time IOC Extraction",
        location: "Lemon",
        speaker: "James Francis-Love",
        speakerSlug: "james-francis-love",
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
        title: "Vulnerability Management to Attack Surface Management",
        location: "Key Lime",
        speaker: "Eric Rodriguez",
        speakerSlug: "eric-rodriguez",
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
        title: "Today's Hard-Hitting Threats and How to Detect Them",
        location: "Tangerine",
        speaker: "Watson Brown & Kenneth Castillo",
        speakerSlug: "watson-brown",
      },
      {
        title: "GSM Exploit",
        location: "Lemon",
        speaker: "Ignacio Gutierrez",
        speakerSlug: "ignacio-gutierrez",
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
    time: "03:00 PM – 03:15 PM",
    title: "Break",
    location: "Main Area",
    description: "Afternoon refreshments.",
  },
  {
    time: "03:15 PM – 04:15 PM",
    title: "Keynote Presentation",
    location: "Main Area",
    description:
      "Keynote by Cooper Thompson: Instant Gratification. Long-Term Risk.",
  },
  {
    time: "04:15 PM – 04:30 PM",
    title: "Door Prize Giveaway",
  },
  {
    time: "05:00 PM – 08:00 PM",
    title: "Meet-Up Reception",
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
    name: "NetSync",
    url: "https://www.netsync.com/",
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
  {
    name: "City of Mission",
    logo: "/sponsors/city-of-mission.png",
    url: "https://www.missiontexas.us/",
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

// Nearby lodging, highlighted for convenience. No room block or conference
// rate is arranged. `mapsSearchUrl` stays accurate automatically; add named
// hotels to `nearby` if the team wants a curated list.
export const lodgingInfo: {
  note: string;
  mapsSearchUrl: string;
  nearby: LinkItem[];
} = {
  note: "A cluster of hotels sits just minutes from the Mission Event Center along the North Shary Road and Expressway 83 corridor. There's no conference room block or special rate, so book directly with whichever works best for you.",
  mapsSearchUrl:
    "https://www.google.com/maps/search/hotels+near+Mission+Event+Center+Mission+TX+78572",
  nearby: [],
};

export const resourceLinks: LinkItem[] = [
  { label: "Register on Eventbrite", href: conference.registrationUrl },
  { label: "Submit a Presentation", href: conference.cfpUrl },
  { label: "Download Sponsorship Kit", href: conference.sponsorKitUrl },
  { label: "Email Organizers", href: `mailto:${conference.contactEmail}` },
  { label: "Follow @BSidesRGV", href: conference.twitterUrl },
];

// Past editions, scaffolded so future galleries and recaps can deep-link here.
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

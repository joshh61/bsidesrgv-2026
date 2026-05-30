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

export type AgendaItem = {
  time: string;
  title: string;
  location?: string;
  sponsor?: string;
  description?: string;
  sessions?: {
    title: string;
    location: string;
    speaker?: string;
  }[];
};

export type FeaturedActivity = {
  title: string;
  description: string;
};

export type CpeCredit = {
  organization: string;
  hours: string;
};

export type SponsorTier = {
  name: string;
  price: string;
  benefits: string[];
};

export type ConfirmedSupporter = {
  name: string;
  note: string;
};

export type Sponsor = {
  name: string;
  logo?: string;
  url?: string;
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

export const cpeCredits: CpeCredit[] = [
  {
    organization: "ISACA",
    hours: "4.75",
  },
  {
    organization: "ISC2",
    hours: "4.00",
  },
];

export const featuredActivities: FeaturedActivity[] = [
  {
    title: "Lock Picking Village",
    description:
      "Hands-on physical security learning in the classic BSides village format.",
  },
  {
    title: "Hardware Hacking Village",
    description:
      "Explore the security side of devices, components, and hands-on technical experimentation.",
  },
  {
    title: "RGV Amateur HAM Radio Club",
    description:
      "Community radio knowledge and demonstrations from local amateur radio operators.",
  },
  {
    title: "More to be announced",
    description:
      "Additional activities are expected as the event gets closer.",
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

export const agendaItems: AgendaItem[] = [
  {
    time: "09:00 AM – 09:45 AM",
    title: "Registration",
    location: "Cafeteria",
    sponsor: "SHI",
  },
  {
    time: "09:45 AM – 10:00 AM",
    title: "Welcome",
    location: "2nd Floor – Room 2.100",
  },
  {
    time: "10:00 AM – 10:45 AM",
    title: "Opening Session",
    location: "2nd Floor – Room 2.100",
    description: "Presenter TBD",
  },
  {
    time: "11:00 AM – 11:45 AM",
    title: "Breakout Sessions",
    sessions: [
      {
        title: "Session 1",
        location: "2nd Floor – Room 2.100",
        speaker: "TBD",
      },
      {
        title: "Session 2",
        location: "2nd Floor – Room 2.102",
        speaker: "TBD",
      },
    ],
  },
  {
    time: "11:45 AM – 01:15 PM",
    title: "Lunch",
    location: "Cafeteria",
    sponsor: "CISCO",
  },
  {
    time: "01:15 PM – 02:00 PM",
    title: "Breakout Sessions",
    sessions: [
      {
        title: "Session 1",
        location: "2nd Floor – Room 2.100",
        speaker: "TBD",
      },
      {
        title: "Session 2",
        location: "2nd Floor – Room 2.102",
        speaker: "TBD",
      },
    ],
  },
  {
    time: "02:15 PM – 03:00 PM",
    title: "Breakout Sessions",
    sessions: [
      {
        title: "Session 1",
        location: "2nd Floor – Room 2.100",
        speaker: "TBD",
      },
      {
        title: "Session 2",
        location: "2nd Floor – Room 2.102",
        speaker: "TBD",
      },
    ],
  },
  {
    time: "03:00 PM – 03:15 PM",
    title: "Break",
    location: "Cafeteria",
    sponsor: "SHI",
    description: "Refreshments from PJ's Coffee.",
  },
  {
    time: "03:15 PM – 04:15 PM",
    title: "Keynote Presentation",
    location: "2nd Floor – Room 2.100",
    description: "Presenter TBD",
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

export const confirmedSupporters: ConfirmedSupporter[] = [
  {
    name: "SHI",
    note: "Registration and afternoon break sponsor listed on the live agenda.",
  },
  {
    name: "CISCO",
    note: "Lunch sponsor listed on the live agenda.",
  },
  {
    name: "Communications Etc.",
    note: "Door prize giveaway sponsor listed on the live agenda.",
  },
  {
    name: "NetSync",
    note: "Meet-up reception sponsor listed on the live agenda.",
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
  { label: "Details", href: "#details" },
  { label: "CFP", href: "#cfp" },
  { label: "Agenda", href: "#agenda" },
  { label: "Activities", href: "#activities" },
  { label: "Sponsors", href: "#sponsors" },
  { label: "Venue", href: "#venue" },
  { label: "Conduct", href: "#conduct" },
];

export const venueInfo = {
  mapUrl: "https://maps.app.goo.gl/viYJiDxwBFiPNvxVA",
  wifi: "Guest WiFi login information will be provided the day of the event.",
  accommodations:
    "Contact the organizers if additional accommodations are required.",
} as const;

export const resourceLinks: LinkItem[] = [
  { label: "Register on Eventbrite", href: conference.registrationUrl },
  { label: "Submit a Presentation", href: conference.cfpUrl },
  { label: "Download Sponsorship Kit", href: conference.sponsorKitUrl },
  { label: "Email Organizers", href: `mailto:${conference.contactEmail}` },
  { label: "Follow @BSidesRGV", href: conference.twitterUrl },
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

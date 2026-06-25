import type { Metadata } from "next";
import { Fraunces, Newsreader, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  // Expose the optical-size + quirk axes so large display headings use the
  // refined display glyphs (and we can turn off Fraunces's wonky letterforms).
  axes: ["opsz", "SOFT", "WONK"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "BSides RGV 2026 | 7th Annual Cybersecurity Conference",
  description:
    "The 7th Annual BSides RGV Cybersecurity Conference. Saturday, June 27, 2026 at the Mission Event Center in Mission, Texas. A free, community-driven event for the Rio Grande Valley security community. Register, submit a talk, or sponsor.",
  keywords: [
    "BSides RGV",
    "cybersecurity conference",
    "Mission Texas",
    "Rio Grande Valley",
    "infosec",
    "BSides 2026",
  ],
  openGraph: {
    title: "BSides RGV 2026: Cybersecurity. Community. South Texas.",
    description:
      "The 7th Annual BSides RGV Cybersecurity Conference, June 27, 2026 at the Mission Event Center in Mission, Texas.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${newsreader.variable} ${plexMono.variable} scroll-smooth`}
    >
      <body>{children}</body>
    </html>
  );
}

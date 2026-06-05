import type { Metadata } from "next";

import { conference } from "@/data/conference";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { LiveBoard } from "@/components/live/LiveBoard";

export const metadata: Metadata = {
  title: `Live | ${conference.name} ${conference.year}`,
  description: `Follow the ${conference.edition} in real time on ${conference.date}: what is happening now and which room to head to.`,
};

export default function LivePage() {
  return (
    <>
      <SiteHeader />
      <main id="top">
        <LiveBoard />
      </main>
      <SiteFooter />
    </>
  );
}

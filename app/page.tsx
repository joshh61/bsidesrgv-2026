import { SiteHeader } from "@/components/SiteHeader";
import { HeroSection } from "@/components/HeroSection";
import { EventDetails } from "@/components/EventDetails";
import { AboutSection } from "@/components/AboutSection";
import { AudienceSection } from "@/components/AudienceSection";
import { CallForPapersSection } from "@/components/CallForPapersSection";
import { AgendaSection } from "@/components/AgendaSection";
import { ActivitiesSection } from "@/components/ActivitiesSection";
import { SponsorsSection } from "@/components/SponsorsSection";
import { VenueSection } from "@/components/VenueSection";
import { ResourcesSection } from "@/components/ResourcesSection";
import { ConductSection } from "@/components/ConductSection";
import { FaqSection } from "@/components/FaqSection";
import { SiteFooter } from "@/components/SiteFooter";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="top">
        <HeroSection />
        <EventDetails />
        <AboutSection />
        <AudienceSection />
        <CallForPapersSection />
        <AgendaSection />
        <ActivitiesSection />
        <SponsorsSection />
        <VenueSection />
        <ResourcesSection />
        <ConductSection />
        <FaqSection />
      </main>
      <SiteFooter />
    </>
  );
}

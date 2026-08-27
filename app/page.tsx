import type { Metadata } from "next";
import Hero from "@/components/Hero";
import TheScan from "@/components/TheScan";
import WhyMobile from "@/components/WhyMobile";
import ServicesGrid from "@/components/ServicesGrid";
import Reviews from "@/components/Reviews";
import ServiceArea from "@/components/ServiceArea";
import CallBand from "@/components/CallBand";
import TheMan from "@/components/TheMan";
import WhoShowsUp from "@/components/WhoShowsUp";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Mobile Mechanic in Conroe & Montgomery County, TX | ${site.name}`,
  description: `${site.owner} brings ${site.aseYears} years of ASE certified auto repair to your driveway in Conroe, Montgomery, Spring, Humble, Porter and Anderson. Gas and diesel: diagnostics, brakes, suspension, electrical, A/C and Powerstroke, Duramax and Cummins work. Open 24 hours — ${site.phone}.`,
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <WhoShowsUp />
      <TheScan />
      <WhyMobile />
      <ServicesGrid
        intro="Everything short of an engine rebuild happens where your car already is. If you don't see it listed, call and ask — the answer is usually yes."
      />
      <TheMan />
      <Reviews />
      <ServiceArea />
      <CallBand />
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import PageHead from "@/components/PageHead";
import CallBand from "@/components/CallBand";
import Reviews from "@/components/Reviews";
import { Stagger, Item } from "@/components/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Work — Mobile Auto Repair Photos, Conroe TX",
  description: `Real jobs from ${site.name}: timing services, coolant leak diagnosis, brake work and driveway diagnostics around Conroe, Montgomery, Spring and Humble.`,
  alternates: { canonical: "/our-work" },
};

/*
 * ⚠️ JORDAN: only the two marked `real: true` are Jay's own photos, off his
 * Google profile. Everything else is illustrative. The moment Jay sends a
 * batch from his phone, swap the rest out — this page gets twice as strong.
 */
const shots = [
  {
    src: "/img/real-timing-belt.jpg",
    alt: "Timing belt, tensioner and cam pulleys exposed on a Honda engine under a work light",
    caption:
      "Timing belt service on a Honda. Belt, tensioner, idlers and water pump replaced together — the pump is right there once the belt is off.",
    tag: "Timing & cooling",
    real: true,
    span: "lg:col-span-2 lg:row-span-2",
    ratio: "aspect-[3/4]",
  },
  {
    src: "/img/real-found-it.jpg",
    alt: "A coolant weep circled in red marker on an engine's timing cover",
    caption:
      "Found it, circled it, sent it. This is what a customer gets instead of \"it needs a water pump, trust me.\"",
    tag: "Diagnosis",
    real: true,
    ratio: "aspect-[3/4]",
  },
  {
    src: "/img/scan-tablet-b.jpg",
    alt: "A technician holding a diagnostic scan tool in a vehicle cabin",
    caption:
      "Live data while the fault is actually happening. That's the part a code reader can't do.",
    tag: "Diagnostics",
    ratio: "aspect-[4/3]",
  },
  {
    src: "/img/svc-brakes-hands.jpg",
    alt: "Hands working on a brake rotor and hub with the wheel removed",
    caption:
      "Wheel off, rotor measured, pad thickness photographed — before anything gets ordered.",
    tag: "Brakes",
    ratio: "aspect-[4/3]",
  },
  {
    src: "/img/work-tools.jpg",
    alt: "Wrenches and sockets laid out in a truck-bed tool box",
    caption:
      "Everything the job needs travels in the truck — no \"we'll have to order that and book you back in\".",
    tag: "In the truck",
    ratio: "aspect-[4/3]",
  },
  {
    src: "/img/work-hands-engine.jpg",
    alt: "Close-up of hands working on an engine bay outdoors",
    caption: "Engine bay work, done where the car already is.",
    tag: "General repair",
    ratio: "aspect-[4/3]",
  },
  {
    src: "/img/svc-wheel-off.jpg",
    alt: "A car with the wheel removed showing the brake disc during a driveway repair",
    caption:
      "No lift needed. A jack, stands, the right torque spec and someone who's done it a few thousand times.",
    tag: "Brakes",
    ratio: "aspect-[4/3]",
  },
  {
    src: "/img/scan-obd-plug.jpg",
    alt: "An OBD-II diagnostic tool plugged into a vehicle's data port",
    caption:
      "Every module gets pulled — engine, transmission, ABS, body. Not just the one that turned the light on.",
    tag: "Diagnostics",
    ratio: "aspect-[4/3]",
  },
  {
    src: "/img/svc-suspension.jpg",
    alt: "Suspension components seen from underneath a vehicle during inspection",
    caption:
      "Hands on every joint with the weight off the wheel. Parts that are still good stay on the car.",
    tag: "Suspension",
    ratio: "aspect-[4/3]",
  },
];

export default function OurWorkPage() {
  return (
    <>
      <PageHead
        eyebrow="Our work"
        title={
          <>
            Photos of the thing,
            <br /> <span className="text-cyan">not stock of a smile.</span>
          </>
        }
        intro={`${site.owner} photographs what he finds and sends it to the customer before he quotes it. A few of those are below.`}
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/our-work", label: "Our Work" },
        ]}
      />

      <section className="bg-carbon pb-16 sm:pb-20">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {shots.map((s) => (
              <Item key={s.src + s.tag} className={s.span ?? ""}>
                <figure className="edge-card group h-full overflow-hidden">
                  <div className={`relative w-full overflow-hidden ${s.ratio}`}>
                    <Image
                      src={s.src}
                      alt={s.alt}
                      fill
                      sizes="(max-width:639px) 100vw, (max-width:1023px) 50vw, 30vw"
                      className="object-cover transition-transform duration-[900ms] group-hover:scale-[1.05]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-carbon/85 via-transparent to-transparent" />
                    <span
                      /* Solid dark chip, not a tint — these sit on bright
                         photos where a translucent badge would disappear. */
                      className={`absolute left-3 top-3 rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] ${
                        s.real
                          ? "bg-carbon/85 text-cyan ring-1 ring-cyan/40"
                          : "bg-carbon/75 text-chrome/70"
                      }`}
                    >
                      {s.real ? `${site.ownerShort}'s photo` : s.tag}
                    </span>
                  </div>
                  <figcaption className="p-4 text-[14px] leading-relaxed text-chrome/60">
                    {s.caption}
                  </figcaption>
                </figure>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      <Reviews />
      <CallBand />
    </>
  );
}

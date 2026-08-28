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
 * Eight of these nine are Jay's own photos, pulled from his Google profile
 * and his Facebook page — the marked-up filters, the 51.9° vent reading, the
 * transmission clutch packs. They carry a "Jay's photo" badge.
 *
 * That badge is load-bearing: only set `real: true` on a photo he actually
 * took. The last one is stock and is deliberately unbadged.
 */
const shots = [
  {
    src: "/img/real-timing-belt.jpg",
    alt: "Timing belt, tensioner and cam pulleys exposed on a Honda engine under a work light",
    caption:
      "Timing belt service. Belt, tensioner, idlers and water pump replaced together — the pump is right there once the belt is off, and doing it later means paying that labor twice.",
    tag: "Timing & cooling",
    real: true,
    span: "sm:col-span-2 lg:col-span-2 lg:row-span-2",
    /* Portrait once it owns a 2x2 block at lg; landscape below that, where it
       runs full width and a 3:4 would be nearly a thousand pixels tall. */
    ratio: "aspect-[4/3] lg:aspect-[3/4]",
  },
  {
    src: "/img/real-cabin-filter.jpg",
    alt: "A filthy cabin air filter labelled in red marker",
    caption:
      "Labelled it and sent the photo. You should not have to take anyone's word for what came out of your car.",
    tag: "Diagnosis",
    real: true,
    ratio: "aspect-[4/3]",
  },
  {
    src: "/img/real-ac-temp.jpg",
    alt: "An infrared thermometer reading 51.9°F at a dashboard vent with the A/C on max",
    caption:
      "51.9° at the vent on max. That is what a working A/C reads — and it is how you prove it, instead of guessing at the charge.",
    tag: "A/C",
    real: true,
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
    src: "/img/real-trans-clutches.jpg",
    alt: "Transmission clutch packs and steels laid out on a bench",
    caption:
      "Clutch packs out and laid in order. Not everything is a bolt-on — 25 years is what lets him take one of these on.",
    tag: "Drivetrain",
    real: true,
    ratio: "aspect-[3/4]",
  },
  {
    src: "/img/real-pan.jpg",
    alt: "An oil pan marked up in red to show where the leak was",
    caption:
      "Marked up so you can see exactly where it was leaking from before you spend a dollar on it.",
    tag: "Leaks",
    real: true,
    ratio: "aspect-[4/3]",
  },
  {
    src: "/img/real-o2-sensor.jpg",
    alt: "An oxygen sensor and catalytic converter laid out on the driveway",
    caption:
      "Oxygen sensor and converter, done on the driveway. No lift, no tow, no day off work.",
    tag: "Emissions",
    real: true,
    ratio: "aspect-[3/4]",
  },
  {
    src: "/img/real-evap.jpg",
    alt: "A fuel system component circled in marker during a leak diagnosis",
    caption:
      "Circled at the source. Half the money wasted on car repair gets wasted guessing at exactly this.",
    tag: "Diagnosis",
    real: true,
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
];

export default function OurWorkPage() {
  /* The lead shot spans two columns at sm and a 2x2 block at lg, so the rest
     have to be even for the grid to end flush. Widen the last one when they
     are not — otherwise a tenth photo strands one card on its own row. */
  const orphanAtSm = (shots.length - 1) % 2 === 1;

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
            {shots.map((s, i) => (
              <Item
                key={s.src + s.tag}
                className={
                  s.span ??
                  (orphanAtSm && i === shots.length - 1
                    ? "sm:col-span-2 lg:col-span-1"
                    : "")
                }
              >
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

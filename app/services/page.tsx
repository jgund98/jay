import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHead from "@/components/PageHead";
import CallBand from "@/components/CallBand";
import { Stagger, Item } from "@/components/Reveal";
import { services, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mobile Auto Repair Services in Conroe & Montgomery County, TX",
  description: `Diagnostics, brakes, suspension, CV axles, electrical, A/C, timing belts and pre-purchase inspections — all done at your home or office by ${site.owner}, a ${site.aseYears}-year ASE certified technician. Call ${site.phone}.`,
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHead
        eyebrow="Services"
        title={
          <>
            Almost all of it can be done <span className="text-cyan">in your driveway.</span>
          </>
        }
        intro={`${site.owner} carries professional scan tools, the hand tools, the jack and stands, and can source most parts same-day. Here's what he does — and if what you need isn't on this list, call and ask.`}
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/services", label: "Services" },
        ]}
      />

      <section className="bg-carbon-2 py-16 sm:py-20">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
          <Stagger className="grid gap-5 md:grid-cols-2">
            {services.map((s, i) => {
              /* An odd number of services strands the last card alone on a
                 half-empty row. Widen it so the grid ends flush, and shrink
                 its image share to match — at full width a 38% image is a
                 billboard. */
              const wide =
                services.length % 2 === 1 && i === services.length - 1;
              return (
              <Item
                key={s.slug}
                className={`h-full ${wide ? "md:col-span-2" : ""}`}
              >
                <Link
                  href={`/services/${s.slug}`}
                  className="edge-card group flex h-full flex-col overflow-hidden sm:flex-row"
                >
                  <div
                    className={`relative aspect-[16/9] w-full shrink-0 overflow-hidden sm:aspect-auto sm:h-auto ${
                      wide ? "sm:w-[24%]" : "sm:w-[38%]"
                    }`}
                  >
                    <Image
                      src={s.image}
                      alt={s.imageAlt}
                      fill
                      sizes={wide ? "(max-width:639px) 100vw, 300px" : "(max-width:639px) 100vw, 260px"}
                      className="object-cover transition-transform duration-[900ms] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-carbon-2/85 to-transparent sm:bg-gradient-to-r" />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h2 className="font-display text-[20px] font-extrabold leading-tight text-chrome transition-colors group-hover:text-cyan">
                      {s.name}
                    </h2>
                    <p className="mt-2 flex-1 text-[14.5px] leading-relaxed text-chrome/55">
                      {s.blurb}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 font-display text-[13.5px] font-bold text-violet-soft transition-colors group-hover:text-cyan">
                      See details
                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              </Item>
              );
            })}
          </Stagger>
        </div>
      </section>

      <CallBand
        heading="Not sure which one you need?"
        sub={`That's normal, and it's the entire point of the ${site.callOutFee} ${site.callOutLabel} — which is ${site.callOutNote}. Describe the noise and ${site.owner} will tell you what it usually is before anyone gets in the truck.`}
      />
    </>
  );
}

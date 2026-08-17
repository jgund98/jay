import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import ServiceArea from "@/components/ServiceArea";
import CallBand from "@/components/CallBand";
import { Stagger, Item } from "@/components/Reveal";
import { site, coreCities, allCities } from "@/lib/site";

export const metadata: Metadata = {
  title: "Service Area — Mobile Mechanic in Montgomery County & North Houston",
  description: `${site.name} covers Conroe, Montgomery, Spring, Humble, Porter, Anderson, The Woodlands, Willis, Magnolia, Tomball, Kingwood, New Caney and the rest of Montgomery County. We come to you. Call ${site.phone}.`,
  alternates: { canonical: "/service-area" },
};

const notes: Record<string, string> = {
  Conroe:
    "Home base. If you're anywhere between the lake and I-45, Jay is usually the closest mechanic you can call.",
  Montgomery:
    "Out past 105 toward the lake — Walden, April Sound and the neighborhoods around them.",
  Spring:
    "Down 45 through Old Town Spring and the Klein side. A short run from Conroe.",
  Humble:
    "Down 59 to Humble and Atascocita, including the Kingwood side of the river.",
  Porter:
    "Porter Heights, Kingwood-adjacent, and the stretch of 59 in between.",
  Anderson:
    "West into Grimes County. Rural calls are welcome — Jay would rather drive than have you tow it.",
};

export default function ServiceAreaPage() {
  const extras = allCities.filter(
    (c) => !coreCities.includes(c as (typeof coreCities)[number]),
  );

  return (
    <>
      <PageHead
        eyebrow="Service area"
        title={
          <>
            Montgomery County
            <br /> <span className="text-cyan">and north Houston.</span>
          </>
        }
        intro={`${site.owner} runs out of ${site.baseCity} and covers a wide radius — west to Anderson, east to Cleveland, south to Humble and Atascocita. If your car is inside that, he'll drive to it.`}
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/service-area", label: "Service Area" },
        ]}
      />

      <ServiceArea compact />

      <section className="on-light bg-paper py-16 text-steel-dark sm:py-20">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
          <h2 className="font-display text-[clamp(1.8rem,4.6vw,2.6rem)] font-black italic leading-[1] tracking-[-0.03em]">
            The towns he names first
          </h2>
          <Stagger className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {coreCities.map((c) => (
              <Item key={c} className="h-full">
                <div className="h-full rounded-2xl border border-steel/12 bg-white p-6 shadow-[0_16px_40px_-30px_rgba(20,16,40,0.5)]">
                  <h3 className="font-display text-[21px] font-extrabold text-steel-dark">
                    {c}, TX
                  </h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-steel">
                    {notes[c]}
                  </p>
                  <a
                    href={site.phoneHref}
                    className="mt-4 inline-flex font-display text-[14px] font-bold text-violet underline-offset-4 hover:underline"
                  >
                    Mobile mechanic in {c} → {site.phone}
                  </a>
                </div>
              </Item>
            ))}
          </Stagger>

          <div className="mt-10 rounded-2xl border border-steel/12 bg-paper-2 p-6 sm:p-7">
            <h3 className="font-display text-[19px] font-extrabold text-steel-dark">
              Also rolling to
            </h3>
            <p className="mt-3 text-[15.5px] leading-relaxed text-steel">
              {extras.join(", ")} — plus Cut and Shoot, the Lake Conroe
              neighborhoods, and everywhere in between. Sitting just outside the
              list?{" "}
              <a
                href={site.phoneHref}
                className="font-semibold text-violet underline-offset-4 hover:underline"
              >
                Call and ask
              </a>
              . The answer is usually yes.
            </p>
          </div>
        </div>
      </section>

      <CallBand
        heading="Wherever it quit, that's where he goes."
        sub={`Driveway, office lot, or the shoulder of 45. ${site.owner} answers at ${site.phone}, ${site.hoursLong}.`}
      />
    </>
  );
}

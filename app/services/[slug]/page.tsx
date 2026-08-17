import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHead from "@/components/PageHead";
import CallBand from "@/components/CallBand";
import ServicesGrid from "@/components/ServicesGrid";
import Reveal from "@/components/Reveal";
import { PhoneIcon } from "@/components/Header";
import { services, serviceBySlug, site, coreCities } from "@/lib/site";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = serviceBySlug(slug);
  if (!s) return {};
  return {
    title: `${s.name} in Conroe, TX — Mobile ${s.name} at Your Home`,
    description: `${s.blurb} ${site.owner}, ${site.aseYears} years ASE certified, serving ${coreCities.slice(0, 4).join(", ")} and Montgomery County. Call ${site.phone}.`,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: {
      title: `${s.name} — ${site.name}`,
      description: s.blurb,
      images: [{ url: s.image }],
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = serviceBySlug(slug);
  if (!s) notFound();

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: s.name,
      description: s.blurb,
      serviceType: s.name,
      provider: { "@id": `${site.url}/#business` },
      areaServed: coreCities.map((c) => ({ "@type": "City", name: `${c}, TX` })),
      url: `${site.url}/services/${s.slug}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: s.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.url },
        {
          "@type": "ListItem",
          position: 2,
          name: "Services",
          item: `${site.url}/services`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: s.name,
          item: `${site.url}/services/${s.slug}`,
        },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <PageHead
        eyebrow={s.short}
        title={
          <>
            {s.name}{" "}
            <span className="text-cyan">
              at your place<span className="text-chrome">.</span>
            </span>
          </>
        }
        intro={s.blurb}
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/services", label: "Services" },
          { href: `/services/${s.slug}`, label: s.name },
        ]}
      />

      {/* hero image + symptoms */}
      <section className="bg-carbon pb-16 sm:pb-20">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
            <Reveal>
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-violet-soft/18">
                <Image
                  src={s.image}
                  alt={s.imageAlt}
                  fill
                  priority
                  sizes="(max-width:1023px) 100vw, 58vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-carbon/70 via-transparent to-transparent" />
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="h-full rounded-2xl border border-cyan/25 bg-cyan/[0.05] p-6 sm:p-7">
                <p className="eyebrow text-cyan/80">Call him if</p>
                <ul className="mt-4 space-y-3">
                  {s.symptoms.map((sym) => (
                    <li
                      key={sym}
                      className="flex items-start gap-2.5 text-[15.5px] leading-snug text-chrome/80"
                    >
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-cyan to-violet" />
                      {sym}
                    </li>
                  ))}
                </ul>
                <a
                  href={site.phoneHref}
                  className="btn btn-call mt-6 w-full text-[15.5px]"
                  data-analytics="service-call"
                >
                  <PhoneIcon />
                  {site.phone}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* body + what's covered */}
      <section className="on-light bg-paper py-16 text-steel-dark sm:py-20">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <h2 className="font-display text-[clamp(1.7rem,4.4vw,2.5rem)] font-black italic leading-[1] tracking-[-0.03em] text-steel-dark">
                How {site.ownerShort} handles it
              </h2>
              <div className="mt-6 space-y-5 text-[16.5px] leading-relaxed text-steel">
                {s.body.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-steel/15 bg-white p-6 shadow-[0_20px_50px_-32px_rgba(20,16,40,0.55)] sm:p-7">
              <p className="eyebrow text-violet">What&rsquo;s covered</p>
              <ul className="mt-4 space-y-3">
                {s.includes.map((inc) => (
                  <li
                    key={inc}
                    className="flex items-start gap-2.5 text-[15px] leading-snug text-steel-dark"
                  >
                    <svg
                      viewBox="0 0 20 20"
                      className="mt-[2px] h-4 w-4 shrink-0"
                      aria-hidden
                    >
                      <circle cx="10" cy="10" r="9" fill="url(#gc-svc-chk)" />
                      <path
                        d="M6 10.4l2.6 2.6L14.2 7.4"
                        stroke="#fff"
                        strokeWidth="2.1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                      <defs>
                        <linearGradient id="gc-svc-chk" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor="#8B3DFF" />
                          <stop offset="100%" stopColor="#FF3DC4" />
                        </linearGradient>
                      </defs>
                    </svg>
                    {inc}
                  </li>
                ))}
              </ul>
              <Link
                href={`/contact?issue=${s.slug}`}
                className="btn btn-primary mt-6 w-full text-[15.5px]"
              >
                Get a quote for this
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-carbon py-16 sm:py-20">
        <div className="mx-auto max-w-[820px] px-4 sm:px-6">
          <p className="eyebrow text-cyan">Straight answers</p>
          <h2 className="mt-3 font-display text-[clamp(1.8rem,4.6vw,2.6rem)] font-black italic leading-[1] tracking-[-0.03em]">
            {s.name} questions people actually ask
          </h2>

          <div className="mt-8 divide-y divide-violet-soft/12 border-y border-violet-soft/12">
            {s.faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-5">
                  <h3 className="font-display text-[17.5px] font-bold leading-snug text-chrome transition-colors group-open:text-cyan">
                    {f.q}
                  </h3>
                  <span className="mt-1 shrink-0 text-violet-soft transition-transform duration-300 group-open:rotate-45">
                    <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden>
                      <path
                        d="M10 3v14M3 10h14"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </summary>
                <p className="mt-3 max-w-[62ch] text-[15.5px] leading-relaxed text-chrome/62">
                  {f.a}
                </p>
              </details>
            ))}
          </div>

          <p className="mt-8 text-[15px] leading-relaxed text-chrome/50">
            {s.name} in{" "}
            {coreCities.slice(0, 5).join(", ")} and the rest of Montgomery
            County —{" "}
            <a
              href={site.phoneHref}
              className="font-semibold text-cyan underline-offset-4 hover:underline"
            >
              {site.phone}
            </a>
            , {site.hoursLong}.
          </p>
        </div>
      </section>

      <ServicesGrid heading="While he's out there" exclude={s.slug} />
      <CallBand />
    </>
  );
}

import type { Metadata } from "next";
import { Suspense } from "react";
import PageHead from "@/components/PageHead";
import ContactClient from "./ContactClient";
import { site, coreCities, team } from "@/lib/site";
import { PhoneIcon } from "@/components/Header";
import Stars from "@/components/Stars";

/* Falls back to the main line rather than throwing if the roster changes. */
const jason =
  team.find((m) => m.first === site.partnerFirst) ??
  { phone: site.phone, phoneHref: site.phoneHref };

export const metadata: Metadata = {
  title: "Get a Quote — Mobile Mechanic, Conroe & Montgomery County TX",
  description: `Tell ${site.owner} what your car is doing and he'll call you back himself. Or just call ${site.phone} — he answers ${site.hoursLong}.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHead
        eyebrow="Get a quote"
        title={
          <>
            Tell {site.ownerShort} what it&rsquo;s doing.
          </>
        }
        intro="Three quick questions. He calls you back himself — no assistant, no call center, no ticket number."
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/contact", label: "Contact" },
        ]}
      />

      <section className="bg-carbon pb-16 sm:pb-20">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[1fr_340px] lg:items-start lg:gap-12">
            <Suspense
              fallback={
                <div className="h-[520px] rounded-2xl border border-violet-soft/20 bg-carbon-2/60" />
              }
            >
              <ContactClient />
            </Suspense>

            <aside className="space-y-4 lg:sticky lg:top-28">
              <div className="rounded-2xl border border-cyan/28 bg-cyan/[0.06] p-6">
                <p className="eyebrow text-cyan/80">Faster than a form</p>
                <p className="mt-3 font-display text-[26px] font-black italic leading-tight">
                  {site.phone}
                </p>
                <p className="mt-2 text-[14.5px] leading-relaxed text-chrome/65">
                  Rings {site.owner}&rsquo;s own phone, {site.hoursLong}.
                  {site.partnerFirst} has his own line below.
                </p>
                <a
                  href={site.phoneHref}
                  className="btn btn-call mt-5 w-full text-[15.5px]"
                  data-analytics="contact-call"
                >
                  <PhoneIcon />
                  Call now
                </a>
                <a
                  href={site.smsHref}
                  className="btn btn-outline mt-2.5 w-full text-[15px]"
                >
                  Text instead
                </a>
              </div>

              <div className="rounded-2xl border border-violet-soft/18 bg-white/[0.03] p-6">
                <dl className="space-y-4 text-[14.5px]">
                  <div>
                    <dt className="eyebrow text-chrome/35">Hours</dt>
                    <dd className="mt-1.5 font-display text-[17px] font-bold text-chrome">
                      {site.hours}
                    </dd>
                  </div>
                  <div>
                    <dt className="eyebrow text-chrome/35">To come out</dt>
                    <dd className="mt-1.5 text-chrome/70">
                      <b className="font-display text-chrome">
                        {site.callOutFee}
                      </b>{" "}
                      — {site.callOutNote}
                    </dd>
                  </div>
                  <div>
                    <dt className="eyebrow text-chrome/35">Where</dt>
                    <dd className="mt-1.5 leading-relaxed text-chrome/70">
                      {coreCities.join(", ")} and the rest of Montgomery County
                      and north Houston.
                    </dd>
                  </div>
                  <div>
                    <dt className="eyebrow text-chrome/35">
                      {site.partnerFirst}&rsquo;s line
                    </dt>
                    <dd className="mt-1.5 text-chrome/70">
                      <a
                        href={jason.phoneHref}
                        className="font-display text-[17px] font-bold text-chrome underline-offset-4 transition-colors hover:text-cyan hover:underline"
                        data-analytics="contact-call-partner"
                      >
                        {jason.phone}
                      </a>
                      <span className="mt-1 block text-[13.5px] leading-snug text-chrome/55">
                        {site.partner} runs his own calls. Either number gets
                        you an owner.
                      </span>
                    </dd>
                  </div>
                  <div>
                    <dt className="eyebrow text-chrome/35">Credentials</dt>
                    <dd className="mt-1.5 text-chrome/70">
                      {site.aseYears} years, ASE certified master technician ·
                      gas &amp; diesel · dealer certified Ford, GM and Chrysler
                      diesel
                    </dd>
                  </div>
                </dl>

                <a
                  href={site.gmbUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 flex items-center gap-2.5 border-t border-violet-soft/14 pt-5"
                >
                  <Stars value={site.rating} className="h-4" />
                  <span className="font-display text-[14px] font-bold">
                    {site.rating}
                  </span>
                  <span className="text-[13px] text-chrome/45">
                    · {site.reviewCount} reviews
                  </span>
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

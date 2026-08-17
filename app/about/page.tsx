import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHead from "@/components/PageHead";
import CallBand from "@/components/CallBand";
import Reveal from "@/components/Reveal";
import Stars from "@/components/Stars";
import { PhoneIcon } from "@/components/Header";
import { site, reviews } from "@/lib/site";

export const metadata: Metadata = {
  title: `About ${site.owner} — ASE Certified Mobile Mechanic, Conroe TX`,
  description: `${site.owner} has spent ${site.aseYears} years as an ASE certified technician. Game Changer Automotive is owner-operated: he answers the phone, he does the diagnosis, he turns the wrench. Conroe, Montgomery County and north Houston.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHead
        eyebrow={`Meet ${site.owner}`}
        title={
          <>
            I&rsquo;m the one who
            <br /> <span className="text-cyan">answers the phone.</span>
          </>
        }
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/about", label: "About" },
        ]}
      />

      <section className="bg-carbon pb-16 sm:pb-20">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
            <div className="space-y-5 text-[17px] leading-relaxed text-chrome/72">
              <p className="text-[19px] font-medium text-chrome/90">
                My name is {site.owner}. People around {site.baseCity} call me{" "}
                {site.ownerNickname.replace(`${site.ownerShort} the `, "")}
                &mdash;{" "}
                <span className="italic">{site.ownerNickname}</span>. I&rsquo;ve
                been an ASE certified technician for {site.aseYears} years, and
                Game Changer Automotive is me, my tools and my truck.
              </p>
              <p>
                I started this because of the part of the job I could never
                stomach in a shop: the handoff. You bring a car in, you describe
                the problem to somebody at a desk, they write it on a ticket,
                the ticket comes back to me, and by then half of what you said
                is gone. Then the number goes back out through that same desk,
                with a margin stacked on it, and you never once talked to the
                person who actually looked at your car.
              </p>
              <p>
                So I cut all of that out. You call me, you tell me what
                it&rsquo;s doing, and I drive to wherever your car is. Your
                driveway. Your office parking lot. The shoulder of 45, if
                that&rsquo;s where it quit. I bring the scan tools, the meters
                and the hand tools, and I work on your car and nobody
                else&rsquo;s until it&rsquo;s done.
              </p>
              <p>
                I&rsquo;m going to tell you the truth about what I find, even
                when the truth is &ldquo;this isn&rsquo;t worth fixing.&rdquo;
                I&rsquo;ve got no service advisor upstairs with a number to hit,
                so I can afford to say it. I&rsquo;ll send you photos of what I
                found so you&rsquo;re not just taking my word for it. And I
                won&rsquo;t leave until the repair is complete and correct —
                honest, transparent and open about everything I do. That&rsquo;s
                not a slogan; it&rsquo;s just how I was taught.
              </p>
              <p>
                One more thing. I&rsquo;m disabled-owned, and everybody is
                welcome here — no exceptions, no attitude. If you&rsquo;ve been
                talked down to at a shop before, you won&rsquo;t be here.
              </p>

              <div className="pt-4">
                <p className="font-display text-[30px] font-black italic leading-none text-cyan">
                  {site.owner}
                </p>
                <p className="mt-2 text-[14px] text-chrome/45">
                  Owner &amp; technician, Game Changer Automotive ·{" "}
                  {site.aseYears} years ASE certified
                </p>
              </div>

              <div className="flex flex-wrap gap-3 pt-3">
                <a href={site.phoneHref} className="btn btn-call text-[16px]">
                  <PhoneIcon className="h-[18px] w-[18px]" />
                  {site.phone}
                </a>
                <a href={site.smsHref} className="btn btn-outline text-[16px]">
                  Text me instead
                </a>
              </div>
            </div>

            <Reveal delay={0.08}>
              <div className="space-y-5">
                <div className="relative overflow-hidden rounded-2xl border border-violet-soft/20">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src="/img/real-card.jpg"
                      alt={`${site.owner}'s business card`}
                      fill
                      sizes="(max-width:1023px) 100vw, 44vw"
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-2xl border border-violet-soft/20">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src="/img/real-timing-belt.jpg"
                      alt="A timing belt service in progress on a Honda engine, lit by a work light"
                      fill
                      sizes="(max-width:1023px) 100vw, 44vw"
                      className="object-cover object-[60%_40%]"
                    />
                  </div>
                  <p className="bg-carbon-2 px-4 py-3 font-mono text-[11.5px] leading-relaxed text-chrome/45">
                    One of mine. Timing belt, tensioner, idlers and water pump —
                    all together, because doing them separately means paying the
                    labor twice.
                  </p>
                </div>

                <a
                  href={site.gmbUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-2xl border border-violet-soft/20 bg-white/[0.035] px-5 py-4 transition-colors hover:border-cyan/40"
                >
                  <Stars value={site.rating} className="h-4" />
                  <span className="font-display text-[16px] font-bold">
                    {site.rating}
                  </span>
                  <span className="text-[13.5px] text-chrome/50">
                    · {site.reviewCount} Google reviews
                  </span>
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="on-light bg-paper py-16 text-steel-dark sm:py-20">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
          <h2 className="max-w-[18ch] font-display text-[clamp(1.8rem,4.6vw,2.7rem)] font-black italic leading-[1] tracking-[-0.03em]">
            The one nobody else could fix.
          </h2>
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-14">
            <div className="space-y-4 text-[16.5px] leading-relaxed text-steel">
              <p>
                A customer had a truck down for months. The brakes kept locking
                up. It had been to several shops. Parts had been replaced —
                plenty of them — and nobody had found it.
              </p>
              <p>
                That&rsquo;s the kind of job that gets abandoned, because
                finding it takes longer than the flat-rate book allows. On a
                shop ticket, that hour of testing is a loss. When it&rsquo;s
                your own name on the truck, it&rsquo;s just the job.
              </p>
              <p className="font-display text-[18px] font-semibold italic text-steel-dark">
                He stayed on it until it was figured out. The truck went back on
                the road.
              </p>
            </div>
            <figure className="rounded-2xl border border-steel/12 bg-white p-6 shadow-[0_20px_50px_-32px_rgba(20,16,40,0.5)] sm:p-7">
              <span
                className="font-display text-[44px] leading-none text-violet/25"
                aria-hidden
              >
                &ldquo;
              </span>
              <blockquote className="-mt-3 text-[16px] leading-relaxed text-steel-dark">
                {reviews[1].quote}
              </blockquote>
              <figcaption className="mt-5 border-t border-steel/12 pt-4">
                <p className="font-display text-[15px] font-bold">
                  {reviews[1].author}
                </p>
                <p className="mt-0.5 font-mono text-[11.5px] uppercase tracking-[0.14em] text-violet">
                  Google review
                </p>
              </figcaption>
            </figure>
          </div>

          <div className="mt-10">
            <Link href="/our-work" className="btn btn-primary text-[15.5px]">
              See more of the work →
            </Link>
          </div>
        </div>
      </section>

      <CallBand
        heading="Talk to me, not a call center."
        sub={`That number rings my phone, ${site.hoursLong}. ${site.callOutFee} to come out and it comes off your bill. — ${site.owner}`}
      />
    </>
  );
}

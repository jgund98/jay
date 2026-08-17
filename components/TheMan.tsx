import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import Reveal from "./Reveal";
import { GCMark } from "./Logo";

/*
 * The owner section. There is no photograph of Jay anywhere public — so
 * rather than borrow a stranger's face, this leans on the thing he actually
 * hands people: his card, and one of his own jobs.
 *
 * ⚠️ JORDAN: get a real photo of Jay with his truck and swap it in here.
 * It's the single biggest upgrade left on this page.
 */

export default function TheMan() {
  return (
    <section className="relative overflow-hidden bg-carbon py-20 sm:py-24">
      <div
        className="pointer-events-none absolute right-0 top-0 h-[520px] w-[520px] rounded-full opacity-25 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(255,61,196,0.5), transparent 68%)",
        }}
      />

      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.06fr_0.94fr] lg:items-center lg:gap-16">
          <div>
            <p className="eyebrow text-cyan">One man, one truck</p>
            <h2 className="mt-3 font-display text-[clamp(2rem,5vw,3.1rem)] font-black italic leading-[0.98] tracking-[-0.03em]">
              You get {site.owner}.
              <br className="hidden sm:block" /> Every time.
            </h2>
            <div className="mt-6 space-y-4 text-[16.5px] leading-relaxed text-chrome/65">
              <p>
                Twenty-five years, ASE certified, and no employees to hand your
                car off to. The person who answers the phone is the person who
                diagnoses it, the person who turns the wrench, and the person
                whose name is on the truck.
              </p>
              <p>
                That&rsquo;s the whole business model. It&rsquo;s also why he
                can afford to tell you a repair isn&rsquo;t worth doing —
                there&rsquo;s no service advisor upstairs with a monthly number
                to hit.
              </p>
              <p className="border-l-2 border-violet/60 pl-5 font-display text-[18px] font-semibold italic leading-snug text-chrome/85">
                &ldquo;{site.tagline}&rdquo;
                <span className="mt-1.5 block font-sans text-[13px] font-normal not-italic text-chrome/40">
                  — {site.owner}&rsquo;s own words, off his own truck
                </span>
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/about" className="btn btn-primary text-[15.5px]">
                Read Jay&rsquo;s story
              </Link>
              <a
                href={site.smsHref}
                className="btn btn-outline text-[15.5px]"
              >
                Text him directly
              </a>
            </div>
          </div>

          <Reveal>
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl border border-violet-soft/20">
                <div className="relative aspect-[4/3]">
                  <Image
                    src="/img/real-card.jpg"
                    alt={`${site.owner}'s business card resting on a shop towel`}
                    fill
                    sizes="(max-width:1023px) 100vw, 46vw"
                    className="object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-carbon via-transparent to-transparent opacity-70" />
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3">
                {[
                  [`${site.aseYears}`, "years, ASE certified"],
                  [site.callOutFee, "to roll out, off your bill"],
                  ["24/7", "he answers it himself"],
                ].map(([big, small]) => (
                  <div
                    key={small}
                    className="rounded-xl border border-violet-soft/16 bg-white/[0.03] p-4"
                  >
                    <p className="font-display text-[clamp(1.3rem,3.4vw,1.8rem)] font-black italic leading-none text-cyan">
                      {big}
                    </p>
                    <p className="mt-2 text-[12.5px] leading-snug text-chrome/50">
                      {small}
                    </p>
                  </div>
                ))}
              </div>

              <GCMark className="pointer-events-none absolute -bottom-8 -left-8 h-24 w-auto opacity-20" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

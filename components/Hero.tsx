"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import { site, coreCities, allCities } from "@/lib/site";
import Stars from "./Stars";
import { PhoneIcon } from "./Header";

const rise = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.055, ease: EASE },
  }),
};

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-carbon pt-[76px] lg:pt-[88px]">
      {/* atmosphere */}
      <div className="grid-fade pointer-events-none absolute inset-0" />
      <div
        className="pointer-events-none absolute -left-[18%] top-[-10%] h-[560px] w-[560px] rounded-full opacity-40 blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, rgba(139,61,255,0.55), transparent 66%)",
        }}
      />
      <div
        className="pointer-events-none absolute right-[-12%] top-[26%] h-[480px] w-[480px] rounded-full opacity-30 blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, rgba(56,225,232,0.45), transparent 68%)",
        }}
      />

      <div
        className="
          relative mx-auto grid max-w-[1240px] gap-6 px-4 pb-6 pt-6 sm:px-6
          [grid-template-areas:'head''media''copy']
          lg:min-h-[calc(100svh-140px)] lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-x-12 lg:pb-8 lg:pt-0
          lg:[grid-template-areas:'head_media''copy_media']
          lg:[grid-template-rows:auto_auto]
        "
      >
        {/* ── headline ─────────────────────────────────────── */}
        <div className="[grid-area:head] lg:self-end">
          <motion.div
            custom={0}
            initial="hidden"
            animate="show"
            variants={rise}
            className="inline-flex items-center gap-2.5 rounded-full border border-cyan/30 bg-cyan/[0.07] py-1.5 pl-2 pr-3.5"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
            </span>
            <span className="eyebrow text-cyan">
              Open 24 hours · Answering now
            </span>
          </motion.div>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="show"
            variants={rise}
            className="mt-4 font-display text-[clamp(2.5rem,8.6vw,4.9rem)] font-black italic leading-[0.94] tracking-[-0.03em]"
          >
            <span className="block text-chrome">Your mechanic</span>
            <span
              className="grad-text"
              style={{
                backgroundImage:
                  "linear-gradient(104deg,#F2F4FF 0%,#B7A6FF 24%,#8B3DFF 52%,#C24BE8 74%,#FF3DC4 100%)",
              }}
            >
              drives to you.
            </span>
          </motion.h1>
        </div>

        {/* ── media ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="relative [grid-area:media] lg:h-[min(74svh,620px)]"
        >
          <div className="relative h-[46svh] min-h-[240px] overflow-hidden rounded-2xl border border-violet-soft/18 sm:h-[52svh] lg:h-full lg:rounded-[20px]">
            <Image
              src="/img/hero-hood.jpg"
              alt="Mobile mechanic working under the open hood of a car at a customer's home"
              fill
              priority
              sizes="(max-width: 1023px) 100vw, 48vw"
              className="object-cover object-[62%_center]"
            />
            {/* brand grade */}
            <div className="absolute inset-0 bg-gradient-to-tr from-violet-deep/55 via-transparent to-cyan/12 mix-blend-color" />
            <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/12 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-carbon/70 via-transparent to-transparent lg:from-carbon/45" />

            <div className="absolute bottom-3 right-3 rounded-xl border border-white/15 bg-carbon/72 px-3.5 py-2.5 backdrop-blur-md">
              <p className="font-display text-[13px] font-extrabold uppercase leading-none tracking-wide text-cyan">
                {site.aseYears} Years
              </p>
              <p className="mt-1 text-[11.5px] leading-none text-chrome/60">
                ASE Certified Technician
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── copy + CTAs ──────────────────────────────────── */}
        <div className="[grid-area:copy] lg:self-start">
          <motion.p
            custom={2}
            initial="hidden"
            animate="show"
            variants={rise}
            className="max-w-[38ch] text-[17px] leading-relaxed text-chrome/70 sm:text-[18.5px]"
          >
            {site.owner} has been fixing cars for {site.aseYears} years. He
            brings the diagnostic tools, the parts and the torque wrench to your
            driveway, so you never sit in a waiting room again.
          </motion.p>

          <motion.div
            custom={3}
            initial="hidden"
            animate="show"
            variants={rise}
            className="mt-6 flex flex-wrap gap-3"
          >
            <a
              href={site.phoneHref}
              className="btn btn-call flex-1 text-[16px] sm:flex-none"
              data-analytics="hero-call"
            >
              <PhoneIcon className="h-[18px] w-[18px]" />
              {site.phone}
            </a>
            <Link
              href="/#scan"
              className="btn btn-primary flex-1 text-[16px] sm:flex-none"
            >
              What&rsquo;s wrong with my car?
            </Link>
          </motion.div>

          <motion.div
            custom={4}
            initial="hidden"
            animate="show"
            variants={rise}
            className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3"
          >
            <a
              href={site.gmbUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Stars value={site.rating} className="h-[15px]" />
              <span className="text-[13.5px] text-chrome/60">
                <b className="font-display font-bold text-chrome">
                  {site.rating}
                </b>{" "}
                on Google
              </span>
            </a>
            <span className="h-4 w-px bg-violet-soft/25" />
            <span className="text-[13.5px] text-chrome/60">
              <b className="font-display font-bold text-chrome">
                {site.callOutFee}
              </b>{" "}
              to roll out — {site.callOutNote}
            </span>
          </motion.div>
        </div>
      </div>

      {/* ── towns strip ──────────────────────────────────── */}
      <div className="relative border-t border-violet-soft/12 bg-carbon-2/60 py-3 backdrop-blur-sm">
        <div className="flex items-center gap-3 overflow-hidden">
          <span className="eyebrow shrink-0 pl-4 text-chrome/35 sm:pl-6">
            Rolling to
          </span>
          <div className="relative flex-1 overflow-hidden">
            <div className="flex w-max animate-[gcmarquee_38s_linear_infinite] gap-0 motion-reduce:animate-none">
              {[0, 1].map((dup) => (
                <div key={dup} className="flex gap-0" aria-hidden={dup === 1}>
                  {allCities.map((c) => (
                    <span
                      key={c}
                      className={`whitespace-nowrap px-4 font-display text-[14.5px] font-semibold ${
                        coreCities.includes(c as (typeof coreCities)[number])
                          ? "text-cyan/85"
                          : "text-chrome/40"
                      }`}
                    >
                      {c}
                      <span className="pl-4 text-violet/50">/</span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-carbon-2 via-carbon-2/85 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-carbon-2 to-transparent" />
          </div>
        </div>
      </div>

    </section>
  );
}


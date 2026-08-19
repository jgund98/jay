import Link from "next/link";
import Logo from "./Logo";
import { site, services, allCities, coreCities } from "@/lib/site";
import { PhoneIcon } from "./Header";
import Stars from "./Stars";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-violet-soft/15 bg-carbon-2 pb-[92px] pt-16 md:pb-14">
      <div className="weave pointer-events-none absolute inset-0 opacity-70" />

      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr] md:gap-8 lg:gap-14">
          <div>
            <Link href="/" className="inline-flex" aria-label={`${site.name} — home`}>
              <Logo
                markClassName="h-14 w-auto"
                wordClassName="h-[26px] w-auto"
              />
            </Link>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-chrome/60">
              Owner-operated mobile auto repair out of {site.baseCity}, Texas.{" "}
              {site.owner} is a {site.aseYears}-year ASE certified technician;
              his partner {site.partner} is a {site.partnerRole}. Between them
              they bring the shop to your driveway.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href={site.phoneHref} className="btn btn-call text-[15px]">
                <PhoneIcon />
                {site.phone}
              </a>
              <a
                href={site.smsHref}
                className="btn btn-outline px-4 py-2.5 text-[14px]"
              >
                Text Jay
              </a>
            </div>

            <a
              href={site.gmbUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2.5 rounded-xl border border-violet-soft/20 bg-white/[0.04] px-3.5 py-2.5 transition-colors hover:border-cyan/40"
            >
              <Stars value={site.rating} className="h-4" />
              <span className="font-display text-[14px] font-bold text-chrome">
                {site.rating}
              </span>
              <span className="text-[13px] text-chrome/50">
                · {site.reviewCount} Google reviews
              </span>
            </a>
          </div>

          <nav aria-label="Services">
            <h3 className="eyebrow text-cyan/75">Services</h3>
            <ul className="mt-4 space-y-2.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-[15px] text-chrome/65 transition-colors hover:text-cyan"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="eyebrow text-cyan/75">Company</h3>
            <ul className="mt-4 space-y-2.5">
              {[
                ["/about", "About Jay"],
                ["/our-work", "Our Work"],
                ["/service-area", "Service Area"],
                ["/contact", "Get a Quote"],
                [site.reviewUrl, "Leave a Review"],
              ].map(([href, label]) => (
                <li key={label}>
                  {href.startsWith("http") ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[15px] text-chrome/65 transition-colors hover:text-cyan"
                    >
                      {label}
                    </a>
                  ) : (
                    <Link
                      href={href}
                      className="text-[15px] text-chrome/65 transition-colors hover:text-cyan"
                    >
                      {label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            <h3 className="eyebrow mt-8 text-cyan/75">Hours</h3>
            <p className="mt-3 font-display text-[17px] font-bold text-chrome">
              {site.hours}
            </p>
            <p className="text-[13.5px] text-chrome/50">
              Nights and weekends included.
            </p>
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-violet-soft/12 bg-white/[0.025] p-5 sm:p-6">
          <h3 className="eyebrow text-chrome/45">Proudly serving</h3>
          <p className="mt-2.5 text-[14.5px] leading-relaxed text-chrome/55">
            {coreCities.join(", ")} — plus{" "}
            {allCities
              .filter((c) => !coreCities.includes(c as (typeof coreCities)[number]))
              .join(", ")}{" "}
            and the rest of Montgomery County and north Houston.
          </p>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-5 border-t border-violet-soft/12 pt-7 sm:flex-row sm:items-center">
          <p className="text-[13px] text-chrome/40">
            © {year} {site.legalName}. All rights reserved.
          </p>
          <a
            href="https://epicdevsolutions.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-[13px] text-chrome/40 transition-colors hover:text-chrome/80"
          >
            Site by
            <span className="font-display font-extrabold tracking-tight text-chrome/65 transition-colors group-hover:text-cyan">
              Epic Dev Solutions
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}

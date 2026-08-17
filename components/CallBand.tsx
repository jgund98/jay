import Link from "next/link";
import { site } from "@/lib/site";
import { PhoneIcon } from "./Header";
import { GCMark } from "./Logo";

export default function CallBand({
  heading = "Car in the driveway, not going anywhere?",
  sub,
}: {
  heading?: string;
  sub?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-carbon-3 py-16 sm:py-20">
      <div
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{
          background:
            "radial-gradient(ellipse 90% 130% at 15% 50%, rgba(139,61,255,0.32), transparent 62%), radial-gradient(ellipse 70% 120% at 88% 20%, rgba(255,61,196,0.22), transparent 60%)",
        }}
      />
      <GCMark className="pointer-events-none absolute -right-16 top-1/2 h-[300px] w-auto -translate-y-1/2 opacity-[0.07] sm:-right-8 lg:right-6 lg:opacity-[0.1]" />

      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6">
        <div className="max-w-[36ch]">
          <p className="eyebrow text-cyan">{site.hours}</p>
          <h2 className="mt-3 font-display text-[clamp(1.9rem,5vw,3rem)] font-black italic leading-[0.98] tracking-[-0.03em]">
            {heading}
          </h2>
          <p className="mt-4 max-w-[42ch] text-[16.5px] leading-relaxed text-chrome/65">
            {sub ??
              `${site.owner} answers his own phone, ${site.hoursLong}. ${site.callOutFee} to come out, ${site.callOutNote}.`}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={site.phoneHref}
              className="btn btn-call text-[16px]"
              data-analytics="band-call"
            >
              <PhoneIcon className="h-[18px] w-[18px]" />
              {site.phone}
            </a>
            <Link href="/contact" className="btn btn-primary text-[16px]">
              Get a Quote
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

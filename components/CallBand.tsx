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

      {/* Copy left, CTAs right, so the band actually uses its width. It used
          to be one narrow left column with the whole right half empty — and
          the column was capped at max-w-[36ch], where `ch` resolves against
          the WRAPPER's 16px font, not the 48px heading inside it. That worked
          out to ~290px and stacked the headline four lines deep. Cap wrappers
          in pixels; keep `ch` on the element whose font it should measure. */}
      <div className="relative mx-auto flex max-w-[1240px] flex-col gap-9 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-14">
        <div className="max-w-[640px]">
          <p className="eyebrow text-cyan">{site.hours}</p>
          <h2 className="mt-3 font-display text-[clamp(1.9rem,5vw,3rem)] font-black italic leading-[1.02] tracking-[-0.03em]">
            {heading}
          </h2>
          <p className="mt-4 text-[16.5px] leading-relaxed text-chrome/65">
            {sub ??
              `${site.owner} answers his own phone, ${site.hoursLong}. The ${site.callOutFee} ${site.callOutLabel} is ${site.callOutNote}.`}
          </p>
        </div>

        <div className="flex flex-wrap gap-3 lg:shrink-0">
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
    </section>
  );
}

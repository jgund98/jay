import Image from "next/image";
import { site } from "@/lib/site";
import Reveal, { Stagger, Item } from "./Reveal";

/*
 * A light section — the brand is electric-on-carbon, so the page has to
 * breathe somewhere. This is the shop-vs-driveway comparison, and it's the
 * strongest argument the business has.
 */

const shop = [
  "Drop it off before work, hope for a ride home",
  "Sits in a queue behind eleven other cars",
  "You talk to a service advisor, not the tech",
  "Diagnostic fee, whether or not they find it",
  "Called at 4:45 with a number and no photos",
];

const jay = [
  "He comes to your driveway, your office, your parking lot",
  "You are the only car he is working on",
  "You talk to the man holding the wrench",
  `${site.callOutFee} to roll out, ${site.callOutNote}`,
  "Photos of what he found, sent to your phone",
];

export default function WhyMobile() {
  return (
    <section className="on-light relative bg-paper py-20 text-steel-dark sm:py-24">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
          <Reveal>
            <div>
              <div className="relative">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl sm:aspect-[5/4] lg:aspect-[4/5]">
                  <Image
                    src="/img/work-outdoor-engine.jpg"
                    alt="A mechanic working under an open hood outdoors, away from any shop"
                    fill
                    sizes="(max-width:1023px) 100vw, 42vw"
                    className="object-cover object-[58%_center]"
                  />
                </div>
                {/* the real job photo, overlapping — proof, not decoration */}
                <div className="absolute -bottom-8 -right-3 w-[42%] overflow-hidden rounded-xl border-4 border-paper shadow-[0_24px_50px_-20px_rgba(20,16,40,0.55)] sm:-right-5 sm:w-[36%]">
                  <div className="relative aspect-[3/4]">
                    <Image
                      src="/img/real-found-it.jpg"
                      alt="A coolant leak circled in red on the engine — one of Jay's own diagnostic photos sent to a customer"
                      fill
                      sizes="240px"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
              <p className="mt-5 max-w-[52%] font-mono text-[11.5px] leading-relaxed text-steel">
                An actual photo {site.ownerShort} sent a customer.
                <br />
                Circled in red: the leak.
              </p>
            </div>
          </Reveal>

          <div>
            <p className="eyebrow text-violet">Why mobile</p>
            <h2 className="mt-3 font-display text-[clamp(2rem,5vw,3.1rem)] font-black italic leading-[0.98] tracking-[-0.03em] text-steel-dark">
              The shop was never
              <br className="hidden sm:block" /> the point.
            </h2>
            <p className="mt-5 max-w-[46ch] text-[17px] leading-relaxed text-steel">
              A building full of lifts exists so a shop can work on twenty cars
              at once. It has nothing to do with fixing yours better. Almost
              everything short of an engine rebuild can be done properly in your
              own driveway — by somebody who is only working on your car.
            </p>

            <Stagger className="mt-9 grid gap-4 sm:grid-cols-2">
              <Item>
                <div className="h-full rounded-2xl border border-steel/15 bg-paper-2/70 p-5">
                  <p className="eyebrow text-steel/60">The usual way</p>
                  <ul className="mt-4 space-y-3">
                    {shop.map((s) => (
                      <li
                        key={s}
                        className="flex items-start gap-2.5 text-[14.5px] leading-snug text-steel"
                      >
                        <XIcon />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </Item>
              <Item>
                <div className="relative h-full overflow-hidden rounded-2xl border border-violet/25 bg-white p-5 shadow-[0_20px_50px_-28px_rgba(139,61,255,0.75)]">
                  <div
                    className="absolute inset-x-0 top-0 h-[3px]"
                    style={{
                      background:
                        "linear-gradient(90deg,#8B3DFF,#38E1E8,#FF3DC4)",
                    }}
                  />
                  <p className="eyebrow text-violet">With {site.ownerShort}</p>
                  <ul className="mt-4 space-y-3">
                    {jay.map((s) => (
                      <li
                        key={s}
                        className="flex items-start gap-2.5 text-[14.5px] font-medium leading-snug text-steel-dark"
                      >
                        <CheckIcon />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </Item>
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 20 20" className="mt-[3px] h-[15px] w-[15px] shrink-0" aria-hidden>
      <path
        d="M6 6l8 8M14 6l-8 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className="text-steel/45"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" className="mt-[2px] h-[16px] w-[16px] shrink-0" aria-hidden>
      <circle cx="10" cy="10" r="9" fill="url(#gc-chk)" />
      <path
        d="M6 10.4l2.6 2.6L14.2 7.4"
        stroke="#fff"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <defs>
        <linearGradient id="gc-chk" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8B3DFF" />
          <stop offset="100%" stopColor="#FF3DC4" />
        </linearGradient>
      </defs>
    </svg>
  );
}

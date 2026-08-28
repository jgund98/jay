import Image from "next/image";
import Link from "next/link";
import { site, team } from "@/lib/site";
import { PhoneIcon } from "./Header";
import { GCMark } from "./Logo";
import { Stagger, Item } from "./Reveal";

/*
 * "Who actually shows up" — the section Jay asked for, so customers see who
 * is coming before they call.
 *
 * The portraits read from `team[].photo` in lib/site.ts — real photographs
 * of the two of them, cut out of the flyers Jay sent. If `photo` is ever
 * null the card falls back to a branded monogram rather than a stock face,
 * because a stranger's face here would break the only promise this section
 * makes.
 */

export default function WhoShowsUp() {
  return (
    <section className="relative overflow-hidden bg-carbon-2 py-20 sm:py-24">
      <div className="weave pointer-events-none absolute inset-0" />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full opacity-25 blur-[120px]"
        style={{
          background:
            "radial-gradient(ellipse, rgba(139,61,255,0.6), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1100px] px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-cyan">Who shows up</p>
          <h2 className="mt-3 font-display text-[clamp(2rem,5.4vw,3.2rem)] font-black italic leading-[0.98] tracking-[-0.03em]">
            Two owners. No strangers.
          </h2>
          <p className="mx-auto mt-4 max-w-[46ch] text-[16.5px] leading-relaxed text-chrome/60">
            You are handing someone your keys and your driveway. Here is exactly
            who is going to be standing next to your car.
          </p>
        </div>

        <Stagger className="mt-10 grid gap-5 sm:grid-cols-2">
          {team.map((m) => (
            <Item key={m.name} className="h-full">
              <div className="edge-card group flex h-full flex-col overflow-hidden">
                {/* Square, because the source photos are square. A tighter
                    frame would crop straight back into the zoom the wider crop
                    was made to undo. The monogram fallback gets a short band
                    instead — a tall block of gradient looks like a broken
                    image rather than a design. */}
                <div
                  className={`relative w-full overflow-hidden ${
                    m.photo ? "aspect-square" : "h-[124px] sm:h-[140px]"
                  }`}
                >
                  {m.photo ? (
                    <Image
                      src={m.photo}
                      alt={`${m.name}, ${m.role} at ${site.name}`}
                      fill
                      sizes="(max-width:639px) 100vw, 50vw"
                      className="object-cover object-center transition-transform duration-[900ms] group-hover:scale-[1.04]"
                    />
                  ) : (
                    /* Branded monogram, not a stock face — see lib/site.ts */
                    <div className="relative grid h-full w-full place-items-center bg-carbon">
                      <div
                        className="absolute inset-0 opacity-70"
                        style={{
                          background:
                            "radial-gradient(ellipse at 30% 20%, rgba(139,61,255,0.35), transparent 62%), radial-gradient(ellipse at 78% 84%, rgba(56,225,232,0.22), transparent 60%)",
                        }}
                      />
                      <GCMark className="pointer-events-none absolute -right-5 bottom-1 h-16 w-auto opacity-[0.12]" />
                      <span
                        className="relative font-display text-[clamp(2.4rem,6.5vw,3.4rem)] font-black italic leading-none tracking-tight"
                        style={{
                          backgroundImage:
                            "linear-gradient(120deg,#F2F4FF,#B7A6FF 38%,#8B3DFF 66%,#FF3DC4)",
                          WebkitBackgroundClip: "text",
                          backgroundClip: "text",
                          color: "transparent",
                        }}
                      >
                        {m.initials}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="font-display text-[22px] font-extrabold leading-tight text-chrome">
                    {m.name}
                  </h3>
                  <p className="mt-1 font-display text-[13.5px] font-bold uppercase tracking-[0.12em] text-cyan">
                    {m.role}
                  </p>
                  <p className="mt-3 text-[13px] font-medium text-chrome/45">
                    {m.credential}
                  </p>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-chrome/65">
                    {m.blurb}
                  </p>
                  <a
                    href={m.phoneHref}
                    className="btn btn-call mt-5 w-full text-[15px]"
                    data-analytics="team-call"
                  >
                    <PhoneIcon />
                    Call {m.first}
                  </a>
                  <p className="mt-2 text-center font-mono text-[12.5px] tracking-wide text-chrome/40">
                    {m.phone}
                  </p>
                </div>
              </div>
            </Item>
          ))}
        </Stagger>

        <p className="mx-auto mt-7 max-w-[54ch] text-center text-[14px] leading-relaxed text-chrome/45">
          Same two people, every visit. No rotating crew, no subcontractor, and
          nobody you have to explain your car to twice.{" "}
          <Link
            href="/about"
            className="font-semibold text-cyan underline-offset-4 hover:underline"
          >
            Read Jay&rsquo;s story
          </Link>
        </p>
      </div>
    </section>
  );
}

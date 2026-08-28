import Image from "next/image";
import Link from "next/link";
import { services } from "@/lib/site";
import { Stagger, Item } from "./Reveal";

export default function ServicesGrid({
  heading = "What Jay fixes",
  intro,
  exclude,
}: {
  heading?: string;
  intro?: string;
  exclude?: string;
}) {
  /* On a service page this runs as a "related" strip — four cards, one clean
     row, no hero card. On the home page it's the full set, laid out so the
     grid ends flush. */
  const related = Boolean(exclude);
  const list = related
    ? services.filter((s) => s.slug !== exclude).slice(0, 4)
    : services;

  /* The grid is 2 columns at sm, 4 at lg, and the lead card eats a 2x2 block
     at lg (a whole row at sm). How many trailing cards have to widen to make
     that come out flush depends on how many services there are — the old code
     always widened exactly one, which happened to be right for eight and left
     a hole plus an orphan the moment a ninth was added. Compute it instead. */
  const n = list.length;
  const lgFill = related ? 0 : (4 - ((4 + (n - 1)) % 4)) % 4;
  const smFill = related ? 0 : (n - 1) % 2;

  return (
    <section className="relative overflow-hidden bg-carbon-2 py-20 sm:py-24">
      <div className="weave pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="eyebrow text-cyan">Services</p>
            <h2 className="mt-3 font-display text-[clamp(2rem,5vw,3.1rem)] font-black italic leading-[0.98] tracking-[-0.03em]">
              {heading}
            </h2>
            {intro && (
              <p className="mt-4 text-[16.5px] leading-relaxed text-chrome/60">
                {intro}
              </p>
            )}
          </div>
          <Link
            href="/services"
            className="btn btn-outline px-5 py-2.5 text-[14.5px]"
          >
            All services →
          </Link>
        </div>

        <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((s, i) => {
            const wideSm = !related && i > 0 && i >= n - smFill;
            const wideLg = !related && i > 0 && i >= n - lgFill;
            return (
            <Item
              key={s.slug}
              className={
                related
                  ? ""
                  : i === 0
                    ? "sm:col-span-2 lg:col-span-2 lg:row-span-2"
                    : [
                        wideSm ? "sm:col-span-2" : "",
                        wideLg
                          ? "lg:col-span-2"
                          : wideSm
                            ? "lg:col-span-1"
                            : "",
                      ]
                        .filter(Boolean)
                        .join(" ")
              }
            >
              <Link
                href={`/services/${s.slug}`}
                className="edge-card group flex h-full flex-col overflow-hidden"
              >
                <div
                  className={`relative w-full overflow-hidden ${
                    !related && i === 0 ? "aspect-[16/10] lg:aspect-[16/11]" : "aspect-[16/9]"
                  }`}
                >
                  <Image
                    src={s.image}
                    alt={s.imageAlt}
                    fill
                    sizes={
                      !related && i === 0 ? "(max-width:639px) 100vw, (max-width:1023px) 100vw, 50vw"
                        : "(max-width:639px) 100vw, (max-width:1023px) 50vw, 25vw"
                    }
                    className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-carbon-2 via-carbon-2/25 to-transparent" />
                  <div className="absolute inset-0 bg-violet-deep/25 mix-blend-color opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3
                    className={`font-display font-extrabold leading-tight text-chrome transition-colors group-hover:text-cyan ${
                      !related && i === 0 ? "text-[clamp(1.3rem,3vw,1.75rem)]" : "text-[19px]"
                    }`}
                  >
                    {s.name}
                  </h3>
                  <p
                    className={`mt-2 leading-relaxed text-chrome/55 ${
                      !related && i === 0 ? "text-[15.5px]" : "text-[14px]"
                    }`}
                  >
                    {!related && i === 0 ? s.blurb : s.short}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 font-display text-[13.5px] font-bold text-violet-soft transition-colors group-hover:text-cyan">
                    See details
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </div>
              </Link>
            </Item>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}

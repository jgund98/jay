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
          {list.map((s, i) => (
            <Item
              key={s.slug}
              /* The lead card takes a 2×2 block; the last card widens to two
                 columns so the grid ends flush instead of leaving an orphan
                 hole in the bottom-right. */
              className={
                related
                  ? ""
                  : i === 0
                    ? "sm:col-span-2 lg:col-span-2 lg:row-span-2"
                    : i === list.length - 1
                      ? "lg:col-span-2"
                      : ""
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
          ))}
        </Stagger>
      </div>
    </section>
  );
}

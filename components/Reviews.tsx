import { reviews, site } from "@/lib/site";
import Stars from "./Stars";
import { Stagger, Item } from "./Reveal";

export default function Reviews() {
  return (
    <section className="on-light relative bg-paper-2 py-20 text-steel-dark sm:py-24">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="eyebrow text-violet">In their words</p>
            <h2 className="mt-3 font-display text-[clamp(2rem,5vw,3.1rem)] font-black italic leading-[0.98] tracking-[-0.03em] text-steel-dark">
              {site.rating} stars, and
              <br className="hidden sm:block" /> not a single upsell.
            </h2>
          </div>
          <a
            href={site.gmbUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-xl border border-steel/20 bg-white px-4 py-3 shadow-sm transition-shadow hover:shadow-md"
          >
            <Stars value={site.rating} className="h-4" />
            <span className="font-display text-[15px] font-bold text-steel-dark">
              {site.rating}
            </span>
            <span className="text-[13.5px] text-steel">
              · {site.reviewCount} Google reviews
            </span>
          </a>
        </div>

        <Stagger className="mt-10 grid gap-5 lg:grid-cols-3">
          {reviews.map((r) => (
            <Item key={r.author} className="h-full">
              <figure className="flex h-full flex-col rounded-2xl border border-steel/12 bg-white p-6 shadow-[0_18px_44px_-30px_rgba(20,16,40,0.5)]">
                <span
                  className="font-display text-[44px] leading-none text-violet/25"
                  aria-hidden
                >
                  &ldquo;
                </span>
                <blockquote className="-mt-3 flex-1 text-[15.5px] leading-relaxed text-steel-dark">
                  {r.quote}
                </blockquote>
                <figcaption className="mt-5 border-t border-steel/12 pt-4">
                  <p className="font-display text-[15px] font-bold text-steel-dark">
                    {r.author}
                  </p>
                  <p className="mt-0.5 font-mono text-[11.5px] uppercase tracking-[0.14em] text-violet">
                    {r.tag}
                  </p>
                </figcaption>
              </figure>
            </Item>
          ))}
        </Stagger>

        <p className="mt-7 text-center text-[13.5px] text-steel/70">
          Reviews published on {site.name}&rsquo;s Google Business Profile.{" "}
          <a
            href={site.reviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-violet underline-offset-4 hover:underline"
          >
            Add yours
          </a>
          .
        </p>
      </div>
    </section>
  );
}

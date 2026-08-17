import Link from "next/link";
import { GCMark } from "./Logo";

export default function PageHead({
  eyebrow,
  title,
  intro,
  crumbs,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  crumbs?: { href: string; label: string }[];
}) {
  return (
    <section className="relative overflow-hidden bg-carbon pb-14 pt-[110px] sm:pb-16 lg:pt-[140px]">
      <div className="grid-fade pointer-events-none absolute inset-0" />
      <div
        className="pointer-events-none absolute -left-[10%] top-[-20%] h-[440px] w-[440px] rounded-full opacity-35 blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, rgba(139,61,255,0.55), transparent 68%)",
        }}
      />
      <GCMark className="pointer-events-none absolute -right-20 top-10 h-[260px] w-auto opacity-[0.06] lg:right-0" />

      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6">
        {crumbs && (
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex flex-wrap items-center gap-1.5 font-mono text-[11.5px] uppercase tracking-[0.14em] text-chrome/35">
              {crumbs.map((c, i) => (
                <li key={c.href} className="flex items-center gap-1.5">
                  {i > 0 && <span className="text-violet/50">/</span>}
                  <Link
                    href={c.href}
                    className="transition-colors hover:text-cyan"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        )}
        <p className="eyebrow text-cyan">{eyebrow}</p>
        <h1 className="mt-3 max-w-[19ch] font-display text-[clamp(2.2rem,7vw,4.2rem)] font-black italic leading-[0.95] tracking-[-0.03em]">
          {title}
        </h1>
        {intro && (
          <p className="mt-5 max-w-[54ch] text-[17px] leading-relaxed text-chrome/60 sm:text-[18px]">
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}

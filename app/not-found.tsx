import Link from "next/link";
import { GCMark } from "@/components/Logo";
import { site } from "@/lib/site";
import { PhoneIcon } from "@/components/Header";

export default function NotFound() {
  return (
    <section className="relative grid min-h-[80svh] place-items-center overflow-hidden bg-carbon px-4 pt-24">
      <div className="grid-fade pointer-events-none absolute inset-0" />
      <div className="relative text-center">
        <GCMark className="mx-auto h-24 w-auto opacity-70" />
        <p className="eyebrow mt-8 text-cyan">Error 404</p>
        <h1 className="mt-3 font-display text-[clamp(2.2rem,7vw,3.6rem)] font-black italic leading-[0.98] tracking-[-0.03em]">
          That page didn&rsquo;t start either.
        </h1>
        <p className="mx-auto mt-4 max-w-[40ch] text-[16.5px] leading-relaxed text-chrome/60">
          The link is broken, but the phone still works.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <a href={site.phoneHref} className="btn btn-call text-[16px]">
            <PhoneIcon />
            {site.phone}
          </a>
          <Link href="/" className="btn btn-primary text-[16px]">
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}

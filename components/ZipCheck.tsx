"use client";

/*
 * "Does he come to me?" answered by ZIP. Jay asked for ZIP codes on the site
 * so people searching by ZIP find him; this turns the same list into
 * something a visitor can use. Unknown ZIPs never get a flat "no": the site's
 * standing line is "call and ask, the answer is usually yes".
 */

import { useState } from "react";
import { site, townsForZip } from "@/lib/site";

function joinTowns(towns: string[]) {
  if (towns.length < 2) return towns[0] ?? "";
  return `${towns.slice(0, -1).join(", ")} and ${towns[towns.length - 1]}`;
}

/** `withCall` adds a call link to a "yes" — only where no call button
 *  already sits directly below the checker. */
export default function ZipCheck({ withCall = false }: { withCall?: boolean }) {
  const [zip, setZip] = useState("");
  const done = zip.length === 5;
  const towns = done ? townsForZip(zip) : [];

  return (
    <div className="mt-6 max-w-[440px]">
      <label
        htmlFor="gc-zip"
        className="eyebrow block text-chrome/50"
      >
        Check your ZIP code
      </label>
      <input
        id="gc-zip"
        type="text"
        inputMode="numeric"
        autoComplete="postal-code"
        maxLength={5}
        placeholder="e.g. 77301"
        value={zip}
        onChange={(e) => setZip(e.target.value.replace(/\D/g, "").slice(0, 5))}
        className="mt-2.5 w-full rounded-lg border border-violet-soft/22 bg-white/[0.04] px-4 py-3 font-mono text-[16px] tracking-[0.12em] text-chrome placeholder:tracking-normal placeholder:text-chrome/28 transition-colors focus:border-cyan/60 focus:bg-white/[0.07] focus:outline-none"
      />
      <p aria-live="polite" className="mt-3 min-h-[3.2em] text-[15px] leading-relaxed">
        {!done ? (
          <span className="text-chrome/45">
            Type five digits and you&rsquo;ll know in a second.
          </span>
        ) : towns.length ? (
          <span className="text-chrome/75">
            <b className="font-display font-bold text-cyan">
              Yes, {zip} is covered.
            </b>{" "}
            That&rsquo;s {joinTowns(towns)}.
            {withCall && (
              <>
                {" "}
                <a
                  href={site.phoneHref}
                  className="whitespace-nowrap font-semibold text-chrome underline decoration-cyan/50 underline-offset-4 hover:decoration-cyan"
                  data-analytics="zip-call"
                >
                  Call {site.phone}
                </a>
              </>
            )}
          </span>
        ) : (
          <span className="text-chrome/75">
            <b className="font-display font-bold text-chrome">
              {zip} isn&rsquo;t on the list.
            </b>{" "}
            <a
              href={site.phoneHref}
              className="whitespace-nowrap font-semibold text-chrome underline decoration-cyan/50 underline-offset-4 hover:decoration-cyan"
              data-analytics="zip-call"
            >
              Call and ask
            </a>
            . The answer is usually yes.
          </span>
        )}
      </p>
    </div>
  );
}

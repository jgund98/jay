"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import {
  site,
  coreCities,
  QUOTE_ISSUES as ISSUES,
  QUOTE_WHERE as WHERE,
  QUOTE_URGENCY as URGENCY,
} from "@/lib/site";
import { PhoneIcon } from "./Header";

/*
 * Three steps, nothing optional that isn't. Step 1 is prefilled from The Scan
 * when the visitor arrives via ?issue=, so most people land already answered.
 *
 * Submitting POSTs to /api/quote, which emails the shop via Brevo. If that
 * send fails the route returns 502 and the form shows the "call him instead"
 * fallback — a lead should never disappear quietly.
 */


type Data = {
  issues: string[];
  where: string;
  city: string;
  urgency: string;
  vehicle: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
};

const EMPTY: Data = {
  issues: [],
  where: "",
  city: "",
  urgency: "",
  vehicle: "",
  name: "",
  phone: "",
  email: "",
  notes: "",
};

export default function QuoteForm({ prefillIssue }: { prefillIssue?: string }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Data>(EMPTY);
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const doneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefillIssue && ISSUES.some((i) => i.id === prefillIssue)) {
      setData((d) => ({ ...d, issues: [prefillIssue] }));
    }
  }, [prefillIssue]);

  useEffect(() => {
    if (sent && doneRef.current) {
      doneRef.current.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  }, [sent]);

  const toggleIssue = (id: string) =>
    setData((d) => ({
      ...d,
      issues: d.issues.includes(id)
        ? d.issues.filter((x) => x !== id)
        : [...d.issues, id],
    }));

  const canNext =
    step === 0
      ? data.issues.length > 0
      : step === 1
        ? !!data.where && !!data.urgency
        : data.name.trim().length > 0 && data.phone.trim().length >= 10;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!canNext || busy) return;
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("bad response");
      setSent(true);
    } catch {
      setError(
        `Something went wrong sending that. Please call ${site.phone} — ${site.ownerShort} will pick up.`,
      );
    } finally {
      setBusy(false);
    }
  }

  if (sent) {
    return (
      <div
        ref={doneRef}
        className="mx-auto max-w-[560px] scroll-mt-24 rounded-2xl border border-cyan/35 bg-cyan/[0.06] p-8 text-center sm:p-10"
      >
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-violet to-magenta"
        >
          <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" aria-hidden>
            <path
              d="M5 12.5l4.5 4.5L19 7.5"
              stroke="#fff"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
        <h3 className="mt-5 font-display text-[26px] font-extrabold leading-tight">
          Got it, {data.name.split(" ")[0]}.
        </h3>
        <p className="mx-auto mt-3 max-w-[38ch] text-[16px] leading-relaxed text-chrome/70">
          {site.owner} will call you back at {data.phone} himself — not an
          assistant, not a call center.
        </p>
        <p className="mt-5 text-[14.5px] text-chrome/50">
          In a hurry? Skip the wait:
        </p>
        <a href={site.phoneHref} className="btn btn-call mt-3 text-[16px]">
          <PhoneIcon />
          {site.phone}
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="mx-auto max-w-[720px] overflow-hidden rounded-2xl border border-violet-soft/22 bg-carbon-2/80 backdrop-blur"
    >
      {/* progress trace */}
      <div className="relative h-[3px] w-full bg-white/[0.06]">
        <motion.div
          className="absolute inset-y-0 left-0"
          style={{
            background: "linear-gradient(90deg,#8B3DFF,#38E1E8,#FF3DC4)",
          }}
          animate={{ width: `${((step + 1) / 3) * 100}%` }}
          transition={{ duration: 0.45, ease: EASE }}
        />
      </div>

      <div className="p-6 sm:p-8">
        <p className="eyebrow text-cyan/70">
          Step {step + 1} of 3
          <span className="pl-3 text-chrome/30">
            {step === 0
              ? "What's it doing"
              : step === 1
                ? "Where and when"
                : "How to reach you"}
          </span>
        </p>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -18 }}
            transition={{ duration: 0.28, ease: EASE }}
          >
            {step === 0 && (
              <div className="mt-4">
                <h3 className="font-display text-[clamp(1.5rem,4vw,2rem)] font-extrabold leading-tight">
                  What&rsquo;s the car doing?
                </h3>
                <p className="mt-2 text-[15px] text-chrome/55">
                  Pick everything that applies. A guess is fine — that&rsquo;s
                  what {site.ownerShort} is for.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {ISSUES.map((i) => (
                    <Chip
                      key={i.id}
                      on={data.issues.includes(i.id)}
                      onClick={() => toggleIssue(i.id)}
                    >
                      {i.label}
                    </Chip>
                  ))}
                </div>

                <Field label="Year, make and model" optional>
                  <input
                    value={data.vehicle}
                    onChange={(e) =>
                      setData({ ...data, vehicle: e.target.value })
                    }
                    placeholder="2014 Honda Accord"
                    className={inputCls}
                  />
                </Field>
              </div>
            )}

            {step === 1 && (
              <div className="mt-4">
                <h3 className="font-display text-[clamp(1.5rem,4vw,2rem)] font-extrabold leading-tight">
                  Where is it, and how soon?
                </h3>
                <p className="mt-2 text-[15px] text-chrome/55">
                  {site.ownerShort} comes to the car — wherever it stopped.
                </p>

                <p className="eyebrow mt-6 text-chrome/35">The car is</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {WHERE.map((w) => (
                    <Chip
                      key={w.id}
                      on={data.where === w.id}
                      onClick={() => setData({ ...data, where: w.id })}
                    >
                      {w.label}
                    </Chip>
                  ))}
                </div>

                <p className="eyebrow mt-6 text-chrome/35">You need him</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {URGENCY.map((u) => (
                    <Chip
                      key={u.id}
                      on={data.urgency === u.id}
                      onClick={() => setData({ ...data, urgency: u.id })}
                    >
                      {u.label}
                    </Chip>
                  ))}
                </div>

                <Field label="Which town?">
                  <input
                    list="gc-cities"
                    value={data.city}
                    onChange={(e) => setData({ ...data, city: e.target.value })}
                    placeholder={coreCities[0]}
                    className={inputCls}
                  />
                  <datalist id="gc-cities">
                    {coreCities.map((c) => (
                      <option key={c} value={c} />
                    ))}
                  </datalist>
                </Field>
              </div>
            )}

            {step === 2 && (
              <div className="mt-4">
                <h3 className="font-display text-[clamp(1.5rem,4vw,2rem)] font-extrabold leading-tight">
                  Where does {site.ownerShort} call you back?
                </h3>
                <p className="mt-2 text-[15px] text-chrome/55">
                  First name is fine. He calls back himself.
                </p>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <Field label="Name">
                    <input
                      value={data.name}
                      onChange={(e) => setData({ ...data, name: e.target.value })}
                      placeholder="First name is fine"
                      autoComplete="given-name"
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Phone">
                    <input
                      value={data.phone}
                      onChange={(e) =>
                        setData({ ...data, phone: e.target.value })
                      }
                      placeholder="(832) 555-0134"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      className={inputCls}
                    />
                  </Field>
                </div>

                <Field label="Email" optional>
                  <input
                    value={data.email}
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                    placeholder="Only if you would rather be emailed"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    className={inputCls}
                  />
                </Field>

                <Field label="Anything else worth knowing" optional>
                  <textarea
                    value={data.notes}
                    onChange={(e) => setData({ ...data, notes: e.target.value })}
                    rows={3}
                    placeholder="Started after I hit a pothole on 45…"
                    className={`${inputCls} resize-y`}
                  />
                </Field>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {error && (
          <p className="mt-5 rounded-lg border border-magenta/40 bg-magenta/10 px-4 py-3 text-[14.5px] text-chrome/85">
            {error}
          </p>
        )}

        <div className="mt-7 flex items-center gap-3">
          {step > 0 && (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="btn btn-outline px-5 py-3 text-[15px]"
            >
              Back
            </button>
          )}
          {step < 2 ? (
            <button
              type="button"
              disabled={!canNext}
              onClick={() => setStep((s) => s + 1)}
              className="btn btn-primary flex-1 text-[16px] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 sm:flex-none sm:px-8"
            >
              Next →
            </button>
          ) : (
            <button
              type="submit"
              disabled={!canNext || busy}
              className="btn btn-primary flex-1 text-[16px] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
            >
              {busy ? "Sending…" : "Send it to Jay"}
            </button>
          )}
        </div>

        <p className="mt-5 border-t border-violet-soft/12 pt-5 text-[13.5px] leading-relaxed text-chrome/45">
          Rather just talk?{" "}
          <a
            href={site.phoneHref}
            className="font-semibold text-cyan underline-offset-4 hover:underline"
          >
            {site.phone}
          </a>{" "}
          rings {site.owner}&rsquo;s phone, {site.hoursLong}.
        </p>
      </div>
    </form>
  );
}

const inputCls =
  "w-full rounded-lg border border-violet-soft/22 bg-white/[0.04] px-4 py-3 text-[15.5px] text-chrome placeholder:text-chrome/28 transition-colors focus:border-cyan/60 focus:bg-white/[0.07] focus:outline-none";

function Field({
  label,
  optional,
  children,
}: {
  label: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="mt-5 block">
      <span className="mb-2 block font-display text-[13.5px] font-semibold text-chrome/60">
        {label}
        {optional && <span className="pl-2 text-chrome/30">optional</span>}
      </span>
      {children}
    </label>
  );
}

function Chip({
  on,
  onClick,
  children,
}: {
  on: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className={`rounded-full border px-4 py-2.5 font-display text-[14.5px] font-semibold transition-all duration-200 ${
        on
          ? "border-cyan/70 bg-cyan/15 text-cyan shadow-[0_0_20px_-6px_rgba(56,225,232,0.8)]"
          : "border-violet-soft/22 bg-white/[0.035] text-chrome/70 hover:border-violet/60 hover:bg-violet/12 hover:text-chrome"
      }`}
    >
      {children}
    </button>
  );
}


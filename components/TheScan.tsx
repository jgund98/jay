"use client";

/*
 * ── THE SCAN ────────────────────────────────────────────────────────────
 * The signature piece. Jay's whole business is diagnostics, so the site's
 * showpiece is a diagnostic: pick the symptom, watch the scan run, get a
 * straight readout of what it usually is and what happens next.
 *
 * Deliberately built with DOM + SVG rather than canvas — no blend modes to
 * fail silently on mobile, no touch-action trap, no image decode race.
 */

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import { site } from "@/lib/site";
import { PhoneIcon } from "./Header";

type Case = {
  id: string;
  chip: string;
  code: string;
  codeLabel: string;
  headline: string;
  usually: string[];
  jay: string;
  time: string;
  service: string;
  serviceSlug: string;
};

const CASES: Case[] = [
  {
    id: "nostart",
    chip: "It won't start",
    code: "NO-CRANK",
    codeLabel: "Starting & charging circuit",
    headline: "Four things can do this. Only one of them is the battery.",
    usually: [
      "Battery or corroded terminals",
      "Starter, solenoid or a bad ground",
      "Alternator that stopped charging days ago",
      "Fuel pump, relay or a security lockout",
    ],
    jay: "A voltage-drop test across the cables takes five minutes and tells you which of the four it is — before anybody buys a part.",
    time: "Most no-starts are diagnosed and fixed in the same visit",
    service: "Electrical & Batteries",
    serviceSlug: "electrical-and-batteries",
  },
  {
    id: "cel",
    chip: "Check engine light",
    code: "P0XXX",
    codeLabel: "Powertrain fault stored",
    headline: "The code is the question, not the answer.",
    usually: [
      "Vacuum or intake leak",
      "Oxygen or mass-airflow sensor reading wrong",
      "Misfire from coils, plugs or injectors",
      "Evap leak — sometimes just the gas cap",
    ],
    jay: "Jay pulls every module, watches live data while the fault happens, then tests the circuit. That's the difference between finding it and guessing at it.",
    time: "On site, usually under an hour to know",
    service: "Mobile Diagnostics",
    serviceSlug: "mobile-diagnostics",
  },
  {
    id: "brakes",
    chip: "Grinding when I stop",
    code: "BRK-WEAR",
    codeLabel: "Friction material / rotor",
    headline: "Grinding means the pad is gone. The clock is running.",
    usually: [
      "Pads worn to the backing plate",
      "Rotor scored, warped or below spec",
      "Seized caliper slide pins",
      "Hardware or shims missing from the last job",
    ],
    jay: "Wheel comes off, rotor gets measured, and you see the photo of your own pad thickness before anything is ordered.",
    time: "Pads and rotors on one axle: about 60–90 minutes",
    service: "Brakes",
    serviceSlug: "brakes",
  },
  {
    id: "shake",
    chip: "Clunks or shakes",
    code: "CHASSIS",
    codeLabel: "Suspension & drivetrain",
    headline: "Every clunk has an address. It's a matter of finding it.",
    usually: [
      "Sway bar links or bushings",
      "Ball joints, tie rods or control arms",
      "Worn strut mounts",
      "CV axle or wheel bearing",
    ],
    jay: "Hands on each joint, weight off the wheel, checking for play. Parts that are fine stay on the car.",
    time: "Usually diagnosed in the driveway in 30 minutes",
    service: "Suspension & Shocks",
    serviceSlug: "suspension-and-shocks",
  },
  {
    id: "ac",
    chip: "A/C blows warm",
    code: "HVAC",
    codeLabel: "Refrigerant circuit",
    headline: "It's a sealed loop. If it's low, it leaked.",
    usually: [
      "Leak at an o-ring, hose or condenser",
      "Compressor clutch not engaging",
      "Cooling fan not coming on",
      "Blend door or blower motor failure",
    ],
    jay: "Gauges go on, high and low side get read, and the leak gets found. Topping it off without that is paying twice.",
    time: "Test and diagnosis on site, same visit",
    service: "A/C & Heating",
    serviceSlug: "ac-and-heating",
  },
  {
    id: "overheat",
    chip: "Overheating or leaking",
    code: "COOLANT",
    codeLabel: "Cooling system pressure",
    headline: "This is the one you don't drive on.",
    usually: [
      "Thermostat stuck closed",
      "Water pump or hose failure",
      "Radiator, cap or fan problem",
      "Head gasket — the one nobody wants",
    ],
    jay: "Pressure test finds where it's actually going. Driving it further is what turns a hose into a head gasket.",
    time: "Stop driving and call — Jay comes to the car",
    service: "Belts, Timing & Cooling",
    serviceSlug: "belts-timing-and-cooling",
  },
];

// A scope trace that looks like a real waveform, not decoration.
const TRACE =
  "M0 60 L34 60 L42 22 L50 92 L58 46 L66 60 L104 60 L112 34 L120 60 " +
  "L168 60 L176 18 L184 96 L192 40 L200 60 L246 60 L254 44 L262 72 L270 60 L340 60";

export default function TheScan() {
  const [active, setActive] = useState<Case | null>(null);
  const [phase, setPhase] = useState<"idle" | "scanning" | "result">("idle");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout);
    },
    [],
  );

  function pick(c: Case) {
    timers.current.forEach(clearTimeout);
    setActive(c);
    setPhase("scanning");
    timers.current = [setTimeout(() => setPhase("result"), 1750)];
  }

  function reset() {
    timers.current.forEach(clearTimeout);
    setActive(null);
    setPhase("idle");
  }

  return (
    <section
      id="scan"
      className="relative scroll-mt-20 overflow-hidden bg-carbon py-20 sm:py-24"
    >
      <div className="grid-fade pointer-events-none absolute inset-0 rotate-180" />
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-[520px] w-[820px] -translate-x-1/2 rounded-full opacity-25 blur-[120px]"
        style={{
          background:
            "radial-gradient(ellipse, rgba(139,61,255,0.6), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1100px] px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-cyan">The Scan</p>
          <h2 className="mt-3 font-display text-[clamp(2rem,5.6vw,3.3rem)] font-black italic leading-[0.98] tracking-[-0.03em]">
            Tell it what your car is doing.
          </h2>
          <p className="mx-auto mt-4 max-w-[46ch] text-[16.5px] leading-relaxed text-chrome/60">
            This is roughly the conversation you&rsquo;d have with {site.ownerShort}{" "}
            on the phone. Pick the symptom and see what it usually turns out to
            be — and what he does about it.
          </p>
        </div>

        {/* ── the tool ─────────────────────────────────────── */}
        <div className="mt-10 overflow-hidden rounded-[20px] border border-violet-soft/22 bg-gradient-to-b from-carbon-3/90 to-carbon-2/95 shadow-[0_50px_120px_-50px_rgba(139,61,255,0.7)]">
          {/* device chrome */}
          <div className="flex items-center gap-3 border-b border-violet-soft/15 bg-carbon/60 px-4 py-2.5">
            <span className="flex gap-1.5">
              <span className="h-2 w-2 rounded-full bg-magenta/70" />
              <span className="h-2 w-2 rounded-full bg-violet/70" />
              <span className="h-2 w-2 rounded-full bg-cyan/70" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-chrome/40">
              GC&nbsp;Diagnostic&nbsp;Terminal
            </span>
            <span className="ml-auto flex items-center gap-1.5">
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  phase === "scanning"
                    ? "animate-pulse bg-cyan"
                    : phase === "result"
                      ? "bg-cyan"
                      : "bg-chrome/25"
                }`}
              />
              <span className="font-mono text-[11px] text-chrome/40">
                {phase === "idle"
                  ? "READY"
                  : phase === "scanning"
                    ? "SCANNING"
                    : "LINKED"}
              </span>
            </span>
          </div>

          {/* scope window */}
          <div className="relative h-[104px] overflow-hidden bg-carbon/80 sm:h-[124px]">
            <div
              className="absolute inset-0 opacity-[0.16]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(56,225,232,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(56,225,232,.5) 1px,transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />
            <svg
              viewBox="0 0 340 120"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full"
              aria-hidden
            >
              <defs>
                <linearGradient id="gc-scope" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#8B3DFF" />
                  <stop offset="50%" stopColor="#38E1E8" />
                  <stop offset="100%" stopColor="#FF3DC4" />
                </linearGradient>
              </defs>
              <motion.path
                d={TRACE}
                fill="none"
                stroke="url(#gc-scope)"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={false}
                animate={{ pathLength: 1, opacity: phase === "idle" ? 0.4 : 1 }}
                transition={{ duration: 1.4, ease: "easeInOut" }}
                style={{ filter: "drop-shadow(0 0 7px rgba(56,225,232,0.55))" }}
              />
              {/* idle heartbeat — the terminal is connected and waiting */}
              {phase === "idle" && (
                <motion.circle
                  r="3.5"
                  fill="#38E1E8"
                  animate={{ cx: [0, 340], opacity: [0, 1, 1, 0] }}
                  transition={{
                    duration: 3.4,
                    repeat: Infinity,
                    ease: "linear",
                    times: [0, 0.08, 0.9, 1],
                  }}
                  cy="60"
                  style={{ filter: "drop-shadow(0 0 6px #38E1E8)" }}
                />
              )}
            </svg>

            <AnimatePresence>
              {phase === "scanning" && (
                <motion.div
                  key="sweep"
                  initial={{ x: "-12%" }}
                  animate={{ x: "112%" }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.6, ease: "easeInOut" }}
                  className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-cyan/22 to-transparent"
                />
              )}
            </AnimatePresence>

            <div className="absolute bottom-2 left-4 font-mono text-[10.5px] tracking-wider text-cyan/45">
              {phase === "idle"
                ? "AWAITING INPUT"
                : active
                  ? `${active.code} · ${active.codeLabel}`
                  : ""}
            </div>
          </div>

          {/* chips */}
          <div className="border-t border-violet-soft/12 p-4 sm:p-5">
            <p className="eyebrow mb-3 text-chrome/35">Select a symptom</p>
            <div className="flex flex-wrap gap-2">
              {CASES.map((c) => {
                const on = active?.id === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => (on ? reset() : pick(c))}
                    aria-pressed={on}
                    className={`rounded-full border px-4 py-2.5 font-display text-[14.5px] font-semibold transition-all duration-200 ${
                      on
                        ? "border-cyan/70 bg-cyan/15 text-cyan shadow-[0_0_22px_-6px_rgba(56,225,232,0.8)]"
                        : "border-violet-soft/22 bg-white/[0.035] text-chrome/70 hover:border-violet/60 hover:bg-violet/12 hover:text-chrome"
                    }`}
                  >
                    {c.chip}
                  </button>
                );
              })}
            </div>
          </div>

          {/* readout */}
          <AnimatePresence mode="wait">
            {phase === "result" && active && (
              <motion.div
                key={active.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.42, ease: EASE }}
                className="overflow-hidden border-t border-violet-soft/15 bg-carbon/45"
              >
                <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
                  <div>
                    <h3 className="font-display text-[clamp(1.35rem,3.4vw,1.85rem)] font-extrabold leading-tight text-chrome">
                      {active.headline}
                    </h3>
                    <p className="eyebrow mt-5 text-chrome/35">
                      Usually one of these
                    </p>
                    <ul className="mt-3 grid gap-2.5">
                      {active.usually.map((u, i) => (
                        <motion.li
                          key={u}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + i * 0.07, duration: 0.35 }}
                          className="flex items-start gap-2.5 text-[15px] leading-snug text-chrome/72"
                        >
                          <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-violet to-magenta" />
                          {u}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-xl border border-cyan/22 bg-cyan/[0.05] p-5">
                    <p className="eyebrow text-cyan/80">
                      What {site.ownerShort} does
                    </p>
                    <p className="mt-3 text-[15px] leading-relaxed text-chrome/80">
                      {active.jay}
                    </p>
                    <p className="mt-4 border-t border-cyan/15 pt-4 font-mono text-[12.5px] leading-relaxed text-cyan/75">
                      {active.time}
                    </p>

                    <div className="mt-5 grid gap-2.5">
                      <a
                        href={site.phoneHref}
                        className="btn btn-call w-full text-[15px]"
                        data-analytics="scan-call"
                      >
                        <PhoneIcon />
                        Call {site.phone}
                      </a>
                      <Link
                        href={`/contact?issue=${active.id}`}
                        className="btn btn-primary w-full text-[15px]"
                      >
                        Get a quote for this
                      </Link>
                      <Link
                        href={`/services/${active.serviceSlug}`}
                        className="mt-1 text-center text-[13.5px] text-chrome/45 underline-offset-4 transition-colors hover:text-cyan hover:underline"
                      >
                        More on {active.service} →
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className="mx-auto mt-5 max-w-[52ch] text-center text-[13px] leading-relaxed text-chrome/35">
          Common causes, not a diagnosis. Nothing replaces putting a meter on
          your actual car — which is exactly what the {site.callOutFee} call-out
          is for.
        </p>
      </div>
    </section>
  );
}


"use client";

/*
 * A real map, drawn from real coordinates — not a Google iframe and not a
 * decorative blob. Every town is plotted at its actual latitude and longitude
 * relative to Conroe, so the constellation you see is the shape of the
 * territory Jay actually covers.
 */

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { site } from "@/lib/site";

type Town = {
  name: string;
  lat: number;
  lng: number;
  core?: boolean;
  side?: "left" | "right" | "top" | "bottom";
};

const TOWNS: Town[] = [
  { name: "Conroe", lat: 30.312, lng: -95.456, core: true, side: "right" },
  { name: "Montgomery", lat: 30.389, lng: -95.697, core: true, side: "left" },
  { name: "Spring", lat: 30.08, lng: -95.417, core: true, side: "left" },
  { name: "Humble", lat: 29.998, lng: -95.262, core: true, side: "bottom" },
  { name: "Porter", lat: 30.104, lng: -95.238, core: true, side: "right" },
  { name: "Anderson", lat: 30.487, lng: -96.001, core: true, side: "right" },

  { name: "Willis", lat: 30.426, lng: -95.48, side: "right" },
  { name: "Panorama Village", lat: 30.383, lng: -95.492, side: "left" },
  { name: "Cut and Shoot", lat: 30.331, lng: -95.363, side: "right" },
  { name: "Cleveland", lat: 30.341, lng: -95.086, side: "left" },
  { name: "Splendora", lat: 30.234, lng: -95.161, side: "right" },
  { name: "Magnolia", lat: 30.21, lng: -95.75, side: "left" },
  { name: "Shenandoah", lat: 30.185, lng: -95.454, side: "right" },
  { name: "Pinehurst", lat: 30.166, lng: -95.687, side: "left" },
  { name: "The Woodlands", lat: 30.158, lng: -95.489, side: "left" },
  { name: "New Caney", lat: 30.151, lng: -95.213, side: "right" },
  { name: "Tomball", lat: 30.097, lng: -95.616, side: "left" },
  { name: "Kingwood", lat: 30.049, lng: -95.186, side: "right" },
  { name: "Atascocita", lat: 29.999, lng: -95.176, side: "right" },
];

const W = 820;
const H = 500;
const PAD_X = 96;
const PAD_Y = 60;
const LNG = [-96.06, -95.04];
const LAT = [29.95, 30.54];

const px = (lng: number) =>
  PAD_X + ((lng - LNG[0]) / (LNG[1] - LNG[0])) * (W - PAD_X * 2);
const py = (lat: number) =>
  PAD_Y + ((LAT[1] - lat) / (LAT[1] - LAT[0])) * (H - PAD_Y * 2);

export default function ServiceArea({ compact = false }: { compact?: boolean }) {
  const hub = TOWNS[0];
  const hx = px(hub.lng);
  const hy = py(hub.lat);
  const scroller = useRef<HTMLDivElement>(null);

  /* When the map has to scroll on a phone, open it centred on Conroe rather
     than pinned to Anderson at the far western edge. */
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const extra = el.scrollWidth - el.clientWidth;
    if (extra > 0) el.scrollLeft = extra * (hx / W) * 1.15;
  }, [hx]);

  return (
    <section className="relative overflow-hidden bg-carbon py-20 sm:py-24">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[640px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-[130px]"
        style={{
          background:
            "radial-gradient(ellipse, rgba(139,61,255,0.55), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-14">
          <div>
            <p className="eyebrow text-cyan">Service area</p>
            <h2 className="mt-3 font-display text-[clamp(2rem,5vw,3.1rem)] font-black italic leading-[0.98] tracking-[-0.03em]">
              If you can see pine
              <br className="hidden sm:block" /> trees, he&rsquo;ll come.
            </h2>
            <p className="mt-5 max-w-[44ch] text-[16.5px] leading-relaxed text-chrome/60">
              {site.owner} runs out of {site.baseCity} and covers Montgomery
              County and the north side of Houston — from Anderson in the west
              to Cleveland in the east, and all the way down to Humble and
              Atascocita.
            </p>
            <p className="mt-4 max-w-[44ch] text-[16.5px] leading-relaxed text-chrome/60">
              Not sure whether you&rsquo;re inside it? Call and ask. He answers
              the phone himself, at any hour.
            </p>

            {!compact && (
              <a
                href={site.phoneHref}
                className="btn btn-call mt-7 text-[16px]"
                data-analytics="area-call"
              >
                {site.phone}
              </a>
            )}
          </div>

          {/* The map is plotted from real coordinates, so it can't just shrink —
              at phone width the town names turn to dust. Below sm it keeps a
              legible minimum width and swipes sideways instead; vertical
              scrolling is untouched. */}
          <div
            ref={scroller}
            className="no-scrollbar relative -mx-4 overflow-x-auto px-4 sm:mx-0 sm:overflow-visible sm:px-0"
          >
            <div className="min-w-[620px] sm:min-w-0">
            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="w-full"
              role="img"
              aria-label={`Map of towns served: ${TOWNS.map((t) => t.name).join(", ")}`}
            >
              <defs>
                <radialGradient id="gc-hub-glow">
                  <stop offset="0%" stopColor="#38E1E8" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#38E1E8" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="gc-spoke" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#38E1E8" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#8B3DFF" stopOpacity="0.12" />
                </linearGradient>
              </defs>

              {/* drive-time rings */}
              {[110, 190, 268].map((r, i) => (
                <motion.circle
                  key={r}
                  cx={hx}
                  cy={hy}
                  r={r}
                  fill="none"
                  stroke="rgba(139,61,255,0.22)"
                  strokeWidth="1"
                  strokeDasharray="3 7"
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.12 }}
                  style={{ transformOrigin: `${hx}px ${hy}px` }}
                />
              ))}

              <circle cx={hx} cy={hy} r="150" fill="url(#gc-hub-glow)" />

              {/* spokes */}
              {TOWNS.slice(1).map((t, i) => (
                <motion.line
                  key={t.name}
                  x1={hx}
                  y1={hy}
                  x2={px(t.lng)}
                  y2={py(t.lat)}
                  stroke="url(#gc-spoke)"
                  strokeWidth="1"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2 + i * 0.035 }}
                />
              ))}

              {/* towns */}
              {TOWNS.map((t, i) => {
                const x = px(t.lng);
                const y = py(t.lat);
                const isHub = i === 0;
                const anchor =
                  t.side === "left" ? "end" : t.side === "right" ? "start" : "middle";
                const dx = t.side === "left" ? -11 : t.side === "right" ? 11 : 0;
                const dy =
                  t.side === "top" ? -13 : t.side === "bottom" ? 20 : 4.5;
                return (
                  <motion.g
                    key={t.name}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: 0.35 + i * 0.035 }}
                  >
                    {isHub && (
                      <circle
                        cx={x}
                        cy={y}
                        r="13"
                        fill="none"
                        stroke="#38E1E8"
                        strokeWidth="1.5"
                        opacity="0.5"
                      />
                    )}
                    <circle
                      cx={x}
                      cy={y}
                      r={isHub ? 6 : t.core ? 4.5 : 3}
                      fill={isHub ? "#38E1E8" : t.core ? "#B7A6FF" : "#8B3DFF"}
                      opacity={t.core ? 1 : 0.75}
                    />
                    <text
                      x={x + dx}
                      y={y + dy}
                      textAnchor={anchor}
                      className={
                        isHub
                          ? "fill-cyan font-display text-[17px] font-extrabold"
                          : t.core
                            ? "fill-[#E6E9FA] font-display text-[14px] font-bold"
                            : "fill-[#9FA6C4] font-display text-[12px] font-semibold"
                      }
                    >
                      {t.name}
                    </text>
                  </motion.g>
                );
              })}

              <text
                x={hx}
                y={hy - 22}
                textAnchor="middle"
                className="fill-cyan/60 font-mono text-[10px] tracking-[0.22em]"
              >
                BASE
              </text>
            </svg>
            </div>
          </div>
          <p className="mt-2 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-chrome/30 sm:hidden">
            Swipe the map →
          </p>
        </div>
      </div>
    </section>
  );
}

"use client";

/*
 * Game Changer Automotive — mark, rebuilt as vector.
 *
 * A clean redraw of Jay's existing logo: the gear ring, the streaking car
 * profile punching through it, the open-end wrench forming the nose, and the
 * violet → cyan → magenta electric gradient. Sharp at any size, ~5KB instead
 * of a 2MB JPEG, and it holds up at 28px in a header.
 */

import { useId } from "react";

function useIds() {
  const n = useId();
  return {
    chrome: `gc-chrome-${n}`,
    edge: `gc-edge-${n}`,
    arc: `gc-arc-${n}`,
    glass: `gc-glass-${n}`,
  };
}

const TEETH = 16;
const RING_R = 72;
const TOOTH_R = 84;
const CX = 200;
const CY = 104;

/** One path, drawn twice — dark stroke first so the body cuts a clean hole
 *  out of the gear behind it, then the chrome fill on top. */
const BODY =
  "M96 138 L138 134 L170 104 C178 96 188 92 199 91 L246 88 " +
  "C260 87 273 92 282 101 L312 128 L348 134 L350 150 L96 150 Z";
const GLASS =
  "M182 122 L202 104 C207 99 213 97 219 96 L244 95 " +
  "C253 94 260 98 266 104 L288 122 Z";
const WRENCH =
  "M102 126 L80 126 L80 112 L52 112 L52 164 L80 164 L80 150 L102 150 Z";

function teeth() {
  const out = [];
  for (let i = 0; i < TEETH; i++) {
    const a = (i / TEETH) * 360;
    out.push(
      <rect
        key={i}
        x={-8}
        y={-8.5}
        width={16}
        height={17}
        rx={2.5}
        transform={`rotate(${a}) translate(0 ${-TOOTH_R})`}
      />,
    );
  }
  return out;
}

export function GCMark({
  className = "",
  title = "Game Changer Automotive",
}: {
  className?: string;
  title?: string;
}) {
  const id = useIds();
  return (
    <svg viewBox="0 0 360 210" className={className} role="img" aria-label={title}>
      <defs>
        <linearGradient id={id.chrome} x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="22%" stopColor="#CBBEFF" />
          <stop offset="48%" stopColor="#8B3DFF" />
          <stop offset="72%" stopColor="#C24BE8" />
          <stop offset="100%" stopColor="#FF3DC4" />
        </linearGradient>
        <linearGradient id={id.edge} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#38E1E8" />
          <stop offset="55%" stopColor="#9BF3F6" />
          <stop offset="100%" stopColor="#B7A6FF" />
        </linearGradient>
        <linearGradient id={id.glass} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="#9BF3F6" />
          <stop offset="100%" stopColor="#38E1E8" />
        </linearGradient>
        <linearGradient id={id.arc} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#38E1E8" stopOpacity="0" />
          <stop offset="55%" stopColor="#9BF3F6" />
          <stop offset="100%" stopColor="#FF3DC4" />
        </linearGradient>
      </defs>

      {/* ── gear, behind ───────────────────────────────────── */}
      <g transform={`translate(${CX} ${CY})`} opacity="0.95">
        <g fill={`url(#${id.chrome})`}>{teeth()}</g>
        <circle
          r={RING_R}
          fill="none"
          stroke={`url(#${id.chrome})`}
          strokeWidth="12"
        />
        <circle
          r={RING_R - 9}
          fill="none"
          stroke={`url(#${id.edge})`}
          strokeWidth="2"
          opacity="0.55"
        />
      </g>

      {/* ── speed trail ────────────────────────────────────── */}
      <g fill={`url(#${id.arc})`}>
        <rect x="0" y="114" width="38" height="8" rx="4" opacity="0.45" />
        <rect x="4" y="130" width="28" height="9" rx="4.5" opacity="0.7" />
        <rect x="12" y="146" width="18" height="7" rx="3.5" opacity="0.35" />
      </g>

      {/* ── open-end wrench = the nose ─────────────────────── */}
      <path d={WRENCH} fill="#0A0912" stroke="#0A0912" strokeWidth="7" />
      <path d={WRENCH} fill={`url(#${id.chrome})`} />
      <path
        d="M52 112 L52 164"
        stroke={`url(#${id.edge})`}
        strokeWidth="4.5"
        opacity="0.95"
      />

      {/* ── car body — long, low, wedge ────────────────────── */}
      <path d={BODY} fill="#0A0912" stroke="#0A0912" strokeWidth="8" />
      <path d={BODY} fill={`url(#${id.chrome})`} />
      <path d={GLASS} fill={`url(#${id.glass})`} opacity="0.95" />
      <path d="M226 95 L226 122" stroke="#0A0912" strokeWidth="5" opacity="0.5" />
      {/* body crease */}
      <path
        d="M112 142 L340 142"
        stroke="#0A0912"
        strokeWidth="3.5"
        opacity="0.28"
        strokeLinecap="round"
      />

      {/* ── wheels ─────────────────────────────────────────── */}
      {[
        [152, 150],
        [304, 150],
      ].map(([x, y]) => (
        <g key={x}>
          <circle cx={x} cy={y} r="25" fill="#0A0912" />
          <circle
            cx={x}
            cy={y}
            r="20"
            fill="none"
            stroke={`url(#${id.chrome})`}
            strokeWidth="8"
          />
          <circle cx={x} cy={y} r="6.5" fill={`url(#${id.edge})`} />
        </g>
      ))}
    </svg>
  );
}

export function GCWordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`gc-wordmark ${className}`}>
      <span className="gc-wordmark__main">Game Changer</span>
      <span className="gc-wordmark__sub">Automotive</span>
    </span>
  );
}

export default function Logo({
  className = "",
  markClassName = "",
  stacked = false,
}: {
  className?: string;
  markClassName?: string;
  stacked?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 ${
        stacked ? "flex-col gap-1" : ""
      } ${className}`}
    >
      <GCMark className={markClassName || "h-9 w-auto"} />
      <GCWordmark />
    </span>
  );
}

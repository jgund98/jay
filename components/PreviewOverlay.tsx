/*
 * Mockup watermark.
 *
 * This build is a preview for Jay, not a live site — the quote form doesn't
 * deliver yet and the $35 call-out still needs confirming — so it carries a
 * design-comp watermark that makes that unmistakable.
 *
 * Performance matters more than it looks here. The first version tiled 84
 * rotated text nodes across a 220vmax square, which is a ~3000px fixed layer
 * the browser has to lay out and raster; it spiked to 200ms frames on a
 * throttled phone. This is one SVG <pattern> sized to the viewport instead:
 * a single element, rastered once, rotated by patternTransform so it tiles
 * seamlessly with no oversized layer and no per-word layout.
 *
 * `pointer-events: none` throughout — he can still scroll, tap, run The Scan
 * and read everything. It only stops him treating it as finished.
 */

export default function PreviewOverlay() {
  return (
    <div
      aria-hidden
      data-preview-overlay
      className="pointer-events-none fixed inset-0 z-[200] select-none overflow-hidden"
    >
      <svg className="h-full w-full" width="100%" height="100%">
        <defs>
          <pattern
            id="gc-preview-mark"
            width="330"
            height="176"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(-24)"
          >
            <text
              x="0"
              y="64"
              fontFamily="var(--font-saira), system-ui, sans-serif"
              fontSize="54"
              fontWeight="900"
              fontStyle="italic"
              letterSpacing="3"
              fill="#BEC8DC"
              fillOpacity="0.085"
            >
              PREVIEW
            </text>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#gc-preview-mark)" />
      </svg>

      {/* bottom-left on phones so it clears the logo up top and floats above
          the call/quote dock; bottom-right once there is room */}
      <div className="absolute bottom-[calc(env(safe-area-inset-bottom)+5rem)] left-3 sm:bottom-4 sm:left-auto sm:right-4">
        <span className="flex items-center gap-1.5 rounded-full border border-white/15 bg-black/55 px-3 py-1.5 font-display text-[10.5px] font-bold uppercase tracking-[0.18em] text-white/70 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-[#FF3DC4]" />
          Preview — not live
        </span>
      </div>
    </div>
  );
}

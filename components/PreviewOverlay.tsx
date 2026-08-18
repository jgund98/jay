/*
 * Mockup watermark.
 *
 * This build is a preview for Jay, not a live site — the quote form doesn't
 * deliver yet and the $35 call-out still needs confirming. A tiled diagonal
 * "PREVIEW" makes that unmistakable at a glance, the way a design comp is
 * watermarked.
 *
 * `pointer-events: none` throughout: he can still scroll, tap and read
 * everything. It only stops him treating it as finished.
 *
 * Rotating one big oversized layer (rather than tiling a rotated image)
 * avoids seams, and sizing in vmax means it scales the same on a phone as
 * on a 4K monitor.
 */

const ROWS = 14;
const PER_ROW = 6;

export default function PreviewOverlay() {
  return (
    <div
      aria-hidden
      data-preview-overlay
      className="pointer-events-none fixed inset-0 z-[200] select-none overflow-hidden"
    >
      {/* the diagonal wash of text */}
      <div className="absolute left-1/2 top-1/2 flex h-[220vmax] w-[220vmax] -translate-x-1/2 -translate-y-1/2 -rotate-[24deg] flex-col justify-center gap-[3.2vmax]">
        {Array.from({ length: ROWS }).map((_, r) => (
          <div
            key={r}
            className="flex shrink-0 justify-center gap-[4vmax] whitespace-nowrap font-display text-[5.2vmax] font-black italic leading-none tracking-[0.06em]"
            style={{
              color: "rgba(190, 200, 220, 0.085)",
              // a hair of offset per row so it reads as a pattern, not a grid
              transform: `translateX(${(r % 2 ? -1 : 1) * 6}vmax)`,
            }}
          >
            {Array.from({ length: PER_ROW }).map((_, i) => (
              <span key={i}>PREVIEW</span>
            ))}
          </div>
        ))}
      </div>

      {/* corner badge — small, but unambiguous */}
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

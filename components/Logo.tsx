import Image from "next/image";

/*
 * Jay's actual logo — not a recreation.
 *
 * The original only exists as a square poster on a carbon-fibre background.
 * scripts/extract-logo.ps1 keys that background out (lumakey, threshold 0.14
 * with a *tight* 0.05 tolerance — a wide tolerance eats the deep purple in
 * the letters) and cuts three transparent pieces: the mark, the two-line
 * wordmark, and the full stacked lockup.
 *
 * Everything the logo touches on this site is a dark surface, which is what
 * makes the key clean: the few near-black pixels left inside the artwork read
 * as background rather than as holes. Do not place these on a light section.
 */

export function GCMark({
  className = "",
  title = "Game Changer Automotive",
  priority = false,
}: {
  className?: string;
  title?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/img/logo-mark.png"
      alt={title}
      width={880}
      height={602}
      priority={priority}
      className={className}
    />
  );
}

export function GCWordmark({
  className = "",
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/img/logo-word.png"
      alt="Game Changer Automotive"
      width={1000}
      height={171}
      priority={priority}
      className={className}
    />
  );
}

/** The full stacked lockup, for places with room to let it breathe. */
export function GCLockup({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/img/logo-lockup.png"
      alt="Game Changer Automotive"
      width={1000}
      height={817}
      className={className}
    />
  );
}

export default function Logo({
  className = "",
  markClassName = "",
  wordClassName = "",
  priority = false,
}: {
  className?: string;
  markClassName?: string;
  wordClassName?: string;
  priority?: boolean;
}) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <GCMark
        className={markClassName || "h-11 w-auto"}
        title=""
        priority={priority}
      />
      <GCWordmark
        className={wordClassName || "h-6 w-auto"}
        priority={priority}
      />
    </span>
  );
}

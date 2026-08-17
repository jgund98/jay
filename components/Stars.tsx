export default function Stars({
  value = 5,
  className = "h-4",
}: {
  value?: number;
  className?: string;
}) {
  const pct = Math.max(0, Math.min(100, (value / 5) * 100));
  return (
    <span
      className={`relative inline-block ${className}`}
      style={{ aspectRatio: "5 / 1" }}
      role="img"
      aria-label={`${value} out of 5 stars`}
    >
      <Row className="text-chrome/22" />
      <span
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${pct}%` }}
      >
        <Row className="text-[#FFC23D]" width="500%" />
      </span>
    </span>
  );
}

function Row({ className = "", width }: { className?: string; width?: string }) {
  return (
    <svg
      viewBox="0 0 100 20"
      className={`h-full ${className}`}
      style={{ width: width ?? "100%" }}
      preserveAspectRatio="xMinYMid meet"
      aria-hidden
    >
      {[0, 20, 40, 60, 80].map((x) => (
        <path
          key={x}
          transform={`translate(${x} 0)`}
          d="M10 1.6l2.6 5.3 5.8.85-4.2 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.2-4.1 5.8-.85L10 1.6z"
          fill="currentColor"
        />
      ))}
    </svg>
  );
}

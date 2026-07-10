/**
 * GatewayMark.tsx — gSoft, Inc. brand components
 * Simple text wordmark with warm amber shimmer, gold accent divider, and brand block.
 * No icons, no triangle badges, no Gateway Solutions references.
 */

/** GSoftWordmark — renders "gSoft, Inc." in styled text with shimmer animation */
export function GSoftWordmark({
  variant = "dark",
  size = "md",
}: {
  variant?: "dark" | "light";
  size?: "sm" | "md" | "lg" | "xl";
}) {
  const sizeMap = { sm: "1.1rem", md: "1.5rem", lg: "2.2rem", xl: "3.2rem" };
  const textColor =
    variant === "dark" ? "oklch(0.20 0.03 50)" : "rgba(255,255,255,0.95)";

  return (
    <span
      style={{
        display: "inline-block",
        fontFamily: "'Bricolage Grotesque', serif",
        fontSize: sizeMap[size],
        fontWeight: 800,
        letterSpacing: "-0.02em",
        color: textColor,
        lineHeight: 1.1,
        whiteSpace: "nowrap",
      }}
      aria-label="gSoft, Inc."
    >
      g
      <span
        style={{
          background:
            "linear-gradient(90deg, oklch(0.20 0.03 50) 0%, oklch(0.55 0.17 55) 30%, oklch(0.78 0.20 72) 50%, oklch(0.55 0.17 55) 70%, oklch(0.20 0.03 50) 100%)",
          backgroundSize: "200% auto",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          animation: "heroShimmer 3s linear infinite",
        }}
      >
        Soft
      </span>
      <span style={{ color: textColor }}>, Inc.</span>
    </span>
  );
}

/** GoldAccentDivider — horizontal warm-gold line with diamond center accent */
export function GoldAccentDivider({
  variant = "dark",
  width = 120,
}: {
  variant?: "dark" | "light";
  width?: number;
}) {
  const gold =
    variant === "dark" ? "oklch(0.72 0.18 65)" : "oklch(0.83 0.16 75)";
  const half = width / 2;
  return (
    <svg
      width={width}
      height="10"
      viewBox={`0 0 ${width} 10`}
      fill="none"
      aria-hidden="true"
    >
      <line
        x1="0"
        y1="5"
        x2={half - 7}
        y2="5"
        stroke={gold}
        strokeWidth="1.5"
      />
      <polygon
        points={`${half},1 ${half + 5},5 ${half},9 ${half - 5},5`}
        fill={gold}
      />
      <line
        x1={half + 7}
        y1="5"
        x2={width}
        y2="5"
        stroke={gold}
        strokeWidth="1.5"
      />
    </svg>
  );
}

/** GSoftBrandBlock — wordmark + optional tagline for footer/header use */
export function GSoftBrandBlock({
  variant = "dark",
  size = "md",
  showTagline = false,
}: {
  variant?: "dark" | "light";
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
}) {
  const tagColor =
    variant === "dark" ? "oklch(0.50 0.03 55)" : "rgba(255,255,255,0.55)";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <GSoftWordmark variant={variant} size={size} />
      {showTagline && (
        <p
          style={{
            fontSize: "0.78rem",
            color: tagColor,
            letterSpacing: "0.04em",
            margin: 0,
          }}
        >
          High Quality Technology Solutions
        </p>
      )}
    </div>
  );
}

// Legacy compatibility exports for any remaining imports
export function GatewayMark({
  size = 40,
}: { size?: number; variant?: string; className?: string }) {
  return <GSoftWordmark size={size > 60 ? "lg" : "md"} />;
}
export function MonogramBadge({
  size = 36,
}: { size?: number; variant?: string }) {
  return <GSoftWordmark size={size > 40 ? "md" : "sm"} />;
}
export function BrandBlock({
  variant = "dark",
}: { variant?: "dark" | "light"; iconSize?: number }) {
  return <GSoftBrandBlock variant={variant} size="md" showTagline />;
}
export function SemiCircleDivider(_props: {
  size?: number;
  className?: string;
}) {
  return <GoldAccentDivider width={20} />;
}
export function SemiCircleDividerLarge(_props: { className?: string }) {
  return <GoldAccentDivider width={24} />;
}
export function WordArc(_props: { color: string; curveUp?: boolean }) {
  return null;
}
export function GatewayArchDecor(_props: {
  size?: number;
  opacity?: number;
  color?: string;
}) {
  return null;
}

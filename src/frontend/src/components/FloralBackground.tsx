/**
 * FloralBackground — subtle warm geometric pattern for gSoft, Inc.
 * Scattered small diamond/rhombus shapes and dot clusters in warm amber/golden tones
 * at low opacity. Completely different look from the Gateway Solutions floral design.
 */

const WARM_COLORS = [
  "rgba(180,120,30,0.28)",
  "rgba(210,150,50,0.22)",
  "rgba(160,90,20,0.25)",
  "rgba(200,160,70,0.20)",
  "rgba(140,80,15,0.30)",
];

// [cx%, cy%, colorIdx, sizeMultiplier] — positions as percentages of viewport
const GEMS: [number, number, number, number][] = [
  // top band
  [4, 3, 0, 1.0],
  [15, 2, 2, 0.8],
  [27, 4, 1, 1.2],
  [38, 2, 3, 0.9],
  [50, 4, 4, 1.0],
  [62, 2, 0, 0.8],
  [73, 4, 2, 1.1],
  [85, 2, 1, 0.9],
  [95, 4, 3, 1.0],
  // bottom band
  [5, 96, 3, 1.0],
  [18, 97, 1, 0.8],
  [31, 95, 0, 1.2],
  [43, 97, 2, 0.9],
  [56, 96, 4, 1.0],
  [68, 97, 3, 0.8],
  [80, 95, 1, 1.1],
  [92, 97, 0, 0.9],
  // left column
  [2, 14, 2, 1.0],
  [3, 28, 4, 0.8],
  [2, 44, 0, 1.1],
  [3, 60, 1, 0.9],
  [2, 76, 3, 1.0],
  // right column
  [97, 12, 1, 0.9],
  [98, 26, 3, 1.1],
  [96, 42, 4, 0.8],
  [98, 58, 0, 1.0],
  [97, 74, 2, 0.9],
  // upper interior
  [12, 10, 4, 1.0],
  [23, 14, 2, 0.8],
  [34, 9, 0, 1.2],
  [46, 12, 1, 0.9],
  [57, 10, 3, 1.0],
  [69, 9, 4, 0.8],
  [81, 13, 2, 1.1],
  [92, 10, 1, 0.9],
  [18, 22, 1, 0.8],
  [30, 20, 3, 1.0],
  [42, 24, 4, 0.9],
  [54, 21, 0, 1.1],
  [66, 23, 2, 0.8],
  [78, 20, 1, 1.0],
  [90, 23, 3, 0.9],
  // mid interior
  [9, 36, 4, 1.0],
  [21, 38, 0, 0.8],
  [33, 35, 1, 1.2],
  [45, 37, 2, 0.9],
  [57, 36, 3, 1.0],
  [69, 38, 4, 0.8],
  [81, 36, 0, 1.1],
  [93, 38, 1, 0.9],
  // lower interior
  [13, 52, 2, 1.0],
  [25, 54, 4, 0.8],
  [37, 51, 0, 1.2],
  [49, 53, 1, 0.9],
  [61, 52, 3, 1.0],
  [73, 54, 2, 0.8],
  [85, 51, 4, 1.1],
  [94, 53, 0, 0.9],
  [7, 66, 1, 0.8],
  [20, 65, 3, 1.0],
  [32, 67, 4, 0.9],
  [44, 65, 0, 1.1],
  [56, 66, 2, 0.8],
  [70, 65, 1, 1.0],
  [83, 67, 3, 0.9],
  [94, 66, 4, 0.8],
  [14, 80, 0, 1.0],
  [27, 82, 2, 0.8],
  [40, 80, 1, 1.2],
  [52, 81, 3, 0.9],
  [65, 80, 4, 1.0],
  [77, 82, 0, 0.8],
  [89, 80, 2, 1.1],
  // center fill
  [50, 50, 1, 1.0],
  [25, 50, 3, 0.9],
  [75, 50, 0, 1.1],
  [38, 70, 2, 0.8],
  [62, 70, 4, 1.0],
];

function DiamondGem({
  cx,
  cy,
  color,
  scale = 1.0,
}: { cx: number; cy: number; color: string; scale?: number }) {
  const s = 0.55 * scale;
  // Small diamond (rotated square)
  const pts = [
    `${cx},${cy - s}`,
    `${cx + s * 0.7},${cy}`,
    `${cx},${cy + s}`,
    `${cx - s * 0.7},${cy}`,
  ].join(" ");
  return (
    <g>
      <polygon points={pts} fill={color} />
      {/* tiny center dot */}
      <circle cx={cx} cy={cy} r={s * 0.25} fill={color} opacity="0.6" />
    </g>
  );
}

export default function FloralBackground() {
  return (
    <svg
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 1,
        overflow: "hidden",
      }}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      {GEMS.map(([cx, cy, ci, sc]) => (
        <DiamondGem
          key={`g-${cx}-${cy}`}
          cx={cx}
          cy={cy}
          color={WARM_COLORS[ci]}
          scale={sc}
        />
      ))}
    </svg>
  );
}

import React from "react";

type Props = {
  color: string;
  /** Controls how “strong” the accent looks. 0.0–1.0-ish */
  strength?: number;
};

/**
 * Diagonal curved accent:
 * - wedge starts bottom-left, ends top-right
 * - curved boundary
 * - a few dots cross into the dark side
 */
export function AssetAccent({ color, strength = 0.95 }: Props) {
  // clamp
  const s = Math.max(0.1, Math.min(0.9, strength));
  const id = React.useId();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          {/* Soft fill with transparency */}
          <linearGradient id={`so-accent-fill-${id}`} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor={color} stopOpacity={0.55 * s} />
            <stop offset="55%" stopColor={color} stopOpacity={0.18 * s} />
            <stop offset="100%" stopColor={color} stopOpacity={0.0} />
          </linearGradient>

          {/* Subtle edge glow along the curve */}
          <linearGradient id={`so-accent-edge-${id}`} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor={color} stopOpacity={0.55 * s} />
            <stop offset="100%" stopColor={color} stopOpacity={0.0} />
          </linearGradient>

          {/* blur for glow */}
          <filter id={`so-soft-glow-${id}`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="1.4" />
          </filter>
        </defs>

        {/* Wedge region (bottom-left -> top-right) with a curved boundary */}
        <path
          d="
            M 0 100
            L 0 0
            L 100 0
            L 100 0
            C 78 14, 62 30, 48 52
            C 36 70, 22 86, 0 100
            Z
          "
          fill={`url(#so-accent-fill-${id})`}
        />

        {/* Curved boundary glow (thin) */}
        <path
          d="
            M 100 0
            C 78 14, 62 30, 48 52
            C 36 70, 22 86, 0 100
          "
          fill="none"
          stroke={`url(#so-accent-edge-${id})`}
          strokeWidth="1.15"
          opacity={0.55 * s}
          filter={`url(#so-soft-glow-${id})`}
        />

        {/* Dots that cross the boundary slightly */}
        <g opacity={0.25 * s}>
          <circle cx="18" cy="86" r="1.4" fill={color} />
          <circle cx="28" cy="76" r="1.0" fill={color} />
          <circle cx="42" cy="60" r="1.2" fill={color} />
          <circle cx="58" cy="42" r="1.0" fill={color} />
          <circle cx="72" cy="28" r="1.3" fill={color} />
        </g>

        {/* A couple faint “spill” dots on the dark side */}
        <g opacity={0.14 * s}>
          <circle cx="34" cy="84" r="0.9" fill={color} />
          <circle cx="64" cy="52" r="0.8" fill={color} />
          <circle cx="84" cy="20" r="0.9" fill={color} />
        </g>
      </svg>
    </div>
  );
}

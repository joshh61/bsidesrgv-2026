const RAY_COUNT = 28;
const CENTER = 120;

const RAYS = Array.from({ length: RAY_COUNT }, (_, i) => {
  const angle = (i * 360) / RAY_COUNT;
  const long = i % 2 === 0;
  const rIn = 42;
  const rOut = long ? 113 : 88;
  const w = long ? 3.6 : 2.7;
  return {
    angle,
    points: `${CENTER - w},${CENTER - rIn} ${CENTER + w},${CENTER - rIn} ${CENTER},${CENTER - rOut}`,
    long,
  };
});

/**
 * The signature motif — a rising South Texas sun. Rays rotate slowly;
 * the halo breathes. Positioning/cropping is the caller's job.
 */
export function Sunburst({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 240" className={className} fill="none" aria-hidden="true">
      <defs>
        <radialGradient id="bsides-sun-core" cx="50%" cy="44%" r="60%">
          <stop offset="0%" stopColor="#fce9b4" />
          <stop offset="44%" stopColor="#f2c75e" />
          <stop offset="78%" stopColor="#d99a2b" />
          <stop offset="100%" stopColor="#d4722a" />
        </radialGradient>
        <radialGradient id="bsides-sun-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f2c75e" stopOpacity="0.5" />
          <stop offset="55%" stopColor="#e0a12c" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#e0a12c" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle
        cx={CENTER}
        cy={CENTER}
        r="119"
        fill="url(#bsides-sun-halo)"
        className="animate-sun-glow"
        style={{ transformBox: "view-box", transformOrigin: "120px 120px" }}
      />

      <g
        className="animate-ray-spin"
        style={{ transformBox: "view-box", transformOrigin: "120px 120px" }}
      >
        {RAYS.map((ray, i) => (
          <polygon
            key={i}
            points={ray.points}
            fill="#d99a2b"
            fillOpacity={ray.long ? 0.95 : 0.62}
            transform={`rotate(${ray.angle} ${CENTER} ${CENTER})`}
          />
        ))}
      </g>

      <circle cx={CENTER} cy={CENTER} r="35" fill="url(#bsides-sun-core)" />
      <circle
        cx={CENTER}
        cy={CENTER}
        r="35"
        fill="none"
        stroke="#b9601f"
        strokeOpacity="0.3"
        strokeWidth="1"
      />
    </svg>
  );
}

/** A tiny static sun used as an inline editorial mark. Inherits currentColor. */
export function SunGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="4" fill="currentColor" />
      {Array.from({ length: 8 }, (_, i) => (
        <line
          key={i}
          x1="12"
          y1="2.6"
          x2="12"
          y2="5.8"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          transform={`rotate(${(i * 360) / 8} 12 12)`}
        />
      ))}
    </svg>
  );
}

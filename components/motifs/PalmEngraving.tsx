import Image from "next/image";

type PalmVariant = 1 | 2;

const PALMS: Record<PalmVariant, { src: string; w: number; h: number }> = {
  1: { src: "/brand/palm-silhouette.png", w: 3335, h: 4676 },
  2: { src: "/brand/palm-silhouette-2.png", w: 1236, h: 1238 },
};

type PalmEngravingProps = {
  variant?: PalmVariant;
  className?: string;
  flip?: boolean;
  priority?: boolean;
  onDark?: boolean;
};

/**
 * A vintage palm engraving. On paper, `mix-blend-multiply` drops the white
 * plate so only the inked linework reads; on dark grounds the plate is
 * inverted and screened so the linework reads as light. Caller sets size.
 */
export function PalmEngraving({
  variant = 1,
  className = "",
  flip = false,
  priority = false,
  onDark = false,
}: PalmEngravingProps) {
  const palm = PALMS[variant];
  const blend = onDark ? "invert mix-blend-screen" : "mix-blend-multiply";
  return (
    <Image
      src={palm.src}
      alt=""
      aria-hidden="true"
      width={palm.w}
      height={palm.h}
      {...(priority
        ? { loading: "eager" as const, fetchPriority: "high" as const }
        : { loading: "lazy" as const })}
      sizes="(max-width: 768px) 50vw, 33vw"
      className={`pointer-events-none select-none ${blend} ${
        flip ? "-scale-x-100" : ""
      } ${className}`.trim()}
    />
  );
}

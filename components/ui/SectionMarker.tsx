import { SunGlyph } from "@/components/motifs/Sunburst";

type SectionMarkerProps = {
  index: number;
  label: string;
  tone?: "ink" | "paper";
  className?: string;
};

/**
 * The editorial section eyebrow: a sun mark, a section number, a label,
 * and a hairline rule. Replaces the generic uppercase-tracked eyebrow.
 */
export function SectionMarker({
  index,
  label,
  tone = "ink",
  className = "",
}: SectionMarkerProps) {
  const onPaper = tone === "paper";
  return (
    <div className={`flex items-center gap-3 sm:gap-4 ${className}`}>
      <SunGlyph
        className={`h-3.5 w-3.5 shrink-0 ${onPaper ? "text-gold-soft" : "text-gold"}`}
      />
      <span
        className={`font-mono text-xs tracking-[0.16em] ${
          onPaper ? "text-gold-soft" : "text-ember"
        }`}
      >
        № {String(index).padStart(2, "0")}
      </span>
      <span
        className={`font-mono text-[0.7rem] uppercase tracking-[0.3em] ${
          onPaper ? "text-paper/65" : "text-ink/55"
        }`}
      >
        {label}
      </span>
      <span className={`h-px flex-1 ${onPaper ? "bg-paper/20" : "bg-ink/15"}`} />
    </div>
  );
}

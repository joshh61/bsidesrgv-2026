import type { ReactNode } from "react";

type CTAVariant = "primary" | "navy" | "outline" | "outline-light";

type CTAProps = {
  href: string;
  children: ReactNode;
  variant?: CTAVariant;
  className?: string;
  external?: boolean;
};

const BASE =
  "group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 font-mono text-xs uppercase tracking-[0.16em] transition-colors duration-300";

const VARIANTS: Record<CTAVariant, string> = {
  primary: "bg-red text-paper hover:bg-[#a52d23]",
  navy: "bg-navy text-paper hover:bg-navy-deep",
  outline: "border border-navy/35 text-navy hover:bg-navy hover:text-paper",
  "outline-light": "border border-paper/35 text-paper hover:bg-paper hover:text-navy",
};

/** Editorial call-to-action link: sharp block, mono label, nudging arrow. */
export function CTA({
  href,
  children,
  variant = "primary",
  className = "",
  external,
}: CTAProps) {
  const isExternal = external ?? /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      className={`${BASE} ${VARIANTS[variant]} ${className}`.trim()}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
      <span
        aria-hidden="true"
        className="transition-transform duration-300 group-hover:translate-x-1"
      >
        →
      </span>
    </a>
  );
}

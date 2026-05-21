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
  "group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 font-mono text-xs font-medium uppercase tracking-[0.14em] transition-all duration-300 focus-visible:-translate-y-0.5 hover:-translate-y-0.5";

const VARIANTS: Record<CTAVariant, string> = {
  primary: "bg-red text-paper shadow-[0_14px_34px_-24px_rgba(152,39,31,0.9)] hover:bg-[#7f1f19]",
  navy: "bg-navy text-paper shadow-[0_14px_34px_-24px_rgba(16,58,90,0.9)] hover:bg-navy-deep",
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

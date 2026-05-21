import { resourceLinks } from "@/data/conference";

export function ResourcesSection() {
  return (
    <section className="bg-navy text-paper">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="font-display text-[clamp(2rem,4.6vw,3.5rem)] leading-[1.04]">
            Everything, in one place.
          </h2>
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.26em] text-gold-soft">
            Quick links
          </p>
        </div>

        <div className="mt-10 border-t border-paper/15">
          {resourceLinks.map((link, i) => {
            const isExternal = /^https?:\/\//.test(link.href);
            return (
              <a
                key={link.label}
                href={link.href}
                {...(isExternal
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="group flex items-center justify-between gap-6 border-b border-paper/12 py-6"
              >
                <span className="flex items-baseline gap-5">
                  <span className="font-mono text-sm text-gold-soft">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-2xl text-paper transition-colors duration-300 group-hover:text-gold-soft sm:text-3xl">
                    {link.label}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="font-display text-2xl text-paper/40 transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-gold-soft"
                >
                  →
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

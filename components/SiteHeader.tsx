"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";

import { conference, navItems } from "@/data/conference";
import { CTA } from "@/components/ui/CTA";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 64);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50">
      {/* — Dateline strip — */}
      <div
        className={`relative z-10 overflow-hidden bg-navy transition-[max-height] duration-500 ease-out ${
          scrolled ? "max-h-0" : "max-h-14"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-2.5 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-paper/70 sm:text-[0.68rem]">
          <span>Seventh Annual Edition</span>
          <span className="hidden sm:inline">{conference.date}</span>
          <span className="text-gold-soft">{conference.hashtag}</span>
        </div>
      </div>

      {/* — Nameplate + navigation — */}
      <div
        className={`relative z-10 border-b bg-paper/95 backdrop-blur-sm transition-all duration-300 ${
          scrolled
            ? "border-ink/15 shadow-[0_10px_30px_-20px_rgba(28,24,19,0.6)]"
            : "border-ink/10"
        }`}
      >
        <nav
          className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-3"
          aria-label="Primary"
        >
          <a href="#top" className="flex items-center gap-2.5">
            <Image
              src="/brand/bsidesrgv-logo.png"
              alt=""
              width={667}
              height={685}
              className="h-9 w-auto"
            />
            <span className="font-display text-xl leading-none tracking-tight text-ink">
              BSides<span className="text-gold"> RGV</span>
            </span>
          </a>

          <div className="hidden items-center gap-7 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="group relative font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink/65 transition-colors hover:text-ink"
              >
                {item.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <CTA
              href={conference.registrationUrl}
              variant="primary"
              className="hidden px-5 py-2.5 sm:inline-flex"
            >
              Register
            </CTA>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center lg:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <span className="relative block h-3.5 w-6">
                <span
                  className={`absolute inset-x-0 h-[2px] bg-ink transition-all duration-300 ${
                    menuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 bg-ink transition-all duration-300 ${
                    menuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`absolute inset-x-0 h-[2px] bg-ink transition-all duration-300 ${
                    menuOpen ? "bottom-1/2 translate-y-1/2 -rotate-45" : "bottom-0"
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </div>

      {/* — Mobile menu — */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 flex flex-col overflow-y-auto bg-paper px-6 pb-10 pt-32 lg:hidden"
          >
            <nav className="flex flex-col" aria-label="Mobile">
              {navItems.map((item, i) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-baseline gap-4 border-b border-ink/10 py-4"
                >
                  <span className="font-mono text-xs text-ember">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-3xl text-ink">
                    {item.label}
                  </span>
                </a>
              ))}
            </nav>
            <div className="mt-10 flex flex-col gap-3">
              <CTA href={conference.registrationUrl} variant="primary">
                Register on Eventbrite
              </CTA>
              <CTA href={conference.cfpUrl} variant="outline">
                Submit a Talk
              </CTA>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

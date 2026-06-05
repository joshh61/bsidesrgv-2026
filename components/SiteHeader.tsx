"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";

import { conference, navItems } from "@/data/conference";
import { CTA } from "@/components/ui/CTA";

const mobileMenu = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055, delayChildren: 0.08 } },
};

const mobileItem = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Hysteresis: collapse the dateline strip only after scrolling well past it,
    // and re-expand only near the very top. The dead zone (24–130px) is wider
    // than the strip's own height (~56px), so the layout shift from collapsing
    // can't bounce scrollY back across the opposite threshold and re-toggle.
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled((prev) => {
        if (!prev && y > 130) return true;
        if (prev && y < 24) return false;
        return prev;
      });
    };
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
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-2.5 font-mono text-xs font-medium uppercase tracking-[0.16em] text-paper/80">
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
          <Link href="/#top" className="flex items-center gap-2.5">
            <Image
              src="/brand/image004-removebg.png"
              alt="BSides Logo"
              width={483}
              height={437}
              className="h-14 w-auto sm:h-16"
            />
            <span className="font-display text-2xl leading-none tracking-tight text-ink sm:text-3xl">
              BSides<span className="text-gold-ink"> RGV</span>
            </span>
          </Link>

          <div className="hidden items-center gap-7 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="group relative font-mono text-xs font-medium uppercase tracking-[0.14em] text-ink-muted transition-colors hover:text-ink focus-visible:text-ink"
              >
                {item.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
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
              className="flex h-11 w-11 items-center justify-center transition-transform duration-300 hover:-translate-y-0.5 focus-visible:-translate-y-0.5 lg:hidden"
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
            <motion.nav
              variants={mobileMenu}
              initial="hidden"
              animate="show"
              className="flex flex-col"
              aria-label="Mobile"
            >
              {navItems.map((item, i) => (
                <motion.a
                  key={item.label}
                  variants={mobileItem}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="group flex items-baseline gap-4 border-b border-ink/10 py-4"
                >
                  <span className="font-mono text-xs font-medium text-gold-ink">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-3xl text-ink transition-transform duration-300 group-hover:translate-x-1.5">
                    {item.label}
                  </span>
                </motion.a>
              ))}
            </motion.nav>
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

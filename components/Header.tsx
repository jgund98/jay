"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import Logo from "./Logo";
import { site, services } from "@/lib/site";

const nav = [
  { href: "/services", label: "Services" },
  { href: "/our-work", label: "Our Work" },
  { href: "/service-area", label: "Service Area" },
  { href: "/about", label: "About Jay" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
        scrolled
          ? "bg-carbon/88 backdrop-blur-xl shadow-[0_1px_0_rgba(183,166,255,0.16),0_10px_40px_-24px_rgba(0,0,0,0.9)]"
          : "bg-gradient-to-b from-carbon/80 via-carbon/40 to-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1240px] items-center gap-3 px-4 py-3 sm:px-6 lg:gap-6 lg:py-4">
        <Link
          href="/"
          aria-label={`${site.name} — home`}
          className="flex shrink-0 items-center"
        >
          <Logo
            priority
            markClassName="h-10 w-auto sm:h-12"
            wordClassName="h-[19px] w-auto sm:h-[23px]"
          />
        </Link>

        <nav className="ml-auto hidden items-center gap-1 lg:flex">
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <Link
              href="/services"
              className={`rounded-lg px-3 py-2 font-display text-[15px] font-semibold transition-colors ${
                pathname.startsWith("/services")
                  ? "text-cyan"
                  : "text-chrome/80 hover:text-chrome"
              }`}
            >
              Services
            </Link>
            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.18 }}
                  className="absolute left-0 top-full w-[290px] pt-2"
                >
                  <div className="overflow-hidden rounded-xl border border-violet-soft/20 bg-carbon-2/97 p-1.5 shadow-2xl backdrop-blur-xl">
                    {services.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/services/${s.slug}`}
                        className="block rounded-lg px-3 py-2.5 transition-colors hover:bg-violet/18"
                      >
                        <span className="block font-display text-[14px] font-bold text-chrome">
                          {s.name}
                        </span>
                        <span className="block text-[12.5px] text-chrome/50">
                          {s.short}
                        </span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {nav.slice(1).map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`rounded-lg px-3 py-2 font-display text-[15px] font-semibold transition-colors ${
                pathname === n.href
                  ? "text-cyan"
                  : "text-chrome/80 hover:text-chrome"
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-2">
          <a
            href={site.phoneHref}
            className="btn btn-call hidden px-4 py-2.5 text-[14px] sm:inline-flex"
            data-analytics="header-call"
          >
            <PhoneIcon />
            <span className="hidden md:inline">{site.phone}</span>
            <span className="md:hidden">Call</span>
          </a>
          <Link
            href="/contact"
            className="btn btn-primary hidden px-4 py-2.5 text-[14px] md:inline-flex"
          >
            Get a Quote
          </Link>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="grid h-11 w-11 place-items-center rounded-lg border border-violet-soft/25 bg-white/5 lg:hidden"
          >
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 block h-[2px] w-5 rounded bg-chrome transition-all duration-300 ${
                  open ? "top-[7px] rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-[7px] block h-[2px] w-5 rounded bg-chrome transition-all duration-200 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-[2px] w-5 rounded bg-chrome transition-all duration-300 ${
                  open ? "top-[7px] -rotate-45" : "top-[14px]"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: EASE }}
            className="overflow-hidden border-t border-violet-soft/15 bg-carbon/98 backdrop-blur-xl lg:hidden"
          >
            <div className="max-h-[calc(100svh-80px)] overflow-y-auto px-4 pb-6 pt-3">
              <p className="eyebrow px-2 pb-2 pt-2 text-cyan/70">Services</p>
              <div className="grid gap-1">
                {services.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="rounded-lg px-3 py-2.5 font-display text-[16px] font-semibold text-chrome/85 transition-colors hover:bg-violet/15"
                  >
                    {s.name}
                  </Link>
                ))}
              </div>
              <div className="my-3 gc-trace" />
              <div className="grid gap-1">
                {nav.slice(1).map((n) => (
                  <Link
                    key={n.href}
                    href={n.href}
                    className="rounded-lg px-3 py-2.5 font-display text-[16px] font-semibold text-chrome/85 transition-colors hover:bg-violet/15"
                  >
                    {n.label}
                  </Link>
                ))}
              </div>
              <div className="mt-4 grid gap-2">
                <a href={site.phoneHref} className="btn btn-call w-full">
                  <PhoneIcon />
                  {site.phone}
                </a>
                <Link href="/contact" className="btn btn-primary w-full">
                  Get a Quote
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export function PhoneIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M6.6 3h-.9A2.7 2.7 0 0 0 3 5.7C3 14.7 9.3 21 18.3 21a2.7 2.7 0 0 0 2.7-2.7v-.9a1.2 1.2 0 0 0-.83-1.14l-3.4-1.13a1.2 1.2 0 0 0-1.3.38l-.94 1.16a12.4 12.4 0 0 1-5.9-5.9l1.16-.94a1.2 1.2 0 0 0 .38-1.3L8.04 3.83A1.2 1.2 0 0 0 6.9 3h-.3Z"
        fill="currentColor"
      />
    </svg>
  );
}


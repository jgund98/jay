"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import { site } from "@/lib/site";
import Stars from "./Stars";
import { PhoneIcon } from "./Header";

const KEY = "gc-owner-seen";

export default function OwnerPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(KEY)) return;

    let done = false;
    const fire = () => {
      if (done) return;
      done = true;
      sessionStorage.setItem(KEY, "1");
      setOpen(true);
      window.removeEventListener("scroll", onScroll);
      clearTimeout(timer);
    };
    const onScroll = () => {
      if (window.scrollY > window.innerHeight * 0.9) fire();
    };
    const timer = setTimeout(fire, 10000);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[60] grid place-items-center bg-carbon/82 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.26, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={`A note from ${site.owner}`}
            className="relative w-full max-w-[430px] overflow-hidden rounded-2xl border border-violet-soft/25 bg-carbon-2 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.95)]"
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-carbon/70 text-chrome/70 backdrop-blur transition-colors hover:text-chrome"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <div className="relative h-[190px] w-full">
              <Image
                src="/img/popup-tools.jpg"
                alt="A professional socket and wrench set laid out in its case"
                fill
                sizes="430px"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-carbon-2 via-carbon-2/30 to-transparent" />
            </div>

            <div className="-mt-6 px-6 pb-6">
              <Stars value={site.rating} className="h-4" />
              <h3 className="mt-3 font-display text-[26px] font-extrabold leading-tight">
                Talk to {site.ownerShort} directly.
              </h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-chrome/65">
                No call center, no service advisor, no runaround. That number
                rings {site.owner}&rsquo;s own phone, and he or his partner{" "}
                {site.partnerFirst} is the one who shows up and does the work.
              </p>

              <div className="mt-5 grid gap-2.5">
                <a href={site.phoneHref} className="btn btn-call w-full">
                  <PhoneIcon />
                  Call {site.phone}
                </a>
                <a href={site.smsHref} className="btn btn-outline w-full text-[15px]">
                  Text me instead
                </a>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="mt-4 w-full text-center text-[13.5px] text-chrome/40 underline-offset-4 transition-colors hover:text-chrome/70 hover:underline"
              >
                No thanks — just looking around
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


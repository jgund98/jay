"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import { site } from "@/lib/site";
import { PhoneIcon } from "./Header";

export default function MobileDock() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.55);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 90 }}
          animate={{ y: 0 }}
          exit={{ y: 90 }}
          transition={{ duration: 0.32, ease: EASE }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-violet-soft/20 bg-carbon/94 px-3 pb-[calc(0.6rem+env(safe-area-inset-bottom))] pt-2.5 backdrop-blur-xl md:hidden"
        >
          <div className="flex gap-2.5">
            <a
              href={site.phoneHref}
              className="btn btn-call flex-1 py-3 text-[15px]"
              data-analytics="dock-call"
            >
              <PhoneIcon />
              Call {site.ownerShort}
            </a>
            <Link
              href="/contact"
              className="btn btn-primary flex-1 py-3 text-[15px]"
            >
              Get a Quote
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


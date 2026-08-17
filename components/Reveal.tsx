"use client";

import { motion, type Variants } from "framer-motion";
import { EASE } from "@/lib/motion";
import type { ReactNode } from "react";

const base: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.62, ease: EASE },
  },
};

export default function Reveal({
  children,
  delay = 0,
  className = "",
  y = 26,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-12% 0px -8% 0px" }}
      variants={{
        hidden: { opacity: 0, y },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.62, delay, ease: EASE },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  className = "",
  gap = 0.07,
}: {
  children: ReactNode;
  className?: string;
  gap?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={{ show: { transition: { staggerChildren: gap } } }}
    >
      {children}
    </motion.div>
  );
}

export function Item({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={base}>
      {children}
    </motion.div>
  );
}

/** The electric trace divider — the site's motion signature, drawn on scroll. */
export function TraceDivider({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={`gc-trace ${className}`}
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 0.55 }}
      viewport={{ once: true }}
      transition={{ duration: 1.05, ease: EASE }}
      style={{ transformOrigin: "left" }}
    />
  );
}


"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export function MotionReveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 18 }} whileInView={reduced ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.16 }} transition={reduced ? undefined : { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}

export function MotionButton({ children, className = "", ...props }: React.ComponentProps<typeof motion.button>) {
  const reduced = useReducedMotion();
  return <motion.button className={className} whileHover={reduced ? undefined : { y: -2 }} whileTap={reduced ? undefined : { scale: 0.98 }} transition={{ duration: 0.16 }} {...props}>{children}</motion.button>;
}

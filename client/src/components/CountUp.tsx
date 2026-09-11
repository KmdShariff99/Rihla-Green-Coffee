"use client";

import { motion, useReducedMotion } from "framer-motion";

export function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const reduced = useReducedMotion();
  return <motion.span initial={reduced ? false : { opacity: 0 }} whileInView={reduced ? undefined : { opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.45 }}>{reduced ? `${value}${suffix}` : <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>{value}{suffix}</motion.span>}</motion.span>;
}

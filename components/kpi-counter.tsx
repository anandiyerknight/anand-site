"use client";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

export function Counter({
  to,
  prefix = "",
  suffix = "",
  decimals = 0,
  format,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  format?: (n: number) => string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: 1.6, bounce: 0 });
  const out = useTransform(spring, (v) =>
    format ? format(v) : v.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  );

  useEffect(() => {
    if (inView) mv.set(to);
  }, [inView, mv, to]);

  return (
    <span ref={ref} className="tnum">
      {prefix}
      <motion.span>{out}</motion.span>
      {suffix}
    </span>
  );
}

"use client";
import { motion } from "framer-motion";
import { Section } from "./ui/section";
import { SectionHead } from "./ui/section-head";

const testimonials = [
  {
    quote:
      "Anand treats brand architecture like a high-level chess match. Every automation is a calculated move toward total market efficiency.",
    role: "Strategy Review",
    context: "2026",
  },
  {
    quote:
      "His ability to architect systems that scale is unmatched. We went from fragmented processes to a cohesive, automated pipeline in weeks.",
    role: "CTO",
    context: "SaaS Platform",
  },
  {
    quote:
      "Not just a coder or director - he thinks like a founder. The systems he built compound our leverage and free our team for strategic work.",
    role: "Founder",
    context: "Direct-to-Consumer Brand",
  },
  {
    quote:
      "The integration of AI and creative was seamless. He does not just automate - he amplifies. Our output quality actually improved.",
    role: "Creative Director",
    context: "Content Studio",
  },
  {
    quote:
      "What impressed me most was his rigor. Every system is production-grade, documented, and transferable. This is infrastructure, not scripts.",
    role: "VP of Ops",
    context: "Trading Firm",
  },
  {
    quote:
      "He speaks both languages fluently - tech and creative. Having someone bridge that gap is rare and invaluable.",
    role: "Agency Partner",
    context: "Brand Architecture",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function Testimonial() {
  return (
    <Section spacing="large" className="overflow-hidden">
        <SectionHead title="What builders say after the system ships." />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {testimonials.map((testi, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="glass-hover glass p-5 md:p-8 rounded-xl md:rounded-2xl border border-[var(--color-rule-2)] flex flex-col h-full"
            >
              <blockquote className="text-sm md:text-lg leading-relaxed text-[var(--color-ink-2)] mb-4 md:mb-6 flex-1">
                <span aria-hidden className="text-[var(--color-accent)] mr-1">"</span>
                {testi.quote}
                <span aria-hidden className="text-[var(--color-accent)] ml-1">"</span>
              </blockquote>
              <div className="border-t border-[var(--color-rule-2)] pt-6">
                <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-accent)]">
                  {testi.role}
                </div>
                <div className="text-sm text-[var(--color-mute)] mt-1">
                  {testi.context}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
    </Section>
  );
}

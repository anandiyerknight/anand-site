"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "./reveal";

const apps = [
  {
    name: "Pulse AI",
    shortDesc: "Multi-pair trading automation with live A/B testing, portfolio management, and real-time performance monitoring.",
    fullDesc: "Pulse AI is a production-grade trading infrastructure powering automated multi-pair strategies with real-time A/B testing. Deploy live trading pairs simultaneously, monitor performance metrics across dashboards, and optimize strategy parameters with ML-driven insights.",
    tags: ["Trading", "Automation", "Analytics"],
    color: "from-blue-500/20 to-cyan-500/20",
    kpis: [
      { label: "Deploy time", before: "2wk", after: "45min" },
      { label: "Pairs live", before: "1", after: "6" },
    ],
    gallery: [
      { title: "Trading Dashboard", desc: "Real-time P&L tracking and pair management", image: "/images/apps/pulse-1.jpg" },
      { title: "A/B Test Analytics", desc: "Live performance comparison across strategies", image: "/images/apps/pulse-2.jpg" },
      { title: "Portfolio Overview", desc: "Consolidated view of all active positions", image: "/images/apps/pulse-3.jpg" },
      { title: "Optimization Metrics", desc: "ML-powered parameter tuning and backtesting", image: "/images/apps/pulse-4.jpg" },
    ],
  },
  {
    name: "AutoEdit AI",
    shortDesc: "Intelligent video editing pipeline with automated cuts, transitions, and content optimization for social platforms.",
    fullDesc: "AutoEdit AI transforms raw footage into broadcast-quality content through intelligent video processing. Automated scene detection, shot transitions, color grading, and format optimization for TikTok, Instagram, YouTube, and beyond.",
    tags: ["Video", "Editing", "AI"],
    color: "from-purple-500/20 to-pink-500/20",
    kpis: [
      { label: "Edit cycle", before: "3d", after: "2hr" },
      { label: "Formats", before: "1", after: "8" },
    ],
    gallery: [
      { title: "Export Manager", desc: "Multi-format delivery with platform templates", image: "/images/apps/autoedit-4.jpg" },
      { title: "Footage Upload", desc: "Batch processing with drag-and-drop interface", image: "/images/apps/autoedit-1.jpg" },
      { title: "Auto Scene Detection", desc: "AI identifies shots and key moments automatically", image: "/images/apps/autoedit-2.jpg" },
      { title: "Content Optimization", desc: "Format, color, and aspect ratio adaptation", image: "/images/apps/autoedit-3.jpg" },
    ],
  },
  {
    name: "Compass AI",
    shortDesc: "Job search intelligence platform with AI scoring, portfolio optimization, and application tracking for engineers.",
    fullDesc: "Compass AI is a job search intelligence system for engineers. Score job matches based on company metrics, optimize your portfolio for specific roles, track applications with detailed analytics, and get AI-powered interview prep.",
    tags: ["Jobs", "AI", "Scoring"],
    color: "from-amber-500/20 to-orange-500/20",
    kpis: [
      { label: "Jobs scored/day", before: "0", after: "400+" },
      { label: "Apply time", before: "30min", after: "5min" },
    ],
    gallery: [
      { title: "Interview Prep", desc: "AI-powered technical and behavioral coaching", image: "/images/apps/compass-4.jpg" },
      { title: "Job Matching Engine", desc: "AI scoring for unit economics & PMF alignment", image: "/images/apps/compass-1.jpg" },
      { title: "Application Tracker", desc: "Pipeline management with company intel", image: "/images/apps/compass-3.jpg" },
      { title: "Portfolio Optimizer", desc: "Tailor GitHub projects and resume for roles", image: "/images/apps/compass-2.jpg" },
    ],
  },
  {
    name: "Gut Guru",
    shortDesc: "Nutrition & meal composition analysis with AI-powered meal builder, nutrient tracking, and personalized recommendations.",
    fullDesc: "Gut Guru is a comprehensive nutrition intelligence platform combining meal composition analysis, nutrient tracking, and AI-powered recipe recommendations. Build meals based on macros, micronutrients, and health objectives with real-time optimization.",
    tags: ["Nutrition", "Health", "Analytics"],
    color: "from-green-500/20 to-emerald-500/20",
    kpis: [
      { label: "Meal plan", before: "45min", after: "8min" },
      { label: "Foods", before: "0", after: "3000+" },
    ],
    gallery: [
      { title: "Meal Composition UI", desc: "Drag-and-drop meal builder with instant nutrient calc", image: "/images/apps/gutguru-1.jpg" },
      { title: "Food Library", desc: "3000+ food items with detailed nutritional data", image: "/images/apps/gutguru-2.jpg" },
      { title: "Nutrient Tracking", desc: "Real-time macro/micro monitoring with goals", image: "/images/apps/gutguru-3.jpg" },
      { title: "AI Recommendations", desc: "Personalized meal suggestions based on preferences", image: "/images/apps/gutguru-4.jpg" },
    ],
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

export function AppsShowcase() {
  const [selectedApp, setSelectedApp] = useState<typeof apps[0] | null>(null);

  return (
    <>
      <section id="systems" className="relative py-20 md:py-32 px-6 md:px-10 border-t border-[var(--color-rule)]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="mb-12 md:mb-16">
              <h2 className="font-display text-[clamp(2rem,5vw,4rem)] leading-[1] tracking-tight mb-4">
                Systems Built. Running in Production.
              </h2>
              <p className="text-[var(--color-ink-2)] text-base md:text-lg max-w-2xl">
                Production-grade applications built with precision engineering and deployed at scale.
              </p>
            </div>
          </Reveal>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {apps.map((app) => (
              <motion.button
                key={app.name}
                variants={itemVariants}
                onClick={() => setSelectedApp(app)}
                className="group glass-hover glass p-6 md:p-8 rounded-2xl flex flex-col overflow-hidden transition-all duration-300 text-left cursor-pointer hover:scale-[1.02]"
              >
                {/* Image Container */}
                <div className={`relative w-full aspect-video rounded-lg mb-6 overflow-hidden bg-gradient-to-br ${app.color} flex items-center justify-center`}>
                  {app.gallery[0]?.image ? (
                    <>
                      <img
                        src={app.gallery[0].image}
                        alt={app.name}
                        className="absolute inset-0 w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </>
                  ) : null}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                  </div>
                  {!app.gallery[0]?.image && (
                    <div className="text-center text-[var(--color-mute)] font-display text-sm md:text-base">
                      {app.name}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col">
                  <h3 className="font-display text-xl md:text-2xl mb-3 group-hover:text-[var(--color-cyan)] transition-colors">
                    {app.name}
                  </h3>
                  <p className="text-[var(--color-ink-2)] text-sm md:text-base mb-6 flex-1 leading-relaxed">
                    {app.shortDesc}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {app.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-xs px-2 py-1 rounded border border-[var(--color-rule-2)] text-[var(--color-mute)] group-hover:border-[var(--color-cyan)] group-hover:text-[var(--color-cyan)] transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* KPI Metrics */}
                  <div className="space-y-1 text-xs text-[var(--color-mute)]">
                    {app.kpis.map((kpi, idx) => (
                      <div key={idx}>
                        {kpi.label} <span className="text-[var(--color-cyan)]">{kpi.before}</span> → <span className="text-[var(--color-cyan)]">{kpi.after}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 text-[var(--color-cyan)] font-mono text-xs tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                  Click to explore →
                </div>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedApp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedApp(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[var(--color-bg-2)] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-[var(--color-rule)] glass"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 z-10 bg-[var(--color-bg-2)] border-b border-[var(--color-rule)] p-6 md:p-8 flex items-center justify-between">
                <div>
                  <h2 className="font-display text-3xl md:text-4xl mb-2">{selectedApp.name}</h2>
                  <p className="text-[var(--color-ink-2)] text-lg">{selectedApp.fullDesc}</p>
                </div>
                <button
                  onClick={() => setSelectedApp(null)}
                  className="shrink-0 w-10 h-10 rounded-full border border-[var(--color-rule-2)] flex items-center justify-center hover:border-[var(--color-cyan)] hover:text-[var(--color-cyan)] transition-colors"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              {/* Gallery */}
              <div className="p-6 md:p-8">
                <h3 className="font-display text-2xl mb-6">Features & Gallery</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedApp.gallery.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="glass p-6 rounded-xl border border-[var(--color-rule-2)] hover:border-[var(--color-cyan)] transition-colors group cursor-pointer"
                    >
                      <div className={`relative w-full aspect-video rounded-lg mb-4 bg-gradient-to-br ${selectedApp.color} flex items-center justify-center overflow-hidden group`}>
                        {item.image ? (
                          <>
                            <img
                              src={item.image}
                              alt={item.title}
                              className="absolute inset-0 w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-white/5 to-transparent" />
                          </>
                        ) : (
                          <div className="text-center text-[var(--color-mute)] font-mono text-sm">
                            {idx + 1}
                          </div>
                        )}
                      </div>
                      <h4 className="font-display text-lg mb-2 group-hover:text-[var(--color-cyan)] transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-[var(--color-ink-2)] text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Tags Section */}
              <div className="px-6 md:px-8 pb-6 md:pb-8">
                <div className="font-mono text-xs tracking-[0.2em] uppercase text-[var(--color-mute)] mb-3">
                  Technologies & Domains
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedApp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-xs px-3 py-2 rounded border border-[var(--color-cyan)] text-[var(--color-cyan)] bg-cyan-500/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";
import { motion } from "framer-motion";
import { Reveal } from "./reveal";

const films = [
  {
    title: "Gangs of Wasseypur",
    year: "2012",
    role: "Sound Department",
    poster: "/images/films/gangs-of-wasseypur.jpg",
  },
  {
    title: "Jawani Janeman",
    year: "2020",
    role: "Music · Sound",
    poster: "/images/films/jawani-janeman.jpg",
  },
  {
    title: "My Friend Ganesha",
    year: "2012",
    role: "Sound Design",
    poster: "/images/films/my-friend-ganesha.jpg",
  },
  {
    title: "1920: Evil Returns",
    year: "2012",
    role: "Sound Department",
    poster: "/images/films/1920-evil-returns.jpg",
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

export function Filmography() {
  return (
    <section className="relative py-20 md:py-32 px-6 md:px-10 border-t border-[var(--color-rule)]">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="mb-12 md:mb-16">
            <h2 className="font-display text-[clamp(2rem,5vw,4rem)] leading-[1] tracking-tight mb-4">
              Film Credits.
            </h2>
            <p className="text-[var(--color-ink-2)] text-base md:text-lg max-w-2xl">
              Music & Sound Department credits across Indian cinema. Designed sonic architecture for high-stakes productions.
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
          {films.map((film) => (
            <motion.div
              key={film.title}
              variants={itemVariants}
              className="group glass-hover glass p-6 md:p-8 rounded-2xl flex flex-col overflow-hidden transition-all duration-300 text-left cursor-pointer hover:scale-[1.02]"
            >
              {/* Poster Container */}
              <div className="relative w-full aspect-[2/3] rounded-lg mb-6 overflow-hidden bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                {film.poster && (
                  <img
                    src={film.poster}
                    alt={film.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                )}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                </div>
                {!film.poster && (
                  <div className="text-center text-[var(--color-mute)] font-display text-sm">
                    {film.title}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col">
                <h3 className="font-display text-xl md:text-2xl mb-2 group-hover:text-[var(--color-cyan)] transition-colors">
                  {film.title}
                </h3>
                <p className="text-[var(--color-ink-2)] text-sm md:text-base mb-4 flex-1">
                  {film.year}
                </p>
                <div className="font-mono text-xs text-[var(--color-mute)]">
                  {film.role}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

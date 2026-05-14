"use client";
import { motion } from "framer-motion";
import { Reveal } from "./reveal";

const films = [
  {
    title: "Gangs of Wasseypur",
    role: "Sound Design",
    poster: "/posters/gangs-of-wasseypur.jpg",
  },
  {
    title: "Jawani Janeman",
    role: "Music · Sound",
    poster: "/posters/jawani-janeman.jpg",
  },
  {
    title: "My Friend Ganesha",
    role: "Sound Design",
    poster: "/posters/ganesha.jpg",
  },
  {
    title: "1920: Evil Returns",
    role: "Sound Department",
    poster: "/posters/1920-evil-returns.jpg",
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

export function CinemaSection() {
  return (
    <section className="relative py-20 md:py-28 px-6 md:px-10 border-b border-[var(--color-rule)]">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <h2 className="font-display text-[clamp(2.2rem,5vw,4.4rem)] leading-[1.05] tracking-tight mb-12">
            From high-stakes <span className="italic">cinema</span> to
            <br />
            digital infrastructure.
          </h2>
        </Reveal>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {films.map((film) => (
            <motion.div
              key={film.title}
              variants={itemVariants}
              className="group glass-hover glass p-4 rounded-xl flex flex-col overflow-hidden transition-all duration-300"
            >
              <div className="relative w-full aspect-[2/3] rounded-lg mb-5 overflow-hidden bg-white/[0.03] flex items-center justify-center">
                <img
                  src={film.poster}
                  alt={film.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                </div>
              </div>

              <div>
                <h3 className="font-display text-lg md:text-xl mb-2 group-hover:text-[var(--color-cyan)] transition-colors">
                  {film.title}
                </h3>
                <div className="font-mono text-xs text-[var(--color-mute)] tracking-[0.1em] uppercase">
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

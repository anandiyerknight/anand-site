"use client";
import { motion } from "framer-motion";
import { Reveal } from "./reveal";

const films = [
  {
    title: "Gangs of Wasseypur",
    role: "Sound Design",
    poster: "https://m.media-amazon.com/images/M/MV5BMTc5NjY4MjUwNF5BMl5BanBnXkFtZTcwNDIzMTk4Nw@@._V1_FMjpg_UX1000_.jpg",
  },
  {
    title: "Jawani Janeman",
    role: "Music · Sound",
    poster: "https://m.media-amazon.com/images/M/MV5BMTk2MmQ1ZjEtZjUwZC00ZjljLTliYjEtMWE3NTk5ZDMyM2I0XkEyXkFqcGdeQXVyMjY5Nzc4MDk@._V1_FMjpg_UX1000_.jpg",
  },
  {
    title: "My Friend Ganesha",
    role: "Sound Design",
    poster: "https://m.media-amazon.com/images/M/MV5BMjExOTc0NDk4NV5BMl5BanBnXkFtZTcwMDQxNjk0OA@@._V1_FMjpg_UX1000_.jpg",
  },
  {
    title: "1920: Evil Returns",
    role: "Sound Department",
    poster: "https://m.media-amazon.com/images/M/MV5BMTQ4NTI1OTQtNzg5Mi00OTEyLWJhY2EtOTA5N2NlMzYxZWIxXkEyXkFqcGdeQXVyNDA3MDEyMzE@._V1_FMjpg_UX1000_.jpg",
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
    <section className="relative py-20 md:py-32 px-6 md:px-10 border-t border-[var(--color-rule)]">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <h2 className="font-display text-[clamp(2.2rem,5vw,4.4rem)] leading-[1.05] tracking-tight mb-16">
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
              className="group glass-hover glass p-6 rounded-2xl flex flex-col overflow-hidden transition-all duration-300"
            >
              {/* Poster */}
              <div className="relative w-full aspect-[2/3] rounded-lg mb-6 overflow-hidden bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                <img
                  src={film.poster}
                  alt={film.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                </div>
              </div>

              {/* Content */}
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

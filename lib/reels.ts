export type Reel = {
  id: string;
  title: string;
  client: string;
  meta: string;
  src: string;
  poster: string;
  span?: "lg" | "md" | "sm";
};

export const reels: Reel[] = [
  {
    id: "game-trailer",
    title: "Cinematic Game Trailer",
    client: "Confidential",
    meta: "CGI · High-fidelity production",
    src: "/reels/game-trailer.mp4",
    poster: "/posters/hero-flippit-2026.jpg",
    span: "lg",
  },
  {
    id: "kvarski",
    title: "Kvarski — AI Realism",
    client: "Kvarski (D2C luxury)",
    meta: "AI realism · Creative Production",
    src: "/reels/reel-kvarski.mp4",
    poster: "/posters/reel-kvarski.jpg",
    span: "md",
  },
  {
    id: "moviemax",
    title: "Movie Max — Pixar Style",
    client: "Movie Max",
    meta: "Animation · Pixar pipeline",
    src: "/reels/reel-moviemax.mp4",
    poster: "/posters/reel-moviemax.jpg",
    span: "sm",
  },
  {
    id: "gulabi",
    title: "Gulabi — AI Tourism",
    client: "Gulabi Travel",
    meta: "AI travel · Visual Narrative",
    src: "/reels/reel-gulabi.mp4",
    poster: "/posters/reel-gulabi.jpg",
    span: "sm",
  },
  {
    id: "perfume",
    title: "Perfume — AI Product Film",
    client: "Confidential",
    meta: "AI product · Realism",
    src: "/reels/reel-perfume.mp4",
    poster: "/posters/reel-perfume.jpg",
    span: "md",
  },
  {
    id: "bingo",
    title: "Bingo Tedhe Medhe — Spicy",
    client: "ITC / Bingo",
    meta: "FMCG · Performance",
    src: "/reels/reel-bingo.mp4",
    poster: "/posters/reel-bingo.jpg",
    span: "sm",
  },
  {
    id: "bakewills",
    title: "Bakewills — Food",
    client: "Bakewills",
    meta: "Food · D2C",
    src: "/reels/reel-bakewills.mp4",
    poster: "/posters/reel-bakewills.jpg",
    span: "sm",
  },
  {
    id: "kiki",
    title: "House of Kiki — Luxury Handbags",
    client: "House of Kiki",
    meta: "Luxury · Editorial",
    src: "/reels/reel-kiki.mp4",
    poster: "/posters/reel-kiki.jpg",
    span: "md",
  },
  {
    id: "vested",
    title: "Vested Global — Retro Comic",
    client: "Vested Global",
    meta: "Fintech · Animation",
    src: "/reels/reel-vested.mp4",
    poster: "/posters/reel-vested.jpg",
    span: "sm",
  },
  {
    id: "flippit-nov",
    title: "Flippit — Showreel Nov 25",
    client: "Flippit Media",
    meta: "Studio reel · Q4'25",
    src: "/reels/reel-flippit-nov.mp4",
    poster: "/posters/reel-flippit-nov.jpg",
    span: "md",
  },
];

export const stackLoops = {
  content: "/content/stack-content.mp4",
  saas: "/content/stack-saas.mp4",
  funnels: "/content/stack-funnels.mp4",
};

export const musicReels = [
  {
    id: "pooparikka",
    title: "Pooparikka Neeyum Pogaadhae",
    src: "/music/music-pooparikka.mp4",
    poster: "/posters/music-pooparikka.jpg",
  },
  {
    id: "mohabbat",
    title: "Mohabbat Ho Na Jaye — Storyboard",
    src: "/music/music-mohabbat.mp4",
    poster: "/posters/music-mohabbat.jpg",
  },
  {
    id: "tum-agar",
    title: "Tum Agar Saath Dene Ka",
    src: "/music/music-tum-agar.mp4",
    poster: "/posters/music-tum-agar.jpg",
  },
];

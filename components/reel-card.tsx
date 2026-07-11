"use client";
import { useRef, useState } from "react";
import type { Reel } from "@/lib/reels";

export function ReelCard({
  reel,
  onOpen,
  className = "",
  index,
}: {
  reel: Reel;
  onOpen: (r: Reel) => void;
  className?: string;
  index: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hover, setHover] = useState(false);

  return (
    <button
      data-cursor="link"
      onMouseEnter={() => {
        setHover(true);
        videoRef.current?.play().catch(() => {});
      }}
      onMouseLeave={() => {
        setHover(false);
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
      }}
      onClick={() => onOpen(reel)}
      className={`relative group block w-full overflow-hidden glass-hover glass text-left ${className}`}
    >
      <div className="absolute inset-0">
        {/* poster fallback */}
        <img
          src={reel.poster}
          alt=""
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
          style={{ opacity: hover ? 0 : 1 }}
        />
        <video
          ref={videoRef}
          src={reel.src}
          poster={reel.poster}
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
          style={{ opacity: hover ? 1 : 0 }}
        />
      </div>

      {/* gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(6,6,10,0.95)] via-[rgba(6,6,10,0.2)] to-transparent" />

      {/* Title */}
      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 flex items-end justify-between gap-4">
        <div>
          <div className="font-display text-2xl md:text-3xl leading-tight">{reel.title}</div>
          <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-mute)] mt-2">
            {reel.client}
          </div>
        </div>
        <div // @allow-circle: play button
          className="shrink-0 w-10 h-10 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-[var(--color-accent)] group-hover:border-[var(--color-accent)] group-hover:text-[var(--color-bg)] transition">
          <span aria-hidden>▸</span>
        </div>
      </div>
    </button>
  );
}

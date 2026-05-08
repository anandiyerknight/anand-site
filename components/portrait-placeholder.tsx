/** Stylized abstract silhouette — placeholder until a real photo is provided. */
export function PortraitPlaceholder() {
  return (
    <div className="relative aspect-[3/4] overflow-hidden glass">
      <svg viewBox="0 0 300 400" className="w-full h-full">
        <defs>
          <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00E7FF" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#7B5CFF" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#FF2DD1" stopOpacity="0.85" />
          </linearGradient>
          <radialGradient id="halo" cx="50%" cy="35%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" />
            <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.18 0" />
          </filter>
        </defs>
        <rect width="300" height="400" fill="#06060A" />
        <rect width="300" height="400" fill="url(#halo)" />
        {/* Stylized silhouette */}
        <path
          d="M150 90 C 180 90 200 115 200 145 C 200 170 188 188 175 198 C 220 210 240 250 240 295 L 240 400 L 60 400 L 60 295 C 60 250 80 210 125 198 C 112 188 100 170 100 145 C 100 115 120 90 150 90 Z"
          fill="url(#grad)"
          opacity="0.95"
        />
        {/* Scan-lines overlay */}
        <g opacity="0.18">
          {Array.from({ length: 60 }).map((_, i) => (
            <line
              key={i}
              x1="0"
              x2="300"
              y1={i * 7}
              y2={i * 7}
              stroke="#FFFFFF"
              strokeWidth="0.5"
            />
          ))}
        </g>
        <rect width="300" height="400" filter="url(#grain)" opacity="0.5" />
        {/* Frame metadata */}
        <text
          x="14"
          y="22"
          fontFamily="monospace"
          fontSize="9"
          letterSpacing="2"
          fill="#FFFFFF"
          opacity="0.6"
        >
          // SUBJECT_001
        </text>
        <text
          x="14"
          y="388"
          fontFamily="monospace"
          fontSize="9"
          letterSpacing="2"
          fill="#FFFFFF"
          opacity="0.6"
        >
          ANAND IYER · MUM
        </text>
        <text
          x="286"
          y="388"
          textAnchor="end"
          fontFamily="monospace"
          fontSize="9"
          letterSpacing="2"
          fill="#FFFFFF"
          opacity="0.6"
        >
          2026
        </text>
      </svg>
    </div>
  );
}

import React from "react";

const BOLTS = [
  { position: "-top-7 left-1/2 -translate-x-1/2 rotate-[6deg]", size: "h-9 w-5 md:h-11 md:w-6", delay: "0s" },
  { position: "top-8 -right-8 rotate-[95deg]", size: "h-8 w-5 md:h-10 md:w-6", delay: "0.45s" },
  { position: "bottom-8 -right-9 rotate-[150deg]", size: "h-9 w-5 md:h-11 md:w-6", delay: "0.9s" },
  { position: "-bottom-7 left-1/2 -translate-x-1/2 rotate-[186deg]", size: "h-9 w-5 md:h-11 md:w-6", delay: "1.35s" },
  { position: "bottom-8 -left-9 rotate-[214deg]", size: "h-8 w-5 md:h-10 md:w-6", delay: "1.8s" },
  { position: "top-8 -left-8 rotate-[265deg]", size: "h-9 w-5 md:h-11 md:w-6", delay: "2.25s" },
];

const LightningBolt = ({ className, style }) => (
  <svg
    viewBox="0 0 24 40"
    className={`animate-lightning-flicker pointer-events-none absolute drop-shadow-[0_0_8px_rgba(56,189,248,0.85)] ${className}`}
    style={style}
    aria-hidden="true"
  >
    <path d="M14 0 2 21h7l-5 19 16-23h-8z" fill="#7dd3fc" />
  </svg>
);

/**
 * Avatar com halo elétrico giratório e raios piscando ao redor da borda,
 * para destacar a foto do desenvolvedor.
 */
const ElectricAvatar = ({ src, alt, imgClassName = "" }) => (
  <div className="relative inline-flex">
    <span
      className="animate-electric-spin pointer-events-none absolute -inset-3 rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,#38bdf8_15deg,transparent_50deg,transparent_180deg,#7dd3fc_195deg,transparent_235deg)] blur-md"
      aria-hidden="true"
    />
    <span className="animate-electric-pulse-ring pointer-events-none absolute -inset-1" aria-hidden="true" />

    {BOLTS.map((bolt, i) => (
      <LightningBolt key={i} className={`${bolt.size} ${bolt.position}`} style={{ animationDelay: bolt.delay }} />
    ))}

    <img src={src} alt={alt} className={`relative z-10 ${imgClassName}`} />
  </div>
);

export default ElectricAvatar;

import { cn } from "@/lib/utils";

interface LogoProps {
  size?: number;
  className?: string;
}

export function Logo({ size = 28, className }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
      aria-label="CenteIA logo"
    >
      {/* Star clip path */}
      <defs>
        <clipPath id="star-clip">
          <path d="M50 4 L61.8 36.4 L96.6 36.4 L68.4 56.6 L80.2 89 L50 68.8 L19.8 89 L31.6 56.6 L3.4 36.4 L38.2 36.4 Z" />
        </clipPath>
        <clipPath id="star-clip-sm">
          <path d="M50 10 L60.4 38.9 L91 38.9 L66.8 56.6 L77.2 85.5 L50 67.8 L22.8 85.5 L33.2 56.6 L9 38.9 L39.6 38.9 Z" />
        </clipPath>
      </defs>

      {/* Base star — filled */}
      <path
        d="M50 4 L61.8 36.4 L96.6 36.4 L68.4 56.6 L80.2 89 L50 68.8 L19.8 89 L31.6 56.6 L3.4 36.4 L38.2 36.4 Z"
        fill="#E4E4E7"
      />

      {/* Layer 1 — dark band diagonal */}
      <g clipPath="url(#star-clip)">
        <rect
          x="-10"
          y="30"
          width="120"
          height="22"
          rx="11"
          fill="#0A0A0A"
          transform="rotate(-8 50 50)"
        />
      </g>

      {/* Layer 2 — medium band */}
      <g clipPath="url(#star-clip)">
        <rect
          x="-10"
          y="50"
          width="120"
          height="16"
          rx="8"
          fill="#52525B"
          transform="rotate(-8 50 50)"
        />
      </g>

      {/* Inner star — outline only, slightly smaller */}
      <path
        d="M50 10 L60.4 38.9 L91 38.9 L66.8 56.6 L77.2 85.5 L50 67.8 L22.8 85.5 L33.2 56.6 L9 38.9 L39.6 38.9 Z"
        fill="none"
        stroke="#0A0A0A"
        strokeWidth="2"
        opacity="0.15"
      />
    </svg>
  );
}

export function LogoFull({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <Logo size={28} />
      <div>
        <p className="text-sm font-semibold text-zinc-900 leading-none tracking-tight">CenteIA</p>
        <p className="text-[10px] text-zinc-400 mt-0.5 leading-none">Gestión de Proyectos</p>
      </div>
    </div>
  );
}

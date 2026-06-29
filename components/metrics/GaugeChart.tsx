"use client";

import { cn } from "@/lib/utils";
import type { GaugeBreakdown } from "@/lib/types";

interface GaugeChartProps {
  percentage: number;
  label: string;
  sublabel?: string;
  breakdown: GaugeBreakdown[];
  className?: string;
}

function SemiCircleGauge({ percentage }: { percentage: number }) {
  const clampedPct = Math.min(100, Math.max(0, percentage));
  const total = 180;
  const filled = (clampedPct / 100) * total;

  // Build arc segments: we draw a semicircle with multiple segments
  const r = 70;
  const cx = 90;
  const cy = 90;
  const strokeWidth = 18;

  function polarToCartesian(angle: number) {
    const rad = ((angle - 180) * Math.PI) / 180;
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad),
    };
  }

  function arcPath(startAngle: number, endAngle: number) {
    if (Math.abs(endAngle - startAngle) < 0.01) return "";
    const start = polarToCartesian(startAngle);
    const end = polarToCartesian(endAngle);
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;
    return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`;
  }

  return (
    <svg viewBox="0 0 180 112" className="w-full max-w-[220px]">
      {/* Background track */}
      <path
        d={arcPath(0, 180)}
        fill="none"
        stroke="#F4F4F5"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      {/* Filled arc */}
      {filled > 0 && (
        <path
          d={arcPath(0, filled)}
          fill="none"
          stroke="#0A0A0A"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
      )}
      {/* Center text */}
      <text
        x={cx}
        y={cy + 2}
        textAnchor="middle"
        style={{ fontSize: 22, fill: "#0A0A0A", fontFamily: "Inter, sans-serif", fontWeight: 600 }}
      >
        {clampedPct}%
      </text>
      <text
        x={cx}
        y={cy + 18}
        textAnchor="middle"
        style={{ fontSize: 9, fill: "#A1A1AA", fontFamily: "Inter, sans-serif", letterSpacing: "0.08em" }}
      >
        OCUPACIÓN
      </text>
    </svg>
  );
}

export function GaugeChart({ percentage, label, sublabel, breakdown, className }: GaugeChartProps) {
  return (
    <div className={cn("bg-white border border-zinc-100 rounded-xl p-5", className)}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-[10px] font-semibold tracking-widest uppercase text-zinc-400">
            {label}
          </p>
          {sublabel && <p className="text-xs text-zinc-500 mt-0.5">{sublabel}</p>}
        </div>
      </div>

      {/* Gauge */}
      <div className="flex justify-center mb-4">
        <SemiCircleGauge percentage={percentage} />
      </div>

      {/* Breakdown lanes */}
      <div className="space-y-2.5 mt-2">
        {breakdown.map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-zinc-600">{item.label}</span>
                <span
                  className={cn(
                    "text-xs font-medium",
                    item.percentage >= 100
                      ? "text-red-600"
                      : item.percentage >= 80
                        ? "text-amber-600"
                        : "text-green-600"
                  )}
                >
                  {item.percentage}%
                </span>
              </div>
              <div className="h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-500",
                    item.percentage >= 100
                      ? "bg-red-500"
                      : item.percentage >= 80
                        ? "bg-amber-400"
                        : "bg-zinc-900"
                  )}
                  style={{ width: `${Math.min(item.percentage, 100)}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

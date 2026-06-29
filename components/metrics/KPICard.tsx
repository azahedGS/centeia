import { TrendingUp, TrendingDown, Minus, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Trend } from "@/lib/types";

interface KPICardProps {
  label: string;
  value: string | number;
  unit?: string;
  subtitle?: string;
  trend?: Trend;
  trendValue?: string;
  alert?: boolean;
  className?: string;
}

const TrendIcon = ({ trend }: { trend: Trend }) => {
  if (trend === "up") return <TrendingUp size={13} />;
  if (trend === "down") return <TrendingDown size={13} />;
  return <Minus size={13} />;
};

export function KPICard({
  label,
  value,
  unit,
  subtitle,
  trend,
  trendValue,
  alert = false,
  className,
}: KPICardProps) {
  const trendColor =
    trend === "up"
      ? alert
        ? "text-red-600"
        : "text-green-600"
      : trend === "down"
        ? alert
          ? "text-green-600"
          : "text-red-600"
        : "text-zinc-500";

  return (
    <div
      className={cn(
        "bg-white border border-zinc-100 rounded-xl p-5 flex flex-col gap-3 hover:border-zinc-200 transition-colors",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <p className="text-[10px] font-semibold tracking-widest uppercase text-zinc-400">
          {label}
        </p>
        <button className="text-zinc-300 hover:text-zinc-600 transition-colors cursor-pointer">
          <ArrowUpRight size={14} />
        </button>
      </div>

      <div className="flex items-end gap-2">
        <span
          className={cn(
            "text-3xl font-semibold tracking-tight leading-none",
            alert && Number(value) > 0 ? "text-red-600" : "text-zinc-900"
          )}
        >
          {value}
        </span>
        {unit && (
          <span className="text-sm text-zinc-400 mb-0.5">{unit}</span>
        )}
      </div>

      <div className="flex items-center gap-1.5">
        {trend && trendValue && (
          <span className={cn("flex items-center gap-0.5 text-xs font-medium", trendColor)}>
            <TrendIcon trend={trend} />
            {trendValue}
          </span>
        )}
        {subtitle && (
          <span className="text-xs text-zinc-400">{subtitle}</span>
        )}
      </div>
    </div>
  );
}

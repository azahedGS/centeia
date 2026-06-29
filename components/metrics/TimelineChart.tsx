"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { TimelineDataPoint } from "@/lib/types";

interface TimelineChartProps {
  data: TimelineDataPoint[];
}

interface TooltipEntry {
  name?: string;
  value?: number;
  color?: string;
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: TooltipEntry[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-zinc-200 rounded-lg shadow-sm p-3 text-xs">
      <p className="font-semibold text-zinc-800 mb-2">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full" style={{ background: entry.color }} />
          <span className="text-zinc-500 capitalize">{entry.name}:</span>
          <span className="font-medium text-zinc-800">{entry.value}</span>
        </div>
      ))}
    </div>
  );
}

export function TimelineChart({ data }: TimelineChartProps) {
  return (
    <div className="bg-white border border-zinc-100 rounded-xl p-5 h-full">
      <div className="mb-4">
        <p className="text-[10px] font-semibold tracking-widest uppercase text-zinc-400">
          TENDENCIA DE PROYECTOS
        </p>
        <p className="text-xs text-zinc-500 mt-0.5">Últimos 6 meses</p>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-zinc-900" />
          <span className="text-xs text-zinc-500">Activos</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-xs text-zinc-500">Liberados</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-500" />
          <span className="text-xs text-zinc-500">En riesgo</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
          <CartesianGrid stroke="#F4F4F5" strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: "#A1A1AA", fontFamily: "Inter" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#A1A1AA", fontFamily: "Inter" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#E4E4E7", strokeWidth: 1 }} />
          <Line
            type="monotone"
            dataKey="active"
            name="Activos"
            stroke="#0A0A0A"
            strokeWidth={2}
            dot={{ r: 3, fill: "#0A0A0A", strokeWidth: 0 }}
            activeDot={{ r: 4, fill: "#0A0A0A" }}
          />
          <Line
            type="monotone"
            dataKey="released"
            name="Liberados"
            stroke="#16A34A"
            strokeWidth={2}
            dot={{ r: 3, fill: "#16A34A", strokeWidth: 0 }}
            activeDot={{ r: 4, fill: "#16A34A" }}
          />
          <Line
            type="monotone"
            dataKey="at_risk"
            name="En riesgo"
            stroke="#DC2626"
            strokeWidth={2}
            dot={{ r: 3, fill: "#DC2626", strokeWidth: 0 }}
            activeDot={{ r: 4, fill: "#DC2626" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

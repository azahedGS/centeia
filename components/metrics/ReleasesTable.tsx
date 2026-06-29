import { cn } from "@/lib/utils";
import type { Project } from "@/lib/types";

interface ReleasesTableProps {
  releases: Project[];
}

const STATUS_LABEL: Record<Project["status"], string> = {
  active: "En curso",
  at_risk: "En riesgo",
  released: "Liberado",
  on_hold: "Pausado",
};

const STATUS_STYLE: Record<Project["status"], string> = {
  active: "bg-zinc-100 text-zinc-600",
  at_risk: "bg-red-50 text-red-600",
  released: "bg-green-50 text-green-700",
  on_hold: "bg-amber-50 text-amber-700",
};

export function ReleasesTable({ releases }: ReleasesTableProps) {
  return (
    <div className="bg-white border border-zinc-100 rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-[10px] font-semibold tracking-widest uppercase text-zinc-400">
            PRÓXIMAS LIBERACIONES
          </p>
          <p className="text-xs text-zinc-500 mt-0.5">{releases.length} proyectos</p>
        </div>
      </div>

      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-zinc-100">
            <th className="text-left py-2 text-[10px] font-semibold tracking-widest uppercase text-zinc-400 pr-4">Días</th>
            <th className="text-left py-2 text-[10px] font-semibold tracking-widest uppercase text-zinc-400 pr-4">Folio</th>
            <th className="text-left py-2 text-[10px] font-semibold tracking-widest uppercase text-zinc-400 pr-4">Carril</th>
            <th className="text-left py-2 text-[10px] font-semibold tracking-widest uppercase text-zinc-400">Estatus</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-50">
          {releases.map((r) => (
            <tr key={r.id} className="hover:bg-zinc-50 transition-colors cursor-pointer">
              <td className="py-2.5 pr-4">
                <span
                  className={cn(
                    "inline-flex items-center justify-center w-8 h-6 rounded text-xs font-semibold",
                    (r.daysToRelease ?? 0) <= 3
                      ? "bg-red-50 text-red-600"
                      : (r.daysToRelease ?? 0) <= 7
                        ? "bg-amber-50 text-amber-700"
                        : "bg-zinc-100 text-zinc-600"
                  )}
                >
                  {r.daysToRelease}d
                </span>
              </td>
              <td className="py-2.5 pr-4">
                <span className="font-medium text-zinc-800 text-xs">{r.folio}</span>
              </td>
              <td className="py-2.5 pr-4">
                <span className="text-xs text-zinc-500">{r.lane}</span>
              </td>
              <td className="py-2.5">
                <span
                  className={cn(
                    "inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium",
                    STATUS_STYLE[r.status]
                  )}
                >
                  {STATUS_LABEL[r.status]}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

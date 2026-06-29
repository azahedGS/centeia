import { ArrowRight } from "lucide-react";
import type { ActivityItem } from "@/lib/types";

interface ActivityFeedProps {
  items: ActivityItem[];
}

export function ActivityFeed({ items }: ActivityFeedProps) {
  return (
    <div className="bg-white border border-zinc-100 rounded-xl p-5">
      <div className="mb-4">
        <p className="text-[10px] font-semibold tracking-widest uppercase text-zinc-400">
          ACTIVIDAD RECIENTE
        </p>
        <p className="text-xs text-zinc-500 mt-0.5">Últimos cambios de estatus</p>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex gap-3 group cursor-pointer">
            {/* Dot + line */}
            <div className="flex flex-col items-center pt-1">
              <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 group-hover:bg-zinc-600 transition-colors flex-shrink-0" />
              <div className="w-px flex-1 bg-zinc-100 mt-1" />
            </div>

            {/* Content */}
            <div className="pb-3 min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <span className="text-xs font-medium text-zinc-800 truncate block">
                    {item.folio}
                  </span>
                  <span className="text-[11px] text-zinc-500">{item.action}</span>
                </div>
                <span className="text-[10px] text-zinc-400 flex-shrink-0 mt-0.5">
                  {item.timestamp}
                </span>
              </div>

              {item.from && item.to && (
                <div className="flex items-center gap-1.5 mt-1.5">
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] bg-zinc-100 text-zinc-500">
                    {item.from}
                  </span>
                  <ArrowRight size={10} className="text-zinc-400 flex-shrink-0" />
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] bg-zinc-900 text-white">
                    {item.to}
                  </span>
                </div>
              )}

              {item.user && (
                <p className="text-[10px] text-zinc-400 mt-1">por {item.user}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

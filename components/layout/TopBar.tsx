"use client";

import { useState } from "react";
import { Search, Bell, Download, ChevronDown, Filter } from "lucide-react";

const PERIODS = ["Esta semana", "Últimos 30 días", "Este mes", "Este trimestre", "Este año"];

export function TopBar() {
  const [period, setPeriod] = useState("Últimos 30 días");
  const [showPeriods, setShowPeriods] = useState(false);

  return (
    <header className="fixed top-0 left-56 right-0 z-10 h-14 bg-white border-b border-zinc-100 flex items-center px-6 gap-4">
      {/* Search */}
      <div className="flex-1 max-w-xs relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
        <input
          type="text"
          placeholder="Buscar proyectos, folios..."
          className="w-full pl-9 pr-3 py-1.5 text-sm bg-zinc-50 border border-zinc-200 rounded-md text-zinc-700 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-300 focus:border-zinc-300 transition-colors"
        />
      </div>

      <div className="flex items-center gap-2 ml-auto">
        {/* Period filter */}
        <div className="relative">
          <button
            onClick={() => setShowPeriods(!showPeriods)}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-zinc-600 bg-white border border-zinc-200 rounded-md hover:border-zinc-300 transition-colors cursor-pointer"
          >
            <span>{period}</span>
            <ChevronDown size={13} className="text-zinc-400" />
          </button>
          {showPeriods && (
            <div className="absolute right-0 top-full mt-1 bg-white border border-zinc-200 rounded-lg shadow-lg py-1 min-w-[160px] z-50">
              {PERIODS.map((p) => (
                <button
                  key={p}
                  onClick={() => { setPeriod(p); setShowPeriods(false); }}
                  className={`w-full text-left px-3 py-2 text-sm cursor-pointer transition-colors ${
                    p === period ? "bg-zinc-50 text-zinc-900 font-medium" : "text-zinc-600 hover:bg-zinc-50"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Filter */}
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-zinc-600 bg-white border border-zinc-200 rounded-md hover:border-zinc-300 transition-colors cursor-pointer">
          <Filter size={13} />
          <span>Filtrar</span>
        </button>

        {/* Notifications */}
        <button className="relative p-1.5 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 rounded-md transition-colors cursor-pointer">
          <Bell size={16} />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full" />
        </button>

        {/* Export */}
        <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-zinc-900 rounded-md hover:bg-zinc-700 transition-colors cursor-pointer">
          <Download size={13} />
          <span>Exportar</span>
        </button>
      </div>
    </header>
  );
}

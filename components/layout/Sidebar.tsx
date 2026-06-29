"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  Users,
  GitBranch,
  DollarSign,
  Briefcase,
  Rocket,
  AlertTriangle,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  {
    section: "PRINCIPAL",
    items: [
      { label: "Pulso", href: "/pulse", icon: Activity },
      { label: "Capacidad", href: "/capacity", icon: Users },
      { label: "Pipeline", href: "/pipeline", icon: GitBranch },
      { label: "Financiero", href: "/financials", icon: DollarSign },
    ],
  },
  {
    section: "PROYECTOS",
    items: [
      { label: "Portafolio", href: "/portfolio", icon: Briefcase },
      { label: "Liberaciones", href: "/releases", icon: Rocket },
      { label: "Riesgos", href: "/risks", icon: AlertTriangle },
    ],
  },
  {
    section: "SISTEMA",
    items: [{ label: "Configuración", href: "/settings", icon: Settings }],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-20 w-56 bg-white border-r border-zinc-100 flex flex-col">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-zinc-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-zinc-900 rounded-md flex items-center justify-center">
            <span className="text-white text-xs font-bold tracking-tight">C</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-900 leading-none">CenteIA</p>
            <p className="text-[10px] text-zinc-400 mt-0.5">Gestión de Proyectos</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
        {NAV.map((group) => (
          <div key={group.section}>
            <p className="px-2 mb-1.5 text-[10px] font-semibold tracking-widest uppercase text-zinc-400">
              {group.section}
            </p>
            <ul className="space-y-0.5">
              {group.items.map(({ label, href, icon: Icon }) => {
                const active = pathname === href || pathname.startsWith(href + "/");
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={cn(
                        "flex items-center gap-3 px-2 py-2 rounded-md text-sm transition-colors duration-150 cursor-pointer",
                        active
                          ? "border-l-2 border-zinc-900 bg-zinc-50 text-zinc-900 font-medium pl-[6px]"
                          : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"
                      )}
                    >
                      <Icon size={15} strokeWidth={1.75} />
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* User footer */}
      <div className="px-4 py-4 border-t border-zinc-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-zinc-200 flex items-center justify-center text-[11px] font-medium text-zinc-600">
            AZ
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-zinc-800 truncate">Azahed</p>
            <p className="text-[10px] text-zinc-400 truncate">azahedonist@gmail.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

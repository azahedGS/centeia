import { KPICard } from "@/components/metrics/KPICard";
import { GaugeChart } from "@/components/metrics/GaugeChart";
import { TimelineChart } from "@/components/metrics/TimelineChart";
import { ReleasesTable } from "@/components/metrics/ReleasesTable";
import { ActivityFeed } from "@/components/metrics/ActivityFeed";
import type { GaugeBreakdown, TimelineDataPoint, Project, ActivityItem } from "@/lib/types";

// ─── Mock data ────────────────────────────────────────────────
const gaugeBreakdown: GaugeBreakdown[] = [
  { label: "Divisas", percentage: 100 },
  { label: "Cripto Masivos", percentage: 83 },
  { label: "Money Free Flex", percentage: 100 },
  { label: "TDR/EKTV", percentage: 100 },
  { label: "Cripto Backoffice", percentage: 100 },
  { label: "Cripto Corporativo", percentage: 100 },
];

const timelineData: TimelineDataPoint[] = [
  { month: "Ene", active: 35, released: 4, at_risk: 6 },
  { month: "Feb", active: 37, released: 6, at_risk: 8 },
  { month: "Mar", active: 39, released: 5, at_risk: 9 },
  { month: "Abr", active: 38, released: 7, at_risk: 10 },
  { month: "May", active: 40, released: 8, at_risk: 11 },
  { month: "Jun", active: 40, released: 9, at_risk: 11 },
];

const upcomingReleases: Project[] = [
  { id: "1", folio: "LEANBA-70329", name: "LEANBA-70329", lane: "Divisas", status: "active", releaseDate: "2026-07-01", daysToRelease: 2 },
  { id: "2", folio: "CRIPTO-14521", name: "CRIPTO-14521", lane: "Cripto Masivos", status: "active", releaseDate: "2026-07-05", daysToRelease: 6 },
  { id: "3", folio: "MFF-09832", name: "MFF-09832", lane: "Money Free Flex", status: "at_risk", releaseDate: "2026-07-08", daysToRelease: 9 },
  { id: "4", folio: "TDR-00441", name: "TDR-00441", lane: "TDR/EKTV", status: "active", releaseDate: "2026-07-10", daysToRelease: 11 },
  { id: "5", folio: "CB-22198", name: "CB-22198", lane: "Cripto Backoffice", status: "at_risk", releaseDate: "2026-07-14", daysToRelease: 15 },
  { id: "6", folio: "CC-03347", name: "CC-03347", lane: "Cripto Corporativo", status: "active", releaseDate: "2026-07-18", daysToRelease: 19 },
];

const activity: ActivityItem[] = [
  { id: "1", project: "LEANBA-70329", folio: "LEANBA-70329", action: "Cambio de estatus", from: "En desarrollo", to: "QA", timestamp: "Hace 5 min", user: "E. Torres" },
  { id: "2", project: "MFF-09832", folio: "MFF-09832", action: "Marcado en riesgo", from: "En desarrollo", to: "En riesgo", timestamp: "Hace 23 min", user: "L. García" },
  { id: "3", project: "CRIPTO-14521", folio: "CRIPTO-14521", action: "Fecha ajustada", from: "Jul 3", to: "Jul 5", timestamp: "Hace 1h", user: "M. Salinas" },
  { id: "4", project: "CB-22198", folio: "CB-22198", action: "Asignado a carril", from: "Sin carril", to: "Cripto Backoffice", timestamp: "Hace 2h", user: "R. Mendez" },
  { id: "5", project: "TDR-00441", folio: "TDR-00441", action: "Revisión completada", from: "En revisión", to: "Aprobado", timestamp: "Hace 3h", user: "K. Ruiz" },
  { id: "6", project: "CC-03347", folio: "CC-03347", action: "Comentario añadido", from: undefined, to: undefined, timestamp: "Hace 4h", user: "A. Hernández" },
];
// ──────────────────────────────────────────────────────────────

export default function PulsePage() {
  return (
    <div className="space-y-5">
      {/* Row 1: KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        <KPICard
          label="Proyectos activos"
          value={40}
          trend="up"
          trendValue="+3"
          subtitle="vs semana anterior"
        />
        <KPICard
          label="En riesgo"
          value={11}
          trend="up"
          trendValue="+2"
          subtitle="vs semana anterior"
          alert={true}
        />
        <KPICard
          label="Capacidad disponible"
          value="7%"
          subtitle="4 de 61 personas"
          trend="down"
          trendValue="-2%"
          alert={true}
        />
        <KPICard
          label="Próxima liberación"
          value="LEANBA-70329"
          subtitle="en 2 días"
          trend="flat"
        />
      </div>

      {/* Row 2: Gauge + Timeline */}
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-2">
          <GaugeChart
            percentage={97}
            label="Ocupación del equipo"
            sublabel="16,432 · Proyectos Activos"
            breakdown={gaugeBreakdown}
          />
        </div>
        <div className="col-span-3">
          <TimelineChart data={timelineData} />
        </div>
      </div>

      {/* Row 3: Releases + Activity */}
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-3">
          <ReleasesTable releases={upcomingReleases} />
        </div>
        <div className="col-span-2">
          <ActivityFeed items={activity} />
        </div>
      </div>
    </div>
  );
}

export type Trend = "up" | "down" | "flat";

export interface KPI {
  label: string;
  value: string | number;
  unit?: string;
  trend?: Trend;
  trendValue?: string;
  alert?: boolean;
}

export interface GaugeBreakdown {
  label: string;
  percentage: number;
  color?: string;
}

export interface Project {
  id: string;
  folio: string;
  name: string;
  lane: string;
  status: "active" | "at_risk" | "released" | "on_hold";
  releaseDate: string;
  daysToRelease?: number;
  owner?: string;
}

export interface ActivityItem {
  id: string;
  project: string;
  folio: string;
  action: string;
  from?: string;
  to?: string;
  timestamp: string;
  user?: string;
}

export type Lane =
  | "Divisas"
  | "Cripto Masivos"
  | "Money Free Flex"
  | "TDR/EKTV"
  | "Cripto Backoffice"
  | "Cripto Corporativo";

export interface TimelineDataPoint {
  month: string;
  active: number;
  released: number;
  at_risk: number;
}

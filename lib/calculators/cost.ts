// TODO: migrar a rate_config Supabase
export const RATE_PER_HOUR = 72.2;

export function calculateProjectCost(hours: number): number {
  return hours * RATE_PER_HOUR;
}

export function calculateTeamCost(people: number, hoursPerPerson: number): number {
  return people * hoursPerPerson * RATE_PER_HOUR;
}

export function formatCurrency(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

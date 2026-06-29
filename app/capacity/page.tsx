import { Users } from "lucide-react";
import { PlaceholderPage } from "@/components/ui/PlaceholderPage";

export const metadata = { title: "Capacidad — CenteIA" };

export default function CapacityPage() {
  return (
    <PlaceholderPage
      title="Capacidad del Equipo"
      description="Vista detallada de disponibilidad por persona, carril y sprint. Próximamente."
      icon={Users}
    />
  );
}

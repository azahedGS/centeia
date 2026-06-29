import { Briefcase } from "lucide-react";
import { PlaceholderPage } from "@/components/ui/PlaceholderPage";

export const metadata = { title: "Portafolio — CenteIA" };

export default function PortfolioPage() {
  return (
    <PlaceholderPage
      title="Portafolio de Proyectos"
      description="Vista global de los 40 proyectos activos por carril, estatus y equipo. Próximamente."
      icon={Briefcase}
    />
  );
}

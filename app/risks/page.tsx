import { AlertTriangle } from "lucide-react";
import { PlaceholderPage } from "@/components/ui/PlaceholderPage";

export const metadata = { title: "Riesgos — CenteIA" };

export default function RisksPage() {
  return (
    <PlaceholderPage
      title="Gestión de Riesgos"
      description="Los 11 proyectos en riesgo con análisis de impacto y plan de mitigación. Próximamente."
      icon={AlertTriangle}
    />
  );
}

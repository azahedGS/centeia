import { Settings } from "lucide-react";
import { PlaceholderPage } from "@/components/ui/PlaceholderPage";

export const metadata = { title: "Configuración — CenteIA" };

export default function SettingsPage() {
  return (
    <PlaceholderPage
      title="Configuración"
      description="Integración con Goverfolio, Epicron y GantiAgile, y configuración de rate_config. Próximamente."
      icon={Settings}
    />
  );
}

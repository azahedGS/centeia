import { DollarSign } from "lucide-react";
import { PlaceholderPage } from "@/components/ui/PlaceholderPage";

export const metadata = { title: "Financiero — CenteIA" };

export default function FinancialsPage() {
  return (
    <PlaceholderPage
      title="Vista Financiera"
      description="Costo por proyecto a $72.20/hr, proyecciones y análisis de inversión. Próximamente."
      icon={DollarSign}
    />
  );
}

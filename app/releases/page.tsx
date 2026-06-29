import { Rocket } from "lucide-react";
import { PlaceholderPage } from "@/components/ui/PlaceholderPage";

export const metadata = { title: "Liberaciones — CenteIA" };

export default function ReleasesPage() {
  return (
    <PlaceholderPage
      title="Liberaciones"
      description="Historial y calendario de liberaciones a producción por carril. Próximamente."
      icon={Rocket}
    />
  );
}

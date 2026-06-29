import { GitBranch } from "lucide-react";
import { PlaceholderPage } from "@/components/ui/PlaceholderPage";

export const metadata = { title: "Pipeline — CenteIA" };

export default function PipelinePage() {
  return (
    <PlaceholderPage
      title="Pipeline de Proyectos"
      description="Flujo kanban de proyectos desde backlog hasta liberación. Próximamente."
      icon={GitBranch}
    />
  );
}

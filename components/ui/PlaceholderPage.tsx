import { type LucideIcon } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export function PlaceholderPage({ title, description, icon: Icon }: PlaceholderPageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="w-12 h-12 bg-zinc-100 rounded-xl flex items-center justify-center mb-4">
        <Icon size={22} className="text-zinc-400" strokeWidth={1.5} />
      </div>
      <h1 className="text-lg font-semibold text-zinc-800 mb-1">{title}</h1>
      <p className="text-sm text-zinc-500 max-w-xs">{description}</p>
      <div className="mt-6 inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-100 rounded-md text-xs text-zinc-500">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
        En desarrollo
      </div>
    </div>
  );
}

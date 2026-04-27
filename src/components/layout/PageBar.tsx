import { ChevronDown, Calendar, Plus } from "lucide-react";

interface Props {
  breadcrumb: { label: string; accent?: boolean }[];
  filterLabel?: string;
  periodLabel?: string;
  onAdd?: () => void;
}

export const PageBar = ({ breadcrumb, filterLabel = "Todos", periodLabel = "Abril - 2026", onAdd }: Props) => {
  return (
    <div className="space-y-3">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        {breadcrumb.map((b, i) => (
          <span key={i} className="flex items-center gap-2">
            <span className={b.accent ? "text-accent font-semibold" : "text-muted-foreground"}>{b.label}</span>
            {i < breadcrumb.length - 1 && <span className="text-muted-foreground/50">/</span>}
          </span>
        ))}
      </div>

      {/* Filters row */}
      <div className="flex items-center gap-3 flex-wrap">
        <button className="flex items-center justify-between gap-2 min-w-[140px] h-10 px-4 rounded-full border border-border bg-white text-sm text-muted-foreground hover:border-primary/30 transition-colors">
          <span>{filterLabel}</span>
          <ChevronDown className="h-4 w-4 text-accent" strokeWidth={2.5} />
        </button>

        <button className="flex items-center justify-between gap-2 min-w-[170px] h-10 px-4 rounded-full border border-border bg-white text-sm text-muted-foreground hover:border-primary/30 transition-colors">
          <span>{periodLabel}</span>
          <Calendar className="h-4 w-4 text-muted-foreground" strokeWidth={2} />
        </button>

        <button
          onClick={onAdd}
          title="Nova avaliação"
          className="h-10 w-10 rounded-full border-2 border-accent text-accent flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          <Plus className="h-5 w-5" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
};

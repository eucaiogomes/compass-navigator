import { classifyRisk } from "@/data/copsoq";
import { cn } from "@/lib/utils";

interface Item { dimension: string; score: number }

const colorFor = (score: number) => {
  const c = classifyRisk(score);
  return c === "low" ? "var(--color-risk-low)" : c === "moderate" ? "var(--color-risk-moderate)" : "var(--color-risk-high)";
};

export const DimensionBarsChart = ({ 
  data, 
  limit = 10, 
  fullLabels = false,
  compact = false 
}: { 
  data: Item[], 
  limit?: number, 
  fullLabels?: boolean,
  compact?: boolean
}) => {
  const top = limit ? data.slice(0, limit) : data;
  return (
    <div className={cn("flex flex-col h-full", compact ? "justify-between gap-1" : "space-y-4")}>
      {top.map((d) => {
        const pct = (d.score / 4) * 100;
        const color = colorFor(d.score);
        return (
          <div key={d.dimension} className={cn("grid grid-cols-[1fr_auto] gap-2 items-center min-h-0", compact ? "flex-1" : "")} title={`${d.dimension}: ${d.score.toFixed(2)} / 4`}>
            <div className="min-w-0 flex flex-col justify-center h-full">
              <div className={cn("flex items-baseline justify-between gap-1", compact ? "mb-0" : "mb-1")}>
                <span className={cn(
                  "font-medium text-foreground leading-tight",
                  compact ? "text-[10px]" : "text-xs",
                  fullLabels ? "whitespace-normal" : "truncate"
                )}>
                  {d.dimension}
                </span>
                {compact && (
                  <span className="text-[10px] font-bold text-muted-foreground tabular-nums bg-gray-50 px-1 rounded">
                    {d.score.toFixed(2)}
                  </span>
                )}
              </div>
              <div className={cn("bg-muted rounded-md overflow-hidden relative", compact ? "h-1.5" : "h-6")}>
                <div
                  className="h-full rounded-md transition-all flex items-center justify-end pr-1"
                  style={{ width: `${pct}%`, background: color }}
                >
                  {compact ? null : (
                    <span className="text-[11px] font-bold text-white drop-shadow">
                      {d.score.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <span 
              className={cn("font-semibold uppercase tracking-wider w-16 text-right shrink-0", compact ? "text-[8.5px]" : "text-[10px]")} 
              style={{ color }}
            >
              {classifyRisk(d.score) === "low" ? "Baixo" : classifyRisk(d.score) === "moderate" ? "Moderado" : "Alto"}
            </span>
          </div>
        );
      })}
      <div className={cn("flex items-center justify-between text-muted-foreground pt-2 border-t border-border mt-auto", compact ? "text-[9.5px]" : "text-[10px]")}>
        <span>Escala COPSOQ II: 0 — 4</span>
        <span>{limit && limit >= data.length ? "Ranking completo" : "Top 10 dimensões"}</span>
      </div>
    </div>
  );
};

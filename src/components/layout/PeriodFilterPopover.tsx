import { useState, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";

export interface PeriodFilter {
  mes: string;
  ano: string;
}

interface Props {
  periodo: PeriodFilter;
  onApply: (periodo: PeriodFilter) => void;
}

const MONTHS = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

const YEARS = ["2024", "2025", "2026"];

export const PeriodFilterPopover = ({ periodo, onApply }: Props) => {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"mensal" | "periodo">("mensal");
  const [tempMes, setTempMes] = useState(periodo.mes);
  const [tempAno, setTempAno] = useState(periodo.ano);

  // Sync state when popover opens
  useEffect(() => {
    if (open) {
      setTempMes(periodo.mes);
      setTempAno(periodo.ano);
    }
  }, [open, periodo]);

  const handleApply = () => {
    onApply({ mes: tempMes, ano: tempAno });
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="flex items-center justify-between gap-2 min-w-[170px] h-10 px-4 rounded-full border border-border bg-white text-sm text-muted-foreground hover:border-primary/30 transition-colors">
          <span>{periodo.mes ? `${periodo.mes} - ${periodo.ano}` : "Todos os períodos"}</span>
          <CalendarIcon className="h-4 w-4 text-muted-foreground" strokeWidth={2} />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-5 rounded-[24px]" align="start">
        <div className="flex items-center justify-start gap-8 mb-4 border-b border-border/50 pb-4">
          <button 
            onClick={() => setMode("mensal")}
            className={`text-sm font-bold flex items-center gap-2 ${mode === "mensal" ? "text-[#003B71]" : "text-muted-foreground hover:text-[#003B71]/70"}`}
          >
            MENSAL
            <div className={`w-3 h-3 rounded-full border-2 ${mode === "mensal" ? "border-[#10b981] bg-white flex items-center justify-center" : "border-transparent"}`}>
              {mode === "mensal" && <div className="w-1.5 h-1.5 bg-[#10b981] rounded-full" />}
            </div>
          </button>
          <button 
            onClick={() => setMode("periodo")}
            className={`text-sm font-bold flex items-center gap-2 ${mode === "periodo" ? "text-[#003B71]" : "text-muted-foreground hover:text-[#003B71]/70"}`}
          >
            PERÍODO
            <div className={`w-3 h-3 rounded-full border-2 bg-gray-100 border-gray-200 ${mode === "periodo" ? "border-[#10b981]" : ""}`} />
          </button>
        </div>

        <div className="flex gap-4">
          {/* Esquerda: Anos */}
          <div className="flex flex-col gap-1 w-[80px] border-r border-border/50 pr-4">
            {YEARS.map(ano => (
              <button
                key={ano}
                onClick={() => setTempAno(ano)}
                className={`text-left px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${tempAno === ano ? "bg-muted text-[#003B71]" : "text-muted-foreground hover:bg-muted/50"}`}
              >
                {ano}
              </button>
            ))}
          </div>

          {/* Direita: Meses ou Período */}
          <div className="flex-1 pl-2">
            {mode === "mensal" ? (
              <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                {MONTHS.map(mes => (
                  <button
                    key={mes}
                    onClick={() => setTempMes(mes)}
                    className={`text-left px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${tempMes === mes ? "bg-muted text-[#003B71]" : "text-muted-foreground hover:bg-muted/50"}`}
                  >
                    {mes}
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Início" 
                      className="w-full h-10 px-4 rounded-full border border-border text-sm outline-none focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c]/20 bg-gray-50/50"
                      readOnly
                    />
                    <CalendarIcon className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Fim" 
                      className="w-full h-10 px-4 rounded-full border border-border text-sm outline-none focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c]/20 bg-gray-50/50"
                      readOnly
                    />
                    <CalendarIcon className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button 
            onClick={handleApply}
            className="w-[200px] bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold py-2.5 rounded-full transition-colors flex items-center justify-center gap-2"
          >
            <CalendarIcon className="h-4 w-4" />
            Aplicar filtros
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

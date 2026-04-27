import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { PageBar } from "@/components/layout/PageBar";
import { AvaliacaoCard } from "@/components/dashboard/AvaliacaoCard";
import { DraggableGrid } from "@/components/dashboard/DraggableGrid";
import { AVALIACOES, Avaliacao } from "@/data/avaliacoes";
import { exportAvaliacaoPDF, exportAvaliacaoXLS } from "@/lib/avaliacaoExports";
import { toast } from "sonner";
import { RotateCcw, Move } from "lucide-react";

const Index = () => {
  const [exporting, setExporting] = useState<{ id: string; type: "pdf" | "xlsx" } | null>(null);
  const [resetSignal, setResetSignal] = useState(0);
  const [setorFiltro, setSetorFiltro] = useState<string>("Todos");

  const setores = Array.from(new Set(AVALIACOES.map((a) => a.departamentoFoco)));
  const filterOptions = ["Todos", ...setores];

  const avaliacoesFiltradas =
    setorFiltro === "Todos"
      ? AVALIACOES
      : AVALIACOES.filter((a) => a.departamentoFoco === setorFiltro);

  const handlePDF = async (av: Avaliacao) => {
    setExporting({ id: av.id, type: "pdf" });
    try {
      await new Promise((r) => setTimeout(r, 50));
      exportAvaliacaoPDF(av);
      toast.success(`Relatório PDF de "${av.codigo}" gerado`);
    } catch (e) {
      console.error(e);
      toast.error("Falha ao gerar PDF");
    } finally {
      setExporting(null);
    }
  };

  const handleXLS = async (av: Avaliacao) => {
    setExporting({ id: av.id, type: "xlsx" });
    try {
      await new Promise((r) => setTimeout(r, 50));
      exportAvaliacaoXLS(av);
      toast.success(`Planilha XLS de "${av.codigo}" gerada`);
    } catch (e) {
      console.error(e);
      toast.error("Falha ao gerar XLS");
    } finally {
      setExporting(null);
    }
  };

  const items = AVALIACOES.map((av) => ({
    id: av.id,
    defaultH: 14,
    defaultW: 6,
    minH: 8,
    node: (
      <AvaliacaoCard
        avaliacao={av}
        onExportPDF={handlePDF}
        onExportXLS={handleXLS}
        exporting={exporting}
      />
    ),
  }));

  return (
    <div className="min-h-screen bg-[#f3f4f6]">
      <Sidebar />
      <Topbar />

      <main className="ml-12 pt-14">
        <div className="max-w-[1400px] mx-auto px-6 py-6">
          <PageBar
            breadcrumb={[
              { label: "Minha Área" },
              { label: "NR-1", accent: true },
            ]}
            filterLabel="Todos"
            periodLabel="Abril - 2026"
            onAdd={() => toast.info("Nova avaliação — em breve")}
          />

          <div className="mt-6 flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
              <Move className="h-3.5 w-3.5" />
              <span>
                Arraste pelo ícone <span className="font-semibold text-primary">⋮⋮</span> para
                reorganizar • Use as bordas para redimensionar
              </span>
            </div>
            <button
              onClick={() => {
                setResetSignal((s) => s + 1);
                toast.success("Layout restaurado");
              }}
              className="flex items-center gap-1.5 h-8 px-3 rounded-md border border-border bg-white text-xs font-medium text-foreground hover:border-primary/40 hover:bg-muted/60 transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Restaurar layout
            </button>
          </div>

          <div className="mt-3">
            <DraggableGrid
              items={items}
              storageKey="psicossocial.layout.v1"
              resetSignal={resetSignal}
            />
          </div>

          <footer className="text-center text-[11px] text-muted-foreground py-8 mt-4">
            Psicossocial Analytics • Dashboard COPSOQ II • Dados de demonstração
          </footer>
        </div>
      </main>
    </div>
  );
};

export default Index;

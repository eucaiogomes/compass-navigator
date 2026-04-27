import { useMemo, useRef, useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { FilterBar } from "@/components/dashboard/FilterBar";
import { KPICard } from "@/components/dashboard/KPICard";
import { SectionCard } from "@/components/dashboard/SectionCard";
import { RiskDistributionChart } from "@/components/dashboard/RiskDistributionChart";
import { DimensionBarsChart } from "@/components/dashboard/DimensionBarsChart";
import { TemporalChart } from "@/components/dashboard/TemporalChart";
import { Heatmap } from "@/components/dashboard/Heatmap";
import { InsightsList, RecommendationsList } from "@/components/dashboard/Insights";
import { CriticalAreasTable } from "@/components/dashboard/CriticalAreasTable";
import {
  RESPONDENTS, DEFAULT_FILTERS, applyFilters, overallRisk, participationRate, engagementIndex,
  riskDistribution, dimensionRanking, temporalEvolution, heatmapByDepartment, generateInsights,
  generateRecommendations, classifyRisk, riskLabel, avgScore, previousPeriodVariation,
} from "@/data/copsoq";
import { exportPDF, exportExcel } from "@/lib/exports";
import { ShieldAlert, Users, Activity, HeartPulse } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [exporting, setExporting] = useState<"pdf" | "xlsx" | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const data = useMemo(() => applyFilters(RESPONDENTS, filters), [filters]);
  const overall = useMemo(() => overallRisk(data), [data]);
  const part = useMemo(() => participationRate(data), [data]);
  const eng = useMemo(() => engagementIndex(data), [data]);
  const stress = useMemo(() => avgScore(data, "Estresse"), [data]);

  const overallVar = useMemo(() => previousPeriodVariation(data, overall, overallRisk), [data, overall]);
  const partVar = useMemo(() => previousPeriodVariation(data, part, participationRate), [data, part]);
  const stressVar = useMemo(() => previousPeriodVariation(data, stress, (rs) => avgScore(rs, "Estresse")), [data, stress]);
  const engVar = useMemo(() => previousPeriodVariation(data, eng, engagementIndex), [data, eng]);

  const distribution = useMemo(() => riskDistribution(data), [data]);
  const ranking = useMemo(() => dimensionRanking(data), [data]);
  const temporal = useMemo(() => temporalEvolution(RESPONDENTS), []);
  const heat = useMemo(() => heatmapByDepartment(data), [data]);
  const insights = useMemo(() => generateInsights(data), [data]);
  const recs = useMemo(() => generateRecommendations(data), [data]);

  const overallClass = classifyRisk(overall);

  const onExportPDF = async () => {
    if (!rootRef.current) return;
    setExporting("pdf");
    try {
      await exportPDF(rootRef.current, filters);
      toast.success("Relatório PDF gerado com sucesso");
    } catch (e) {
      console.error(e);
      toast.error("Falha ao gerar PDF");
    } finally {
      setExporting(null);
    }
  };

  const onExportExcel = () => {
    setExporting("xlsx");
    try {
      exportExcel(filters);
      toast.success("Planilha Excel gerada com sucesso");
    } catch (e) {
      console.error(e);
      toast.error("Falha ao gerar Excel");
    } finally {
      setExporting(null);
    }
  };

  return (
    <div className="min-h-screen bg-background" ref={rootRef}>
      <DashboardHeader onExportPDF={onExportPDF} onExportExcel={onExportExcel} exporting={exporting} />
      <FilterBar filters={filters} onChange={setFilters} />

      <main className="max-w-[1500px] mx-auto px-6 py-6 space-y-6">
        {/* KPI grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            label="Risco Psicossocial Geral"
            value={`${overall.toFixed(2)}`}
            caption="Escala 0–4 (COPSOQ II)"
            variation={overallVar}
            variationLowerIsBetter
            badge={{ label: riskLabel(overallClass), variant: overallClass }}
            icon={ShieldAlert}
          />
          <KPICard
            label="Taxa de Participação"
            value={`${part.toFixed(0)}%`}
            caption={`${data.filter(r => r.participated).length} de ${data.length} colaboradores`}
            variation={partVar}
            badge={{ label: part >= 70 ? "Adequada" : "Atenção", variant: part >= 70 ? "low" : "moderate" }}
            icon={Users}
          />
          <KPICard
            label="Nível Médio de Estresse"
            value={stress.toFixed(2)}
            caption="Escala 0–4"
            variation={stressVar}
            variationLowerIsBetter
            badge={{ label: riskLabel(classifyRisk(stress)), variant: classifyRisk(stress) }}
            icon={Activity}
          />
          <KPICard
            label="Índice de Engajamento"
            value={`${eng.toFixed(0)}%`}
            caption="Inverso ponderado do risco"
            variation={engVar}
            badge={{ label: eng >= 65 ? "Saudável" : eng >= 50 ? "Atenção" : "Crítico", variant: eng >= 65 ? "low" : eng >= 50 ? "moderate" : "high" }}
            icon={HeartPulse}
          />
        </section>

        {/* Charts row */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-export="charts">
          <SectionCard title="Distribuição de Risco" description="Percentual de colaboradores por nível de risco psicossocial">
            <RiskDistributionChart data={distribution} />
          </SectionCard>
          <SectionCard title="Fatores Psicossociais — Ranking" description="Dimensões COPSOQ II ordenadas do maior risco para o menor">
            <DimensionBarsChart data={ranking} />
          </SectionCard>
        </section>

        {/* Temporal */}
        <SectionCard title="Evolução Temporal" description="Risco psicossocial e dimensões críticas nos últimos 12 meses">
          <TemporalChart data={temporal} />
        </SectionCard>

        {/* Heatmap */}
        <div data-export="heatmap">
          <SectionCard title="Mapa de Calor por Área e Dimensão" description="Intensidade de risco em cada departamento × fator psicossocial">
            <Heatmap data={heat} />
          </SectionCard>
        </div>

        {/* Insights + critical */}
        <section className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2">
            <SectionCard title="Insights Automáticos" description="Interpretações geradas por regras de negócio">
              <InsightsList insights={insights} />
            </SectionCard>
          </div>
          <div className="lg:col-span-3">
            <SectionCard title="Áreas Críticas" description="Departamentos ordenados por criticidade do risco médio">
              <CriticalAreasTable data={heat} />
            </SectionCard>
          </div>
        </section>

        {/* Recommendations */}
        <SectionCard title="Recomendações Práticas" description="Ações sugeridas para mitigar os fatores críticos identificados">
          <RecommendationsList recs={recs} />
        </SectionCard>

        <footer className="text-center text-xs text-muted-foreground py-6 border-t border-border">
          Psicossocial Analytics • Dashboard COPSOQ II • Dados de demonstração •{" "}
          {new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}
        </footer>
      </main>
    </div>
  );
};

export default Index;

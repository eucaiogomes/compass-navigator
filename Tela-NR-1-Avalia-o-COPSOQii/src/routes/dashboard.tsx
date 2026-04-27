import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState, useRef } from "react";
import { 
  Globe, 
  Accessibility, 
  BookOpen, 
  Bell, 
  ChevronDown, 
  Home, 
  Megaphone, 
  MonitorPlay as Monitor, 
  Share2 as TrilhaIcon, 
  Presentation, 
  Video, 
  Users2, 
  Briefcase, 
  FolderOpen as Folder, 
  ListTodo as ClipboardList, 
  HelpCircle as BookOpenText, 
  User, 
  Settings, 
  FileText,
  MonitorDown,
  ArrowRightCircle,
  Calendar,
  PlusCircle,
  X,
  Maximize2,
  Headphones,
  ShieldAlert, 
  Users, 
  Activity, 
  HeartPulse,
  FileSpreadsheet,
  FileDown,
  Search,
  ChevronRight,
  Layout
} from "lucide-react";

import { KPICard } from "@/components/dashboard/KPICard";
import { SectionCard } from "@/components/dashboard/SectionCard";
import { RiskDistributionChart } from "@/components/dashboard/RiskDistributionChart";
import { DimensionBarsChart } from "@/components/dashboard/DimensionBarsChart";
import { TemporalChart } from "@/components/dashboard/TemporalChart";
import { Heatmap } from "@/components/dashboard/Heatmap";
import { InsightsList, RecommendationsList } from "@/components/dashboard/Insights";
import { CriticalAreasTable } from "@/components/dashboard/CriticalAreasTable";
import { FilterBar } from "@/components/dashboard/FilterBar";
import { exportPDF, exportExcel } from "@/lib/exports";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  RESPONDENTS, DEFAULT_FILTERS, applyFilters, overallRisk, participationRate, engagementIndex,
  riskDistribution, dimensionRanking, temporalEvolution, heatmapByDepartment, generateInsights,
  generateRecommendations, classifyRisk, riskLabel, avgScore, previousPeriodVariation,
} from "@/data/copsoq";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [exporting, setExporting] = useState<"pdf" | "xlsx" | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    { icon: Home, label: "Minha área", active: true, hasSearch: true, hasChevron: true },
    { icon: Megaphone, label: "Social", hasChevron: true },
    { icon: Monitor, label: "Vitrines", hasChevron: true },
    { icon: TrilhaIcon, label: "Trilhas", hasChevron: true },
    { icon: Presentation, label: "Treinamentos", hasChevron: true },
    { icon: Video, label: "Gravações", hasChevron: true },
    { icon: Users2, label: "Webconferência", hasChevron: true },
    { icon: Folder, label: "Documentos", hasChevron: true },
    { icon: ClipboardList, label: "Avaliações", hasChevron: true },
    { icon: BookOpenText, label: "Questões", hasChevron: true },
    { icon: User, label: "Cadastros", hasChevron: true },
    { icon: Settings, label: "Configurações", hasChevron: true },
    { icon: FileText, label: "Relatórios", hasChevron: true },
  ];

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

  return (
    <div className="h-screen bg-[#f3f4f6] flex flex-col font-sans overflow-hidden">
      
      {/* Top Application Bar (Thin White Strip) */}
      <header className="h-10 bg-white border-b border-gray-200 flex items-center justify-between px-4 text-xs z-50">
        <div className="flex items-center gap-2 text-gray-500 font-medium">
          <MonitorDown className="w-4 h-4" />
          <span>Instalar</span>
        </div>
        
        <div className="flex items-center gap-4 text-gray-600">
          <div className="flex items-center gap-3">
            <Globe className="w-4 h-4 cursor-pointer" />
            <Accessibility className="w-4 h-4 cursor-pointer" />
            <BookOpen className="w-4 h-4 cursor-pointer" />
            <div className="relative cursor-pointer">
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full"></span>
            </div>
          </div>
          
          <div className="h-4 w-[1px] bg-gray-300 mx-1"></div>
          
          <div className="flex items-center gap-1 cursor-pointer">
            <span>Português</span>
            <ChevronDown className="w-3 h-3" />
          </div>
          
          <div className="h-4 w-[1px] bg-gray-300 mx-1"></div>

          <div className="flex items-center gap-2 cursor-pointer">
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-gray-400 leading-tight">Caio</span>
              <span className="text-[#f26c24] font-medium leading-tight">Administrador</span>
            </div>
            <div className="w-6 h-6 rounded-full bg-navy overflow-hidden">
              <img src="https://i.pravatar.cc/100" alt="Avatar" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Banner Area (Dark Blue) */}
      <div className="h-[90px] bg-[#001c4e] flex items-center justify-between px-6 xl:px-12 relative overflow-hidden shrink-0">
        <div className="flex items-center gap-2 text-white z-10 w-48">
           {/* Logo substitute */}
           <div className="flex items-center font-bold text-xl tracking-tight">
             <span className="text-[#f26c24] text-2xl mr-1">⚛</span> Lector<span className="text-orange-400 font-normal italic ml-1 text-sm absolute -bottom-3 right-0">live</span>
           </div>
        </div>

        {/* Central Graphic (Simulated) */}
        <div className="flex-1 flex items-center justify-center relative h-full">
           <div className="flex flex-col items-start ml-24">
             <span className="text-white font-bold text-xl md:text-2xl pt-2">Captura e</span>
             <span className="text-white font-bold text-xl md:text-2xl">compartilhamento</span>
             <span className="text-[#f26c24] font-bold text-xl md:text-2xl">do conhecimento</span>
           </div>
           
           {/* Abstract nodes simulation */}
           <div className="absolute left-[38%] top-2 bottom-2 w-48 opacity-80 pointer-events-none">
             <div className="w-2 h-2 bg-[#f26c24] rounded-full absolute top-4 left-10"></div>
             <div className="w-3 h-3 bg-white rounded-full absolute top-12 left-20"></div>
             <div className="w-1.5 h-1.5 bg-[#f26c24] rounded-full absolute bottom-8 left-8"></div>
           </div>
        </div>
        
        {/* Empty right spacer for balance */}
        <div className="w-48"></div>
      </div>

      {/* Main Body (Sidebar + Content) */}
      <div className="flex flex-1 overflow-hidden relative">
        
        {/* Left Sidebar */}
        <aside 
          className={cn(
            "bg-white border-r border-[#e5e7eb] flex flex-col transition-all duration-300 shrink-0 z-20 relative",
            isSidebarOpen ? "w-64" : "w-14 items-center"
          )}
        >
          <div className="flex flex-1 flex-col overflow-y-auto no-scrollbar py-2">
            {menuItems.map((item, idx) => (
              <div 
                key={idx}
                className={cn(
                  "group flex items-center h-10 cursor-pointer transition-colors relative",
                  item.active ? "bg-gray-300 text-[#001c4e] border-r-[3.5px] border-[#f26c24]" : "text-gray-600 hover:bg-gray-50",
                  !isSidebarOpen && "justify-center"
                )}
              >
                <div className={cn("shrink-0 flex items-center justify-center", isSidebarOpen ? "w-12" : "w-full")}>
                  <item.icon className={cn("w-5 h-5", item.active ? "text-[#001c4e]" : "text-gray-500")} strokeWidth={1.5} />
                </div>
                
                {isSidebarOpen && (
                  <div className="flex-1 flex items-center justify-between pr-3 min-w-0">
                    <span className={cn("text-sm font-semibold truncate", item.active ? "text-[#001c4e]" : "text-gray-700")}>
                      {item.label}
                    </span>
                    <div className="flex items-center gap-1.5 shrink-0 ml-auto">
                      {item.hasSearch && <Search className="w-4 h-4 text-[#001c4e]" strokeWidth={2.5} />}
                      {item.hasChevron && <ChevronDown className="w-3.5 h-3.5 text-gray-500 opacity-80" strokeWidth={3} />}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Sidebar Toggle Button & Footer */}
          <div className="border-t border-gray-100 p-2 flex flex-col">
            <div className="flex items-center justify-between">
              {isSidebarOpen && (
                <span className="text-[10px] text-gray-400 font-medium ml-2">
                  Lector Live © 2026 - v2.0
                </span>
              )}
              
              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className={cn(
                  "h-8 w-11 rounded flex items-center justify-center transition-all",
                  isSidebarOpen 
                    ? "bg-[#f28c28] text-white border-2 border-white shadow-md ml-auto" 
                    : "text-gray-400 hover:bg-gray-100 mx-auto"
                )}
                aria-label={isSidebarOpen ? "Fechar menu" : "Abrir menu"}
              >
                {isSidebarOpen ? (
                  <div className="flex items-center justify-center">
                    <Layout className="w-4 h-4 mr-0.5" strokeWidth={3} />
                    <ChevronRight className="w-4 h-4 rotate-180 -ml-1" strokeWidth={4} />
                  </div>
                ) : (
                  <ChevronRight className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </aside>

        {/* Gray Workspace */}
        <main className="flex-1 bg-[#f3f4f6] relative flex flex-col overflow-y-auto w-full">
          
          {/* Breadcrumbs & Controls */}
          <div className="flex items-center justify-between px-6 py-4 flex-wrap gap-4">
             <div className="flex items-center gap-6">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm font-medium">
                  <span className="text-[#001c4e]">Minha Área</span>
                  <span className="text-gray-400 font-normal">/</span>
                  <span className="text-[#f26c24]">NR-1</span>
                </div>
             </div>

             <div className="flex items-center gap-3">
                <button
                  onClick={onExportExcel}
                  disabled={!!exporting}
                  className="flex items-center gap-2 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 text-sm font-medium py-1.5 px-3 rounded shadow-sm transition-colors disabled:opacity-50"
                >
                  <FileSpreadsheet className="w-4 h-4 text-green-600" />
                  {exporting === "xlsx" ? "Gerando..." : "Excel"}
                </button>
                <button
                  onClick={onExportPDF}
                  disabled={!!exporting}
                  className="flex items-center gap-2 bg-[#001c4e] hover:bg-[#002870] text-white text-sm font-medium py-1.5 px-3 rounded shadow-sm transition-colors disabled:opacity-50"
                >
                  <FileDown className="w-4 h-4" />
                  {exporting === "pdf" ? "Gerando..." : "Exportar PDF"}
                </button>
                <Maximize2 className="w-4 h-4 text-gray-400 cursor-pointer ml-3" />
             </div>
          </div>

          <div className="px-5 mb-4">
            <FilterBar filters={filters} onChange={setFilters} />
          </div>

          {/* Dashboard Container */}
          <div className="px-6 pb-24 space-y-6" ref={rootRef}>
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
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6" data-export="charts">
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
          </div>
          
        </main>
      </div>

      {/* Extreme Bottom Right Anchors */}
      {/* Floating Action Button (Headset) */}
      <div className="fixed bottom-12 right-6 rounded-full w-12 h-12 bg-[#f28c28] shadow-[0_4px_12px_rgba(242,140,40,0.4)] flex items-center justify-center cursor-pointer border-[3px] border-[#f28c28] hover:scale-105 transition-transform z-40">
        <div className="w-[100%] h-[100%] rounded-full border-2 border-white flex items-center justify-center relative">
          <Headphones className="w-5 h-5 text-white" />
          <div className="absolute bottom-1 right-1 w-2.5 h-2.5 bg-white rounded-full flex items-center justify-center">
             <span className="text-[#f28c28] text-[8px] font-bold">✓</span>
          </div>
        </div>
      </div>
      
      {/* Watermark Logo */}
      <div className="fixed bottom-2 right-6 opacity-30 pointer-events-none z-30">
        <span className="font-bold text-[#001c4e] text-xs">⚛ Lector<span className="font-normal italic">live</span></span>
      </div>

      {/* Floating Dev Navigation (Secret/Invisible link to leave) */}
      <div className="fixed top-28 left-4 flex flex-col gap-2 z-[100] opacity-50 hover:opacity-100 transition-opacity">
        <Link
          to="/questionario"
          className="h-8 w-8 rounded-full border-2 border-gray-300 text-gray-600 flex items-center justify-center font-bold bg-white hover:bg-[#001c4e] hover:text-white hover:border-[#001c4e] transition-all shadow-lg hover:scale-110"
          aria-label="Ir para o Questionário"
        >
          1
        </Link>
        <Link
          to="/dashboard"
          className="h-8 w-8 rounded-full border-2 border-[#001c4e] text-white flex items-center justify-center font-bold bg-[#001c4e] transition-all shadow-lg hover:scale-110"
          aria-label="Dashboard (Atual)"
        >
          2
        </Link>
        <Link
          to="/ranking"
          className="h-8 w-8 rounded-full border-2 border-gray-300 text-gray-600 flex items-center justify-center font-bold bg-white hover:bg-[#001c4e] hover:text-white hover:border-[#001c4e] transition-all shadow-lg hover:scale-110"
          aria-label="Ir para o Ranking"
        >
          3
        </Link>
      </div>
    </div>
  );
}

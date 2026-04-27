import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState, useRef } from "react";
import { Rnd } from "react-rnd";
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
  Maximize2,
  Headphones,
  FileSpreadsheet,
  FileDown,
  Search,
  ChevronRight,
  Layout,
  GripHorizontal,
  Plus,
  Calendar
} from "lucide-react";

import { RankingReportCard } from "@/components/dashboard/RankingReportCard";
import { FilterBar } from "@/components/dashboard/FilterBar";
import { exportPDF, exportExcel } from "@/lib/exports";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  RESPONDENTS, DEFAULT_FILTERS, applyFilters, dimensionRanking,
} from "@/data/copsoq";

export const Route = createFileRoute("/ranking")({
  component: RankingPage,
});

function RankingPage() {
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
  const ranking = useMemo(() => dimensionRanking(data), [data]);

  return (
    <div className="h-screen bg-[#f3f4f6] flex flex-col font-sans overflow-hidden">
      
      {/* Top Application Bar */}
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

      {/* Hero Banner Area */}
      <div className="h-[90px] bg-[#001c4e] flex items-center justify-between px-6 xl:px-12 relative overflow-hidden shrink-0">
        <div className="flex items-center gap-2 text-white z-10 w-48">
           <div className="flex items-center font-bold text-xl tracking-tight">
             <span className="text-[#f26c24] text-2xl mr-1">⚛</span> Lector<span className="text-orange-400 font-normal italic ml-1 text-sm absolute -bottom-3 right-0">live</span>
           </div>
        </div>
        <div className="flex-1 flex items-center justify-center relative h-full">
           <div className="flex flex-col items-start ml-24">
             <span className="text-white font-bold text-xl md:text-2xl pt-2">Captura e</span>
             <span className="text-white font-bold text-xl md:text-2xl">compartilhamento</span>
             <span className="text-[#f26c24] font-bold text-xl md:text-2xl">do conhecimento</span>
           </div>
        </div>
        <div className="w-48"></div>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar */}
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
          <div className="border-t border-gray-100 p-2 flex flex-col">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className={cn(
                "h-8 w-11 rounded flex items-center justify-center transition-all",
                isSidebarOpen 
                  ? "bg-[#f28c28] text-white border-2 border-white shadow-md ml-auto" 
                  : "text-gray-400 hover:bg-gray-100 mx-auto"
              )}
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
        </aside>

        {/* Workspace */}
        <main className="flex-1 bg-[#f3f4f6] relative flex flex-col overflow-y-auto w-full">
          {/* Breadcrumbs & Controls Row */}
          <div className="flex flex-col px-8 pt-5 gap-4">
             <div className="flex items-center gap-1.5 text-[12px] font-bold tracking-tight">
               <span className="text-gray-400">Minha Área</span>
               <span className="text-gray-300 font-normal">/</span>
               <span className="text-[#f26c24]">NR-1</span>
             </div>
             
             <div className="flex items-center gap-2">
                <div className="flex items-center bg-white border border-gray-100 rounded-lg px-3 py-1.5 h-9 w-[130px] text-xs text-gray-500 justify-between cursor-pointer shadow-sm">
                  <span>Todos</span>
                  <ChevronDown className="w-4 h-4 text-gray-300" />
                </div>
                <div className="flex items-center bg-white border border-gray-100 rounded-lg px-3 py-1.5 h-9 w-[180px] text-xs text-gray-500 justify-between cursor-pointer shadow-sm ml-1">
                  <span>Abril - 2026</span>
                  <Calendar className="w-4 h-4 text-gray-300" />
                </div>
                <div className="w-9 h-9 rounded-full border border-orange-400 flex items-center justify-center cursor-pointer ml-3 hover:bg-orange-50 transition-colors">
                  <Plus className="w-4 h-4 text-orange-400" strokeWidth={2.5} />
                </div>
             </div>
          </div>

          {/* Ranking Container */}
          <div className="flex-1 px-8 pb-24 relative mt-6" ref={rootRef}>
            <Rnd
              default={{
                x: 0,
                y: 0,
                width: 550,
                height: 780,
              }}
              minWidth={450}
              minHeight={600}
              bounds="parent"
              dragHandleClassName="drag-handle"
              className="z-10"
              enableResizing={{
                bottom: true,
                bottomLeft: true,
                bottomRight: true,
                left: true,
                right: true,
                top: true,
                topLeft: true,
                topRight: true,
              }}
            >
              <div className="relative h-full flex flex-col group">
                <div className="drag-handle absolute top-2 right-12 z-50 p-2 opacity-0 group-hover:opacity-100 cursor-move transition-opacity bg-gray-100 rounded-full">
                  <GripHorizontal className="w-5 h-5 text-gray-400" />
                </div>
                <RankingReportCard className="flex-1" />
              </div>
            </Rnd>
          </div>
        </main>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-12 right-6 rounded-full w-12 h-12 bg-[#f28c28] shadow-[0_4px_12px_rgba(242,140,40,0.4)] flex items-center justify-center cursor-pointer border-[3px] border-[#f28c28] z-40">
        <div className="w-[100%] h-[100%] rounded-full border-2 border-white flex items-center justify-center">
          <Headphones className="w-5 h-5 text-white" />
        </div>
      </div>
      
      {/* Watermark Logo */}
      <div className="fixed bottom-2 right-6 opacity-30 pointer-events-none z-30">
        <span className="font-bold text-[#001c4e] text-xs">⚛ Lector<span className="font-normal italic">live</span></span>
      </div>

      {/* Floating Dev Navigation */}
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
          className="h-8 w-8 rounded-full border-2 border-gray-300 text-gray-600 flex items-center justify-center font-bold bg-white hover:bg-[#001c4e] hover:text-white hover:border-[#001c4e] transition-all shadow-lg hover:scale-110"
          aria-label="Ir para o Dashboard"
        >
          2
        </Link>
        <Link
          to="/ranking"
          className="h-8 w-8 rounded-full border-2 border-[#001c4e] text-white flex items-center justify-center font-bold bg-[#001c4e] transition-all shadow-lg hover:scale-110"
          aria-label="Ranking (Atual)"
        >
          3
        </Link>
      </div>
    </div>
  );
}

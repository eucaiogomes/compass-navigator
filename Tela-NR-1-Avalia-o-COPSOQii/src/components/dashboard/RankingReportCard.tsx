import { X, ChevronDown } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, LabelList } from "recharts";
import { cn } from "@/lib/utils";

const DATA = [
  { name: "1ª Dimensão", value: 2.3 },
  { name: "2ª Dimensão", value: 2.2 },
  { name: "3ª Dimensão", value: 1.8 },
  { name: "4ª Dimensão", value: 1.9 },
  { name: "5ª Dimensão", value: 1.9 },
  { name: "6ª Dimensão", value: 2.4 },
  { name: "7ª Dimensão", value: 2.8 },
  { name: "8ª Dimensão", value: 2.1 },
];

export const RankingReportCard = ({ className }: { className?: string }) => {
  return (
    <div className={cn("bg-white rounded-[20px] shadow-2xl p-8 flex flex-col gap-6 w-[550px] overflow-hidden", className)}>
      {/* Header */}
      <div className="flex justify-between items-start">
        <h2 className="text-[#001c4e] font-bold text-lg">
          Avaliação: COPSOQ II - ABRIL-2026
        </h2>
        <button className="text-gray-400 hover:text-gray-600 transition-colors">
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Stats */}
      <div className="space-y-4">
        <div>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">
            TAXA DE PARTICIPAÇÃO
          </p>
          <p className="text-[#001c4e] font-bold text-xl leading-none">
            13.333333333333334%
          </p>
        </div>

        <div>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">
            RISCO PSICOSSOCIAL GERAL
          </p>
          <p className="text-[#001c4e] font-bold text-xl leading-none">
            MODERADO
          </p>
        </div>

        <div>
          <p className="text-[10px] text-[#001c4e]/60 font-bold uppercase tracking-widest mb-1.5">
            PRINCIPAIS FATORES IDENTIFICADOS
          </p>
          <div className="text-[#001c4e]/80 text-[13px] font-medium leading-relaxed pl-1">
            <p>1. Exigência de trabalho elevada</p>
            <p>2. Baixo reconhecimento</p>
            <p>3. Estresse ocupacional</p>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="flex-1 w-full min-h-[300px] mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={DATA}
            layout="vertical"
            margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
            barSize={16}
          >
            <CartesianGrid horizontal={true} vertical={true} stroke="#f0f0f0" />
            <XAxis 
              type="number" 
              domain={[0, 4]} 
              ticks={[0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4]} 
              axisLine={{ stroke: '#f0f0f0' }}
              tickLine={false}
              tick={{ fontSize: 9, fill: '#999' }}
              height={40}
            />
            <YAxis 
              dataKey="name" 
              type="category" 
              axisLine={{ stroke: '#f0f0f0' }}
              tickLine={false}
              tick={{ fontSize: 9, fill: '#666' }}
              width={70}
            />
            <Bar dataKey="value" fill="#003366" radius={[0, 1, 1, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-4 items-center">
        <div className="flex gap-4">
          <button className="bg-[#ee8133] hover:bg-[#d9702a] text-white text-[11px] font-bold py-2.5 px-8 rounded-full shadow-md transition-all active:scale-95 whitespace-nowrap">
            Relatório Analítico
          </button>
          <button className="bg-[#ee8133] hover:bg-[#d9702a] text-white text-[11px] font-bold py-2.5 px-8 rounded-full shadow-md transition-all active:scale-95 whitespace-nowrap text-center">
            Relatório de Riscos<br />Psicossociais
          </button>
        </div>
        
        <div className="flex items-center gap-2 text-[12px] text-gray-500 font-medium">
          <span>Tipo de gráfico:</span>
          <div className="flex items-center gap-1 cursor-pointer">
            <span className="text-[#ee8133] font-bold">Barra</span>
            <ChevronDown className="w-4 h-4 text-[#ee8133]" strokeWidth={3} />
          </div>
        </div>
      </div>
    </div>
  );
};

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface Point { mes: string; "Risco Geral": number; Estresse: number; "Carga de Trabalho": number; Burnout: number }

export const TemporalChart = ({ data }: { data: Point[] }) => (
  <div className="h-[280px] w-full">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 8, right: 16, left: -12, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
        <XAxis dataKey="mes" tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} axisLine={{ stroke: "var(--color-border)" }} tickLine={false} />
        <YAxis domain={[0, 4]} ticks={[0, 1, 2, 3, 4]} tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }}
          formatter={(v: number) => v.toFixed(2)}
        />
        <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} iconType="circle" />
        <Line type="monotone" dataKey="Risco Geral" stroke="var(--color-chart-1)" strokeWidth={3} dot={{ r: 3 }} activeDot={{ r: 5 }} />
        <Line type="monotone" dataKey="Estresse" stroke="var(--color-chart-2)" strokeWidth={2} dot={{ r: 2 }} />
        <Line type="monotone" dataKey="Carga de Trabalho" stroke="var(--color-chart-3)" strokeWidth={2} dot={{ r: 2 }} />
        <Line type="monotone" dataKey="Burnout" stroke="var(--color-chart-4)" strokeWidth={2} dot={{ r: 2 }} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

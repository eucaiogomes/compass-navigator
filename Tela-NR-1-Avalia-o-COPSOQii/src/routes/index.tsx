import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ClipboardList, Clock, Lock } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Questionário Psicossocial de Copenhaguen (COPSOQ II)" },
      {
        name: "description",
        content:
          "Responda ao COPSOQ II — questionário psicossocial de Copenhaguen. Anónimo, sem registo, cerca de 10 minutos.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <main className="max-w-2xl w-full">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-medium mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          Questionário anónimo
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-navy tracking-tight">
          Questionário Psicossocial de Copenhaguen
        </h1>
        <p className="mt-2 text-xl text-muted-foreground">COPSOQ II — versão média</p>

        <p className="mt-6 text-base leading-relaxed text-foreground/80">
          Este questionário avalia fatores psicossociais no seu local de trabalho — exigências,
          organização, relações interpessoais, valores, saúde e bem-estar. Não há respostas certas
          ou erradas. Responda com base na sua experiência recente.
        </p>

        <ul className="mt-8 space-y-3 text-sm">
          <li className="flex items-start gap-3">
            <ClipboardList className="h-5 w-5 text-primary mt-0.5 shrink-0" />
            <span>41 perguntas, uma de cada vez. Pode navegar livremente entre elas.</span>
          </li>
          <li className="flex items-start gap-3">
            <Clock className="h-5 w-5 text-primary mt-0.5 shrink-0" />
            <span>Tempo estimado: 8–12 minutos.</span>
          </li>
          <li className="flex items-start gap-3">
            <Lock className="h-5 w-5 text-primary mt-0.5 shrink-0" />
            <span>
              Totalmente anónimo. Nenhum dado é guardado num servidor — as suas respostas só existem
              neste navegador.
            </span>
          </li>
        </ul>

        <div className="mt-10">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 px-8 text-base">
            <Link to="/questionario">Começar</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}

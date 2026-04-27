import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/obrigado")({
  head: () => ({
    meta: [
      { title: "Obrigado — COPSOQ II" },
      { name: "description", content: "Obrigado pela sua participação no COPSOQ II." },
    ],
  }),
  component: Obrigado,
});

function Obrigado() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <CheckCircle2 className="h-9 w-9 text-primary" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-navy">Obrigado pela sua participação.</h1>
        <p className="mt-4 text-muted-foreground">
          As suas respostas foram registadas nesta sessão. Pode fechar esta página em segurança.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Button
            variant="outline"
            onClick={() => {
              try {
                sessionStorage.removeItem("copsoq-answers-v1");
              } catch {}
              navigate({ to: "/questionario" });
            }}
          >
            Recomeçar
          </Button>
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link to="/">Voltar ao início</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

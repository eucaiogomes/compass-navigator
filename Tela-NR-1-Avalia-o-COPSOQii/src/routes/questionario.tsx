import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { ChevronRight, ChevronLeft, Check, Menu, Undo2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { QUESTIONS, SCALES } from "@/lib/copsoq-questions";
import { useSurveyState } from "@/lib/survey-state";

export const Route = createFileRoute("/questionario")({
  head: () => ({
    meta: [
      { title: "Questionário — COPSOQ II" },
      { name: "description", content: "Responda às perguntas do COPSOQ II." },
    ],
  }),
  component: Questionario,
});

function Questionario() {
  const navigate = useNavigate();
  const total = QUESTIONS.length;
  const { answers, current, setAnswer, setCurrent } = useSurveyState(total);

  const q = QUESTIONS[current];
  const options = SCALES[q.scale];
  const answeredCount = Object.keys(answers).length;
  const progress = Math.round((answeredCount / total) * 100);
  const isAnswered = answers[q.id] !== undefined;

  const goNext = () => {
    if (current < total - 1) {
      setCurrent(current + 1);
    } else {
      navigate({ to: "/obrigado" });
    }
  };

  const goPrev = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  const select = (value: number) => {
    setAnswer(q.id, value);
  };

  const Pagination = (
    <PaginationPanel
      current={current}
      total={total}
      answers={answers}
      progress={progress}
      answeredCount={answeredCount}
      onJump={(i) => setCurrent(i)}
    />
  );

  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* Top bar */}
      <header className="border-b border-black/[0.04] bg-slate-50/80 backdrop-blur-xl sticky top-0 z-30">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8 xl:px-12 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader>
                  <SheetTitle>Paginação</SheetTitle>
                </SheetHeader>
                <div className="mt-4">{Pagination}</div>
              </SheetContent>
            </Sheet>
            <div className="flex items-center gap-2 text-sm text-muted-foreground ml-3 hidden sm:flex">
              <div className="h-6 w-6 rounded-full bg-[#f26c24] flex items-center justify-center shrink-0">
                <Undo2 className="h-3.5 w-3.5 text-white" strokeWidth={3} />
              </div>
              <ChevronRight className="h-4 w-4 text-gray-300" />
              <span>Vitrine</span>
              <ChevronRight className="h-4 w-4 text-gray-300" />
              <span className="font-semibold text-navy">COPSOQ II Abril/2026</span>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1440px] px-4 md:px-8 xl:px-12 lg:pr-24 pt-4 lg:pt-6 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 lg:gap-12">
          {/* Question card */}
          <main className="relative flex flex-col h-full">
            {/* Header / Question text */}
            <div>
              <div className="flex items-baseline gap-3 md:gap-4 md:mt-2">
                <span className="text-5xl md:text-6xl font-bold text-primary leading-none">
                  {current + 1}.
                </span>
                <h1 className="text-xl md:text-2xl xl:text-3xl font-semibold text-navy leading-snug md:leading-normal">{q.text}</h1>
              </div>
            </div>

            {/* Options */}
            <div className="mt-6 md:mt-10 border-t border-border flex flex-col flex-1 min-h-0">
              {options.map((opt) => {
                const selected = answers[q.id] === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => select(opt.value)}
                    className={cn(
                      "w-full h-12 md:h-14 flex items-center gap-4 md:gap-5 px-3 border-b text-left transition-all duration-500 ease-out group shrink-0",
                      selected
                        ? "bg-accent/10 border-accent/20 shadow-[inset_0_4px_10px_-4px_rgba(0,0,0,0.05)]"
                        : "border-border hover:bg-accent/5",
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-5 w-5 md:h-6 md:w-6 items-center justify-center rounded-full border shrink-0 transition-all duration-500 ease-out",
                        selected
                          ? "border-accent bg-white shadow-sm"
                          : "border-border group-hover:border-accent/40",
                      )}
                    >
                      {selected && <span className="h-2.5 w-2.5 md:h-3 md:w-3 rounded-full bg-accent animate-in zoom-in duration-300" />}
                    </span>
                    <span
                      className={cn(
                        "text-base transition-all duration-500",
                        selected ? "text-accent font-medium space-x-0" : "text-foreground/80 group-hover:text-accent/80",
                      )}
                    >
                      {opt.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Hint & Mobile next button */}
            <div className="mt-4 min-h-6 flex flex-col lg:flex-row lg:items-end justify-between shrink-0">
              <div className="min-h-6">
                {!isAnswered && (
                  <p className="text-sm text-muted-foreground">
                    Selecione uma alternativa para continuar
                  </p>
                )}
              </div>

              {/* Advance and Back buttons — mobile only */}
              <div className="mt-10 lg:mt-0 flex lg:hidden items-center justify-between w-full">
                {current > 0 ? (
                  <button
                    onClick={goPrev}
                    className="h-12 w-12 rounded-full bg-[#f26c24] text-white flex items-center justify-center shadow-md hover:bg-[#f26c24]/90 transition shrink-0"
                    aria-label="Anterior"
                  >
                    <ChevronLeft className="h-5 w-5" strokeWidth={3} />
                  </button>
                ) : (
                  <div className="w-12 h-12" />
                )}

                <button
                  onClick={goNext}
                  disabled={!isAnswered}
                  className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md hover:bg-primary/90 disabled:opacity-30 disabled:cursor-not-allowed transition shrink-0"
                  aria-label="Próxima"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </main>

          {/* Side panel */}
      <aside className="hidden lg:block relative">
        <div className="sticky top-24 flex items-center">
          <div className="rounded-2xl border border-black/[0.04] bg-white p-5 xl:p-6 relative w-full shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]">
            {Pagination}
          </div>
        </div>
      </aside>
    </div>
  </div>

  {/* Fixed Desktop Navigation Arrows */}
  <div className="hidden lg:block">
    {current > 0 && (
      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50">
        <button
          onClick={goPrev}
          className="h-16 w-16 rounded-full bg-[#f26c24] text-white flex items-center justify-center shadow-2xl hover:bg-[#f26c24]/90 transition-all hover:scale-110 active:scale-95 shrink-0"
          aria-label="Anterior"
        >
          <ChevronLeft className="h-8 w-8" strokeWidth={3} />
        </button>
      </div>
    )}

    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50">
      <button
        onClick={goNext}
        disabled={!isAnswered}
        className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-2xl hover:bg-primary/90 disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:enabled:scale-110 active:enabled:scale-95 shrink-0"
        aria-label="Próxima"
      >
        <ChevronRight className="h-8 w-8" strokeWidth={3} />
      </button>
    </div>
  </div>

  {/* Floating Dev Navigation */}
  <div className="fixed bottom-8 left-8 flex items-center gap-3 z-[100] opacity-40 hover:opacity-100 transition-opacity p-2 rounded-full bg-white/50 backdrop-blur-md border border-border shadow-sm">
    <Link
      to="/questionario"
      className="h-8 w-8 rounded-full border-2 border-[#001c4e] text-white flex items-center justify-center font-bold bg-[#001c4e] transition-all hover:scale-110"
      aria-label="Questionário (Atual)"
    >
      1
    </Link>
    <Link
      to="/dashboard"
      className="h-8 w-8 rounded-full border-2 border-gray-300 text-gray-600 flex items-center justify-center font-bold bg-white hover:bg-[#001c4e] hover:text-white hover:border-[#001c4e] transition-all hover:scale-110"
      aria-label="Ir para o Dashboard"
    >
      2
    </Link>
    <Link
      to="/ranking"
      className="h-8 w-8 rounded-full border-2 border-gray-300 text-gray-600 flex items-center justify-center font-bold bg-white hover:bg-[#001c4e] hover:text-white hover:border-[#001c4e] transition-all hover:scale-110"
      aria-label="Ir para o Ranking"
    >
      3
    </Link>
  </div>
</div>
  );
}

function PaginationPanel({
  current,
  total,
  answers,
  progress,
  answeredCount,
  onJump,
}: {
  current: number;
  total: number;
  answers: Record<number, number>;
  progress: number;
  answeredCount: number;
  onJump: (i: number) => void;
}) {
  const items = useMemo(() => Array.from({ length: total }, (_, i) => i), [total]);
  return (
    <div className="flex flex-col">
      {/* Progress Section - TOP */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-muted-foreground">Progresso</span>
          <span className="text-sm font-bold text-navy">{progress}%</span>
        </div>
        <div className="h-1 w-full rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full bg-[#f26c24] transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-navy">Paginação</h2>
        <span className="text-sm font-medium text-muted-foreground">
          {answeredCount}/{total}
        </span>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {items.map((i) => {
          const id = QUESTIONS[i].id;
          const isCurrent = i === current;
          const isAnswered = answers[id] !== undefined;
          return (
            <button
              key={i}
              onClick={() => onJump(i)}
              className={cn(
                "relative aspect-square rounded-md text-sm font-medium flex items-center justify-center transition-all",
                isCurrent
                  ? "border-2 border-primary text-primary bg-primary/5"
                  : isAnswered
                    ? "bg-[#1e293b] text-white hover:bg-[#1e293b]/90"
                    : "border border-border text-muted-foreground hover:border-foreground/40 bg-white",
              )}
              aria-label={`Questão ${i + 1}${isAnswered ? " — respondida" : ""}${isCurrent ? " — atual" : ""}`}
            >
              {isCurrent ? <Check className="h-4 w-4 stroke-[3]" /> : i + 1}
              {isAnswered && !isCurrent && (
                <span className="absolute top-1 right-1 h-1 w-1 rounded-full bg-white/70" />
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-8 space-y-3.5 text-sm text-muted-foreground">
        <div className="flex items-center gap-3">
          <div className="relative h-6 w-6 rounded-md border-2 border-primary text-primary bg-primary/5 flex items-center justify-center shrink-0">
            <Check className="h-4 w-4 stroke-[3]" />
          </div>
          Questão atual
        </div>
        <div className="flex items-center gap-3">
          <div className="relative h-6 w-6 rounded-md bg-[#1e293b] flex items-center justify-center shrink-0">
            <span className="absolute top-[3px] right-[3px] h-1 w-1 rounded-full bg-white/70" />
          </div>
          Respondido
        </div>
        <div className="flex items-center gap-3">
          <div className="h-6 w-6 rounded-md border border-border bg-white shrink-0" />
          Não respondido
        </div>
      </div>
    </div>
  );
}

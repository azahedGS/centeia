"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, Sparkles, RotateCcw } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const SUGGESTED = [
  "¿Cuántos proyectos están en riesgo?",
  "¿Qué carril tiene más carga?",
  "¿Cuál es la próxima liberación?",
  "¿Cuánta capacidad disponible hay?",
];

// Respuestas mock mientras no hay API real
function getMockResponse(question: string): string {
  const q = question.toLowerCase();
  if (q.includes("riesgo")) return "Actualmente hay **11 proyectos en riesgo**, un incremento de +2 vs la semana anterior. Los carriles con más proyectos en riesgo son Cripto Masivos y Cripto Backoffice.";
  if (q.includes("carril") || q.includes("carga")) return "Los carriles con mayor ocupación son **Divisas, Money Free Flex, TDR/EKTV, Cripto Backoffice y Cripto Corporativo**, todos al 100%. Cripto Masivos es el único con algo de holgura (83%).";
  if (q.includes("liberación") || q.includes("liberacion")) return "La próxima liberación es **LEANBA-70329** en 2 días (carril Divisas). Le sigue CRIPTO-14521 en 6 días y MFF-09832 en 9 días (actualmente en riesgo).";
  if (q.includes("capacidad") || q.includes("disponible")) return "La capacidad disponible es del **7% — 4 personas de 61**. El equipo opera prácticamente al límite. Se recomienda no agregar nuevos proyectos sin liberar alguno existente.";
  if (q.includes("activos") || q.includes("proyectos")) return "Hay **40 proyectos activos** en el portafolio, con un incremento de +3 vs la semana anterior. Se distribuyen en 6 carriles: Divisas, Cripto Masivos, Money Free Flex, TDR/EKTV, Cripto Backoffice y Cripto Corporativo.";
  return "Puedo ayudarte con información sobre proyectos activos, riesgos, capacidad del equipo, liberaciones y métricas por carril. ¿Qué necesitas saber?";
}

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hola, soy el asistente de CenteIA. Pregúntame sobre el estado del portafolio, capacidad del equipo o próximas liberaciones.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [open, messages]);

  function send(text?: string) {
    const content = (text ?? input).trim();
    if (!content || loading) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getMockResponse(content),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, reply]);
      setLoading(false);
    }, 800);
  }

  function reset() {
    setMessages([{
      id: "welcome",
      role: "assistant",
      content: "Hola, soy el asistente de CenteIA. Pregúntame sobre el estado del portafolio, capacidad del equipo o próximas liberaciones.",
      timestamp: new Date(),
    }]);
    setInput("");
  }

  function handleKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Abrir asistente de IA"
        className={cn(
          "fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 cursor-pointer",
          open
            ? "bg-zinc-900 scale-95"
            : "bg-zinc-900 hover:bg-zinc-700 hover:scale-105"
        )}
      >
        {open ? (
          <X size={18} className="text-white" />
        ) : (
          <Logo size={22} />
        )}
        {/* Pulse indicator */}
        {!open && (
          <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
        )}
      </button>

      {/* Chat panel */}
      <div
        className={cn(
          "fixed bottom-22 left-6 z-50 w-80 bg-white border border-zinc-200 rounded-2xl shadow-xl flex flex-col overflow-hidden transition-all duration-200 origin-bottom-left",
          open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
        )}
        style={{ maxHeight: "480px" }}
      >
        {/* Header */}
        <div className="flex items-center gap-2.5 px-4 py-3 border-b border-zinc-100 bg-zinc-50">
          <Logo size={20} />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-zinc-900">Asistente CenteIA</p>
            <p className="text-[10px] text-green-600 font-medium">● En línea</p>
          </div>
          <button
            onClick={reset}
            className="text-zinc-400 hover:text-zinc-700 transition-colors cursor-pointer p-1 rounded"
            aria-label="Reiniciar conversación"
          >
            <RotateCcw size={13} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3" style={{ minHeight: 0 }}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}
            >
              <div
                className={cn(
                  "max-w-[85%] px-3 py-2 rounded-xl text-xs leading-relaxed",
                  msg.role === "user"
                    ? "bg-zinc-900 text-white rounded-br-sm"
                    : "bg-zinc-100 text-zinc-800 rounded-bl-sm"
                )}
                dangerouslySetInnerHTML={{
                  __html: msg.content.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
                }}
              />
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-zinc-100 px-3 py-2 rounded-xl rounded-bl-sm flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Suggested questions — only on first message */}
        {messages.length === 1 && (
          <div className="px-4 pb-2 flex flex-wrap gap-1.5">
            {SUGGESTED.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="text-[10px] px-2 py-1 bg-zinc-50 border border-zinc-200 rounded-md text-zinc-600 hover:bg-zinc-100 hover:border-zinc-300 transition-colors cursor-pointer"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="px-3 py-3 border-t border-zinc-100">
          <div className="flex items-end gap-2 bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 focus-within:border-zinc-400 transition-colors">
            <Sparkles size={13} className="text-zinc-400 flex-shrink-0 mb-0.5" />
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Pregunta sobre proyectos..."
              rows={1}
              className="flex-1 bg-transparent text-xs text-zinc-800 placeholder:text-zinc-400 resize-none outline-none leading-relaxed"
              style={{ maxHeight: 72 }}
            />
            <button
              onClick={() => send()}
              disabled={!input.trim() || loading}
              className="flex-shrink-0 w-6 h-6 bg-zinc-900 rounded-lg flex items-center justify-center disabled:opacity-30 hover:bg-zinc-700 transition-colors cursor-pointer disabled:cursor-not-allowed"
            >
              <Send size={11} className="text-white" />
            </button>
          </div>
          <p className="text-[9px] text-zinc-400 text-center mt-1.5">
            Conectado a datos de Goverfolio · Epicron · GantiAgile
          </p>
        </div>
      </div>
    </>
  );
}

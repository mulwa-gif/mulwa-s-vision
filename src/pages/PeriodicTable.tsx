import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { elements, categoryColors, categoryNames, Element } from "@/data/elements";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const PeriodicTable = () => {
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isAsking, setIsAsking] = useState(false);

  const askAI = async () => {
    if (!aiQuestion.trim() || !selectedElement) return;
    setIsAsking(true);
    setAiResponse("");
    
    try {
      const response = await supabase.functions.invoke("element-chat", {
        body: { question: aiQuestion, element: selectedElement.name }
      });
      
      if (response.error) throw response.error;
      setAiResponse(response.data.answer);
    } catch (error) {
      toast.error("Failed to get AI response");
      console.error(error);
    } finally {
      setIsAsking(false);
    }
  };

  const mainTableElements = elements.filter(e => e.row <= 7);
  const lanthanides = elements.filter(e => e.row === 8);
  const actinides = elements.filter(e => e.row === 9);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary py-8 md:py-12">
        <div className="container-narrow px-6">
          <Link to="/learning-materials" className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-accent transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Learning Materials
          </Link>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-accent" />
            AI-Powered Interactive Periodic Table
          </h1>
          <p className="text-primary-foreground/70 mt-2">Click any element to explore its properties and ask AI questions</p>
        </div>
      </header>

      {/* Periodic Table */}
      <section className="py-8 px-4 overflow-x-auto">
        <div className="min-w-[1100px] max-w-[1200px] mx-auto">
          {/* Main Table Grid */}
          <div className="grid gap-1" style={{ gridTemplateColumns: "repeat(18, minmax(50px, 1fr))" }}>
            {Array.from({ length: 7 * 18 }, (_, i) => {
              const row = Math.floor(i / 18) + 1;
              const col = (i % 18) + 1;
              const element = mainTableElements.find(e => e.row === row && e.col === col);
              
              if (!element) {
                if (row === 6 && col === 3) return <div key={i} className="aspect-square flex items-center justify-center text-xs text-muted-foreground">57-71</div>;
                if (row === 7 && col === 3) return <div key={i} className="aspect-square flex items-center justify-center text-xs text-muted-foreground">89-103</div>;
                return <div key={i} className="aspect-square" />;
              }

              return (
                <button
                  key={element.atomicNumber}
                  onClick={() => setSelectedElement(element)}
                  className={`aspect-square p-1 rounded text-white text-center transition-all hover:scale-110 hover:z-10 ${categoryColors[element.category]}`}
                >
                  <div className="text-[8px] opacity-80">{element.atomicNumber}</div>
                  <div className="text-sm font-bold leading-none">{element.symbol}</div>
                  <div className="text-[7px] truncate opacity-80">{element.name}</div>
                </button>
              );
            })}
          </div>

          {/* Lanthanides & Actinides */}
          <div className="mt-4 space-y-1">
            <div className="grid gap-1" style={{ gridTemplateColumns: "repeat(18, minmax(50px, 1fr))" }}>
              <div className="col-span-2" />
              {lanthanides.map(element => (
                <button
                  key={element.atomicNumber}
                  onClick={() => setSelectedElement(element)}
                  className={`aspect-square p-1 rounded text-white text-center transition-all hover:scale-110 ${categoryColors[element.category]}`}
                >
                  <div className="text-[8px] opacity-80">{element.atomicNumber}</div>
                  <div className="text-sm font-bold leading-none">{element.symbol}</div>
                </button>
              ))}
              <div />
            </div>
            <div className="grid gap-1" style={{ gridTemplateColumns: "repeat(18, minmax(50px, 1fr))" }}>
              <div className="col-span-2" />
              {actinides.map(element => (
                <button
                  key={element.atomicNumber}
                  onClick={() => setSelectedElement(element)}
                  className={`aspect-square p-1 rounded text-white text-center transition-all hover:scale-110 ${categoryColors[element.category]}`}
                >
                  <div className="text-[8px] opacity-80">{element.atomicNumber}</div>
                  <div className="text-sm font-bold leading-none">{element.symbol}</div>
                </button>
              ))}
              <div />
            </div>
          </div>

          {/* Legend */}
          <div className="mt-6 flex flex-wrap gap-2 justify-center">
            {Object.entries(categoryNames).map(([key, name]) => (
              <div key={key} className="flex items-center gap-1">
                <div className={`w-4 h-4 rounded ${categoryColors[key]}`} />
                <span className="text-xs text-muted-foreground">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Element Detail Modal */}
      <Dialog open={!!selectedElement} onOpenChange={() => { setSelectedElement(null); setAiResponse(""); setAiQuestion(""); }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedElement && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-lg flex items-center justify-center text-white ${categoryColors[selectedElement.category]}`}>
                    <span className="text-2xl font-bold">{selectedElement.symbol}</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-display">{selectedElement.name}</h2>
                    <p className="text-sm text-muted-foreground">{categoryNames[selectedElement.category]}</p>
                  </div>
                </DialogTitle>
              </DialogHeader>
              
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="space-y-2 text-sm">
                  <p><strong>Atomic Number:</strong> {selectedElement.atomicNumber}</p>
                  <p><strong>Atomic Mass:</strong> {selectedElement.atomicMass}</p>
                  <p><strong>Electron Config:</strong> {selectedElement.electronConfiguration}</p>
                  <p><strong>Electronegativity:</strong> {selectedElement.electronegativity}</p>
                  <p><strong>Density:</strong> {selectedElement.density}</p>
                </div>
                <div className="space-y-2 text-sm">
                  <p><strong>Melting Point:</strong> {selectedElement.meltingPoint}</p>
                  <p><strong>Boiling Point:</strong> {selectedElement.boilingPoint}</p>
                  <p><strong>Discovered By:</strong> {selectedElement.discoveredBy}</p>
                  <p><strong>Year:</strong> {selectedElement.yearDiscovered}</p>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="font-semibold mb-2">Common Uses</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedElement.uses.map(use => (
                    <span key={use} className="text-xs px-2 py-1 bg-secondary rounded-full">{use}</span>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <h4 className="font-semibold mb-2">Interesting Facts</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {selectedElement.facts.map(fact => <li key={fact}>• {fact}</li>)}
                </ul>
              </div>

              {/* AI Chat */}
              <div className="mt-6 p-4 bg-secondary/50 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-accent" />
                  Ask AI about {selectedElement.name}
                </h4>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={aiQuestion}
                    onChange={(e) => setAiQuestion(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && askAI()}
                    placeholder={`e.g., Why is ${selectedElement.name} important?`}
                    className="flex-1 px-3 py-2 bg-background border border-border rounded-lg text-sm"
                  />
                  <Button onClick={askAI} disabled={isAsking} size="sm">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                {aiResponse && (
                  <div className="mt-3 p-3 bg-background rounded-lg text-sm">
                    {aiResponse}
                  </div>
                )}
                {isAsking && <p className="mt-2 text-sm text-muted-foreground">Thinking...</p>}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PeriodicTable;

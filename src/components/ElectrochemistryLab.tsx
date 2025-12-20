import { useState } from "react";
import { Zap, Beaker, RotateCcw, Play, Info, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ElectrolysisResult {
  id: string;
  electrolyte: string;
  anode: string;
  cathode: string;
  anodeProduct: string;
  cathodeProduct: string;
  observation: string;
  equation: string;
}

interface ElectrolyteOption {
  id: string;
  name: string;
  formula: string;
  type: string;
}

interface ElectrodeOption {
  id: string;
  name: string;
  type: "inert" | "active";
}

const ElectrochemistryLab = () => {
  const [selectedElectrolyte, setSelectedElectrolyte] = useState<string>("");
  const [selectedAnode, setSelectedAnode] = useState<string>("");
  const [selectedCathode, setSelectedCathode] = useState<string>("");
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<ElectrolysisResult[]>([]);
  const [currentFlow, setCurrentFlow] = useState(0);

  const electrolytes: ElectrolyteOption[] = [
    { id: "nacl_aq", name: "Sodium Chloride (aq)", formula: "NaCl(aq)", type: "aqueous" },
    { id: "nacl_molten", name: "Molten Sodium Chloride", formula: "NaCl(l)", type: "molten" },
    { id: "cuso4_aq", name: "Copper(II) Sulphate (aq)", formula: "CuSO₄(aq)", type: "aqueous" },
    { id: "h2so4_dilute", name: "Dilute Sulphuric Acid", formula: "H₂SO₄(aq)", type: "aqueous" },
    { id: "naoh_aq", name: "Sodium Hydroxide (aq)", formula: "NaOH(aq)", type: "aqueous" },
    { id: "pbno3_aq", name: "Lead(II) Nitrate (aq)", formula: "Pb(NO₃)₂(aq)", type: "aqueous" },
    { id: "mgcl2_molten", name: "Molten Magnesium Chloride", formula: "MgCl₂(l)", type: "molten" },
    { id: "cucl2_aq", name: "Copper(II) Chloride (aq)", formula: "CuCl₂(aq)", type: "aqueous" },
  ];

  const electrodes: ElectrodeOption[] = [
    { id: "carbon", name: "Carbon (Graphite)", type: "inert" },
    { id: "platinum", name: "Platinum", type: "inert" },
    { id: "copper", name: "Copper", type: "active" },
    { id: "zinc", name: "Zinc", type: "active" },
    { id: "iron", name: "Iron", type: "active" },
  ];

  const getElectrolysisResult = (): ElectrolysisResult | null => {
    if (!selectedElectrolyte || !selectedAnode || !selectedCathode) return null;

    const reactions: Record<string, ElectrolysisResult> = {
      "nacl_aq_carbon_carbon": {
        id: "1",
        electrolyte: "NaCl(aq)",
        anode: "Carbon",
        cathode: "Carbon",
        anodeProduct: "Chlorine gas (Cl₂)",
        cathodeProduct: "Hydrogen gas (H₂)",
        observation: "Bubbles at both electrodes. Chlorine (greenish-yellow) at anode, hydrogen at cathode. Solution becomes alkaline (NaOH forms).",
        equation: "2NaCl(aq) + 2H₂O(l) → Cl₂(g) + H₂(g) + 2NaOH(aq)"
      },
      "nacl_molten_carbon_carbon": {
        id: "2",
        electrolyte: "NaCl(l)",
        anode: "Carbon",
        cathode: "Carbon",
        anodeProduct: "Chlorine gas (Cl₂)",
        cathodeProduct: "Sodium metal (Na)",
        observation: "Greenish-yellow chlorine gas at anode. Shiny sodium metal deposits at cathode.",
        equation: "2NaCl(l) → 2Na(l) + Cl₂(g)"
      },
      "cuso4_aq_carbon_carbon": {
        id: "3",
        electrolyte: "CuSO₄(aq)",
        anode: "Carbon",
        cathode: "Carbon",
        anodeProduct: "Oxygen gas (O₂)",
        cathodeProduct: "Copper metal (Cu)",
        observation: "Brown/pink copper deposits on cathode. Oxygen bubbles at anode. Blue color fades as Cu²⁺ is reduced.",
        equation: "2CuSO₄(aq) + 2H₂O(l) → 2Cu(s) + O₂(g) + 2H₂SO₄(aq)"
      },
      "cuso4_aq_copper_copper": {
        id: "4",
        electrolyte: "CuSO₄(aq)",
        anode: "Copper",
        cathode: "Copper",
        anodeProduct: "Copper dissolves (Cu → Cu²⁺)",
        cathodeProduct: "Copper deposits (Cu²⁺ → Cu)",
        observation: "Anode gets thinner, cathode gets thicker. Blue color remains constant. This is copper purification/electroplating.",
        equation: "Cu(s) → Cu²⁺(aq) + 2e⁻ (anode) | Cu²⁺(aq) + 2e⁻ → Cu(s) (cathode)"
      },
      "h2so4_dilute_carbon_carbon": {
        id: "5",
        electrolyte: "H₂SO₄(aq)",
        anode: "Carbon",
        cathode: "Carbon",
        anodeProduct: "Oxygen gas (O₂)",
        cathodeProduct: "Hydrogen gas (H₂)",
        observation: "Bubbles at both electrodes. Twice as much H₂ at cathode as O₂ at anode (2:1 ratio). This is electrolysis of water.",
        equation: "2H₂O(l) → 2H₂(g) + O₂(g)"
      },
      "naoh_aq_carbon_carbon": {
        id: "6",
        electrolyte: "NaOH(aq)",
        anode: "Carbon",
        cathode: "Carbon",
        anodeProduct: "Oxygen gas (O₂)",
        cathodeProduct: "Hydrogen gas (H₂)",
        observation: "Electrolysis of water. H₂:O₂ ratio is 2:1. NaOH concentration increases.",
        equation: "2H₂O(l) → 2H₂(g) + O₂(g)"
      },
      "pbno3_aq_carbon_carbon": {
        id: "7",
        electrolyte: "Pb(NO₃)₂(aq)",
        anode: "Carbon",
        cathode: "Carbon",
        anodeProduct: "Oxygen gas (O₂)",
        cathodeProduct: "Lead metal (Pb)",
        observation: "Grey lead deposits on cathode. Oxygen bubbles at anode. Solution becomes acidic.",
        equation: "2Pb(NO₃)₂(aq) + 2H₂O(l) → 2Pb(s) + O₂(g) + 4HNO₃(aq)"
      },
      "mgcl2_molten_carbon_carbon": {
        id: "8",
        electrolyte: "MgCl₂(l)",
        anode: "Carbon",
        cathode: "Carbon",
        anodeProduct: "Chlorine gas (Cl₂)",
        cathodeProduct: "Magnesium metal (Mg)",
        observation: "Greenish chlorine gas at anode. Silvery magnesium metal deposits at cathode.",
        equation: "MgCl₂(l) → Mg(l) + Cl₂(g)"
      },
      "cucl2_aq_carbon_carbon": {
        id: "9",
        electrolyte: "CuCl₂(aq)",
        anode: "Carbon",
        cathode: "Carbon",
        anodeProduct: "Chlorine gas (Cl₂)",
        cathodeProduct: "Copper metal (Cu)",
        observation: "Brown copper deposits on cathode. Greenish chlorine gas at anode. Blue-green color fades.",
        equation: "CuCl₂(aq) → Cu(s) + Cl₂(g)"
      },
    };

    // Try exact match first
    const key = `${selectedElectrolyte}_${selectedAnode}_${selectedCathode}`;
    if (reactions[key]) return reactions[key];

    // Try with inert electrodes as default
    const inertKey = `${selectedElectrolyte}_carbon_carbon`;
    if (reactions[inertKey]) {
      return {
        ...reactions[inertKey],
        anode: electrodes.find(e => e.id === selectedAnode)?.name || "Unknown",
        cathode: electrodes.find(e => e.id === selectedCathode)?.name || "Unknown",
      };
    }

    return null;
  };

  const runElectrolysis = () => {
    if (!selectedElectrolyte || !selectedAnode || !selectedCathode) {
      toast.error("Please select electrolyte and both electrodes");
      return;
    }

    setIsRunning(true);
    setCurrentFlow(0);

    // Simulate current flow
    const interval = setInterval(() => {
      setCurrentFlow(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRunning(false);
          
          const result = getElectrolysisResult();
          if (result) {
            setResults(prev => [...prev, result]);
            toast.success("Electrolysis complete!");
          } else {
            toast.info("Reaction complete - observe the products");
          }
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  const resetLab = () => {
    setSelectedElectrolyte("");
    setSelectedAnode("");
    setSelectedCathode("");
    setIsRunning(false);
    setCurrentFlow(0);
    setResults([]);
    toast.info("Lab reset complete");
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Setup Panel */}
      <div className="space-y-6">
        <div className="card-elevated p-6">
          <h3 className="font-display text-lg font-semibold mb-4">Select Electrolyte</h3>
          <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
            {electrolytes.map(electrolyte => (
              <button
                key={electrolyte.id}
                onClick={() => setSelectedElectrolyte(electrolyte.id)}
                disabled={isRunning}
                className={`p-3 rounded-lg border-2 text-left transition-all ${
                  selectedElectrolyte === electrolyte.id 
                    ? "border-accent bg-accent/10" 
                    : "border-border hover:border-accent/50"
                } ${isRunning ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <div className="text-sm font-medium">{electrolyte.name}</div>
                <div className="text-xs text-muted-foreground">{electrolyte.formula}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="card-elevated p-4">
            <h4 className="font-semibold text-sm mb-3 text-red-400">⊕ Anode (+)</h4>
            <div className="space-y-2">
              {electrodes.map(electrode => (
                <button
                  key={electrode.id}
                  onClick={() => setSelectedAnode(electrode.id)}
                  disabled={isRunning}
                  className={`w-full p-2 rounded-lg border text-left text-sm transition-all ${
                    selectedAnode === electrode.id 
                      ? "border-red-400 bg-red-400/10" 
                      : "border-border hover:border-red-400/50"
                  } ${isRunning ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {electrode.name}
                  <span className="text-xs text-muted-foreground ml-1">
                    ({electrode.type})
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="card-elevated p-4">
            <h4 className="font-semibold text-sm mb-3 text-blue-400">⊖ Cathode (-)</h4>
            <div className="space-y-2">
              {electrodes.map(electrode => (
                <button
                  key={electrode.id}
                  onClick={() => setSelectedCathode(electrode.id)}
                  disabled={isRunning}
                  className={`w-full p-2 rounded-lg border text-left text-sm transition-all ${
                    selectedCathode === electrode.id 
                      ? "border-blue-400 bg-blue-400/10" 
                      : "border-border hover:border-blue-400/50"
                  } ${isRunning ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {electrode.name}
                  <span className="text-xs text-muted-foreground ml-1">
                    ({electrode.type})
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Electrolysis Cell Visualization */}
        <div className="card-elevated p-6">
          <h3 className="font-display text-lg font-semibold mb-4">Electrolysis Cell</h3>
          <div className="relative h-48 bg-secondary/50 rounded-xl p-4">
            {/* Battery */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 flex items-center gap-2">
              <div className="w-12 h-6 bg-gray-600 rounded flex items-center justify-center text-xs text-primary-foreground">
                <Zap className="w-4 h-4" />
              </div>
            </div>
            
            {/* Wires and electrodes */}
            <div className="absolute top-10 left-1/4 w-px h-8 bg-red-400" />
            <div className="absolute top-10 right-1/4 w-px h-8 bg-blue-400" />
            
            {/* Beaker with electrolyte */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-48 h-24 rounded-b-xl border-2 border-gray-400 bg-blue-200/30 overflow-hidden">
              {/* Electrodes in solution */}
              <div className="absolute left-4 top-0 w-3 h-16 bg-gray-700 rounded-b">
                <div className="text-xs text-red-400 -mt-4 text-center">+</div>
                {isRunning && (
                  <div className="absolute -right-2 top-8 animate-bounce">
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                  </div>
                )}
              </div>
              <div className="absolute right-4 top-0 w-3 h-16 bg-gray-700 rounded-b">
                <div className="text-xs text-blue-400 -mt-4 text-center">-</div>
                {isRunning && (
                  <div className="absolute -left-2 top-8 animate-bounce delay-100">
                    <div className="w-2 h-2 rounded-full bg-amber-400" />
                  </div>
                )}
              </div>
              
              {/* Current flow indicator */}
              {isRunning && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-xs font-mono text-foreground bg-background/80 px-2 py-1 rounded">
                    Current: {currentFlow}%
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <Button 
              onClick={runElectrolysis}
              disabled={isRunning || !selectedElectrolyte || !selectedAnode || !selectedCathode}
              className="flex-1 gap-2"
            >
              <Play className="w-4 h-4" />
              {isRunning ? "Running..." : "Start Electrolysis"}
            </Button>
            <Button variant="outline" onClick={resetLab} className="gap-2">
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
          </div>
        </div>

        <div className="card-elevated p-6">
          <div className="flex items-center gap-2 mb-4">
            <Info className="w-5 h-5 text-accent" />
            <h3 className="font-display text-lg font-semibold">Key Concepts</h3>
          </div>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-red-400">⊕</span>
              <span><strong className="text-foreground">Anode:</strong> Oxidation occurs (loss of electrons)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">⊖</span>
              <span><strong className="text-foreground">Cathode:</strong> Reduction occurs (gain of electrons)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent">•</span>
              <span><strong className="text-foreground">Inert electrodes:</strong> Don't react (C, Pt)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent">•</span>
              <span><strong className="text-foreground">Active electrodes:</strong> May react (Cu, Zn, Fe)</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Results Panel */}
      <div className="card-elevated p-6">
        <h3 className="font-display text-lg font-semibold mb-4">Electrolysis Results</h3>
        {results.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Zap className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Set up the cell and run electrolysis to see results</p>
          </div>
        ) : (
          <div className="space-y-4">
            {results.map((result, index) => (
              <div key={index} className="p-4 bg-secondary/50 rounded-lg border border-border">
                <div className="font-semibold text-foreground mb-2">
                  Electrolysis of {result.electrolyte}
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                  <div className="p-2 bg-red-400/10 rounded border border-red-400/30">
                    <div className="text-red-400 font-medium">Anode (+)</div>
                    <div className="text-foreground">{result.anode}</div>
                    <div className="text-muted-foreground text-xs mt-1">Product: {result.anodeProduct}</div>
                  </div>
                  <div className="p-2 bg-blue-400/10 rounded border border-blue-400/30">
                    <div className="text-blue-400 font-medium">Cathode (-)</div>
                    <div className="text-foreground">{result.cathode}</div>
                    <div className="text-muted-foreground text-xs mt-1">Product: {result.cathodeProduct}</div>
                  </div>
                </div>
                <div className="text-sm">
                  <span className="text-foreground">Observation:</span>{" "}
                  <span className="text-accent">{result.observation}</span>
                </div>
                <div className="mt-2 p-2 bg-background rounded font-mono text-xs">
                  {result.equation}
                </div>
                <div className="mt-2 flex items-center gap-1 text-green-400 text-sm">
                  <CheckCircle2 className="w-3 h-3" />
                  Electrolysis successful
                </div>
              </div>
            ))}
          </div>
        )}
        
        {results.length > 0 && (
          <Button 
            variant="outline" 
            onClick={() => setResults([])} 
            className="w-full mt-4 gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Clear Results
          </Button>
        )}
      </div>
    </div>
  );
};

export default ElectrochemistryLab;

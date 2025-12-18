import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, 
  FlaskConical, 
  Droplets, 
  Beaker,
  TestTube,
  PlayCircle,
  RotateCcw,
  Info,
  CheckCircle2,
  AlertTriangle,
  Pipette,
  Scale
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

interface TitrationState {
  buretteVolume: number;
  flaskColor: string;
  indicatorAdded: boolean;
  acidAdded: boolean;
  baseAdded: boolean;
  endpoint: boolean;
  readings: number[];
  currentTitration: number;
}

interface QualitativeTest {
  id: string;
  name: string;
  reagent: string;
  sample: string;
  result: string;
  inference: string;
  color: string;
}

const VirtualLab = () => {
  const [activeExperiment, setActiveExperiment] = useState<"titration" | "qualitative" | "quantitative">("titration");
  
  // Titration State
  const [titration, setTitration] = useState<TitrationState>({
    buretteVolume: 50,
    flaskColor: "bg-blue-200",
    indicatorAdded: false,
    acidAdded: false,
    baseAdded: true,
    endpoint: false,
    readings: [],
    currentTitration: 1
  });

  const [dropSpeed, setDropSpeed] = useState<"slow" | "fast">("slow");
  const [isRunning, setIsRunning] = useState(false);

  // Qualitative Analysis State
  const [selectedCation, setSelectedCation] = useState<string>("");
  const [selectedAnion, setSelectedAnion] = useState<string>("");
  const [testResults, setTestResults] = useState<QualitativeTest[]>([]);

  const cations = [
    { id: "fe2", name: "Iron(II) Fe²⁺", color: "bg-green-300" },
    { id: "fe3", name: "Iron(III) Fe³⁺", color: "bg-amber-600" },
    { id: "cu2", name: "Copper(II) Cu²⁺", color: "bg-blue-400" },
    { id: "zn2", name: "Zinc Zn²⁺", color: "bg-gray-200" },
    { id: "pb2", name: "Lead(II) Pb²⁺", color: "bg-gray-300" },
    { id: "ca2", name: "Calcium Ca²⁺", color: "bg-white" },
    { id: "na", name: "Sodium Na⁺", color: "bg-white" },
    { id: "nh4", name: "Ammonium NH₄⁺", color: "bg-white" },
  ];

  const anions = [
    { id: "cl", name: "Chloride Cl⁻", color: "bg-white" },
    { id: "so4", name: "Sulphate SO₄²⁻", color: "bg-white" },
    { id: "co3", name: "Carbonate CO₃²⁻", color: "bg-white" },
    { id: "no3", name: "Nitrate NO₃⁻", color: "bg-white" },
  ];

  const performCationTest = (cation: string, test: string): QualitativeTest => {
    const tests: Record<string, Record<string, QualitativeTest>> = {
      fe2: {
        naoh: { id: "1", name: "NaOH Test", reagent: "Sodium hydroxide", sample: "Iron(II)", result: "Dirty green precipitate", inference: "Fe²⁺ confirmed", color: "bg-green-600" },
        nh3: { id: "2", name: "NH₃ Test", reagent: "Ammonia solution", sample: "Iron(II)", result: "Dirty green precipitate (no excess)", inference: "Fe²⁺ confirmed", color: "bg-green-600" },
      },
      fe3: {
        naoh: { id: "1", name: "NaOH Test", reagent: "Sodium hydroxide", sample: "Iron(III)", result: "Reddish-brown precipitate", inference: "Fe³⁺ confirmed", color: "bg-amber-700" },
        nh3: { id: "2", name: "NH₃ Test", reagent: "Ammonia solution", sample: "Iron(III)", result: "Reddish-brown precipitate", inference: "Fe³⁺ confirmed", color: "bg-amber-700" },
        kscn: { id: "3", name: "KSCN Test", reagent: "Potassium thiocyanate", sample: "Iron(III)", result: "Blood red color", inference: "Fe³⁺ confirmed", color: "bg-red-600" },
      },
      cu2: {
        naoh: { id: "1", name: "NaOH Test", reagent: "Sodium hydroxide", sample: "Copper(II)", result: "Light blue precipitate", inference: "Cu²⁺ confirmed", color: "bg-blue-300" },
        nh3: { id: "2", name: "NH₃ Test", reagent: "Excess ammonia", sample: "Copper(II)", result: "Deep blue solution", inference: "Cu²⁺ confirmed - [Cu(NH₃)₄]²⁺ complex", color: "bg-blue-600" },
      },
      zn2: {
        naoh: { id: "1", name: "NaOH Test", reagent: "Excess sodium hydroxide", sample: "Zinc", result: "White precipitate, dissolves in excess", inference: "Zn²⁺ confirmed (amphoteric)", color: "bg-white" },
        nh3: { id: "2", name: "NH₃ Test", reagent: "Excess ammonia", sample: "Zinc", result: "White precipitate, dissolves in excess", inference: "Zn²⁺ confirmed", color: "bg-white" },
      },
      pb2: {
        naoh: { id: "1", name: "NaOH Test", reagent: "Sodium hydroxide", sample: "Lead(II)", result: "White precipitate, dissolves in excess", inference: "Pb²⁺ possible (amphoteric)", color: "bg-white" },
        hcl: { id: "2", name: "HCl Test", reagent: "Dilute HCl", sample: "Lead(II)", result: "White precipitate (PbCl₂)", inference: "Pb²⁺ confirmed", color: "bg-white" },
        ki: { id: "3", name: "KI Test", reagent: "Potassium iodide", sample: "Lead(II)", result: "Yellow precipitate (PbI₂)", inference: "Pb²⁺ confirmed", color: "bg-yellow-400" },
      },
      ca2: {
        naoh: { id: "1", name: "NaOH Test", reagent: "Sodium hydroxide", sample: "Calcium", result: "No precipitate (or slight white on heating)", inference: "Ca²⁺ possible", color: "bg-transparent" },
        flame: { id: "2", name: "Flame Test", reagent: "Flame", sample: "Calcium", result: "Brick-red flame", inference: "Ca²⁺ confirmed", color: "bg-orange-600" },
      },
      na: {
        flame: { id: "1", name: "Flame Test", reagent: "Flame", sample: "Sodium", result: "Golden yellow flame", inference: "Na⁺ confirmed", color: "bg-yellow-400" },
      },
      nh4: {
        naoh: { id: "1", name: "NaOH + Heat", reagent: "Warm with NaOH", sample: "Ammonium", result: "Ammonia gas evolved (pungent smell)", inference: "NH₄⁺ confirmed", color: "bg-transparent" },
      },
    };

    return tests[cation]?.[test] || { id: "0", name: "Unknown", reagent: "", sample: "", result: "No reaction", inference: "Test not applicable", color: "bg-gray-200" };
  };

  const performAnionTest = (anion: string, test: string): QualitativeTest => {
    const tests: Record<string, Record<string, QualitativeTest>> = {
      cl: {
        agno3: { id: "1", name: "AgNO₃ Test", reagent: "Silver nitrate + dilute HNO₃", sample: "Chloride", result: "White precipitate, soluble in NH₃", inference: "Cl⁻ confirmed (AgCl)", color: "bg-white" },
      },
      so4: {
        bacl2: { id: "1", name: "BaCl₂ Test", reagent: "Barium chloride + dilute HCl", sample: "Sulphate", result: "White precipitate, insoluble in HCl", inference: "SO₄²⁻ confirmed (BaSO₄)", color: "bg-white" },
      },
      co3: {
        acid: { id: "1", name: "Acid Test", reagent: "Dilute HCl or H₂SO₄", sample: "Carbonate", result: "Effervescence, gas turns limewater milky", inference: "CO₃²⁻ confirmed (CO₂ evolved)", color: "bg-transparent" },
      },
      no3: {
        brown: { id: "1", name: "Brown Ring Test", reagent: "FeSO₄ + conc. H₂SO₄", sample: "Nitrate", result: "Brown ring at junction", inference: "NO₃⁻ confirmed", color: "bg-amber-800" },
      },
    };

    return tests[anion]?.[test] || { id: "0", name: "Unknown", reagent: "", sample: "", result: "No reaction", inference: "Test not applicable", color: "bg-gray-200" };
  };

  const runCationTest = (test: string) => {
    if (!selectedCation) {
      toast.error("Please select a cation sample first");
      return;
    }
    const result = performCationTest(selectedCation, test);
    setTestResults(prev => [...prev, result]);
    toast.success(`Test performed: ${result.result}`);
  };

  const runAnionTest = (test: string) => {
    if (!selectedAnion) {
      toast.error("Please select an anion sample first");
      return;
    }
    const result = performAnionTest(selectedAnion, test);
    setTestResults(prev => [...prev, result]);
    toast.success(`Test performed: ${result.result}`);
  };

  // Titration functions
  const addIndicator = () => {
    if (!titration.indicatorAdded) {
      setTitration(prev => ({
        ...prev,
        indicatorAdded: true,
        flaskColor: "bg-pink-400"
      }));
      toast.success("Phenolphthalein indicator added - solution turns pink (alkaline)");
    }
  };

  const addDrop = () => {
    if (!titration.indicatorAdded) {
      toast.error("Add indicator first!");
      return;
    }
    if (titration.endpoint) {
      toast.info("Endpoint reached! Record reading and reset for next titration.");
      return;
    }

    const dropAmount = dropSpeed === "slow" ? 0.1 : 0.5;
    const newVolume = Math.max(0, titration.buretteVolume - dropAmount);
    
    // Endpoint is around 25ml used (starting from 50ml)
    const volumeUsed = 50 - newVolume;
    const endpoint = volumeUsed >= 24.5 + Math.random() * 1;
    
    setTitration(prev => ({
      ...prev,
      buretteVolume: newVolume,
      endpoint,
      flaskColor: endpoint ? "bg-white" : "bg-pink-300"
    }));

    if (endpoint) {
      toast.success("Endpoint reached! Solution turns colorless.");
    }
  };

  const startContinuousAddition = () => {
    if (!titration.indicatorAdded) {
      toast.error("Add indicator first!");
      return;
    }
    setIsRunning(true);
  };

  const stopAddition = () => {
    setIsRunning(false);
  };

  const recordReading = () => {
    if (!titration.endpoint) {
      toast.warning("Reach the endpoint before recording!");
      return;
    }
    const volumeUsed = Number((50 - titration.buretteVolume).toFixed(1));
    setTitration(prev => ({
      ...prev,
      readings: [...prev.readings, volumeUsed]
    }));
    toast.success(`Reading recorded: ${volumeUsed} ml`);
  };

  const resetTitration = () => {
    setTitration(prev => ({
      buretteVolume: 50,
      flaskColor: "bg-blue-200",
      indicatorAdded: false,
      acidAdded: false,
      baseAdded: true,
      endpoint: false,
      readings: prev.readings,
      currentTitration: prev.currentTitration + 1
    }));
    toast.info(`Starting titration ${titration.currentTitration + 1}`);
  };

  const resetAll = () => {
    setTitration({
      buretteVolume: 50,
      flaskColor: "bg-blue-200",
      indicatorAdded: false,
      acidAdded: false,
      baseAdded: true,
      endpoint: false,
      readings: [],
      currentTitration: 1
    });
    setTestResults([]);
    toast.info("Lab reset complete");
  };

  // Continuous addition effect
  useState(() => {
    if (isRunning && !titration.endpoint) {
      const interval = setInterval(() => {
        addDrop();
      }, dropSpeed === "slow" ? 500 : 200);
      return () => clearInterval(interval);
    }
  });

  const calculateAverage = () => {
    if (titration.readings.length < 2) return null;
    // Take concordant readings (within 0.2ml of each other)
    const sorted = [...titration.readings].sort((a, b) => a - b);
    const concordant = sorted.filter((r, i) => {
      if (i === 0) return true;
      return Math.abs(r - sorted[i - 1]) <= 0.2;
    });
    if (concordant.length >= 2) {
      const avg = concordant.reduce((a, b) => a + b, 0) / concordant.length;
      return avg.toFixed(2);
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary-foreground/5 rounded-full blur-3xl" />
        </div>
        
        <div className="container-narrow relative z-10 px-6">
          <Link 
            to="/learning-materials" 
            className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-accent transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Resources
          </Link>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-accent/20 rounded-xl">
              <FlaskConical className="w-8 h-8 text-accent" />
            </div>
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground">
                Virtual Chemistry Lab
              </h1>
              <p className="text-primary-foreground/70">Perform qualitative and quantitative experiments safely</p>
            </div>
          </div>
        </div>
      </header>

      {/* Lab Content */}
      <section className="section-padding">
        <div className="container-narrow px-6">
          <Tabs defaultValue="titration" className="w-full">
            <TabsList className="grid w-full max-w-lg mx-auto grid-cols-3 mb-8">
              <TabsTrigger value="titration" className="gap-2">
                <Pipette className="w-4 h-4" />
                Titration
              </TabsTrigger>
              <TabsTrigger value="qualitative" className="gap-2">
                <TestTube className="w-4 h-4" />
                Qualitative
              </TabsTrigger>
              <TabsTrigger value="quantitative" className="gap-2">
                <Scale className="w-4 h-4" />
                Quantitative
              </TabsTrigger>
            </TabsList>

            {/* Titration Experiment */}
            <TabsContent value="titration">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Lab Apparatus */}
                <div className="card-elevated p-6">
                  <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                    Acid-Base Titration (HCl vs NaOH)
                  </h3>
                  
                  <div className="relative h-96 bg-secondary/50 rounded-xl p-6 flex items-end justify-center">
                    {/* Burette */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2">
                      <div className="text-xs text-muted-foreground text-center mb-1">Burette (HCl)</div>
                      <div className="w-6 h-48 bg-gray-300 rounded-t-lg relative border-2 border-gray-400">
                        <div 
                          className="absolute bottom-0 left-0 right-0 bg-red-200 transition-all duration-300 rounded-b"
                          style={{ height: `${(titration.buretteVolume / 50) * 100}%` }}
                        />
                        <div className="absolute -right-10 top-0 text-xs text-muted-foreground">0</div>
                        <div className="absolute -right-10 top-1/4 text-xs text-muted-foreground">12.5</div>
                        <div className="absolute -right-10 top-1/2 text-xs text-muted-foreground">25</div>
                        <div className="absolute -right-10 top-3/4 text-xs text-muted-foreground">37.5</div>
                        <div className="absolute -right-10 bottom-0 text-xs text-muted-foreground">50</div>
                      </div>
                      <div className="w-1 h-8 bg-gray-400 mx-auto" />
                      {isRunning && (
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
                          <Droplets className="w-3 h-3 text-red-400 animate-bounce" />
                        </div>
                      )}
                    </div>

                    {/* Conical Flask */}
                    <div className="relative">
                      <div className={`w-32 h-24 ${titration.flaskColor} rounded-b-full transition-colors duration-500 border-2 border-gray-400`}>
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-4 bg-gray-300 rounded-t border-2 border-gray-400" />
                      </div>
                      <div className="text-xs text-muted-foreground text-center mt-2">
                        Conical Flask (25ml NaOH)
                      </div>
                    </div>

                    {/* Current Reading */}
                    <div className="absolute bottom-4 right-4 text-right">
                      <div className="text-sm text-muted-foreground">Burette Reading</div>
                      <div className="text-2xl font-bold text-accent">{titration.buretteVolume.toFixed(1)} ml</div>
                      <div className="text-sm text-muted-foreground">
                        Volume used: {(50 - titration.buretteVolume).toFixed(1)} ml
                      </div>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="mt-6 space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <Button 
                        onClick={addIndicator}
                        disabled={titration.indicatorAdded}
                        variant="outline"
                        className="gap-2"
                      >
                        <Droplets className="w-4 h-4" />
                        Add Indicator
                      </Button>
                      <Button 
                        onClick={addDrop}
                        disabled={!titration.indicatorAdded || titration.endpoint}
                        className="gap-2"
                      >
                        <Droplets className="w-4 h-4" />
                        Add Drop
                      </Button>
                      <Button
                        onClick={isRunning ? stopAddition : startContinuousAddition}
                        disabled={!titration.indicatorAdded || titration.endpoint}
                        variant={isRunning ? "destructive" : "default"}
                        className="gap-2"
                      >
                        {isRunning ? "Stop" : "Run"} <PlayCircle className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        onClick={() => setDropSpeed(dropSpeed === "slow" ? "fast" : "slow")}
                        size="sm"
                      >
                        Speed: {dropSpeed}
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={recordReading}
                        disabled={!titration.endpoint}
                        className="gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Record Reading
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={resetTitration}
                        className="gap-2"
                      >
                        <RotateCcw className="w-4 h-4" />
                        Next Titration
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Results & Info */}
                <div className="space-y-6">
                  {/* Instructions */}
                  <div className="card-elevated p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Info className="w-5 h-5 text-accent" />
                      <h3 className="font-display text-lg font-semibold">Procedure</h3>
                    </div>
                    <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                      <li>Add 2-3 drops of phenolphthalein indicator to the flask</li>
                      <li>Record the initial burette reading (0.0 ml)</li>
                      <li>Add acid drop by drop while swirling</li>
                      <li>Stop when solution turns colorless (endpoint)</li>
                      <li>Record the final burette reading</li>
                      <li>Repeat for concordant readings (±0.2 ml)</li>
                    </ol>
                  </div>

                  {/* Readings Table */}
                  <div className="card-elevated p-6">
                    <h3 className="font-display text-lg font-semibold mb-4">Titration Readings</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left py-2">Titration</th>
                            <th className="text-left py-2">Final Reading (ml)</th>
                            <th className="text-left py-2">Initial Reading (ml)</th>
                            <th className="text-left py-2">Volume Used (ml)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {titration.readings.map((reading, index) => (
                            <tr key={index} className="border-b border-border/50">
                              <td className="py-2">{index + 1}</td>
                              <td className="py-2">{reading.toFixed(1)}</td>
                              <td className="py-2">0.0</td>
                              <td className="py-2 font-semibold text-accent">{reading.toFixed(1)}</td>
                            </tr>
                          ))}
                          {titration.readings.length === 0 && (
                            <tr>
                              <td colSpan={4} className="py-4 text-center text-muted-foreground">
                                No readings recorded yet
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                    {calculateAverage() && (
                      <div className="mt-4 p-3 bg-accent/10 rounded-lg">
                        <div className="text-sm text-muted-foreground">Average Volume (concordant)</div>
                        <div className="text-xl font-bold text-accent">{calculateAverage()} ml</div>
                      </div>
                    )}
                  </div>

                  <Button variant="outline" onClick={resetAll} className="w-full gap-2">
                    <RotateCcw className="w-4 h-4" />
                    Reset All
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Qualitative Analysis */}
            <TabsContent value="qualitative">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Sample Selection */}
                <div className="space-y-6">
                  <div className="card-elevated p-6">
                    <h3 className="font-display text-lg font-semibold mb-4">Select Cation Sample</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {cations.map(cation => (
                        <button
                          key={cation.id}
                          onClick={() => { setSelectedCation(cation.id); setTestResults([]); }}
                          className={`p-3 rounded-lg border-2 text-left transition-all ${
                            selectedCation === cation.id 
                              ? "border-accent bg-accent/10" 
                              : "border-border hover:border-accent/50"
                          }`}
                        >
                          <div className={`w-4 h-4 rounded ${cation.color} border border-gray-400 mb-1`} />
                          <div className="text-sm font-medium">{cation.name}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="card-elevated p-6">
                    <h3 className="font-display text-lg font-semibold mb-4">Cation Tests</h3>
                    <div className="space-y-2">
                      <Button onClick={() => runCationTest("naoh")} variant="outline" className="w-full justify-start gap-2">
                        <Droplets className="w-4 h-4" /> Add NaOH (aq)
                      </Button>
                      <Button onClick={() => runCationTest("nh3")} variant="outline" className="w-full justify-start gap-2">
                        <Droplets className="w-4 h-4" /> Add NH₃ (aq)
                      </Button>
                      <Button onClick={() => runCationTest("flame")} variant="outline" className="w-full justify-start gap-2">
                        <Beaker className="w-4 h-4" /> Flame Test
                      </Button>
                      <Button onClick={() => runCationTest("kscn")} variant="outline" className="w-full justify-start gap-2">
                        <Droplets className="w-4 h-4" /> Add KSCN (aq)
                      </Button>
                      <Button onClick={() => runCationTest("ki")} variant="outline" className="w-full justify-start gap-2">
                        <Droplets className="w-4 h-4" /> Add KI (aq)
                      </Button>
                      <Button onClick={() => runCationTest("hcl")} variant="outline" className="w-full justify-start gap-2">
                        <Droplets className="w-4 h-4" /> Add dilute HCl
                      </Button>
                    </div>
                  </div>

                  <div className="card-elevated p-6">
                    <h3 className="font-display text-lg font-semibold mb-4">Select Anion Sample</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {anions.map(anion => (
                        <button
                          key={anion.id}
                          onClick={() => { setSelectedAnion(anion.id); setTestResults([]); }}
                          className={`p-3 rounded-lg border-2 text-left transition-all ${
                            selectedAnion === anion.id 
                              ? "border-accent bg-accent/10" 
                              : "border-border hover:border-accent/50"
                          }`}
                        >
                          <div className="text-sm font-medium">{anion.name}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="card-elevated p-6">
                    <h3 className="font-display text-lg font-semibold mb-4">Anion Tests</h3>
                    <div className="space-y-2">
                      <Button onClick={() => runAnionTest("agno3")} variant="outline" className="w-full justify-start gap-2">
                        <Droplets className="w-4 h-4" /> Add AgNO₃ + HNO₃ (dilute)
                      </Button>
                      <Button onClick={() => runAnionTest("bacl2")} variant="outline" className="w-full justify-start gap-2">
                        <Droplets className="w-4 h-4" /> Add BaCl₂ + HCl
                      </Button>
                      <Button onClick={() => runAnionTest("acid")} variant="outline" className="w-full justify-start gap-2">
                        <Droplets className="w-4 h-4" /> Add dilute acid
                      </Button>
                      <Button onClick={() => runAnionTest("brown")} variant="outline" className="w-full justify-start gap-2">
                        <Beaker className="w-4 h-4" /> Brown Ring Test
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Results */}
                <div className="card-elevated p-6">
                  <h3 className="font-display text-lg font-semibold mb-4">Test Results</h3>
                  {testResults.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <TestTube className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Select a sample and perform tests to see results</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {testResults.map((result, index) => (
                        <div key={index} className="p-4 bg-secondary/50 rounded-lg border border-border">
                          <div className="flex items-start gap-3">
                            <div className={`w-6 h-6 rounded ${result.color} border border-gray-400 flex-shrink-0`} />
                            <div>
                              <div className="font-semibold text-foreground">{result.name}</div>
                              <div className="text-sm text-muted-foreground">Reagent: {result.reagent}</div>
                              <div className="text-sm mt-1">
                                <span className="text-foreground">Observation:</span>{" "}
                                <span className="text-accent">{result.result}</span>
                              </div>
                              <div className="text-sm mt-1 flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3 text-green-500" />
                                <span className="text-green-400">{result.inference}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {testResults.length > 0 && (
                    <Button 
                      variant="outline" 
                      onClick={() => setTestResults([])} 
                      className="w-full mt-4 gap-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Clear Results
                    </Button>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Quantitative Analysis */}
            <TabsContent value="quantitative">
              <div className="card-elevated p-8 text-center">
                <Scale className="w-16 h-16 mx-auto mb-4 text-accent" />
                <h3 className="font-display text-2xl font-semibold mb-4">Quantitative Analysis</h3>
                <p className="text-muted-foreground max-w-lg mx-auto mb-6">
                  Calculate concentrations, molar masses, and perform stoichiometric calculations based on your titration results.
                </p>
                
                {calculateAverage() ? (
                  <div className="max-w-md mx-auto space-y-4 text-left">
                    <div className="p-4 bg-secondary/50 rounded-lg">
                      <div className="text-sm text-muted-foreground">Given Data</div>
                      <div className="text-sm mt-2">Volume of NaOH = 25.0 ml</div>
                      <div className="text-sm">Concentration of HCl = 0.1 M</div>
                      <div className="text-sm">Average volume of HCl = {calculateAverage()} ml</div>
                    </div>
                    
                    <div className="p-4 bg-accent/10 rounded-lg">
                      <div className="text-sm text-muted-foreground">Calculation</div>
                      <div className="text-sm mt-2 font-mono">
                        n(HCl) = M × V = 0.1 × {(Number(calculateAverage()) / 1000).toFixed(4)} = {(0.1 * Number(calculateAverage()) / 1000).toFixed(5)} mol
                      </div>
                      <div className="text-sm font-mono mt-1">
                        n(NaOH) = n(HCl) = {(0.1 * Number(calculateAverage()) / 1000).toFixed(5)} mol (1:1 ratio)
                      </div>
                      <div className="text-sm font-mono mt-1">
                        M(NaOH) = n/V = {(0.1 * Number(calculateAverage()) / 1000).toFixed(5)} / 0.025 = {(0.1 * Number(calculateAverage()) / 25).toFixed(3)} M
                      </div>
                    </div>
                    
                    <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/30">
                      <div className="text-sm text-muted-foreground">Result</div>
                      <div className="text-lg font-semibold text-green-400 mt-1">
                        Concentration of NaOH = {(0.1 * Number(calculateAverage()) / 25).toFixed(3)} M
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2 text-amber-500">
                    <AlertTriangle className="w-5 h-5" />
                    <span>Complete at least 2 titrations with concordant readings first</span>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default VirtualLab;

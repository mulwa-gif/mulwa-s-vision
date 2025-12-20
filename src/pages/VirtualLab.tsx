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
  Scale,
  Flame,
  Cloud,
  Zap,
  BookOpen,
  Ruler
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import ElectrochemistryLab from "@/components/ElectrochemistryLab";
import ChemistryQuiz from "@/components/ChemistryQuiz";
import PhysicsLab from "@/components/labs/PhysicsLab";

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

interface PrecipitationResult {
  id: string;
  reactant1: string;
  reactant2: string;
  product: string;
  precipitateColor: string;
  observation: string;
  equation: string;
}

interface GasTestResult {
  id: string;
  gasName: string;
  testMethod: string;
  observation: string;
  inference: string;
  color: string;
  icon: string;
}

const VirtualLab = () => {
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

  // Precipitation State
  const [precipitationResults, setPrecipitationResults] = useState<PrecipitationResult[]>([]);
  const [selectedReactant1, setSelectedReactant1] = useState<string>("");
  const [selectedReactant2, setSelectedReactant2] = useState<string>("");

  // Gas Tests State
  const [gasTestResults, setGasTestResults] = useState<GasTestResult[]>([]);
  const [selectedGas, setSelectedGas] = useState<string>("");

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

  // Precipitation reagents
  const precipitationReagents = [
    { id: "nacl", name: "Sodium Chloride (NaCl)", type: "salt" },
    { id: "agno3", name: "Silver Nitrate (AgNO₃)", type: "salt" },
    { id: "pbno3", name: "Lead(II) Nitrate (Pb(NO₃)₂)", type: "salt" },
    { id: "ki", name: "Potassium Iodide (KI)", type: "salt" },
    { id: "na2so4", name: "Sodium Sulphate (Na₂SO₄)", type: "salt" },
    { id: "bacl2", name: "Barium Chloride (BaCl₂)", type: "salt" },
    { id: "na2co3", name: "Sodium Carbonate (Na₂CO₃)", type: "salt" },
    { id: "cacl2", name: "Calcium Chloride (CaCl₂)", type: "salt" },
    { id: "naoh", name: "Sodium Hydroxide (NaOH)", type: "base" },
    { id: "cuso4", name: "Copper(II) Sulphate (CuSO₄)", type: "salt" },
    { id: "fecl3", name: "Iron(III) Chloride (FeCl₃)", type: "salt" },
    { id: "znso4", name: "Zinc Sulphate (ZnSO₄)", type: "salt" },
  ];

  // Gases available for testing
  const gases = [
    { id: "co2", name: "Carbon Dioxide (CO₂)", color: "bg-gray-100" },
    { id: "o2", name: "Oxygen (O₂)", color: "bg-blue-100" },
    { id: "h2", name: "Hydrogen (H₂)", color: "bg-purple-100" },
    { id: "cl2", name: "Chlorine (Cl₂)", color: "bg-green-200" },
    { id: "so2", name: "Sulphur Dioxide (SO₂)", color: "bg-yellow-100" },
    { id: "nh3", name: "Ammonia (NH₃)", color: "bg-blue-50" },
    { id: "hcl", name: "Hydrogen Chloride (HCl)", color: "bg-gray-200" },
    { id: "h2s", name: "Hydrogen Sulphide (H₂S)", color: "bg-yellow-200" },
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

  // Precipitation reactions database
  const getPrecipitationResult = (r1: string, r2: string): PrecipitationResult | null => {
    const reactions: Record<string, PrecipitationResult> = {
      "agno3+nacl": { id: "1", reactant1: "AgNO₃", reactant2: "NaCl", product: "AgCl + NaNO₃", precipitateColor: "bg-white", observation: "White curdy precipitate forms immediately", equation: "AgNO₃(aq) + NaCl(aq) → AgCl(s)↓ + NaNO₃(aq)" },
      "nacl+agno3": { id: "1", reactant1: "NaCl", reactant2: "AgNO₃", product: "AgCl + NaNO₃", precipitateColor: "bg-white", observation: "White curdy precipitate forms immediately", equation: "AgNO₃(aq) + NaCl(aq) → AgCl(s)↓ + NaNO₃(aq)" },
      "pbno3+ki": { id: "2", reactant1: "Pb(NO₃)₂", reactant2: "KI", product: "PbI₂ + KNO₃", precipitateColor: "bg-yellow-400", observation: "Bright yellow precipitate ('golden rain')", equation: "Pb(NO₃)₂(aq) + 2KI(aq) → PbI₂(s)↓ + 2KNO₃(aq)" },
      "ki+pbno3": { id: "2", reactant1: "KI", reactant2: "Pb(NO₃)₂", product: "PbI₂ + KNO₃", precipitateColor: "bg-yellow-400", observation: "Bright yellow precipitate ('golden rain')", equation: "Pb(NO₃)₂(aq) + 2KI(aq) → PbI₂(s)↓ + 2KNO₃(aq)" },
      "bacl2+na2so4": { id: "3", reactant1: "BaCl₂", reactant2: "Na₂SO₄", product: "BaSO₄ + NaCl", precipitateColor: "bg-white", observation: "White precipitate, insoluble in dilute acids", equation: "BaCl₂(aq) + Na₂SO₄(aq) → BaSO₄(s)↓ + 2NaCl(aq)" },
      "na2so4+bacl2": { id: "3", reactant1: "Na₂SO₄", reactant2: "BaCl₂", product: "BaSO₄ + NaCl", precipitateColor: "bg-white", observation: "White precipitate, insoluble in dilute acids", equation: "BaCl₂(aq) + Na₂SO₄(aq) → BaSO₄(s)↓ + 2NaCl(aq)" },
      "na2co3+cacl2": { id: "4", reactant1: "Na₂CO₃", reactant2: "CaCl₂", product: "CaCO₃ + NaCl", precipitateColor: "bg-white", observation: "White precipitate (calcium carbonate)", equation: "Na₂CO₃(aq) + CaCl₂(aq) → CaCO₃(s)↓ + 2NaCl(aq)" },
      "cacl2+na2co3": { id: "4", reactant1: "CaCl₂", reactant2: "Na₂CO₃", product: "CaCO₃ + NaCl", precipitateColor: "bg-white", observation: "White precipitate (calcium carbonate)", equation: "Na₂CO₃(aq) + CaCl₂(aq) → CaCO₃(s)↓ + 2NaCl(aq)" },
      "naoh+cuso4": { id: "5", reactant1: "NaOH", reactant2: "CuSO₄", product: "Cu(OH)₂ + Na₂SO₄", precipitateColor: "bg-blue-400", observation: "Light blue gelatinous precipitate", equation: "2NaOH(aq) + CuSO₄(aq) → Cu(OH)₂(s)↓ + Na₂SO₄(aq)" },
      "cuso4+naoh": { id: "5", reactant1: "CuSO₄", reactant2: "NaOH", product: "Cu(OH)₂ + Na₂SO₄", precipitateColor: "bg-blue-400", observation: "Light blue gelatinous precipitate", equation: "2NaOH(aq) + CuSO₄(aq) → Cu(OH)₂(s)↓ + Na₂SO₄(aq)" },
      "naoh+fecl3": { id: "6", reactant1: "NaOH", reactant2: "FeCl₃", product: "Fe(OH)₃ + NaCl", precipitateColor: "bg-amber-700", observation: "Reddish-brown gelatinous precipitate", equation: "3NaOH(aq) + FeCl₃(aq) → Fe(OH)₃(s)↓ + 3NaCl(aq)" },
      "fecl3+naoh": { id: "6", reactant1: "FeCl₃", reactant2: "NaOH", product: "Fe(OH)₃ + NaCl", precipitateColor: "bg-amber-700", observation: "Reddish-brown gelatinous precipitate", equation: "3NaOH(aq) + FeCl₃(aq) → Fe(OH)₃(s)↓ + 3NaCl(aq)" },
      "naoh+znso4": { id: "7", reactant1: "NaOH", reactant2: "ZnSO₄", product: "Zn(OH)₂ + Na₂SO₄", precipitateColor: "bg-white", observation: "White gelatinous precipitate (dissolves in excess NaOH)", equation: "2NaOH(aq) + ZnSO₄(aq) → Zn(OH)₂(s)↓ + Na₂SO₄(aq)" },
      "znso4+naoh": { id: "7", reactant1: "ZnSO₄", reactant2: "NaOH", product: "Zn(OH)₂ + Na₂SO₄", precipitateColor: "bg-white", observation: "White gelatinous precipitate (dissolves in excess NaOH)", equation: "2NaOH(aq) + ZnSO₄(aq) → Zn(OH)₂(s)↓ + Na₂SO₄(aq)" },
      "agno3+ki": { id: "8", reactant1: "AgNO₃", reactant2: "KI", product: "AgI + KNO₃", precipitateColor: "bg-yellow-300", observation: "Pale yellow precipitate (insoluble in NH₃)", equation: "AgNO₃(aq) + KI(aq) → AgI(s)↓ + KNO₃(aq)" },
      "ki+agno3": { id: "8", reactant1: "KI", reactant2: "AgNO₃", product: "AgI + KNO₃", precipitateColor: "bg-yellow-300", observation: "Pale yellow precipitate (insoluble in NH₃)", equation: "AgNO₃(aq) + KI(aq) → AgI(s)↓ + KNO₃(aq)" },
    };

    const key = `${r1}+${r2}`;
    return reactions[key] || null;
  };

  // Gas tests database
  const getGasTest = (gasId: string, testType: string): GasTestResult | null => {
    const tests: Record<string, Record<string, GasTestResult>> = {
      co2: {
        limewater: { id: "1", gasName: "Carbon Dioxide", testMethod: "Bubble through limewater", observation: "Limewater turns milky (white precipitate)", inference: "CO₂ confirmed - CaCO₃ formed", color: "bg-white", icon: "💨" },
        burning: { id: "2", gasName: "Carbon Dioxide", testMethod: "Burning splint test", observation: "Burning splint is extinguished", inference: "CO₂ does not support combustion", color: "bg-gray-300", icon: "🔥" },
      },
      o2: {
        glowing: { id: "1", gasName: "Oxygen", testMethod: "Glowing splint test", observation: "Glowing splint relights/burns brightly", inference: "O₂ confirmed - supports combustion", color: "bg-orange-400", icon: "✨" },
        burning: { id: "2", gasName: "Oxygen", testMethod: "Burning splint test", observation: "Burns more vigorously", inference: "O₂ supports combustion", color: "bg-orange-500", icon: "🔥" },
      },
      h2: {
        burning: { id: "1", gasName: "Hydrogen", testMethod: "Burning splint test", observation: "Burns with a 'pop' sound", inference: "H₂ confirmed - explosive with air", color: "bg-blue-300", icon: "💥" },
        flame: { id: "2", gasName: "Hydrogen", testMethod: "Light the gas", observation: "Burns with pale blue flame", inference: "H₂ produces water on burning", color: "bg-blue-400", icon: "🔵" },
      },
      cl2: {
        litmus: { id: "1", gasName: "Chlorine", testMethod: "Damp litmus paper", observation: "Litmus paper bleached white", inference: "Cl₂ confirmed - bleaching agent", color: "bg-white", icon: "📜" },
        smell: { id: "2", gasName: "Chlorine", testMethod: "Smell (carefully)", observation: "Pungent, choking smell", inference: "Cl₂ has characteristic odor", color: "bg-green-300", icon: "👃" },
        starch: { id: "3", gasName: "Chlorine", testMethod: "Starch-iodide paper", observation: "Paper turns blue-black", inference: "Cl₂ oxidizes iodide to iodine", color: "bg-blue-900", icon: "📄" },
      },
      so2: {
        dichromate: { id: "1", gasName: "Sulphur Dioxide", testMethod: "Acidified K₂Cr₂O₇", observation: "Orange to green color change", inference: "SO₂ confirmed - reducing agent", color: "bg-green-500", icon: "🧪" },
        smell: { id: "2", gasName: "Sulphur Dioxide", testMethod: "Smell (carefully)", observation: "Sharp, choking smell like burnt matches", inference: "Characteristic SO₂ odor", color: "bg-yellow-200", icon: "👃" },
        permanganate: { id: "3", gasName: "Sulphur Dioxide", testMethod: "Acidified KMnO₄", observation: "Purple to colorless", inference: "SO₂ is a reducing agent", color: "bg-white", icon: "💜" },
      },
      nh3: {
        litmus: { id: "1", gasName: "Ammonia", testMethod: "Damp red litmus paper", observation: "Red litmus turns blue", inference: "NH₃ confirmed - alkaline gas", color: "bg-blue-500", icon: "📜" },
        hcl: { id: "2", gasName: "Ammonia", testMethod: "Conc. HCl near the gas", observation: "White fumes of NH₄Cl", inference: "NH₃ confirmed", color: "bg-white", icon: "💨" },
        smell: { id: "3", gasName: "Ammonia", testMethod: "Smell (carefully)", observation: "Strong pungent smell", inference: "Characteristic ammonia odor", color: "bg-blue-100", icon: "👃" },
      },
      hcl: {
        ammonia: { id: "1", gasName: "Hydrogen Chloride", testMethod: "Ammonia near the gas", observation: "White fumes of NH₄Cl", inference: "HCl confirmed", color: "bg-white", icon: "💨" },
        litmus: { id: "2", gasName: "Hydrogen Chloride", testMethod: "Damp blue litmus paper", observation: "Blue litmus turns red", inference: "HCl is acidic", color: "bg-red-400", icon: "📜" },
        agno3: { id: "3", gasName: "Hydrogen Chloride", testMethod: "AgNO₃ solution", observation: "White precipitate of AgCl", inference: "Chloride ions present", color: "bg-white", icon: "🧪" },
      },
      h2s: {
        lead: { id: "1", gasName: "Hydrogen Sulphide", testMethod: "Lead(II) acetate paper", observation: "Paper turns black (PbS)", inference: "H₂S confirmed", color: "bg-gray-900", icon: "📄" },
        smell: { id: "2", gasName: "Hydrogen Sulphide", testMethod: "Smell (carefully)", observation: "Rotten egg smell", inference: "Characteristic H₂S odor", color: "bg-yellow-300", icon: "🥚" },
        burning: { id: "3", gasName: "Hydrogen Sulphide", testMethod: "Burn the gas", observation: "Burns with blue flame, SO₂ smell", inference: "H₂S is combustible", color: "bg-blue-400", icon: "🔥" },
      },
    };

    return tests[gasId]?.[testType] || null;
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

  const runPrecipitationReaction = () => {
    if (!selectedReactant1 || !selectedReactant2) {
      toast.error("Please select both reactants");
      return;
    }
    if (selectedReactant1 === selectedReactant2) {
      toast.error("Please select different reactants");
      return;
    }
    const result = getPrecipitationResult(selectedReactant1, selectedReactant2);
    if (result) {
      setPrecipitationResults(prev => [...prev, result]);
      toast.success(`Reaction: ${result.observation}`);
    } else {
      toast.info("No precipitate forms - both products are soluble");
    }
  };

  const runGasTest = (testType: string) => {
    if (!selectedGas) {
      toast.error("Please select a gas first");
      return;
    }
    const result = getGasTest(selectedGas, testType);
    if (result) {
      setGasTestResults(prev => [...prev, result]);
      toast.success(`Test result: ${result.observation}`);
    } else {
      toast.info("Test not applicable for this gas");
    }
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
    setPrecipitationResults([]);
    setGasTestResults([]);
    toast.info("Lab reset complete");
  };

  const calculateAverage = () => {
    if (titration.readings.length < 2) return null;
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
              <p className="text-primary-foreground/70">Perform experiments safely online</p>
            </div>
          </div>
        </div>
      </header>

      {/* Lab Content */}
      <section className="section-padding">
        <div className="container-narrow px-6">
          <Tabs defaultValue="titration" className="w-full">
            <TabsList className="grid w-full max-w-5xl mx-auto grid-cols-4 md:grid-cols-8 mb-8">
              <TabsTrigger value="titration" className="gap-1 text-xs">
                <Pipette className="w-4 h-4" />
                <span className="hidden md:inline">Titration</span>
              </TabsTrigger>
              <TabsTrigger value="qualitative" className="gap-1 text-xs">
                <TestTube className="w-4 h-4" />
                <span className="hidden md:inline">Qualitative</span>
              </TabsTrigger>
              <TabsTrigger value="precipitation" className="gap-1 text-xs">
                <Droplets className="w-4 h-4" />
                <span className="hidden md:inline">Precipitation</span>
              </TabsTrigger>
              <TabsTrigger value="gastests" className="gap-1 text-xs">
                <Cloud className="w-4 h-4" />
                <span className="hidden md:inline">Gas Tests</span>
              </TabsTrigger>
              <TabsTrigger value="electrolysis" className="gap-1 text-xs">
                <Zap className="w-4 h-4" />
                <span className="hidden md:inline">Electrolysis</span>
              </TabsTrigger>
              <TabsTrigger value="physics" className="gap-1 text-xs">
                <Ruler className="w-4 h-4" />
                <span className="hidden md:inline">Physics</span>
              </TabsTrigger>
              <TabsTrigger value="quiz" className="gap-1 text-xs">
                <BookOpen className="w-4 h-4" />
                <span className="hidden md:inline">Quiz</span>
              </TabsTrigger>
            </TabsList>

            {/* Physics Lab Tab */}
            <TabsContent value="physics">
              <PhysicsLab />
            </TabsContent>

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
                        <Flame className="w-4 h-4" /> Flame Test
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

            {/* Precipitation Reactions */}
            <TabsContent value="precipitation">
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="card-elevated p-6">
                    <h3 className="font-display text-lg font-semibold mb-4">Select Reactant 1</h3>
                    <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                      {precipitationReagents.map(reagent => (
                        <button
                          key={reagent.id}
                          onClick={() => setSelectedReactant1(reagent.id)}
                          className={`p-3 rounded-lg border-2 text-left transition-all ${
                            selectedReactant1 === reagent.id 
                              ? "border-accent bg-accent/10" 
                              : "border-border hover:border-accent/50"
                          }`}
                        >
                          <div className="text-sm font-medium">{reagent.name}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="card-elevated p-6">
                    <h3 className="font-display text-lg font-semibold mb-4">Select Reactant 2</h3>
                    <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                      {precipitationReagents.map(reagent => (
                        <button
                          key={reagent.id}
                          onClick={() => setSelectedReactant2(reagent.id)}
                          className={`p-3 rounded-lg border-2 text-left transition-all ${
                            selectedReactant2 === reagent.id 
                              ? "border-blue-500 bg-blue-500/10" 
                              : "border-border hover:border-blue-500/50"
                          }`}
                        >
                          <div className="text-sm font-medium">{reagent.name}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button 
                    onClick={runPrecipitationReaction} 
                    className="w-full gap-2"
                    disabled={!selectedReactant1 || !selectedReactant2}
                  >
                    <Beaker className="w-4 h-4" />
                    Mix Reactants
                  </Button>

                  <div className="card-elevated p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Info className="w-5 h-5 text-accent" />
                      <h3 className="font-display text-lg font-semibold">About Precipitation</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      A precipitation reaction occurs when two soluble ionic compounds are mixed and form an insoluble product (precipitate).
                    </p>
                    <div className="text-sm text-muted-foreground">
                      <strong className="text-foreground">Common precipitates:</strong>
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>AgCl - White (turns purple in light)</li>
                        <li>PbI₂ - Bright yellow ("golden rain")</li>
                        <li>BaSO₄ - White (insoluble in acids)</li>
                        <li>Cu(OH)₂ - Light blue</li>
                        <li>Fe(OH)₃ - Reddish-brown</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="card-elevated p-6">
                  <h3 className="font-display text-lg font-semibold mb-4">Reaction Results</h3>
                  {precipitationResults.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <Droplets className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Select two reactants and mix them to see results</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {precipitationResults.map((result, index) => (
                        <div key={index} className="p-4 bg-secondary/50 rounded-lg border border-border">
                          <div className="flex items-start gap-3">
                            <div className={`w-8 h-8 rounded-full ${result.precipitateColor} border-2 border-gray-400 flex-shrink-0`} />
                            <div className="flex-1">
                              <div className="font-semibold text-foreground">
                                {result.reactant1} + {result.reactant2}
                              </div>
                              <div className="text-sm text-accent mt-1">{result.observation}</div>
                              <div className="text-sm mt-2 p-2 bg-background rounded font-mono text-xs">
                                {result.equation}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {precipitationResults.length > 0 && (
                    <Button 
                      variant="outline" 
                      onClick={() => setPrecipitationResults([])} 
                      className="w-full mt-4 gap-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Clear Results
                    </Button>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Gas Tests */}
            <TabsContent value="gastests">
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="card-elevated p-6">
                    <h3 className="font-display text-lg font-semibold mb-4">Select Gas to Test</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {gases.map(gas => (
                        <button
                          key={gas.id}
                          onClick={() => { setSelectedGas(gas.id); setGasTestResults([]); }}
                          className={`p-3 rounded-lg border-2 text-left transition-all ${
                            selectedGas === gas.id 
                              ? "border-accent bg-accent/10" 
                              : "border-border hover:border-accent/50"
                          }`}
                        >
                          <div className={`w-full h-2 rounded ${gas.color} border border-gray-300 mb-2`} />
                          <div className="text-sm font-medium">{gas.name}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="card-elevated p-6">
                    <h3 className="font-display text-lg font-semibold mb-4">Gas Tests</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <Button onClick={() => runGasTest("limewater")} variant="outline" className="justify-start gap-2">
                        <Beaker className="w-4 h-4" /> Limewater
                      </Button>
                      <Button onClick={() => runGasTest("burning")} variant="outline" className="justify-start gap-2">
                        <Flame className="w-4 h-4" /> Burning Splint
                      </Button>
                      <Button onClick={() => runGasTest("glowing")} variant="outline" className="justify-start gap-2">
                        <Flame className="w-4 h-4" /> Glowing Splint
                      </Button>
                      <Button onClick={() => runGasTest("litmus")} variant="outline" className="justify-start gap-2">
                        <TestTube className="w-4 h-4" /> Litmus Paper
                      </Button>
                      <Button onClick={() => runGasTest("smell")} variant="outline" className="justify-start gap-2">
                        <Cloud className="w-4 h-4" /> Smell Test
                      </Button>
                      <Button onClick={() => runGasTest("dichromate")} variant="outline" className="justify-start gap-2">
                        <Droplets className="w-4 h-4" /> K₂Cr₂O₇
                      </Button>
                      <Button onClick={() => runGasTest("permanganate")} variant="outline" className="justify-start gap-2">
                        <Droplets className="w-4 h-4" /> KMnO₄
                      </Button>
                      <Button onClick={() => runGasTest("hcl")} variant="outline" className="justify-start gap-2">
                        <Cloud className="w-4 h-4" /> Conc. HCl
                      </Button>
                      <Button onClick={() => runGasTest("ammonia")} variant="outline" className="justify-start gap-2">
                        <Cloud className="w-4 h-4" /> Ammonia
                      </Button>
                      <Button onClick={() => runGasTest("lead")} variant="outline" className="justify-start gap-2">
                        <TestTube className="w-4 h-4" /> Lead Acetate
                      </Button>
                      <Button onClick={() => runGasTest("starch")} variant="outline" className="justify-start gap-2">
                        <TestTube className="w-4 h-4" /> Starch-Iodide
                      </Button>
                      <Button onClick={() => runGasTest("agno3")} variant="outline" className="justify-start gap-2">
                        <Droplets className="w-4 h-4" /> AgNO₃
                      </Button>
                    </div>
                  </div>

                  <div className="card-elevated p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Info className="w-5 h-5 text-accent" />
                      <h3 className="font-display text-lg font-semibold">Gas Testing Tips</h3>
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-accent">•</span>
                        <span><strong className="text-foreground">CO₂:</strong> Turns limewater milky</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent">•</span>
                        <span><strong className="text-foreground">O₂:</strong> Relights a glowing splint</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent">•</span>
                        <span><strong className="text-foreground">H₂:</strong> Burns with a 'pop' sound</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent">•</span>
                        <span><strong className="text-foreground">Cl₂:</strong> Bleaches damp litmus paper</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent">•</span>
                        <span><strong className="text-foreground">NH₃:</strong> Turns red litmus blue</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="card-elevated p-6">
                  <h3 className="font-display text-lg font-semibold mb-4">Test Results</h3>
                  {gasTestResults.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <Cloud className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Select a gas and perform tests to see results</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {gasTestResults.map((result, index) => (
                        <div key={index} className="p-4 bg-secondary/50 rounded-lg border border-border">
                          <div className="flex items-start gap-3">
                            <div className="text-2xl">{result.icon}</div>
                            <div className="flex-1">
                              <div className="font-semibold text-foreground">{result.gasName}</div>
                              <div className="text-sm text-muted-foreground">Test: {result.testMethod}</div>
                              <div className="text-sm mt-1">
                                <span className="text-foreground">Observation:</span>{" "}
                                <span className="text-accent">{result.observation}</span>
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
                  
                  {gasTestResults.length > 0 && (
                    <Button 
                      variant="outline" 
                      onClick={() => setGasTestResults([])} 
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

            {/* Electrochemistry */}
            <TabsContent value="electrolysis">
              <ElectrochemistryLab />
            </TabsContent>

            {/* Quiz */}
            <TabsContent value="quiz">
              <ChemistryQuiz />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default VirtualLab;

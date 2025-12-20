import { useState } from "react";
import { CheckCircle2, XCircle, RotateCcw, Trophy, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Question {
  id: number;
  category: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const ChemistryQuiz = () => {
  const [currentCategory, setCurrentCategory] = useState<string>("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const [quizComplete, setQuizComplete] = useState(false);

  const questions: Question[] = [
    // Qualitative Analysis Questions
    {
      id: 1,
      category: "qualitative",
      question: "What precipitate forms when sodium hydroxide is added to Iron(II) solution?",
      options: ["Reddish-brown precipitate", "Dirty green precipitate", "White precipitate", "Blue precipitate"],
      correctAnswer: 1,
      explanation: "Iron(II) ions (Fe²⁺) form a dirty green precipitate of Fe(OH)₂ with NaOH."
    },
    {
      id: 2,
      category: "qualitative",
      question: "Which reagent is used to confirm the presence of chloride ions?",
      options: ["Barium chloride", "Silver nitrate with dilute nitric acid", "Sodium hydroxide", "Ammonia solution"],
      correctAnswer: 1,
      explanation: "Silver nitrate (AgNO₃) with dilute HNO₃ forms white AgCl precipitate with chloride ions."
    },
    {
      id: 3,
      category: "qualitative",
      question: "What observation confirms the presence of ammonium ions?",
      options: ["White precipitate", "Pungent ammonia gas on warming with NaOH", "Blue solution", "Effervescence"],
      correctAnswer: 1,
      explanation: "Warming with NaOH releases ammonia gas (pungent smell) from NH₄⁺ ions."
    },
    {
      id: 4,
      category: "qualitative",
      question: "The brown ring test is used to identify which ion?",
      options: ["Sulphate", "Chloride", "Nitrate", "Carbonate"],
      correctAnswer: 2,
      explanation: "The brown ring test (FeSO₄ + conc. H₂SO₄) confirms NO₃⁻ (nitrate) ions."
    },
    {
      id: 5,
      category: "qualitative",
      question: "What color is the precipitate formed when excess ammonia is added to copper(II) solution?",
      options: ["White precipitate", "Deep blue solution (complex)", "Reddish-brown precipitate", "Yellow precipitate"],
      correctAnswer: 1,
      explanation: "Excess NH₃ dissolves Cu(OH)₂ to form deep blue [Cu(NH₃)₄]²⁺ complex."
    },
    {
      id: 6,
      category: "qualitative",
      question: "Which cation gives a golden yellow flame in flame test?",
      options: ["Calcium", "Potassium", "Sodium", "Copper"],
      correctAnswer: 2,
      explanation: "Sodium ions (Na⁺) produce a characteristic golden yellow flame."
    },
    {
      id: 7,
      category: "qualitative",
      question: "What happens when dilute acid is added to a carbonate?",
      options: ["White precipitate forms", "Effervescence with CO₂ gas evolved", "Solution turns blue", "No reaction"],
      correctAnswer: 1,
      explanation: "Carbonates react with acids to produce CO₂ gas (effervescence), which turns limewater milky."
    },
    {
      id: 8,
      category: "qualitative",
      question: "Lead(II) chloride precipitate is:",
      options: ["Insoluble in hot water", "Soluble in hot water", "Blue in color", "Reddish-brown"],
      correctAnswer: 1,
      explanation: "PbCl₂ is slightly soluble and dissolves in hot water, recrystallizing on cooling."
    },
    // Gas Tests Questions
    {
      id: 9,
      category: "gastests",
      question: "Which gas relights a glowing splint?",
      options: ["Carbon dioxide", "Hydrogen", "Oxygen", "Chlorine"],
      correctAnswer: 2,
      explanation: "Oxygen supports combustion and relights a glowing splint."
    },
    {
      id: 10,
      category: "gastests",
      question: "What happens when hydrogen gas is ignited?",
      options: ["Burns with orange flame", "Burns with a 'pop' sound", "Extinguishes", "Turns limewater milky"],
      correctAnswer: 1,
      explanation: "Hydrogen burns with a squeaky 'pop' sound when mixed with air and ignited."
    },
    {
      id: 11,
      category: "gastests",
      question: "Which gas bleaches damp litmus paper?",
      options: ["Ammonia", "Oxygen", "Chlorine", "Carbon dioxide"],
      correctAnswer: 2,
      explanation: "Chlorine is a strong bleaching agent and bleaches damp litmus paper white."
    },
    {
      id: 12,
      category: "gastests",
      question: "Sulphur dioxide can be identified using:",
      options: ["Glowing splint", "Acidified potassium dichromate", "Limewater", "Lead acetate paper"],
      correctAnswer: 1,
      explanation: "SO₂ reduces orange K₂Cr₂O₇ to green Cr³⁺, confirming its presence."
    },
    {
      id: 13,
      category: "gastests",
      question: "What is the characteristic smell of hydrogen sulphide?",
      options: ["Pungent like ammonia", "Rotten eggs", "Bleach-like", "No smell"],
      correctAnswer: 1,
      explanation: "H₂S has a distinctive rotten eggs smell (very toxic - test cautiously)."
    },
    {
      id: 14,
      category: "gastests",
      question: "Which gas turns red litmus paper blue?",
      options: ["Chlorine", "Hydrogen chloride", "Ammonia", "Carbon dioxide"],
      correctAnswer: 2,
      explanation: "Ammonia is alkaline and turns red litmus paper blue."
    },
    {
      id: 15,
      category: "gastests",
      question: "Carbon dioxide turns limewater:",
      options: ["Blue", "Milky/cloudy", "Yellow", "Green"],
      correctAnswer: 1,
      explanation: "CO₂ reacts with Ca(OH)₂ to form white CaCO₃ precipitate, making limewater milky."
    },
    {
      id: 16,
      category: "gastests",
      question: "Lead(II) acetate paper turns black in the presence of:",
      options: ["Chlorine", "Ammonia", "Hydrogen sulphide", "Oxygen"],
      correctAnswer: 2,
      explanation: "H₂S reacts with Pb(CH₃COO)₂ to form black PbS precipitate."
    },
    // Electrochemistry Questions
    {
      id: 17,
      category: "electrochemistry",
      question: "At which electrode does oxidation occur during electrolysis?",
      options: ["Cathode", "Anode", "Both electrodes", "Neither electrode"],
      correctAnswer: 1,
      explanation: "Oxidation (loss of electrons) occurs at the anode (positive electrode)."
    },
    {
      id: 18,
      category: "electrochemistry",
      question: "What is produced at the cathode during electrolysis of dilute H₂SO₄?",
      options: ["Oxygen", "Hydrogen", "Sulphur dioxide", "Chlorine"],
      correctAnswer: 1,
      explanation: "H⁺ ions are reduced at the cathode: 2H⁺ + 2e⁻ → H₂"
    },
    {
      id: 19,
      category: "electrochemistry",
      question: "During electrolysis of concentrated NaCl(aq), what is produced at the anode?",
      options: ["Sodium metal", "Hydrogen", "Oxygen", "Chlorine"],
      correctAnswer: 3,
      explanation: "Cl⁻ ions are oxidized at the anode: 2Cl⁻ → Cl₂ + 2e⁻"
    },
    {
      id: 20,
      category: "electrochemistry",
      question: "In electroplating with copper, the object to be plated is the:",
      options: ["Anode", "Cathode", "Electrolyte", "Salt bridge"],
      correctAnswer: 1,
      explanation: "The object is made the cathode so Cu²⁺ ions are reduced and deposited on it."
    },
    {
      id: 21,
      category: "electrochemistry",
      question: "What happens to the anode during electrolysis of CuSO₄ using copper electrodes?",
      options: ["It gains mass", "It loses mass", "No change", "It turns blue"],
      correctAnswer: 1,
      explanation: "Copper anode dissolves: Cu → Cu²⁺ + 2e⁻, so it loses mass."
    },
    {
      id: 22,
      category: "electrochemistry",
      question: "Which electrodes are considered inert?",
      options: ["Copper and zinc", "Iron and lead", "Carbon (graphite) and platinum", "Silver and gold"],
      correctAnswer: 2,
      explanation: "Carbon and platinum don't react during electrolysis, making them inert electrodes."
    },
    {
      id: 23,
      category: "electrochemistry",
      question: "During electrolysis of molten NaCl, what is produced at the cathode?",
      options: ["Chlorine gas", "Sodium metal", "Hydrogen", "Oxygen"],
      correctAnswer: 1,
      explanation: "Na⁺ ions are reduced: Na⁺ + e⁻ → Na (no water present in molten state)."
    },
    {
      id: 24,
      category: "electrochemistry",
      question: "The ratio of H₂ to O₂ volumes produced in electrolysis of water is:",
      options: ["1:1", "1:2", "2:1", "3:1"],
      correctAnswer: 2,
      explanation: "2H₂O → 2H₂ + O₂, so the ratio is 2:1 (hydrogen to oxygen)."
    },
  ];

  const categories = [
    { id: "qualitative", name: "Qualitative Analysis", icon: "🧪" },
    { id: "gastests", name: "Gas Tests", icon: "💨" },
    { id: "electrochemistry", name: "Electrochemistry", icon: "⚡" },
    { id: "all", name: "All Topics", icon: "📚" },
  ];

  const filteredQuestions = currentCategory === "all" || !currentCategory
    ? questions 
    : questions.filter(q => q.category === currentCategory);

  const handleCategorySelect = (categoryId: string) => {
    setCurrentCategory(categoryId);
    setCurrentQuestion(0);
    setScore(0);
    setAnsweredQuestions([]);
    setQuizComplete(false);
    setSelectedAnswer(null);
    setShowResult(false);
    toast.success(`Starting ${categories.find(c => c.id === categoryId)?.name} quiz`);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) {
      toast.error("Please select an answer");
      return;
    }

    setShowResult(true);
    setAnsweredQuestions(prev => [...prev, currentQuestion]);

    if (selectedAnswer === filteredQuestions[currentQuestion].correctAnswer) {
      setScore(prev => prev + 1);
      toast.success("Correct! 🎉");
    } else {
      toast.error("Incorrect. See the explanation below.");
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < filteredQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions([]);
    setQuizComplete(false);
  };

  const goToCategories = () => {
    setCurrentCategory("");
    resetQuiz();
  };

  if (!currentCategory) {
    return (
      <div className="card-elevated p-8">
        <div className="text-center mb-8">
          <BookOpen className="w-12 h-12 mx-auto mb-4 text-accent" />
          <h3 className="font-display text-2xl font-semibold mb-2">Chemistry Quiz</h3>
          <p className="text-muted-foreground">Test your knowledge on qualitative analysis, gas tests, and electrochemistry</p>
        </div>
        
        <div className="grid sm:grid-cols-2 gap-4 max-w-lg mx-auto">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => handleCategorySelect(category.id)}
              className="p-6 rounded-xl border-2 border-border hover:border-accent bg-secondary/30 hover:bg-accent/10 transition-all text-center group"
            >
              <div className="text-3xl mb-2">{category.icon}</div>
              <div className="font-semibold text-foreground group-hover:text-accent transition-colors">
                {category.name}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {category.id === "all" 
                  ? `${questions.length} questions` 
                  : `${questions.filter(q => q.category === category.id).length} questions`}
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (quizComplete) {
    const percentage = Math.round((score / filteredQuestions.length) * 100);
    const grade = percentage >= 80 ? "Excellent!" : percentage >= 60 ? "Good job!" : percentage >= 40 ? "Keep practicing!" : "Review the material";
    
    return (
      <div className="card-elevated p-8 text-center">
        <Trophy className={`w-16 h-16 mx-auto mb-4 ${percentage >= 60 ? "text-yellow-500" : "text-muted-foreground"}`} />
        <h3 className="font-display text-2xl font-semibold mb-2">Quiz Complete!</h3>
        <p className="text-4xl font-bold text-accent mb-2">{score}/{filteredQuestions.length}</p>
        <p className="text-lg text-muted-foreground mb-2">{percentage}% correct</p>
        <p className={`text-lg font-medium ${percentage >= 60 ? "text-green-500" : "text-amber-500"}`}>{grade}</p>
        
        <div className="flex justify-center gap-4 mt-8">
          <Button onClick={resetQuiz} className="gap-2">
            <RotateCcw className="w-4 h-4" />
            Try Again
          </Button>
          <Button variant="outline" onClick={goToCategories}>
            Choose Topic
          </Button>
        </div>
      </div>
    );
  }

  const question = filteredQuestions[currentQuestion];

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={goToCategories}>
          ← Back to Topics
        </Button>
        <div className="text-sm text-muted-foreground">
          Question {currentQuestion + 1} of {filteredQuestions.length}
        </div>
        <div className="text-sm font-medium text-accent">
          Score: {score}/{answeredQuestions.length}
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-secondary rounded-full h-2">
        <div 
          className="bg-accent h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentQuestion + 1) / filteredQuestions.length) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="card-elevated p-6">
        <div className="inline-block px-3 py-1 bg-accent/20 text-accent rounded-full text-sm mb-4">
          {categories.find(c => c.id === question.category)?.name}
        </div>
        
        <h3 className="text-xl font-semibold text-foreground mb-6">
          {question.question}
        </h3>

        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={showResult}
              className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                showResult
                  ? index === question.correctAnswer
                    ? "border-green-500 bg-green-500/10"
                    : index === selectedAnswer
                    ? "border-red-500 bg-red-500/10"
                    : "border-border opacity-50"
                  : selectedAnswer === index
                  ? "border-accent bg-accent/10"
                  : "border-border hover:border-accent/50"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  showResult
                    ? index === question.correctAnswer
                      ? "bg-green-500 text-white"
                      : index === selectedAnswer
                      ? "bg-red-500 text-white"
                      : "bg-secondary text-muted-foreground"
                    : selectedAnswer === index
                    ? "bg-accent text-accent-foreground"
                    : "bg-secondary text-muted-foreground"
                }`}>
                  {showResult && index === question.correctAnswer && <CheckCircle2 className="w-5 h-5" />}
                  {showResult && index === selectedAnswer && index !== question.correctAnswer && <XCircle className="w-5 h-5" />}
                  {!showResult && String.fromCharCode(65 + index)}
                </div>
                <span className="text-foreground">{option}</span>
              </div>
            </button>
          ))}
        </div>

        {showResult && (
          <div className="mt-6 p-4 bg-secondary/50 rounded-lg border border-border">
            <div className="font-medium text-foreground mb-1">Explanation:</div>
            <p className="text-muted-foreground">{question.explanation}</p>
          </div>
        )}

        <div className="flex justify-end gap-3 mt-6">
          {!showResult ? (
            <Button onClick={handleSubmitAnswer} disabled={selectedAnswer === null}>
              Submit Answer
            </Button>
          ) : (
            <Button onClick={handleNextQuestion}>
              {currentQuestion < filteredQuestions.length - 1 ? "Next Question" : "See Results"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChemistryQuiz;

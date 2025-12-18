import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, 
  FlaskConical, 
  Atom, 
  Download, 
  Play, 
  FileText, 
  Video, 
  BookOpen,
  Beaker,
  Zap,
  Waves,
  Thermometer,
  Scale,
  Lightbulb,
  GraduationCap,
  ChevronRight,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const LearningMaterials = () => {
  const [activeSubject, setActiveSubject] = useState<"chemistry" | "physics">("chemistry");

  const chemistryTopics = [
    {
      title: "Introduction to Chemistry",
      description: "Fundamentals of matter, atoms, and chemical reactions",
      icon: Beaker,
      resources: ["Notes PDF", "Video Lesson", "Practice Quiz"],
      level: "Beginner"
    },
    {
      title: "Atomic Structure",
      description: "Electron configuration, orbitals, and periodic trends",
      icon: Atom,
      resources: ["Notes PDF", "Interactive Simulation", "Worksheet"],
      level: "Intermediate"
    },
    {
      title: "Chemical Bonding",
      description: "Ionic, covalent, and metallic bonds explained",
      icon: Zap,
      resources: ["Notes PDF", "Video Lesson", "Lab Manual"],
      level: "Intermediate"
    },
    {
      title: "Organic Chemistry",
      description: "Carbon compounds, functional groups, and reactions",
      icon: FlaskConical,
      resources: ["Notes PDF", "Molecular Models", "Practice Problems"],
      level: "Advanced"
    },
    {
      title: "Thermochemistry",
      description: "Energy changes in chemical reactions",
      icon: Thermometer,
      resources: ["Notes PDF", "Calculations Guide", "Video Lesson"],
      level: "Intermediate"
    },
    {
      title: "Electrochemistry",
      description: "Redox reactions, electrochemical cells, and applications",
      icon: Zap,
      resources: ["Notes PDF", "Lab Guide", "Quiz"],
      level: "Advanced"
    },
  ];

  const physicsTopics = [
    {
      title: "Mechanics",
      description: "Motion, forces, and Newton's laws",
      icon: Scale,
      resources: ["Notes PDF", "Video Lesson", "Problem Sets"],
      level: "Beginner"
    },
    {
      title: "Waves & Optics",
      description: "Wave properties, light, and optical phenomena",
      icon: Waves,
      resources: ["Notes PDF", "Simulations", "Lab Manual"],
      level: "Intermediate"
    },
    {
      title: "Thermodynamics",
      description: "Heat, temperature, and energy transfer",
      icon: Thermometer,
      resources: ["Notes PDF", "Calculations Guide", "Quiz"],
      level: "Intermediate"
    },
    {
      title: "Electricity & Magnetism",
      description: "Electric circuits, fields, and electromagnetic phenomena",
      icon: Zap,
      resources: ["Notes PDF", "Circuit Simulator", "Lab Guide"],
      level: "Intermediate"
    },
    {
      title: "Modern Physics",
      description: "Quantum mechanics, relativity, and nuclear physics",
      icon: Atom,
      resources: ["Notes PDF", "Video Series", "Conceptual Problems"],
      level: "Advanced"
    },
    {
      title: "Practical Physics",
      description: "Laboratory techniques and experimental methods",
      icon: Lightbulb,
      resources: ["Lab Manual", "Video Demonstrations", "Data Analysis Guide"],
      level: "All Levels"
    },
  ];

  const projects = [
    {
      title: "Virtual Chemistry Lab",
      description: "A fully-equipped virtual lab where students can safely perform chemistry experiments online, with all instructions, materials, and guidance provided.",
      icon: FlaskConical,
      status: "Coming Soon",
      color: "bg-emerald-500/20 text-emerald-400",
      link: null
    },
    {
      title: "AI-Powered Interactive Periodic Table",
      description: "A dynamic, AI-driven periodic table that displays complete information for every element—atomic number, atomic mass, electron configuration, properties, uses, and more.",
      icon: Atom,
      status: "Available",
      color: "bg-blue-500/20 text-blue-400",
      link: "/periodic-table"
    },
    {
      title: "Personalized Science Learning Platform",
      description: "A comprehensive, adaptive learning system tailored for each student, offering all lessons, quizzes, and resources needed for effective science learning.",
      icon: GraduationCap,
      status: "In Development",
      color: "bg-purple-500/20 text-purple-400",
      link: null
    },
    {
      title: "Shadow Lab",
      description: "A web application that allows students to simulate and visualize chemistry and physics experiments completely online, with all tools and instructions provided.",
      icon: Beaker,
      status: "Coming Soon",
      color: "bg-amber-500/20 text-amber-400",
      link: null
    },
  ];

  const currentTopics = activeSubject === "chemistry" ? chemistryTopics : physicsTopics;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary-foreground/5 rounded-full blur-3xl" />
        </div>
        
        <div className="container-narrow relative z-10 px-6">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-accent transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Link>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-accent/20 rounded-xl">
              <BookOpen className="w-8 h-8 text-accent" />
            </div>
            <div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground">
                Learning Materials
              </h1>
              <p className="text-primary-foreground/70">Chemistry & Physics Resources</p>
            </div>
          </div>
          
          <p className="text-primary-foreground/80 max-w-2xl text-lg">
            Access comprehensive learning resources, notes, video lessons, and interactive materials 
            designed to help you master Chemistry and Physics concepts.
          </p>
        </div>
      </header>

      {/* Educator Info Banner */}
      <section className="bg-secondary/50 border-y border-border py-8">
        <div className="container-narrow px-6">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-1">
              <h2 className="font-display text-xl font-semibold text-foreground mb-2">
                Educator & Science Specialist
              </h2>
              <p className="text-muted-foreground">
                Chemistry & Physics | Student Leader at SEKU | Youth Leader, Makueni
              </p>
              <p className="text-accent text-sm mt-2 font-medium">
                Committed to excellence, integrity, and youth empowerment.
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="sm" className="gap-2">
                <FileText className="w-4 h-4" />
                Course Catalog
              </Button>
              <Button size="sm" className="gap-2 bg-accent hover:bg-accent/90 text-primary">
                <Play className="w-4 h-4" />
                Start Learning
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section-padding">
        <div className="container-narrow px-6">
          <div className="card-elevated p-8 bg-gradient-to-br from-accent/5 to-transparent">
            <p className="text-muted-foreground leading-relaxed text-lg">
              "As a skilled Chemistry and Physics educator with a passion for technology, I offer a comprehensive 
              approach to learning. I specialize in creating engaging online courses, interactive simulations, 
              and personalized tutoring sessions. I help learners achieve their goals through a blend of traditional 
              teaching methods and cutting-edge digital solutions."
            </p>
          </div>
        </div>
      </section>

      {/* Subject Tabs */}
      <section className="section-padding pt-0">
        <div className="container-narrow px-6">
          <Tabs defaultValue="chemistry" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
              <TabsTrigger 
                value="chemistry" 
                onClick={() => setActiveSubject("chemistry")}
                className="gap-2 data-[state=active]:bg-accent data-[state=active]:text-primary"
              >
                <FlaskConical className="w-4 h-4" />
                Chemistry
              </TabsTrigger>
              <TabsTrigger 
                value="physics"
                onClick={() => setActiveSubject("physics")}
                className="gap-2 data-[state=active]:bg-accent data-[state=active]:text-primary"
              >
                <Atom className="w-4 h-4" />
                Physics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="chemistry" className="mt-0">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {chemistryTopics.map((topic, index) => (
                  <TopicCard key={topic.title} topic={topic} index={index} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="physics" className="mt-0">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {physicsTopics.map((topic, index) => (
                  <TopicCard key={topic.title} topic={topic} index={index} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* AI Projects Section */}
      <section className="section-padding bg-secondary/30">
        <div className="container-narrow px-6">
          <div className="text-center mb-12">
            <span className="text-accent font-medium tracking-widest uppercase text-sm">
              AI-Powered Learning
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-4 mb-4">
              Innovative Projects
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore AI-enhanced resources designed to revolutionize your science learning journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => {
              const CardContent = (
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${project.color.split(' ')[0]}`}>
                    <project.icon className={`w-6 h-6 ${project.color.split(' ')[1]}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-display text-lg font-semibold text-foreground">
                        {project.title}
                      </h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${project.color}`}>
                        {project.status}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>
              );

              return project.link ? (
                <Link
                  key={project.title}
                  to={project.link}
                  className="card-elevated p-6 group hover:scale-[1.01] hover:border-accent/50 transition-all"
                >
                  {CardContent}
                </Link>
              ) : (
                <div
                  key={project.title}
                  className="card-elevated p-6 group hover:scale-[1.01] transition-transform"
                >
                  {CardContent}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-narrow px-6 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Ready to Excel in Science?
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8 text-lg">
            Explore my projects and access complete, AI-enhanced resources to fully support your science learning journey.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-primary gap-2"
            >
              <GraduationCap className="w-5 h-5" />
              Start Learning Now
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 gap-2"
            >
              <ExternalLink className="w-5 h-5" />
              Contact for Tutoring
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border bg-background">
        <div className="container-narrow px-6 text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Mulwa Martin. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

interface TopicCardProps {
  topic: {
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    resources: string[];
    level: string;
  };
  index: number;
}

const TopicCard = ({ topic, index }: TopicCardProps) => {
  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-500/20 text-green-400";
      case "Intermediate":
        return "bg-amber-500/20 text-amber-400";
      case "Advanced":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-blue-500/20 text-blue-400";
    }
  };

  return (
    <div className="card-elevated p-6 group hover:scale-[1.02] transition-transform">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
          <topic.icon className="w-6 h-6 text-accent" />
        </div>
        <span className={`text-xs px-2 py-1 rounded-full ${getLevelColor(topic.level)}`}>
          {topic.level}
        </span>
      </div>
      
      <h3 className="font-display text-lg font-semibold text-foreground mb-2">
        {topic.title}
      </h3>
      <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
        {topic.description}
      </p>
      
      <div className="flex flex-wrap gap-2">
        {topic.resources.map((resource) => (
          <span
            key={resource}
            className="text-xs px-2 py-1 bg-secondary rounded-full text-muted-foreground"
          >
            {resource}
          </span>
        ))}
      </div>
      
      <button className="mt-4 w-full flex items-center justify-center gap-2 py-2 text-sm text-accent hover:text-foreground transition-colors group/btn">
        Access Materials
        <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
      </button>
    </div>
  );
};

export default LearningMaterials;

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
  ExternalLink,
  Target,
  Eye,
  Rocket,
  Globe,
  Users,
  Clock,
  Sparkles,
  Heart,
  Mail
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

  const impactStats = [
    { value: "10K+", label: "Students Reached", icon: Users },
    { value: "500+", label: "Interactive Resources", icon: Sparkles },
    { value: "50+", label: "Schools Served", icon: Globe },
    { value: "24/7", label: "Learning Support", icon: Clock },
  ];

  const coreValues = [
    { icon: "🔬", title: "Scientific Integrity", description: "Accurate, up-to-date content backed by scientific principles" },
    { icon: "🚀", title: "Innovation", description: "Constantly exploring new technologies to enhance learning" },
    { icon: "🌍", title: "Accessibility", description: "Free resources available to learners everywhere" },
    { icon: "🤝", title: "Community", description: "Building a network of passionate science enthusiasts" },
  ];

  const timeline = [
    { year: "2024", title: "Foundation", description: "Teacher Martin's Resources was born from a passion for making science education more engaging and accessible to students." },
    { year: "2024", title: "First Launch", description: "Launched our initial platform with physics simulations and interactive chemistry modules." },
    { year: "2025", title: "AI Integration", description: "Introduced AI-powered learning assistance and interactive periodic table." },
    { year: "Future", title: "Virtual Labs", description: "Developing immersive VR science laboratories and expanding resources." },
  ];

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
                Teacher Martin's Resources
              </h1>
              <p className="text-primary-foreground/70">Transforming Science Education Through Technology</p>
            </div>
          </div>
          
          <p className="text-primary-foreground/80 max-w-2xl text-lg">
            Access comprehensive learning resources, notes, video lessons, and interactive materials 
            designed to help you master Chemistry and Physics concepts.
          </p>
        </div>
      </header>

      {/* Mission Section */}
      <section className="section-padding bg-secondary/30">
        <div className="container-narrow px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Our Mission */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-6 h-6 text-accent" />
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">Our Mission</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                At <span className="text-accent font-semibold">Teacher Martin's Resources</span>, we believe that science education should be <span className="text-foreground font-medium">accessible, engaging, and interactive</span> for everyone. We're on a mission to revolutionize how students learn physics, chemistry, and other sciences by combining cutting-edge technology with proven educational methodologies.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Founded in 2024, this platform emerged from a simple observation: traditional science education often fails to capture the wonder and excitement of discovery. We're changing that by creating immersive learning experiences that make complex concepts intuitive and fun.
              </p>
            </div>

            {/* About the Author */}
            <div className="card-elevated p-6 bg-gradient-to-br from-accent/5 to-transparent">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">About Teacher Martin</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Hello! I'm <span className="text-foreground font-semibold">Mulwa Martin</span>, the creator of this learning platform. I'm passionate about making science learning accessible and enjoyable for everyone — from curious beginners to lifelong learners.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                With a background in <span className="text-foreground font-medium">science education and technology</span>, I founded this platform to bridge the gap between traditional teaching and modern interactive learning. My goal is to build tools that help students <span className="text-foreground font-medium">understand concepts deeply</span> rather than just memorize formulas.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                When I'm not creating new learning resources or writing educational content, you'll probably find me exploring new teaching methods, reading about emerging technologies, or helping students discover the beauty of physics and chemistry.
              </p>
              <a 
                href="mailto:contact@example.com" 
                className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors"
              >
                <Mail className="w-4 h-4" />
                Email me directly — I'd love to hear your feedback!
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="section-padding">
        <div className="container-narrow px-6">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Eye className="w-6 h-6 text-accent" />
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">Our Vision</h2>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We envision a world where every student has access to <span className="text-foreground font-medium">high-quality science education</span>, regardless of their location or background. Through interactive simulations, AI-powered assistance, and collaborative learning platforms, we're building the future of STEM education.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="card-elevated p-6 border-l-4 border-accent">
              <div className="flex items-center gap-3 mb-3">
                <Rocket className="w-5 h-5 text-accent" />
                <h3 className="font-display text-lg font-semibold text-foreground">Innovation</h3>
              </div>
              <p className="text-sm text-accent mb-2">Pushing Boundaries</p>
              <p className="text-muted-foreground text-sm">
                Continuously developing new ways to make science education more engaging and effective.
              </p>
            </div>

            <div className="card-elevated p-6 border-l-4 border-accent">
              <div className="flex items-center gap-3 mb-3">
                <Globe className="w-5 h-5 text-accent" />
                <h3 className="font-display text-lg font-semibold text-foreground">Accessibility</h3>
              </div>
              <p className="text-sm text-accent mb-2">Education for All</p>
              <p className="text-muted-foreground text-sm">
                Making quality science resources available to students everywhere, for free.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-narrow px-6">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-center mb-12">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {impactStats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="w-8 h-8 text-accent mx-auto mb-3" />
                <div className="text-3xl md:text-4xl font-bold text-accent mb-2">{stat.value}</div>
                <div className="text-primary-foreground/70 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="section-padding">
        <div className="container-narrow px-6">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground text-center mb-12">Our Journey</h2>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-accent/30 transform md:-translate-x-1/2" />
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div 
                  key={index} 
                  className={`relative flex flex-col md:flex-row gap-4 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className="md:w-1/2" />
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-accent rounded-full transform -translate-x-1/2 mt-2" />
                  <div className={`ml-10 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <span className="text-accent font-semibold">{item.year}</span>
                    <h3 className="font-display text-lg font-semibold text-foreground">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding bg-secondary/30">
        <div className="container-narrow px-6">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground text-center mb-12">Our Core Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, index) => (
              <div key={index} className="card-elevated p-6 text-center">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subject Tabs */}
      <section className="section-padding">
        <div className="container-narrow px-6">
          <div className="text-center mb-12">
            <span className="text-accent font-medium tracking-widest uppercase text-sm">
              Learning Resources
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-4 mb-4">
              Explore by Subject
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Access comprehensive notes, video lessons, and interactive materials for Chemistry and Physics.
            </p>
          </div>

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
            <Link to="/periodic-table">
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-primary gap-2"
              >
                <Atom className="w-5 h-5" />
                Try Interactive Periodic Table
              </Button>
            </Link>
            <Link to="/#contact">
              <Button 
                variant="outline" 
                size="lg"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 gap-2"
              >
                <ExternalLink className="w-5 h-5" />
                Contact for Tutoring
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border bg-background">
        <div className="container-narrow px-6 text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Teacher Martin's Resources. All rights reserved.
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
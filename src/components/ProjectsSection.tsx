import { FlaskConical, Atom, GraduationCap, Beaker, Sparkles } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ProjectsSection = () => {
  const { ref, isVisible } = useScrollReveal();
  
  const projects = [
    {
      icon: FlaskConical,
      title: "Virtual Chemistry Lab",
      description:
        "A fully-equipped virtual lab where students can safely perform chemistry experiments online, with all instructions, materials, and guidance provided.",
      status: "Coming Soon",
      color: "bg-emerald-500/20 text-emerald-400",
      link: null
    },
    {
      icon: Atom,
      title: "AI-Powered Interactive Periodic Table",
      description:
        "A dynamic, AI-driven periodic table that displays complete information for every element—atomic number, atomic mass, electron configuration, properties, uses, and more.",
      status: "Available",
      color: "bg-blue-500/20 text-blue-400",
      link: "/periodic-table"
    },
    {
      icon: GraduationCap,
      title: "Personalized Science Learning Platform",
      description:
        "A comprehensive, adaptive learning system tailored for each student, offering all lessons, quizzes, and resources needed for effective science learning.",
      status: "In Development",
      color: "bg-purple-500/20 text-purple-400",
      link: null
    },
    {
      icon: Beaker,
      title: "Shadow Lab",
      description:
        "A web application that allows students to simulate and visualize chemistry and physics experiments completely online, with all tools and instructions provided.",
      status: "Coming Soon",
      color: "bg-amber-500/20 text-amber-400",
      link: null
    },
  ];

  return (
    <section 
      ref={ref}
      id="projects" 
      className={`section-padding bg-secondary/50 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="container-narrow">
        <div className="text-center mb-16">
          <span className="text-accent font-medium tracking-widest uppercase text-sm flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" />
            AI-Powered Learning
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
            Innovative Projects
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore my AI-enhanced resources and projects designed to revolutionize your science learning journey.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 mb-12">
          {projects.map((project, index) => {
            const CardContent = (
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl shrink-0 ${project.color.split(' ')[0]}`}>
                  <project.icon className={`w-6 h-6 ${project.color.split(' ')[1]}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
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
                className="group card-elevated p-6 hover:scale-[1.02] hover:border-accent/50"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {CardContent}
              </Link>
            ) : (
              <div
                key={project.title}
                className="group card-elevated p-6 hover:scale-[1.02]"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {CardContent}
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-accent/10 to-primary/5 border border-accent/20">
          <p className="text-foreground font-medium mb-4 text-lg">
            "Explore my projects and access complete, AI-enhanced resources to fully support your science learning journey."
          </p>
          <Link to="/learning-materials">
            <Button className="bg-accent hover:bg-accent/90 text-primary gap-2">
              <GraduationCap className="w-5 h-5" />
              Access Learning Materials
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;

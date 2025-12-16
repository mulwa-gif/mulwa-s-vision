import { FlaskConical, Cpu, Vote, Users, Drum } from "lucide-react";

const ProjectsSection = () => {
  const projects = [
    {
      icon: FlaskConical,
      title: "Science & Innovation Club Programs",
      description:
        "Leading initiatives that promote scientific inquiry and creative problem-solving among university students.",
    },
    {
      icon: Cpu,
      title: "Educational Technology & AI",
      description:
        "Exploring concept-level applications of AI in learning environments and modern pedagogy.",
    },
    {
      icon: Vote,
      title: "Civic Education Initiatives",
      description:
        "Student advocacy programs focused on democratic participation and good governance.",
    },
    {
      icon: Users,
      title: "Youth Leadership Forums",
      description:
        "Organizing discussions on governance, accountability, and responsible leadership.",
    },
    {
      icon: Drum,
      title: "Cultural Engagement",
      description:
        "Active participation in Kamba traditional dance, preserving cultural heritage.",
    },
  ];

  return (
    <section id="projects" className="section-padding bg-secondary/50">
      <div className="container-narrow">
        <div className="text-center mb-16">
          <span className="text-accent font-medium tracking-widest uppercase text-sm">
            Projects & Interests
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
            Areas of Focus
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From science innovation to civic engagement and cultural preservation, these are the areas where I invest my energy and passion.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="group card-elevated p-6 hover:scale-[1.02]"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <project.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                {project.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {project.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;

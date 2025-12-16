import { GraduationCap, Lightbulb, Users, Scale } from "lucide-react";

const AboutSection = () => {
  const highlights = [
    {
      icon: GraduationCap,
      label: "Education",
      description: "B.Ed Science Student",
    },
    {
      icon: Lightbulb,
      label: "Innovation",
      description: "Club President",
    },
    {
      icon: Users,
      label: "Leadership",
      description: "Student Advocate",
    },
    {
      icon: Scale,
      label: "Activism",
      description: "Civic Engagement",
    },
  ];

  return (
    <section id="about" className="section-padding bg-background">
      <div className="container-narrow">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div>
            <div className="mb-6">
              <span className="text-accent font-medium tracking-widest uppercase text-sm">
                About Me
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Educating Minds. Innovating Ideas. Speaking for the People.
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I am Mulwa Martin, a Bachelor of Education (Science) student at South Eastern Kenya University, specializing in <span className="text-foreground font-medium">Chemistry and Physics</span>. I am passionate about science education, innovation, student leadership, and civic engagement.
              </p>
              <p>
                I serve as the <span className="text-foreground font-medium">President of the SEKU Science & Innovation Club</span>, where I lead initiatives that promote scientific inquiry, creativity, and interdisciplinary collaboration.
              </p>
              <p>
                Alongside my academic work, I am a <span className="text-foreground font-medium">political activist</span>, actively engaged in advocacy, public discourse, and student civic awareness, with a focus on responsible leadership, good governance, and peaceful democratic participation.
              </p>
            </div>
            <div className="accent-bar mt-8" />
          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-2 gap-4">
            {highlights.map((item, index) => (
              <div
                key={item.label}
                className="card-elevated p-6 group hover:scale-[1.02]"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <item.icon className="w-6 h-6 text-primary group-hover:text-accent transition-colors" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-1">
                  {item.label}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

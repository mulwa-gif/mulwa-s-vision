import { GraduationCap, Lightbulb, Users, Scale } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const AboutSection = () => {
  const { ref, isVisible } = useScrollReveal();
  
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
    <section 
      ref={ref}
      id="about" 
      className={`section-padding bg-background transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="container-narrow">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div>
            <div className="mb-6">
              <span className="text-accent font-medium tracking-widest uppercase text-sm">
                About Me
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Educator & Science Specialist
            </h2>
            <p className="text-accent font-medium mb-6">
              Chemistry & Physics | Student Leader at SEKU | Youth Leader, Makueni
            </p>
            <p className="text-muted-foreground italic mb-6 border-l-4 border-accent/30 pl-4">
              Committed to excellence, integrity, and youth empowerment.
            </p>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                As a skilled <span className="text-foreground font-medium">Chemistry and Physics educator</span> with a passion for technology, I offer a comprehensive approach to learning. I specialize in creating engaging online courses, interactive simulations, and personalized tutoring sessions.
              </p>
              <p>
                I help learners achieve their goals through a blend of <span className="text-foreground font-medium">traditional teaching methods</span> and <span className="text-foreground font-medium">cutting-edge digital solutions</span>. As President of the SEKU Science & Innovation Club, I lead initiatives that promote scientific inquiry and creativity.
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

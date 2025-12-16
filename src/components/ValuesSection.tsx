import { Shield, Scale, Brain, Sparkles, Heart } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const ValuesSection = () => {
  const { ref, isVisible } = useScrollReveal();
  
  const values = [
    {
      icon: Shield,
      title: "Integrity & Accountability",
      description: "Standing firm in honesty and taking responsibility for actions and decisions.",
    },
    {
      icon: Scale,
      title: "Justice & Civic Responsibility",
      description: "Advocating for fairness and active participation in building a just society.",
    },
    {
      icon: Brain,
      title: "Knowledge-Driven Leadership",
      description: "Leading through informed decisions, continuous learning, and evidence-based approaches.",
    },
    {
      icon: Sparkles,
      title: "Innovation & Creativity",
      description: "Embracing new ideas and creative solutions to address challenges.",
    },
    {
      icon: Heart,
      title: "Community Empowerment",
      description: "Uplifting others through education, mentorship, and collaborative action.",
    },
  ];

  return (
    <section 
      ref={ref}
      id="values" 
      className={`section-padding bg-background transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="container-narrow">
        <div className="text-center mb-16">
          <span className="text-accent font-medium tracking-widest uppercase text-sm">
            Core Values
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-4">
            Guiding Principles
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {values.map((value, index) => (
            <div
              key={value.title}
              className="group flex flex-col items-center text-center max-w-xs"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors border-2 border-transparent group-hover:border-accent">
                <value.icon className="w-7 h-7 text-primary group-hover:text-accent transition-colors" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                {value.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;

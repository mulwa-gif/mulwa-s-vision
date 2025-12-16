import { GraduationCap, School, BookOpen } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const EducationSection = () => {
  const { ref, isVisible } = useScrollReveal();
  
  const education = [
    {
      icon: GraduationCap,
      level: "Tertiary Education",
      institution: "South Eastern Kenya University (SEKU)",
      program: "Bachelor of Education (Science)",
      details: "Chemistry & Physics",
      description:
        "Focus on pedagogy, learner-centered instruction, and curriculum interpretation",
      current: true,
    },
    {
      icon: School,
      level: "Secondary Education",
      institution: "Kaasya Secondary School",
      program: "Kenya Certificate of Secondary Education",
      details: null,
      description: null,
      current: false,
    },
    {
      icon: BookOpen,
      level: "Primary Education",
      institution: "Kwanyaaa Primary School",
      program: "Kenya Certificate of Primary Education",
      details: null,
      description: null,
      current: false,
    },
  ];

  return (
    <section 
      ref={ref}
      id="education" 
      className={`section-padding bg-background transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="container-narrow">
        <div className="text-center mb-16">
          <span className="text-accent font-medium tracking-widest uppercase text-sm">
            Education
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-4">
            Academic Journey
          </h2>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          <div className="space-y-12">
            {education.map((item, index) => (
              <div
                key={item.institution}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-background border-4 border-accent -translate-x-1/2 z-10" />

                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? "md:pr-16" : "md:pl-16"} pl-16 md:pl-0`}>
                  <div
                    className={`card-elevated p-6 ${
                      item.current ? "border-l-4 border-accent" : ""
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-accent text-sm font-medium">
                            {item.level}
                          </span>
                          {item.current && (
                            <span className="px-2 py-0.5 bg-accent/20 text-accent text-xs rounded-full font-medium">
                              Current
                            </span>
                          )}
                        </div>
                        <h3 className="font-display text-xl font-semibold text-foreground mb-1">
                          {item.institution}
                        </h3>
                        <p className="text-foreground font-medium">
                          {item.program}
                        </p>
                        {item.details && (
                          <p className="text-muted-foreground text-sm mt-1">
                            {item.details}
                          </p>
                        )}
                        {item.description && (
                          <p className="text-muted-foreground text-sm mt-2">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;

import { Beaker, Users2, Laptop } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const SkillsSection = () => {
  const { ref, isVisible } = useScrollReveal();
  
  const skillCategories = [
    {
      icon: Beaker,
      title: "Academic & Professional",
      skills: [
        "Chemistry & Physics mastery",
        "Science education support",
        "Learner engagement",
        "Mentorship",
        "Academic writing",
        "Research fundamentals",
      ],
    },
    {
      icon: Users2,
      title: "Leadership & Activism",
      skills: [
        "Organizational leadership",
        "Advocacy communication",
        "Public speaking",
        "Dialogue facilitation",
        "Project coordination",
        "Team collaboration",
      ],
    },
    {
      icon: Laptop,
      title: "Digital & Creative",
      skills: [
        "Digital collaboration tools",
        "Content creation",
        "Civic engagement media",
        "Innovation ideation",
        "Academic presentations",
        "Social media advocacy",
      ],
    },
  ];

  return (
    <section 
      ref={ref}
      id="skills" 
      className={`section-padding bg-hero-gradient relative overflow-hidden transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-foreground/5 rounded-full blur-3xl" />
      </div>

      <div className="container-narrow relative z-10">
        <div className="text-center mb-16">
          <span className="text-accent font-medium tracking-widest uppercase text-sm">
            Skills & Competencies
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mt-4">
            What I Bring
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <div
              key={category.title}
              className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-8 border border-primary-foreground/10 hover:bg-primary-foreground/15 transition-colors"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center mb-6">
                <category.icon className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-display text-xl font-semibold text-primary-foreground mb-6">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 bg-primary-foreground/10 rounded-full text-primary-foreground/80 text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;

import { Beaker, Users2, Laptop, BookOpen, MessageSquare, Heart } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const SkillsSection = () => {
  const { ref, isVisible } = useScrollReveal();
  
  const skillCategories = [
    {
      icon: Beaker,
      title: "Teaching & Instruction",
      skills: [
        "Chemistry Teaching",
        "Physics Teaching",
        "Lesson Planning",
        "Curriculum Interpretation (CBC & 8-4-4)",
        "Differentiated Instruction",
        "Laboratory Instruction",
        "Practical Demonstrations",
        "Learner-Centered Teaching",
      ],
    },
    {
      icon: BookOpen,
      title: "Assessment & Research",
      skills: [
        "Formative & Summative Assessment",
        "Exam Setting & Marking",
        "Academic Performance Analysis",
        "Educational Research",
        "Action Research",
        "Academic Writing",
        "Record Keeping",
        "Learner Progress Tracking",
      ],
    },
    {
      icon: Laptop,
      title: "Digital & EdTech Skills",
      skills: [
        "Educational Technology",
        "Virtual Labs & Simulations",
        "AI-Assisted Teaching Tools",
        "E-Learning Platforms",
        "Microsoft Office Suite",
        "Google Workspace",
        "Online Content Creation",
        "Basic Web Development",
        "Digital Assessment Tools",
      ],
    },
    {
      icon: Users2,
      title: "Leadership & Management",
      skills: [
        "Educational Leadership",
        "Student Mentorship",
        "Team Coordination",
        "Event Planning & Management",
        "Club & Program Leadership",
        "Strategic Planning",
        "Conflict Resolution",
        "Stakeholder Engagement",
      ],
    },
    {
      icon: MessageSquare,
      title: "Communication Skills",
      skills: [
        "Public Speaking",
        "Professional Communication",
        "Presentation Skills",
        "Active Listening",
        "Negotiation",
        "Interpersonal Relations",
        "Emotional Intelligence",
      ],
    },
    {
      icon: Heart,
      title: "Personal Development",
      skills: [
        "Integrity & Ethical Conduct",
        "Accountability",
        "Adaptability",
        "Self-Motivation",
        "Time Management",
        "Goal Setting",
        "Continuous Learning",
        "Leadership Under Pressure",
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
            Professional Skills
          </h2>
          <p className="text-primary-foreground/70 max-w-2xl mx-auto mt-4">
            A comprehensive skill set spanning teaching, technology, leadership, and research
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <div
              key={category.title}
              className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-6 border border-primary-foreground/10 hover:bg-primary-foreground/15 transition-colors"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mb-4">
                <category.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-display text-lg font-semibold text-primary-foreground mb-4">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 bg-primary-foreground/10 rounded-full text-primary-foreground/80 text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Hobbies Section */}
        <div className="mt-12 text-center">
          <h3 className="font-display text-xl font-semibold text-primary-foreground mb-4">
            🎭 Hobbies & Interests
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "🏀 Playing Basketball",
              "🔬 Science Innovation",
              "💻 Educational Technology",
              "🤝 Community Mentorship",
              "📚 Youth Engagement",
            ].map((hobby) => (
              <span
                key={hobby}
                className="px-4 py-2 bg-accent/20 rounded-full text-primary-foreground text-sm"
              >
                {hobby}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;

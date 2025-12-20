import { GraduationCap, Lightbulb, Users, Scale } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const AboutSection = () => {
  const { ref, isVisible } = useScrollReveal();
  
  const highlights = [
    {
      icon: GraduationCap,
      label: "Science Educator",
      description: "Chemistry & Physics Teacher",
    },
    {
      icon: Lightbulb,
      label: "Innovation Leader",
      description: "SEKU Science Club President",
    },
    {
      icon: Users,
      label: "Student Advocate",
      description: "Youth Empowerment",
    },
    {
      icon: Scale,
      label: "Civic Engagement",
      description: "Leadership & Integrity",
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
        {/* Welcome Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Hello, I'm Martin — welcome to my professional portfolio.
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Content */}
          <div>
            <div className="mb-6">
              <span className="text-accent font-medium tracking-widest uppercase text-sm">
                About Me
              </span>
            </div>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              Science Educator & Educational Innovator
            </h3>
            <p className="text-accent font-medium mb-6">
              B.Ed Science (Chemistry & Physics) | SEKU | Youth Leader, Makueni County
            </p>
            <p className="text-muted-foreground italic mb-6 border-l-4 border-accent/30 pl-4">
              "Driven by integrity, collaboration, and service — aspiring to transform education through innovation."
            </p>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I am a passionate <span className="text-foreground font-medium">Science educator and innovator</span> pursuing a Bachelor of Education (Science) with a specialization in Chemistry and Physics at South Eastern Kenya University. I am deeply committed to transforming education through effective teaching, mentorship, and technology-driven learning approaches.
              </p>
              <p>
                I have hands-on experience teaching <span className="text-foreground font-medium">Chemistry, Physics, and Integrated Science</span> at the secondary school level, with strong skills in lesson planning, classroom management, learner assessment, and curriculum interpretation. My teaching philosophy centers on making science <span className="text-foreground font-medium">practical, engaging, and learner-centered</span>, while nurturing critical thinking and problem-solving skills.
              </p>
              <p>
                Beyond the classroom, I am actively involved in <span className="text-foreground font-medium">science innovation initiatives, club formation, mentorship programs, and community engagement</span>. I have experience coordinating academic activities, organizing educational events, and supporting student-driven innovation projects.
              </p>
              <p>
                I am skilled in <span className="text-foreground font-medium">educational technology</span>, including virtual labs, digital content creation, basic web development, and AI-assisted learning tools. I believe in blending traditional pedagogy with modern digital solutions to enhance learner outcomes.
              </p>
            </div>
            <div className="accent-bar mt-8" />
          </div>

          {/* Right Column - Highlights + Teaching Philosophy */}
          <div className="space-y-6">
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

            {/* Teaching Philosophy */}
            <div className="card-elevated p-6 border-l-4 border-accent">
              <h4 className="font-display text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                🧪 Teaching Philosophy
              </h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                I believe that every learner can excel when instruction is engaging, practical, and inclusive. My teaching approach emphasizes conceptual understanding, experimentation, critical thinking, and real-life application of science concepts, while nurturing discipline, curiosity, and learner confidence.
              </p>
            </div>

            {/* Leadership Profile */}
            <div className="card-elevated p-6 bg-hero-gradient text-primary-foreground">
              <h4 className="font-display text-lg font-semibold mb-3 flex items-center gap-2">
                🧠 Leadership Profile
              </h4>
              <p className="text-primary-foreground/90 text-sm leading-relaxed">
                I am a purpose-driven leader who leads through action, integrity, and accountability. I have a proven ability to mobilize teams, coordinate academic initiatives, and drive ideas from concept to execution. I thrive in environments that demand clear communication, decisive problem-solving, and collaboration, and I consistently create impact by empowering others, building trust, and delivering results.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

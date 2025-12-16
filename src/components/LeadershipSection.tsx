import { Crown, Megaphone, BookOpen } from "lucide-react";

const LeadershipSection = () => {
  const roles = [
    {
      icon: Crown,
      title: "President – SEKU Science & Innovation Club",
      items: [
        "Provide strategic leadership to science and innovation initiatives",
        "Coordinate academic forums, exhibitions, and idea-driven programs",
        "Promote research culture, creativity, and problem-solving among students",
        "Foster interdisciplinary collaboration",
      ],
    },
    {
      icon: Megaphone,
      title: "Political Activist & Civic Advocate",
      items: [
        "Engage in student and youth civic education",
        "Participate in issue-based advocacy and public discourse",
        "Promote peaceful engagement, accountability, and democratic values",
        "Advocate for student rights, inclusion, and responsible governance",
      ],
    },
    {
      icon: BookOpen,
      title: "Academic & Community Engagement",
      items: [
        "Active participant in science and innovation forums",
        "Contributor to mentorship and academic support initiatives",
        "Supporter of community-based education efforts",
      ],
    },
  ];

  return (
    <section id="leadership" className="section-padding bg-secondary/50">
      <div className="container-narrow">
        <div className="text-center mb-16">
          <span className="text-accent font-medium tracking-widest uppercase text-sm">
            Leadership & Activism
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
            Leading with Purpose
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My work is guided by integrity, critical thinking, and a commitment to empowering young people to use knowledge, dialogue, and innovation to shape a better society.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {roles.map((role, index) => (
            <div
              key={role.title}
              className="card-elevated p-8 group"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="w-14 h-14 rounded-xl bg-hero-gradient flex items-center justify-center mb-6 shadow-lg group-hover:shadow-glow transition-shadow">
                <role.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                {role.title}
              </h3>
              <ul className="space-y-3">
                {role.items.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-muted-foreground text-sm"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LeadershipSection;

import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const ContactSection = () => {
  const { ref, isVisible } = useScrollReveal();
  
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "martinmulwa0150@gmail.com",
      href: "mailto:martinmulwa0150@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+254 792 703 995",
      href: "tel:+254792703995",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Kitise, Kathozweni Ward, Makueni County, Kenya",
      href: null,
    },
  ];

  return (
    <section 
      ref={ref}
      id="contact" 
      className={`section-padding bg-hero-gradient relative overflow-hidden transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary-foreground/5 rounded-full blur-3xl" />
      </div>

      <div className="container-narrow relative z-10">
        <div className="text-center mb-16">
          <span className="text-accent font-medium tracking-widest uppercase text-sm">
            Get in Touch
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mt-4 mb-6">
            Let's Connect
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            I'm open to academic collaborations, innovation opportunities, leadership engagements, and civic discussions. Feel free to reach out.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {contactInfo.map((item) => (
            <div
              key={item.label}
              className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-6 text-center border border-primary-foreground/10 hover:bg-primary-foreground/15 transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/30 transition-colors">
                <item.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-display font-semibold text-primary-foreground mb-2">
                {item.label}
              </h3>
              {item.href ? (
                <a
                  href={item.href}
                  className="text-primary-foreground/80 hover:text-accent transition-colors text-sm break-all"
                >
                  {item.value}
                </a>
              ) : (
                <p className="text-primary-foreground/80 text-sm">
                  {item.value}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            asChild
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 shadow-glow"
          >
            <a href="mailto:martinmulwa0150@gmail.com">
              <Send className="w-5 h-5 mr-2" />
              Send a Message
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

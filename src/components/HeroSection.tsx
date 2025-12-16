import { Mail, Phone, MapPin, ChevronDown } from "lucide-react";

const HeroSection = () => {
  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-hero-gradient overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float animation-delay-300" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-primary-foreground/5 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-primary-foreground/5 rounded-full" />
      </div>

      <div className="relative z-10 container-narrow text-center px-6">
        {/* Name and Title */}
        <div className="animate-fade-up opacity-0">
          <p className="text-accent font-medium tracking-widest uppercase text-sm mb-4">
            Educator · Innovator · Activist
          </p>
        </div>

        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-primary-foreground mb-6 animate-fade-up opacity-0 animation-delay-100">
          Mulwa Martin
        </h1>

        <p className="text-xl md:text-2xl text-primary-foreground/80 max-w-2xl mx-auto mb-8 animate-fade-up opacity-0 animation-delay-200 font-light">
          Science, Innovation, and Civic Courage
        </p>

        {/* Contact Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-up opacity-0 animation-delay-300">
          <a
            href="mailto:martinmulwa0150@gmail.com"
            className="flex items-center gap-2 px-4 py-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full text-primary-foreground/90 text-sm hover:bg-primary-foreground/20 transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span className="hidden sm:inline">martinmulwa0150@gmail.com</span>
            <span className="sm:hidden">Email</span>
          </a>
          <a
            href="tel:+254792703995"
            className="flex items-center gap-2 px-4 py-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full text-primary-foreground/90 text-sm hover:bg-primary-foreground/20 transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span>+254 792 703 995</span>
          </a>
          <span className="flex items-center gap-2 px-4 py-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full text-primary-foreground/90 text-sm">
            <MapPin className="w-4 h-4" />
            <span>Kenya</span>
          </span>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={scrollToAbout}
          className="animate-fade-up opacity-0 animation-delay-400 group"
          aria-label="Scroll to about section"
        >
          <div className="flex flex-col items-center gap-2 text-primary-foreground/60 hover:text-accent transition-colors">
            <span className="text-sm font-medium">Discover More</span>
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </div>
        </button>
      </div>
    </section>
  );
};

export default HeroSection;

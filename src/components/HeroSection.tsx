import { Mail, Phone, MapPin, ChevronDown, Linkedin, Twitter, Github } from "lucide-react";
import profileImage from "@/assets/profile.png";
import classroomHero from "@/assets/classroom-hero.jpg";

const HeroSection = () => {
  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${classroomHero})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/80 to-primary/95" />
      </div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-foreground/10 rounded-full blur-3xl animate-float animation-delay-300" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-primary-foreground/5 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-primary-foreground/5 rounded-full" />
      </div>

      <div className="relative z-10 container-narrow text-center px-6">
        {/* Floating Welcome Text */}
        <div className="mb-6 animate-fade-up opacity-0">
          <span className="inline-block px-6 py-2 bg-accent/20 backdrop-blur-sm rounded-full text-accent font-semibold tracking-wide animate-float">
            Hello, I'm Martin — welcome to my professional portfolio
          </span>
        </div>
        
        {/* Profile Photo */}
        <div className="mb-8 animate-fade-up opacity-0 animation-delay-100">
          <div className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full overflow-hidden border-4 border-accent/30 shadow-glow">
            <img 
              src={profileImage} 
              alt="Mulwa Martin" 
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>

        {/* Name with Floating Animation */}
        <div className="animate-fade-up opacity-0 animation-delay-200">
          <p className="text-accent font-medium tracking-widest uppercase text-sm mb-4 animate-float" style={{ animationDelay: "1s" }}>
            Educator · Innovator · Activist
          </p>
        </div>

        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-primary-foreground mb-6 animate-fade-up opacity-0 animation-delay-300">
          <span className="inline-block animate-float" style={{ animationDelay: "0.5s" }}>Martin</span>{" "}
          <span className="inline-block animate-float" style={{ animationDelay: "0.7s" }}>Mulwa</span>
        </h1>

        <p className="text-xl md:text-2xl text-primary-foreground/80 max-w-2xl mx-auto mb-4 animate-fade-up opacity-0 animation-delay-400 font-light">
          <span className="animate-float inline-block" style={{ animationDelay: "0.3s" }}>Science Educator</span>{" · "}
          <span className="animate-float inline-block" style={{ animationDelay: "0.5s" }}>Educational Innovator</span>{" · "}
          <span className="animate-float inline-block" style={{ animationDelay: "0.7s" }}>STEM Advocate</span>
        </p>
        
        <p className="text-base md:text-lg text-primary-foreground/60 max-w-xl mx-auto mb-8 animate-fade-up opacity-0 animation-delay-400">
          B.Ed Science (Chemistry & Physics) | South Eastern Kenya University
        </p>

        {/* Contact Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-8 animate-fade-up opacity-0 animation-delay-500">
          <a
            href="mailto:martinmulwa0150@gmail.com"
            className="flex items-center gap-2 px-4 py-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full text-primary-foreground/90 text-sm hover:bg-primary-foreground/20 transition-colors hover:scale-105 transform duration-200"
          >
            <Mail className="w-4 h-4" />
            <span className="hidden sm:inline">martinmulwa0150@gmail.com</span>
            <span className="sm:hidden">Email</span>
          </a>
          <a
            href="tel:+254792703995"
            className="flex items-center gap-2 px-4 py-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full text-primary-foreground/90 text-sm hover:bg-primary-foreground/20 transition-colors hover:scale-105 transform duration-200"
          >
            <Phone className="w-4 h-4" />
            <span>+254 792 703 995</span>
          </a>
          <span className="flex items-center gap-2 px-4 py-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full text-primary-foreground/90 text-sm">
            <MapPin className="w-4 h-4" />
            <span>Kenya</span>
          </span>
        </div>

        {/* Social Media Links */}
        <div className="flex justify-center gap-4 mb-12 animate-fade-up opacity-0 animation-delay-500">
          <a
            href="https://linkedin.com/in/mulwa-martin"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-primary-foreground/10 backdrop-blur-sm rounded-full text-primary-foreground/90 hover:bg-accent hover:text-primary transition-all hover:scale-110 transform duration-200"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="https://twitter.com/mulwamartin"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-primary-foreground/10 backdrop-blur-sm rounded-full text-primary-foreground/90 hover:bg-accent hover:text-primary transition-all hover:scale-110 transform duration-200"
            aria-label="Twitter/X"
          >
            <Twitter className="w-5 h-5" />
          </a>
          <a
            href="https://github.com/mulwamartin"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-primary-foreground/10 backdrop-blur-sm rounded-full text-primary-foreground/90 hover:bg-accent hover:text-primary transition-all hover:scale-110 transform duration-200"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={scrollToAbout}
          className="animate-fade-up opacity-0 animation-delay-500 group"
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

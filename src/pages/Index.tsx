import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import LeadershipSection from "@/components/LeadershipSection";
import EducationSection from "@/components/EducationSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ValuesSection from "@/components/ValuesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <LeadershipSection />
        <EducationSection />
        <SkillsSection />
        <ProjectsSection />
        <ValuesSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

import { useState, useEffect, lazy, Suspense } from "react";
import TopNav from "@/components/TopNav";
import HeroSection from "@/components/HeroSection";
import WebGLCanvas from "@/components/WebGLCanvas";
import InteractiveLayer from "@/components/InteractiveLayer";
import { AnimationProvider } from "@/contexts/AnimationContext";

const AboutSection = lazy(() => import("@/components/AboutSection"));
const ProjectsSection = lazy(() => import("@/components/ProjectsSection"));
const SkillsSection = lazy(() => import("@/components/SkillsSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const SystemFooter = lazy(() => import("@/components/SystemFooter"));

const Index = () => {
  const [currentSection, setCurrentSection] = useState("HERO");

  // Cmd+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        window.open(
          "https://drive.google.com/file/d/1OKL3qENSfGGf6PU-twSgnwmeKxehwFT5/view?usp=drivesdk",
          "_blank"
        );
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Track current section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentSection(entry.target.id.toUpperCase());
          }
        });
      },
      { threshold: 0.3 }
    );
    document.querySelectorAll("section[id]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <AnimationProvider>
      {/* Layer 0: WebGL Background (fixed, full-screen) */}
      <WebGLCanvas />

      {/* Layer 1: Interactive midground (cursor, orbs, grain) */}
      <InteractiveLayer />

      {/* Layer 10: UI — all existing React sections */}
      <div className="relative min-h-screen pb-10" style={{ zIndex: 10 }}>
        <TopNav />
        <HeroSection />
        <Suspense fallback={null}>
          <AboutSection />
          <ProjectsSection />
          <SkillsSection />
          <ContactSection />
          <SystemFooter currentSection={currentSection} />
        </Suspense>
      </div>
    </AnimationProvider>
  );
};

export default Index;

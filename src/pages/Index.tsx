import { useState, useEffect } from "react";
import TopNav from "@/components/TopNav";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";
import SystemFooter from "@/components/SystemFooter";

const Index = () => {
    const [currentSection, setCurrentSection] = useState("HERO");

    // Cmd+K shortcut
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                window.open("https://drive.google.com/file/d/1Z9xMlHV3L-yR9bXCkzhBAWt2aINmtbhM/view", "_blank");
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
        <div className="min-h-screen bg-background pb-10">
            <TopNav />
            <HeroSection />
            <AboutSection />
            <ProjectsSection />
            <SkillsSection />
            <ContactSection />
            <SystemFooter currentSection={currentSection} />
        </div>
    );
};

export default Index;

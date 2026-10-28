import { useEffect } from "react";
import TopNav from "@/components/TopNav";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
                event.preventDefault();
                const link = document.createElement("a");
                link.href = "/ayush-khati-resume.pdf";
                link.download = "ayush-khati-resume.pdf";
                document.body.appendChild(link);
                link.click();
                link.remove();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <div className="min-h-screen bg-background">
            <TopNav />
            <main>
                <HeroSection />
                <AboutSection />
                <ProjectsSection />
                <SkillsSection />
                <ContactSection />
            </main>
        </div>
    );
};

export default Index;

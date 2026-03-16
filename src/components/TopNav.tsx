import { useState } from "react";
import { Terminal } from "lucide-react";

const TopNav = () => {
    return (
        <header className="fixed top-0 left-0 right-0 z-40 border-b border-foreground/10 bg-background/90 backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row items-center justify-between px-4 lg:px-6 py-3 gap-3 sm:gap-0">
                <div className="font-mono text-xs text-muted-foreground uppercase tracking-widest shrink-0">
                    AK_SYSTEMS
                </div>
                <nav className="flex items-center justify-center flex-wrap gap-x-4 gap-y-2 lg:gap-6">
                    <a href="#about" className="font-mono text-[10px] text-muted-foreground hover:text-foreground uppercase tracking-widest transition-colors">
                        About
                    </a>
                    <a href="#projects" className="font-mono text-[10px] text-muted-foreground hover:text-foreground uppercase tracking-widest transition-colors">
                        My Work
                    </a>
                    <a href="#skills" className="font-mono text-[10px] text-muted-foreground hover:text-foreground uppercase tracking-widest transition-colors">
                        Arsenal
                    </a>
                    <a href="#contact" className="font-mono text-[10px] text-muted-foreground hover:text-foreground uppercase tracking-widest transition-colors">
                        Contact
                    </a>
                    <a
                        href="https://drive.google.com/file/d/1Z9xMlHV3L-yR9bXCkzhBAWt2aINmtbhM/view"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground hover:text-foreground uppercase tracking-widest transition-colors"
                    >
                        <Terminal size={12} strokeWidth={1} />
                        Resume
                    </a>
                </nav>
            </div>
        </header>
    );
};

export default TopNav;

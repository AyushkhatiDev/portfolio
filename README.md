# Portfolio

A modern technical portfolio built with Vite, React, TypeScript, Tailwind CSS, and Framer Motion. This portfolio is designed to feel like a developer control panel with terminal-inspired sections, animated page reveals, and a minimal dark theme.

**Live site**: [https://portfoliokhati.netlify.app/](https://portfoliokhati.netlify.app/)

## Overview

This project is a single-page portfolio application that showcases:
- Hero introduction with animated title switching
- About section with terminal-style content and interest badges
- Project showcase with detailed production and research examples
- Skills / tech stack section with animated cards
- Contact section with a simulated email form and social links
- Fixed top navigation and system-style footer for status readouts

## Tech Stack

### Core
- `Vite` for fast bundling and development
- `React` for composable UI
- `TypeScript` for static typing and component props
- `Tailwind CSS` for utility-first styling
- `framer-motion` for motion, entrance animations, hover effects, and view-driven reveals
- `react-router-dom` for route structure and 404 handling
- `@tanstack/react-query` for client data management setup

### UI & Animations
- `lucide-react` for crisp iconography
- `tailwindcss-animate` for utility animation classes
- `shadcn-ui` style custom UI components in `src/components/ui`
- `sonner` and custom toaster wrappers for notification components

### Additional libraries
- `next-themes` for theme handling boilerplate
- `clsx` and `tailwind-merge` for class name composition
- `@radix-ui/react-*` packages included for component-ready UI primitives

## Architecture & File Structure

### Entry points
- `src/main.tsx` bootstraps the React app and renders `<App />`
- `src/App.tsx` configures `QueryClientProvider`, `TooltipProvider`, toaster components, and routing
- `src/pages/Index.tsx` composes the homepage from section components and tracks the current section via `IntersectionObserver`

### Main component layout
- `src/components/TopNav.tsx` — fixed header with anchor nav links and resume CTA
- `src/components/HeroSection.tsx` — animated landing section with photo, skill title carousel, and CTA buttons
- `src/components/AboutSection.tsx` — terminal-style biography with animated stats and interest chips
- `src/components/ProjectsSection.tsx` — project list rendering reusable `ProjectCard` components
- `src/components/SkillsSection.tsx` — tech stack grid with animated cards
- `src/components/ContactSection.tsx` — styled contact form with focus state animations and socials panel
- `src/components/SystemFooter.tsx` — live UTC clock, scroll progress bar, current section, and memory-style display

### Supporting files
- `src/index.css` — theme CSS variables, font imports, custom utility classes, and base Tailwind configuration
- `tailwind.config.ts` — Tailwind theme extension, animation keyframes, and plugin config
- `src/components/ProjectCard.tsx` — reusable project presentation card with hover and reveal animations

## Detailed Implementation Notes

### Design language
- Uses a dark, developer-inspired theme with high contrast accent colors
- Terminal metaphors appear in section headings, content cards, and informational badges
- `font-mono` and uppercase tracking create a technical, code-like aesthetic
- Glassmorphism and backdrop blur are used in sections such as About and Contact for depth
- Subtle grid backgrounds, glow elements, and soft borders reinforce the polished studio feel

### Visual styling
- Global CSS variables in `src/index.css` define the color palette and semantic tokens such as `--background`, `--foreground`, `--accent`, `--primary`, and `--muted`
- `.text-gradient-primary` creates primary gradient text via `background-clip: text`
- Utility classes like `.border-glow` make borders responsive to hover and theme interaction
- Tailwind `@layer utilities` adds reusable custom utilities and keyframes

### Animations
- `framer-motion` drives most entrance and hover animations across the app
- `HeroSection` uses staggered `containerVariants` and `childVariants` to animate headline lines and callouts sequentially
- The hero title carousel cycles every 2.5 seconds using `useEffect` and `useState`
- Section content reveals use `whileInView` and `viewport={{ once: true }}` for one-time scroll-triggered animation
- `clipPath` transforms animate section reveals with masked text and container transitions
- Hover states animate subtle elevation, border-color, and background changes across cards and buttons
- The contact submit button spins a loader and transitions to a success state using `motion` animation props

### Interactive behaviors
- `Index.tsx` installs an `IntersectionObserver` on all `<section id="` elements to update the current section display in the footer
- A keyboard shortcut (Cmd/Ctrl+K) opens the resume link directly from the portfolio page
- `SystemFooter` displays a live UTC clock, memory-style usage metric, and scroll progress meter
- `ContactSection` simulates form submission state with interactive focus and loader animations

## Styling details
- Uses `@import` to load `JetBrains Mono` and applies it selectively through `.font-mono`
- Theme colors, surface tokens, and accent variables are defined at the root in `src/index.css`
- `tailwind.config.ts` extends Tailwind with custom animations such as `accordion-down`, `accordion-up`, and utility classes from `tailwindcss-animate`
- Layout is built with responsive Tailwind grid utilities, custom padding, and adaptive spacing
- The fixed header and sticky footer create a continuous floating console experience

## Getting Started

### Prerequisites
- Node.js 18+ or newer
- npm or Bun installed

### Install
```bash
npm install
```

With Bun:
```bash
bun install
```

### Run locally
```bash
npm run dev
```

With Bun:
```bash
bun run dev
```

### Build for production
```bash
npm run build
```

### Preview the production build
```bash
npm run preview
```

### Lint
```bash
npm run lint
```

### Tests
```bash
npm test
```

Before opening a pull request, run the production build, lint checks, and test suite:
```bash
npm run build && npm run lint && npm test
```

## Notes
- The contact form currently simulates submission and does not send real email data
- Many Radix UI primitives are installed and available in `src/components/ui`, even if the home page uses custom presentational sections
- The codebase uses alias imports like `@/components/...` configured by Vite and TypeScript path mappings

## Project structure
```text
src/
├── assets/            # image and media assets
├── components/        # reusable sections and UI building blocks
│   ├── ui/            # shadcn-inspired component wrappers and Radix primitives
│   ├── AboutSection.tsx
│   ├── ContactSection.tsx
│   ├── HeroSection.tsx
│   ├── ProjectCard.tsx
│   ├── ProjectsSection.tsx
│   ├── SkillsSection.tsx
│   ├── SystemFooter.tsx
│   └── TopNav.tsx
├── hooks/             # custom hooks (e.g. toast helper, mobile detection)
├── lib/               # small utilities and helpers
├── pages/             # page containers like Index.tsx and NotFound.tsx
├── App.tsx            # root application shell, providers, routes
├── index.css          # global styling and Tailwind utilities
└── main.tsx           # React rendering entrypoint
```

## Contact
- Email: `ayushiskhati305@gmail.com`
- GitHub: `https://github.com/AyushkhatiDev`
- LinkedIn: `https://www.linkedin.com/in/ayush-khati`
- Twitter / X: `https://twitter.com/ayushkhati`

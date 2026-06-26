# Tech Spec — Shiva Manikanta Portfolio

## Dependencies

| Package | Version | Purpose |
|---|---|---|
| react | ^19.0.0 | UI framework |
| react-dom | ^19.0.0 | DOM renderer |
| vite | ^6.0.0 | Build tool |
| @vitejs/plugin-react | ^4.4.0 | Vite React integration |
| tailwindcss | ^4.0.0 | Utility-first CSS |
| @tailwindcss/vite | ^4.0.0 | Tailwind Vite plugin |
| gsap | ^3.12.0 | Animations, ScrollTrigger, timelines |
| lucide-react | ^0.460.0 | Icons throughout the site |

No shadcn/ui components — the design is fully custom with glassmorphism cards and neon aesthetics that don't map to any standard UI library primitives.

## Component Inventory

### Layout

| Component | Source | Reuse | Notes |
|---|---|---|---|
| Navigation | Custom | Shared | Floating pill nav with glassmorphism. Scroll-spy active state. Mobile hamburger overlay. |
| Footer | Custom | Shared | Minimal copyright footer. |
| ParticleCanvas | Custom | Shared | Full-viewport canvas particle system. Fixed z-0. Owns its own rAF loop. |
| CursorGlow | Custom | Shared | Fixed-position cursor follower. Disabled on touch devices. |

### Sections

| Component | Source | Notes |
|---|---|---|
| HeroSection | Custom | Two-column (55/45), profile card, animated text, CTA buttons, social links. All text elements have staggered entrance delays. |
| AboutSection | Custom | Two-column (50/50), profile image card left, bio + animated skill bars right. |
| ProjectsSection | Custom | 3-column grid, 4 project cards. Staggered entrance. |
| ServicesSection | Custom | 3-column grid, 6 service cards. Staggered entrance. |
| SkillsSection | Custom | Featured certification card + 8-item expertise grid. |
| ContactSection | Custom | Centered layout, contact info row, CTA, social links. |

### Reusable Components

| Component | Source | Used By | Notes |
|---|---|---|---|
| GlassCard | Custom | All sections | Core building block. Contains `.card-border` glow layer + `.card-content` with backdrop blur. Hover triggers lift + glow intensify via CSS. |
| NeonButton | Custom | Hero, Contact | Two variants: primary (gradient bg) and secondary (bordered ghost). |
| SocialLinks | Custom | Hero, Contact | Row of 3 icon buttons (GitHub, LinkedIn, Email) with hover glow. |
| SectionTitle | Custom | About, Projects, Services, Skills, Contact | Gradient-clipped text title with consistent entrance animation. |
| SkillBar | Custom | AboutSection | Animated progress bar that fills from 0% to target width on scroll. |
| ProjectCard | Custom | ProjectsSection | GlassCard with image, title, description, tags, action buttons. |
| ServiceCard | Custom | ServicesSection | GlassCard with icon badge, title, description. |

### Hooks

| Hook | Purpose |
|---|---|
| useScrollEntrance | Wraps GSAP ScrollTrigger to register fade+slide entrance animations on ref'd elements. Accepts config for direction, delay, stagger. |

## Animation Implementation

| Animation | Library | Approach | Complexity |
|---|---|---|---|
| Particle background | Vanilla JS + Canvas | 🔒 rAF loop, 60 particles with upward drift + sine oscillation, glow rendering via radial gradients. Mobile reduces to 30 particles. | **High** |
| Custom cursor glow | Vanilla JS | 🔒 rAF loop with lerp interpolation (factor 0.15) for smooth trailing. Opacity fade-in on load. | **Medium** |
| Nav entrance | GSAP | Fade in + slideY from -30px, delay 0.2s after load. Single timeline call. | Low |
| Hero text stagger | GSAP | 🔒 Timeline sequencing all hero text elements with increasing delays (0.5s → 1.5s). Each: fadeIn + slideX from left. | **High** |
| Hero profile card entrance | GSAP | Fade in + scale from 0.85, duration 1.2s, delay 0.6s. Separate from text timeline. | Medium |
| Scroll-triggered section reveals | GSAP ScrollTrigger | 🔒 Reusable pattern: fadeIn + slideY(40→0), duration 0.8s. Each section fires once at 15% visibility. | **High** |
| Staggered card entrances | GSAP ScrollTrigger | 🔒 Same scroll-trigger pattern but with 0.12–0.15s stagger between sibling cards. Applied to Projects, Services, Skills grids. | **High** |
| Skill bar fill animation | GSAP ScrollTrigger | 🔒 Width animates 0%→target% (1.2s, custom easing) with 0.1s stagger. Triggered once when About section enters viewport. | **High** |
| Neon glow pulse | CSS @keyframes | Box-shadow alternates between base and 1.5x intensity. 3s infinite ease-in-out. Applied via class. | Low |
| Floating animation | CSS @keyframes | translateY 0↔-10px, 6s infinite ease-in-out. Applied to profile cards and decorative blobs. | Low |
| GlassCard hover | CSS transitions | All hover effects (lift, glow intensify, shadow) handled via CSS transition 0.4s cubic-bezier. No JS needed. | Low |
| Mobile menu overlay | GSAP | Fullscreen overlay fade-in + staggered link appearances (0.1s between items). | Medium |

## State & Logic

This is a static portfolio — no application state beyond UI-level concerns.

### Cursor Glow — Position Tracking

The cursor glow uses imperative position tracking outside React state. Store current and target positions in a ref object `{ x, y, targetX, targetY }`, update `targetX/targetY` on `mousemove`, and interpolate `x/y` toward targets each rAF frame via lerp. Render position directly to the DOM element via `transform`. This avoids re-renders entirely.

### Particle System — Imperative Canvas Loop

The particle system runs entirely outside React's render cycle. All particle state (positions, velocities, opacity, phase offsets) lives in a single typed array or plain object pool. The canvas element is accessed via ref. The rAF loop reads from this pool and draws directly to the 2D context each frame. Resize handling updates canvas dimensions and is debounced at 200ms. Cleanup on unmount cancels the rAF and removes the resize listener.

### Scroll-Spy Navigation

Navigation active state follows the currently visible section. Use a single IntersectionObserver (threshold: 0.3) on all section elements. The section with the highest intersection ratio gets marked as active. Store the active section ID in a React state variable. This drives the nav link highlight.

### GSAP ScrollTrigger Lifecycle

All GSAP ScrollTrigger instances must be created inside `useEffect` and killed on cleanup. Group related animations (e.g., all skill bars) into a single ScrollTrigger to avoid duplicate observers. The `useScrollEntrance` hook should manage its own ScrollTrigger creation/cleanup per call site.

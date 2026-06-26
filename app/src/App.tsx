import React from 'react';
import './App.css';
import ParticleCanvas from '@/components/ParticleCanvas';
import CursorGlow from '@/components/CursorGlow';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import HeroSection from '@/sections/HeroSection';
import AboutSection from '@/sections/AboutSection';
import ProjectsSection from '@/sections/ProjectsSection';
import ServicesSection from '@/sections/ServicesSection';
import SkillsSection from '@/sections/SkillsSection';
import ContactSection from '@/sections/ContactSection';

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen">
      {/* Background particle system */}
      <ParticleCanvas />

      {/* Custom cursor glow */}
      <CursorGlow />

      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ServicesSection />
        <SkillsSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;

import React, { useRef } from 'react';
import { useScrollEntrance } from '@/hooks/useScrollEntrance';
import GlassCard from '@/components/GlassCard';
import SectionTitle from '@/components/SectionTitle';
import { Award } from 'lucide-react';
import {
  Coffee,
  FileCode,
  Globe,
  Database,
  Layout,
  GitBranch,
  Brain,
  Cpu,
} from 'lucide-react';

const expertiseItems = [
  { icon: Coffee, label: 'Java' },
  { icon: FileCode, label: 'Python' },
  { icon: Database, label: 'SQL' },
  { icon: Layout, label: 'OOP' },
  { icon: GitBranch, label: 'Git & GitHub' },
  { icon: Brain, label: 'Problem Solving' },
  { icon: Cpu, label: 'AI Foundations' },
];

const SkillsSection: React.FC = () => {
  const certRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useScrollEntrance(certRef, {
    direction: 'up',
    distance: 30,
    duration: 1,
    delay: 0.1,
  });

  useScrollEntrance(gridRef, {
    direction: 'up',
    distance: 20,
    duration: 0.6,
    stagger: 0.08,
    childSelector: '.expertise-item',
  });

  return (
    <section
      id="skills"
      className="relative py-20 md:py-[120px] overflow-hidden"
      style={{ backgroundColor: '#1a0010' }}
    >
      {/* Background glow blob */}
      <div
        className="glow-blob"
        style={{
          width: 350,
          height: 350,
          background: 'rgba(184, 0, 217, 0.05)',
          filter: 'blur(100px)',
          top: '30%',
          right: '15%',
        }}
      />

      <div className="relative z-10 max-w-[800px] mx-auto px-6">
        <SectionTitle>Skills & Certifications</SectionTitle>

        {/* Featured Certification Card */}
        <div ref={certRef}>
          <GlassCard className="max-w-[700px] mx-auto" padding="40px">
            <div className="flex items-start gap-5">
              <div className="flex-shrink-0">
                <Award size={32} className="text-neon-pink" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white leading-tight">
                  Oracle Cloud Infrastructure 2025 Certified AI Foundations
                  Associate
                </h3>
                <p className="text-sm text-white/50 mt-1">
                  Oracle Cloud | 2025
                </p>
                <p className="text-base text-white/70 mt-4 leading-relaxed">
                  Certified in foundational AI concepts, including machine
                  learning, deep learning, and Oracle Cloud AI services.
                  Demonstrates proficiency in deploying and managing AI
                  solutions on cloud infrastructure.
                </p>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Expertise Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12"
        >
          {expertiseItems.map((item) => (
            <div key={item.label} className="expertise-item">
              <GlassCard padding="20px">
                <div className="flex flex-col items-center text-center">
                  <item.icon size={24} className="text-neon-pink" />
                  <span className="text-[0.9375rem] font-semibold text-white mt-3">
                    {item.label}
                  </span>
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;

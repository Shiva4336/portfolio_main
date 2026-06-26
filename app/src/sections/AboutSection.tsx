import React, { useRef } from 'react';
import { useScrollEntrance } from '@/hooks/useScrollEntrance';
import GlassCard from '@/components/GlassCard';
import SkillBar from '@/components/SkillBar';

const skills = [
  { name: 'Java', percentage: 80 },
  { name: 'Python', percentage: 75 },
  { name: 'SQL', percentage: 65 },
  { name: 'OOP', percentage: 75 },
  { name: 'Data Structures & Algorithms', percentage: 70 },
  { name: 'Git & GitHub', percentage: 70 },
];

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useScrollEntrance(sectionRef, {
    direction: 'up',
    distance: 40,
    duration: 0.8,
  });

  useScrollEntrance(imageRef, {
    direction: 'left',
    distance: 40,
    duration: 1,
    delay: 0.2,
  });

  useScrollEntrance(contentRef, {
    direction: 'right',
    distance: 40,
    duration: 0.8,
  });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-20 md:py-[120px] overflow-hidden"
      style={{ backgroundColor: '#1a0010' }}
    >
      {/* Background glow blob */}
      <div
        className="glow-blob"
        style={{
          width: 500,
          height: 500,
          background: 'rgba(255, 0, 76, 0.05)',
          filter: 'blur(150px)',
          top: '10%',
          left: '-10%',
        }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Left column - Profile image */}
          <div ref={imageRef} className="order-2 md:order-1 flex justify-center">
            <div className="animate-float">
              <GlassCard
                className="w-[260px] h-[320px] md:w-[300px] md:h-[380px]"
                padding="12px"
              >
                <div className="w-full h-full rounded-image overflow-hidden">
                  <img
                    src="/images/about-illustration.jpg"
                    alt="About illustration"
                    className="w-full h-full object-cover"
                  />
                </div>
              </GlassCard>
            </div>
          </div>

          {/* Right column - Content */}
          <div ref={contentRef} className="order-1 md:order-2">
            <h2 className="text-4xl md:text-[2.5rem] font-extrabold leading-tight gradient-text mb-6 text-left">
              ABOUT ME
            </h2>

            <p className="text-base md:text-lg text-white/70 leading-relaxed mb-4">
              I am a Computer Science and Artificial Intelligence undergraduate
              at Kakinada Institute of Engineering and Technology (2023–2027).
              With a strong foundation in Java, Python, and web technologies, I
              am passionate about building robust software solutions and
              exploring the frontiers of AI-driven development.
            </p>

            <p className="text-base md:text-lg text-white/70 leading-relaxed mb-8">
              I hold the Oracle Cloud Infrastructure 2025 Certified AI
              Foundations Associate certification. I am a quick learner, a team
              player, and I thrive in collaborative environments where I can
              contribute my problem-solving skills while growing alongside
              experienced professionals.
            </p>

            <h3 className="text-xl font-bold text-white mb-5">
              Technical Skills
            </h3>

            <div>
              {skills.map((skill, index) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  percentage={skill.percentage}
                  delay={0.4 + index * 0.1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

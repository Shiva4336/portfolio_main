import React, { useRef } from 'react';
import { useScrollEntrance } from '@/hooks/useScrollEntrance';
import GlassCard from '@/components/GlassCard';
import SectionTitle from '@/components/SectionTitle';
import { Github, ExternalLink } from 'lucide-react';

const projects = [
  {
    title: 'E-Commerce Dashboard',
    description:
      'A responsive admin dashboard for managing products, orders, and analytics with real-time data visualization and dark mode support.',
    image: '/images/project-ecommerce.jpg',
    tags: ['Java', 'Spring Boot', 'SQL'],
  },
  {
    title: 'AI Study Assistant',
    description:
      'An intelligent study companion powered by machine learning that creates personalized quizzes and tracks learning progress.',
    image: '/images/project-ai-study.jpg',
    tags: ['Python', 'AI/ML', 'HTML/CSS'],
  },
  {
    title: 'Cloud Data Pipeline',
    description:
      'A scalable data processing pipeline built on Oracle Cloud Infrastructure for handling and analyzing large datasets efficiently.',
    image: '/images/project-cloud.jpg',
    tags: ['Python', 'OCI', 'SQL'],
  },
];

const ProjectsSection: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  useScrollEntrance(gridRef, {
    direction: 'up',
    distance: 40,
    duration: 0.8,
    stagger: 0.15,
    childSelector: '.project-card-wrapper',
  });

  return (
    <section
      id="projects"
      className="relative py-20 md:py-[120px] overflow-hidden"
      style={{ backgroundColor: '#1a0010' }}
    >
      {/* Background glow blobs */}
      <div
        className="glow-blob"
        style={{
          width: 400,
          height: 400,
          background: 'rgba(255, 45, 117, 0.04)',
          filter: 'blur(120px)',
          top: '5%',
          right: '5%',
        }}
      />
      <div
        className="glow-blob"
        style={{
          width: 300,
          height: 300,
          background: 'rgba(184, 0, 217, 0.03)',
          filter: 'blur(100px)',
          bottom: '5%',
          left: '5%',
        }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6">
        <SectionTitle>Projects</SectionTitle>

        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <div key={project.title} className="project-card-wrapper">
              <GlassCard className="h-full" padding="0">
                <div className="h-full flex flex-col">
                  {/* Project image - unchanged project content with coming soon overlay */}
                  <div className="relative h-[200px] overflow-hidden rounded-tl-[20px] rounded-tr-[20px]">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover blur-[5px] scale-105"
                    />

                    <div className="absolute inset-0 bg-black/45 flex items-center justify-center">
                      <div className="px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_0_25px_rgba(255,45,117,0.35)]">
                        <span className="text-white text-lg font-bold tracking-wide">
                          🚧 Coming Soon
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-white">
                      {project.title}
                    </h3>
                    <p className="text-[0.9375rem] text-white/70 mt-2 leading-relaxed flex-1">
                      {project.description}
                    </p>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-2 mt-3">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-semibold text-neon-pink px-3 py-1 rounded-badge"
                          style={{
                            background: 'rgba(255, 45, 117, 0.1)',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action buttons disabled until projects are ready */}
                    <div className="flex items-center gap-3 mt-4 opacity-50 pointer-events-none">
                      <button
                        className="flex items-center gap-2 text-sm font-medium text-white px-4 py-2 rounded-lg"
                        style={{
                          border: '1px solid rgba(255, 255, 255, 0.25)',
                        }}
                      >
                        <Github size={16} />
                        View Code
                      </button>
                      <button className="flex items-center gap-2 text-sm font-semibold text-white">
                        Live Demo
                        <ExternalLink size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;

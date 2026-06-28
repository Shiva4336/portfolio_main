import React, { useRef } from 'react';
import { useScrollEntrance } from '@/hooks/useScrollEntrance';
import GlassCard from '@/components/GlassCard';
import SectionTitle from '@/components/SectionTitle';
import {
  Code,
  Smartphone,
  Zap,
  ShoppingCart,
  Server,
} from 'lucide-react';

const services = [
  {
    icon: Code,
    title: 'Web Development',
    description:
      'Building responsive, modern websites and web applications using HTML, CSS, and JavaScript with clean and maintainable code.',
  },
  {
    icon: Smartphone,
    title: 'Mobile Development',
    description:
      'Creating cross-platform mobile applications with intuitive user interfaces and seamless performance across devices.',
  },
  {
    icon: Zap,
    title: 'Performance Optimization',
    description:
      'Analyzing and improving application performance for faster load times, better efficiency, and enhanced user experience.',
  },
  {
    icon: ShoppingCart,
    title: 'E-commerce Solutions',
    description:
      'Developing end-to-end e-commerce platforms with secure payment integration, inventory management, and analytics.',
  },
  {
    icon: Server,
    title: 'API Development',
    description:
      'Building robust RESTful APIs and backend services with proper documentation, authentication, and scalable architecture.',
  },
];

const ServicesSection: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  useScrollEntrance(gridRef, {
    direction: 'up',
    distance: 40,
    duration: 0.8,
    stagger: 0.12,
    childSelector: '.service-card-wrapper',
  });

  return (
    <section
      id="services"
      className="relative py-20 md:py-[120px] overflow-hidden"
      style={{ backgroundColor: '#0d0008' }}
    >
      {/* Background glow blob */}
      <div
        className="glow-blob left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 600,
          height: 600,
          background: 'rgba(255, 0, 76, 0.04)',
          filter: 'blur(150px)',
        }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6">
        <SectionTitle>Services</SectionTitle>
        <p className="text-lg text-white/50 text-center -mt-8 mb-12">
          What I can help you with
        </p>

        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service) => (
            <div key={service.title} className="service-card-wrapper">
              <GlassCard className="h-full" padding="32px">
                <div className="flex flex-col items-center text-center h-full">
                  {/* Icon badge */}
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mb-5"
                    style={{
                      background: 'rgba(255, 45, 117, 0.1)',
                      border: '1px solid rgba(255, 45, 117, 0.2)',
                    }}
                  >
                    <service.icon size={24} className="text-neon-pink" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-base text-white/70 mt-2 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

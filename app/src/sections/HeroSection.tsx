import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Globe } from 'lucide-react';
import GlassCard from '@/components/GlassCard';
import SocialLinks from '@/components/SocialLinks';

const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(
      locationRef.current,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.8 },
      0.5
    )
      .fromTo(
        titleRef.current,
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 1 },
        0.7
      )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.8 },
        0.9
      )
      .fromTo(
        descRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.8 },
        1.1
      )
      .fromTo(
        statusRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        1.3
      )
      .fromTo(
        buttonsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        1.4
      )
      .fromTo(
        socialsRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6 },
        1.5
      );

    // Profile card entrance
    gsap.fromTo(
      profileRef.current,
      { opacity: 0, scale: 0.85 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        delay: 0.6,
        ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse at center top, #2a0020 0%, #1a0010 40%, #0d0008 100%)',
      }}
    >
      {/* Background glow blobs */}
      <div
        className="glow-blob"
        style={{
          width: 400,
          height: 400,
          background: 'rgba(255, 45, 117, 0.08)',
          filter: 'blur(120px)',
          top: '20%',
          right: '10%',
        }}
      />
      <div
        className="glow-blob"
        style={{
          width: 250,
          height: 250,
          background: 'rgba(184, 0, 217, 0.06)',
          filter: 'blur(100px)',
          top: '40%',
          left: '5%',
        }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-32 w-full">
        <div className="grid grid-cols-1 md:grid-cols-[55%_45%] gap-10 md:gap-16 items-center">
          {/* Left column - Text content */}
          <div className="order-1">
            {/* Location badge */}
            <div
              ref={locationRef}
              className="flex items-center gap-2 mb-6 opacity-0"
            >
              <Globe size={16} className="text-neon-pink" />
              <span className="text-sm font-medium text-white/50">
               india
              </span>
            </div>

            {/* Hero title */}
            <h1
              ref={titleRef}
              className="text-4xl sm:text-5xl md:text-[4.5rem] font-black leading-[1.1] mb-4 opacity-0"
            >
              <span className="block text-white">Hi, I'm Shiva</span>
              <span className="block gradient-text mt-1">
                Manikanta Kaligina
              </span>
            </h1>

            {/* Subtitle */}
            <h2
              ref={subtitleRef}
              className="text-lg sm:text-xl md:text-2xl lg:text-[1.75rem] xl:text-[2rem] font-bold text-neon-pink tracking-wide mb-6 opacity-0"
            >
              Java Developer | Python 
            </h2>

            {/* Description */}
            <p
              ref={descRef}
              className="text-base md:text-lg text-white/70 leading-relaxed max-w-[540px] mb-6 opacity-0"
            >
              A passionate Computer Science & AI undergraduate, crafting elegant
              solutions through code. Seeking entry-level software development
              opportunities to grow as a software professional.
            </p>

            {/* Availability status */}
            <div
              ref={statusRef}
              className="flex items-center gap-2 mb-8 opacity-0"
            >
              <span className="relative flex h-2 w-2">
                <span
                  className="animate-pulse-dot absolute inline-flex h-full w-full rounded-full bg-neon-pink"
                />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-pink" />
              </span>
              <span className="text-sm text-white/50">
                Open to Opportunities
              </span>
            </div>

            {/* CTA Buttons */}
            <div
              ref={buttonsRef}
              className="flex flex-wrap items-center gap-4 mb-7 opacity-0"
            >
              <a href="#contact" className="btn-primary">
                Hire Me
              </a>
              <button className="btn-secondary">Download CV</button>
            </div>

            {/* Social links */}
            <div ref={socialsRef} className="opacity-0">
              <SocialLinks />
            </div>
          </div>

          {/* Right column - Profile image */}
          <div ref={profileRef} className="order-2 flex justify-center opacity-0">
            <div className="animate-float">
              <GlassCard
                className="w-[260px] h-[320px] sm:w-[280px] sm:h-[340px] md:w-[340px] md:h-[400px]"
                padding="12px"
              >
                <div className="w-full h-full rounded-image overflow-hidden">
                  <img
                    src="/images/profile-photo.jpg"
                    alt="Shiva Manikanta Kaligina"
                    className="w-full h-full object-cover"
                  />
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

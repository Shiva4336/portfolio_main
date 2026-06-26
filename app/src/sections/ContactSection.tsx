import React, { useRef } from 'react';
import { useScrollEntrance } from '@/hooks/useScrollEntrance';
import SocialLinks from '@/components/SocialLinks';
import { Mail, MapPin, Linkedin } from 'lucide-react';

const contactItems = [
  {
    icon: Mail,
    text: 'kaliginashiva@gmail.com',
    href: 'mailto:kaliginashiva@gmail.com',
  },
  {
    icon: MapPin,
    text: 'india',
    href: null,
  },
  {
    icon: Linkedin,
    text: 'LinkedIn Profile',
    href: 'https://www.linkedin.com/in/shiva-manikanta-kaligina-0652a1293/',
  },
];

const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);

  useScrollEntrance(titleRef, {
    direction: 'up',
    distance: 30,
    duration: 0.8,
  });

  useScrollEntrance(descRef, {
    direction: 'up',
    distance: 20,
    duration: 0.6,
    delay: 0.2,
  });

  useScrollEntrance(infoRef, {
    direction: 'up',
    distance: 15,
    duration: 0.6,
    stagger: 0.1,
    delay: 0.3,
    childSelector: '.contact-item',
  });

  useScrollEntrance(btnRef, {
    direction: 'up',
    distance: 20,
    duration: 0.8,
    delay: 0.5,
  });

  useScrollEntrance(socialsRef, {
    direction: 'up',
    distance: 15,
    duration: 0.6,
    delay: 0.6,
  });

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-20 md:py-[120px] overflow-hidden"
      style={{ backgroundColor: '#0d0008' }}
    >
      {/* Background glow blobs */}
      <div
        className="glow-blob left-1/2 top-1/3 -translate-x-1/2"
        style={{
          width: 500,
          height: 500,
          background: 'rgba(255, 45, 117, 0.06)',
          filter: 'blur(120px)',
        }}
      />
      <div
        className="glow-blob"
        style={{
          width: 300,
          height: 300,
          background: 'rgba(255, 0, 76, 0.04)',
          filter: 'blur(100px)',
          top: '40%',
          right: '15%',
        }}
      />

      <div className="relative z-10 max-w-[600px] mx-auto px-6 text-center">
        <h2
          ref={titleRef}
          className="text-2xl sm:text-3xl md:text-[2.5rem] font-extrabold gradient-text mb-4"
        >
          Let's Connect
        </h2>

        <p
          ref={descRef}
          className="text-base md:text-lg text-white/70 leading-relaxed max-w-[500px] mx-auto mb-8"
        >
          I'm always excited to discuss new opportunities, collaborate on
          interesting projects, or simply connect with fellow developers. Reach
          out and let's create something amazing together!
        </p>

        {/* Contact info row */}
        <div
          ref={infoRef}
          className="flex flex-wrap justify-center gap-6 md:gap-8 mb-8"
        >
          {contactItems.map((item) => (
            <div key={item.text} className="contact-item">
              {item.href ? (
                <a
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={
                    item.href.startsWith('http')
                      ? 'noopener noreferrer'
                      : undefined
                  }
                  className="flex flex-col items-center gap-2 text-white hover:text-neon-pink transition-all duration-300 hover:-translate-y-0.5"
                >
                  <item.icon size={24} className="text-neon-pink" />
                  <span className="text-[0.9375rem] font-medium">
                    {item.text}
                  </span>
                </a>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <item.icon size={24} className="text-neon-pink" />
                  <span className="text-[0.9375rem] font-medium text-white">
                    {item.text}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div ref={btnRef} className="mb-6">
          <a
            href="mailto:kaliginashiva@gmail.com"
            className="btn-primary inline-flex"
          >
            <Mail size={18} />
            Send Email
          </a>
        </div>

        {/* Social icons */}
        <div ref={socialsRef} className="flex justify-center">
          <SocialLinks />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

import React, { useRef } from 'react';
import { useScrollEntrance } from '@/hooks/useScrollEntrance';

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
  align?: 'left' | 'center';
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  children,
  className = '',
  align = 'center',
}) => {
  const ref = useRef<HTMLHeadingElement>(null);
  useScrollEntrance(ref, { direction: 'up', distance: 30, duration: 0.8 });

  return (
    <h2
      ref={ref}
      className={`text-4xl md:text-[2.5rem] font-extrabold leading-tight gradient-text mb-12 ${align === 'center' ? 'text-center' : 'text-left'} ${className}`}
    >
      {children}
    </h2>
  );
};

export default SectionTitle;

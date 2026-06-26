import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SkillBarProps {
  name: string;
  percentage: number;
  delay?: number;
}

const SkillBar: React.FC<SkillBarProps> = ({ name, percentage, delay = 0 }) => {
  const barRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fill = fillRef.current;
    if (!fill) return;

    gsap.set(fill, { width: '0%' });

    const tween = gsap.to(fill, {
      width: `${percentage}%`,
      duration: 1.2,
      delay,
      ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
      scrollTrigger: {
        trigger: barRef.current,
        start: 'top 85%',
        once: true,
      },
    });

    return () => {
      tween.kill();
    };
  }, [percentage, delay]);

  return (
    <div ref={barRef} className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-[0.9375rem] font-semibold text-white">{name}</span>
        <span className="text-[0.8125rem] font-medium text-white/50">{percentage}%</span>
      </div>
      <div className="h-2 rounded-lg bg-[rgba(255,45,117,0.1)] overflow-hidden">
        <div
          ref={fillRef}
          className="h-full rounded-lg"
          style={{
            background: 'linear-gradient(90deg, #ff2d75, #b800d9)',
            width: '0%',
          }}
        />
      </div>
    </div>
  );
};

export default SkillBar;

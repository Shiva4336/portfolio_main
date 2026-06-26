import React, { useRef } from 'react';
import { useScrollEntrance } from '@/hooks/useScrollEntrance';

const Footer: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  useScrollEntrance(ref, { direction: 'up', distance: 20, duration: 0.6 });

  return (
    <footer
      ref={ref}
      className="py-10 px-6"
      style={{
        backgroundColor: '#0d0008',
        borderTop: '1px solid rgba(255, 45, 117, 0.1)',
      }}
    >
      <div className="max-w-[1200px] mx-auto">
        <p className="text-sm text-white/50 text-center">
          &copy; {new Date().getFullYear()} Shiva Manikanta Kaligina. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

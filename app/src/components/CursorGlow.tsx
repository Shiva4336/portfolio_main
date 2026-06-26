import React, { useEffect, useRef } from 'react';

const CursorGlow: React.FC = () => {
  const glowRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const rafRef = useRef<number>(0);
  const isTouch = useRef(false);

  useEffect(() => {
    // Detect touch device
    const detectTouch = () => {
      isTouch.current = true;
    };
    window.addEventListener('touchstart', detectTouch, { once: true });

    const glow = glowRef.current;
    if (!glow) return;

    // Don't show on touch devices
    if ('ontouchstart' in window) {
      glow.style.display = 'none';
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      posRef.current.targetX = e.clientX;
      posRef.current.targetY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      const pos = posRef.current;
      pos.x += (pos.targetX - pos.x) * 0.15;
      pos.y += (pos.targetY - pos.y) * 0.15;

      if (glow) {
        glow.style.transform = `translate(${pos.x - 6}px, ${pos.y - 6}px)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    // Fade in
    setTimeout(() => {
      if (glow) glow.style.opacity = '1';
    }, 100);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', detectTouch);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="fixed z-[9999] pointer-events-none opacity-0 transition-opacity duration-500"
      style={{
        width: 12,
        height: 12,
        borderRadius: '50%',
        backgroundColor: 'rgba(255, 45, 117, 0.6)',
        boxShadow: '0 0 20px rgba(255, 45, 117, 0.6), 0 0 40px rgba(255, 0, 76, 0.3)',
        filter: 'blur(4px)',
        top: 0,
        left: 0,
      }}
    />
  );
};

export default CursorGlow;

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  speedY: number;
  amplitude: number;
  frequency: number;
  phase: number;
  targetOpacity: number;
  currentOpacity: number;
}

const ParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const fadeInRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 30 : 60;
    const connectionDistance = 120;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();

    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resize, 200);
    };

    window.addEventListener('resize', handleResize);

    // Initialize particles
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 1 + Math.random() * 2,
        opacity: 0.15 + Math.random() * 0.35,
        speedY: 0.1 + Math.random() * 0.3,
        amplitude: 0.3 + Math.random() * 0.5,
        frequency: 0.005 + Math.random() * 0.015,
        phase: Math.random() * Math.PI * 2,
        targetOpacity: 0.15 + Math.random() * 0.35,
        currentOpacity: 0,
      });
    }
    particlesRef.current = particles;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Fade in over 2s (at 60fps, 120 frames)
      if (fadeInRef.current < 1) {
        fadeInRef.current = Math.min(1, fadeInRef.current + 1 / 120);
      }

      const time = Date.now() * 0.001;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Update position
        p.y -= p.speedY;
        p.x += Math.sin(time * p.frequency + p.phase) * p.amplitude;

        // Fade in
        p.currentOpacity = p.targetOpacity * fadeInRef.current;

        // Reset if off top
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
          p.speedY = 0.1 + Math.random() * 0.3;
          p.amplitude = 0.3 + Math.random() * 0.5;
          p.frequency = 0.005 + Math.random() * 0.015;
        }

        // Draw glow
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 4);
        gradient.addColorStop(0, `rgba(255, 45, 117, ${p.currentOpacity * 0.4})`);
        gradient.addColorStop(1, `rgba(255, 45, 117, 0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 4, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw particle core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 45, 117, ${p.currentOpacity})`;
        ctx.fill();
      }

      // Connection lines (desktop only)
      if (!isMobile) {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < connectionDistance) {
              const opacity = 0.08 * (1 - dist / connectionDistance) * fadeInRef.current;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.strokeStyle = `rgba(255, 45, 117, ${opacity})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    // Delay initialization by 0.5s
    const initTimeout = setTimeout(() => {
      rafRef.current = requestAnimationFrame(animate);
    }, 500);

    return () => {
      clearTimeout(initTimeout);
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 1 }}
    />
  );
};

export default ParticleCanvas;

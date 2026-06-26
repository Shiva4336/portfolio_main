import { useEffect } from 'react';
import type { RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollEntranceOptions {
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  ease?: string;
  threshold?: number;
  childSelector?: string;
}

export function useScrollEntrance(
  ref: RefObject<HTMLElement | null>,
  options: ScrollEntranceOptions = {}
) {
  const {
    direction = 'up',
    distance = 40,
    duration = 0.8,
    delay = 0,
    stagger = 0,
    ease = 'cubic-bezier(0.16, 1, 0.3, 1)',
    childSelector,
  } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const targets = childSelector
      ? element.querySelectorAll(childSelector)
      : [element];

    if (!targets.length) return;

    const fromVars: gsap.TweenVars = {
      opacity: 0,
      duration,
      delay,
      stagger: stagger || undefined,
      ease,
    };

    switch (direction) {
      case 'up':
        fromVars.y = distance;
        break;
      case 'down':
        fromVars.y = -distance;
        break;
      case 'left':
        fromVars.x = distance;
        break;
      case 'right':
        fromVars.x = -distance;
        break;
    }

    gsap.set(targets, { opacity: 0, ...fromVars });

    const tween = gsap.to(targets, {
      opacity: 1,
      x: 0,
      y: 0,
      duration,
      delay,
      stagger: stagger || undefined,
      ease,
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        once: true,
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === element) st.kill();
      });
    };
  }, [ref, direction, distance, duration, delay, stagger, ease, childSelector]);
}

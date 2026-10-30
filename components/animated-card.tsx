"use client";
import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";

export default function AnimatedCard({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element || !('IntersectionObserver' in window)) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let animation: Animation | undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      if (!preference.matches) animation = element.animate([
        { opacity: 0, transform: 'translateY(24px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ], { duration: 550, delay, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'backwards' });
      observer.unobserve(element);
    }, { threshold: 0.12 });
    const update = () => { if (preference.matches) animation?.cancel(); };
    preference.addEventListener('change', update);
    observer.observe(element);
    return () => { observer.disconnect(); animation?.cancel(); preference.removeEventListener('change', update); };
  }, [delay]);
  return <div ref={ref} className={`animated-card ${className}`} style={{ '--card-delay': `${delay}ms` } as CSSProperties}>{children}</div>;
}

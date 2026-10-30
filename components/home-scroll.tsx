"use client";
import { useEffect, useState } from "react";

const sections = [
  { id: "intro", label: "Introduction" },
  { id: "preview-web-container", label: "Web Container" },
  { id: "preview-booml", label: "Booml" },
  { id: "preview-bookti", label: "Bookti" },
  { id: "experience-preview", label: "Experience" },
  { id: "kontak", label: "Contact" },
];
export default function HomeScroll() {
  const [active,setActive] = useState("intro");
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const desktop = window.matchMedia('(min-width: 901px)');
    const targets = sections.map(section => document.getElementById(section.id)).filter((node): node is HTMLElement => Boolean(node));
    const root = document.documentElement;
    let frame = 0;
    let enabled = true;
    const visible = new Set<HTMLElement>();
    const animate = () => {
      frame = 0;
      if (!enabled) return;
      const height = window.innerHeight;
      for (const section of visible) {
        const bounds = section.getBoundingClientRect();
        const distance = Math.max(-1,Math.min(1,(bounds.top + bounds.height / 2 - height / 2) / height));
        section.style.setProperty('--scroll-shift', `${distance * (desktop.matches ? 34 : 10)}px`);
      }
      const max = root.scrollHeight - height;
      root.style.setProperty('--page-progress', String(max > 0 ? window.scrollY / max : 0));
    };
    const onScroll = () => { if (!frame && enabled) frame = requestAnimationFrame(animate); };
    const configure = () => {
      enabled = !reduced.matches;
      root.classList.toggle('cinematic-scroll', enabled && desktop.matches);
      if (!enabled) {
        targets.forEach(section => section.style.removeProperty('--scroll-shift'));
        root.style.removeProperty('--page-progress');
        cancelAnimationFrame(frame);frame=0;
      } else onScroll();
    };
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        const section = entry.target as HTMLElement;
        if (entry.isIntersecting) { visible.add(section); section.classList.add('section-arrived'); }
        else visible.delete(section);
      }
      const closest = [...visible].map(section => ({ id: section.id, distance: Math.abs(section.getBoundingClientRect().top + section.getBoundingClientRect().height / 2 - window.innerHeight / 2) })).sort((a,b) => a.distance-b.distance)[0];
      if (closest) setActive(closest.id);
      onScroll();
    }, { threshold: [0,.15,.35,.55,.75] });
    targets.forEach(section => observer.observe(section));
    configure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    reduced.addEventListener('change',configure);desktop.addEventListener('change',configure);
    return () => {
      observer.disconnect();cancelAnimationFrame(frame);
      window.removeEventListener('scroll',onScroll);window.removeEventListener('resize',onScroll);
      reduced.removeEventListener('change',configure);desktop.removeEventListener('change',configure);
      targets.forEach(section => {section.style.removeProperty('--scroll-shift');section.classList.remove('section-arrived');});
      root.classList.remove('cinematic-scroll');root.style.removeProperty('--page-progress');
    };
  }, []);
  return <><div className="scroll-progress" aria-hidden="true" /><nav className="section-navigation" aria-label="Home sections">{sections.map((section,index) => <a key={section.id} href={`#${section.id}`} aria-label={section.label} aria-current={active === section.id ? "location" : undefined}><span className="section-nav-label">{section.label}</span><span className="section-nav-index">{String(index+1).padStart(2,"0")}</span></a>)}</nav></>;
}

"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CareerTimeline from "@/components/career-timeline";
import { skills } from "@/lib/profile";

const projects = [
 {slug:"web-container",title:"Embedded Bond Platform",category:"TRIMEGAH / WEB CONTAINER",description:"A faster investment experience inside partner banking apps. Built the Nuxt frontend foundation and most user-facing features, with selected backend contributions.",stack:"Nuxt · NestJS · Redis · Java Quarkus",status:"Staging / release preparation",images:["/images/web-container/overview.png","/images/web-container/discovery.png"],tone:"bonds"},
 {slug:"booml",title:"Booml",category:"BUS TICKETING / WEB & MOBILE",description:"From user requirements and UI/UX to the dashboard, mobile apps, backend, and database. Digital bus ticketing designed to keep up with paper ticket sales.",stack:"Nuxt · Expo · Deno / GraphQL · MongoDB",status:"In testing",images:[],tone:"bus"},
 {slug:"bookti",title:"Bookti DTI",category:"ACADEMIC GUIDANCE / MOBILE FRONTEND",description:"Independently developed the Expo and React Native frontend for an academic guidance app used by students and lecturers at Universitas Indonesia.",stack:"Expo · React Native · Android & iOS",status:"Available on Android & iOS",images:["/images/bookti/ios-01.jpg","/images/bookti/android-02.png"],tone:"bookti"},
];
export default function CinematicHome() {
 const root=useRef<HTMLDivElement>(null);
 const section=useRef<HTMLElement>(null);
 const viewport=useRef<HTMLDivElement>(null);
 const track=useRef<HTMLDivElement>(null);
 const range=useRef<{start:number;end:number}|null>(null);
 const [active,setActive]=useState(0);
 useEffect(()=>{
  gsap.registerPlugin(ScrollTrigger);
  const wrapper=section.current, rail=track.current, view=viewport.current;
  if(!wrapper||!rail||!view)return;
  const media=gsap.matchMedia();
  media.add('(prefers-reduced-motion: no-preference) and (min-height: 650px)',()=>{
   wrapper.dataset.scrollDriven='true';
   let last=-1;
   const animation=gsap.to(rail,{x:()=>-(rail.scrollWidth-view.clientWidth),ease:'none',scrollTrigger:{trigger:wrapper,start:'top top',end:'bottom bottom',scrub:.65,invalidateOnRefresh:true,onRefresh:self=>{range.current={start:self.start,end:self.end};}},onUpdate:function(this: gsap.core.Tween){const next=Math.round(this.progress()*(projects.length-1));if(next!==last){last=next;setActive(next);}}});
   const refresh=()=>ScrollTrigger.refresh();
   const frames=requestAnimationFrame(refresh);
   return()=>{cancelAnimationFrame(frames);animation.scrollTrigger?.kill();animation.kill();gsap.set(rail,{clearProps:'transform'});delete wrapper.dataset.scrollDriven;range.current=null;};
  });
  return()=>media.revert();
 },[]);
 function go(index:number){
  const next=Math.max(0,Math.min(projects.length-1,index));
  const bounds=range.current;
  if(bounds){window.scrollTo({top:bounds.start+(bounds.end-bounds.start)*next/(projects.length-1),behavior:'smooth'});}
  else {const view=viewport.current;if(view)view.scrollTo({left:next*view.clientWidth,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}
 }
 return <div ref={root} className="motion-home">
  <section id="top" className="personal-intro wrap"><div className="personal-copy"><p className="motion-eyebrow">FULLSTACK ENGINEER · JAKARTA, INDONESIA</p><h1>Hi, I’m<br /><span>Sidratul.</span></h1><p className="personal-fullname">Muhammad Sidratul Muntaha</p><p className="personal-description">I turn real-world problems into web and mobile applications. With 10+ years across product development and engineering leadership, I work from understanding requirements to building the solution.</p><p className="personal-note">JavaScript is my everyday foundation, with Expo and React Native for mobile. I’ve worked alongside CTOs, led engineering teams, and built products across finance, transportation, and education.</p><div className="personal-actions"><a className="motion-cta" href="#portfolio">Explore my work <span aria-hidden="true">↓</span></a><a className="motion-link" href="/documents/cv.pdf" download>Download CV </a></div></div><div className="personal-portrait"><img src="/images/profile/sidratul.jpeg" alt="Muhammad Sidratul Muntaha" width={1400} height={1600} fetchPriority="high"/><span className="portrait-experience">10+<small>YEARS BUILDING PRODUCTS</small></span></div><a href="#portfolio" className="intro-next">NEXT / SELECTED WORK <span aria-hidden="true">↓</span></a></section>
  <section id="portfolio" ref={section} className="horizontal-work" aria-label="Selected portfolio projects"><div className="work-sticky"><div className="work-toolbar"><div><p className="motion-eyebrow">SELECTED WORK</p><p className="horizontal-hint">Scroll down to explore sideways <span aria-hidden="true">↓ →</span></p></div><div className="work-arrows"><button type="button" onClick={()=>go(active-1)} disabled={active===0} aria-label="Previous project">←</button><span aria-live="polite">0{active+1} / 0{projects.length}</span><button type="button" onClick={()=>go(active+1)} disabled={active===projects.length-1} aria-label="Next project">→</button></div></div>
   <div className="horizontal-viewport" ref={viewport} onScroll={event=>{if(!range.current){setActive(Math.round(event.currentTarget.scrollLeft/event.currentTarget.clientWidth));}}} tabIndex={0} aria-label="Project gallery. Use previous and next buttons, or scroll down." onKeyDown={event=>{if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();go(active+(event.key==='ArrowRight'?1:-1));}}}>
    <div className="horizontal-track" ref={track}>{projects.map((project,index)=><article className={`horizontal-panel panel-${project.tone}`} key={project.slug} aria-label={`${index+1} of ${projects.length}: ${project.title}`}><div className="horizontal-copy"><p className="motion-eyebrow">{project.category}</p><h2>{project.title}</h2><p className="panel-description">{project.description}</p><p className="panel-stack">{project.stack}</p><p className="panel-status">{project.status}</p><Link className="motion-cta" href={`/projects/${project.slug}`}>View case study </Link></div><div className="horizontal-art">{project.images.length ? <div className="horizontal-phones">{project.images.map((image,i)=><img key={image} src={image} alt={`${project.title} — app screen ${i+1}`} width={638} height={1380} loading="lazy"/>)}</div> : <div className="booml-system"><span>BOOML</span><h3>One journey.<br />Connected operations.</h3><div><span>Dashboard</span><b aria-hidden="true">↓</b><span>Operator app</span><b aria-hidden="true">↓</b><span>Crew & ticket sales</span></div></div>}<span className="horizontal-number" aria-hidden="true">0{index+1}</span></div></article>)}</div>
   </div><div className="work-bottom"><Link className="motion-link" href="/projects">View all projects </Link><a className="motion-link" href="#career">Career timeline <span aria-hidden="true">↓</span></a></div>
  </div></section>
  <section id="career" className="home-career wrap"><div className="career-heading"><p className="motion-eyebrow">THE JOURNEY</p><h2>Built over time.<br /><span>Still moving forward.</span></h2><p>Engineering, product development, and leadership across teams and industries.</p><a className="motion-link" href="/documents/cv.pdf" download>Download my resume</a></div><div className="career-history"><CareerTimeline limit={5}/><details className="earlier-career"><summary>Earlier experience <span className="expand-symbol" aria-hidden="true"/></summary><CareerTimeline from={5}/></details></div></section>
  <section id="skills" className="home-skills wrap"><div className="section-heading"><div><p className="motion-eyebrow">TOOLS & CAPABILITIES</p><h2>From interface<br />to infrastructure.</h2></div><p className="muted">The tools I work with,<br />chosen to fit the problem.</p></div><div className="skill-grid">{skills.map(skill=><article className="skill-card" key={skill.title}><h3>{skill.title}</h3><p>{skill.items}</p></article>)}</div><div className="home-education"><div><p className="motion-eyebrow">EDUCATION</p><h3>Bachelor of Information Technology</h3><p>Pancasila University · Sep 2010 – Feb 2014</p><p>GPA 3.78 · Cum Laude</p></div><div><p className="motion-eyebrow">BEYOND WORK</p><p>Table tennis, cycling, gaming, reading, walking, and spending time with my cat.</p></div></div></section>
 </div>;
}

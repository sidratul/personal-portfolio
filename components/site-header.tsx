"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
const sections = [{id:"top",label:"About"},{id:"portfolio",label:"Work"},{id:"career",label:"Experience"},{id:"kontak",label:"Contact"}];
export default function SiteHeader() {
 const pathname=usePathname();
 const [active,setActive]=useState("top");
 useEffect(()=>{
  if(pathname!=="/")return;
  let frame=0;
  const update=()=>{frame=0;let next="top";for(const section of sections){const element=document.getElementById(section.id);if(element && element.getBoundingClientRect().top<=window.innerHeight*.4)next=section.id;}setActive(next);};
  const onScroll=()=>{if(!frame)frame=requestAnimationFrame(update);};
  update();window.addEventListener('scroll',onScroll,{passive:true});
  return()=>{window.removeEventListener('scroll',onScroll);cancelAnimationFrame(frame);};
 },[pathname]);
 return <><a className="skip-link" href="#main">Skip to content</a><header className="header wrap"><Link className="wordmark" href="/" aria-label="Sidratul — Home"><span className="brand-symbol" aria-hidden="true">s.</span><span className="brand-name">SIDRATUL<br/><small>ENGINEER / BUILDER</small></span></Link><nav aria-label="Main navigation">{sections.map(section=><Link key={section.id} href={pathname==="/"?`#${section.id}`:`/#${section.id}`} aria-current={pathname==="/"&&active===section.id?"location":pathname.startsWith('/projects')&&section.id==='portfolio'?"page":undefined}>{section.label}</Link>)}</nav></header></>;
}

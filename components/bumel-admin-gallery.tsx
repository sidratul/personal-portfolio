"use client";
import { useId, useState } from "react";
import sizes from "@/lib/bumel-image-sizes.json";
const screens = [
 {file:"admin-login",label:"Login",title:"Workspace login",description:"Entry point for the integrated bus operations workspace."},
 {file:"system-admin",label:"System Admin",title:"System Admin — thermal ticket templates",description:"Manage bus companies, users, master data, and system settings. The template editor supports UI and JSON editing, variables, and 58 mm / 80 mm ticket previews."},
 {file:"po-admin",label:"Admin PO",title:"Bus Company Admin — daily operations",description:"Manage vehicles, boarding points, trips, daily schedules, route fares, and crew assignments, with access to passenger manifests and sales reporting."},
] as const;
export default function BumelAdminGallery({compact=false}:{compact?:boolean}) {
 const [active,setActive]=useState(0);
 const id=useId();
 const screen=screens[active];
 return <div className={`bumel-admin-gallery${compact?' is-compact':''}`}>
   <div className="bumel-gallery-label">ADMIN WEB APPLICATION <span>Nuxt</span></div>
   <div className="bumel-role-tabs" role="group" aria-label="Bumel admin views">{screens.map((item,index)=><button type="button" key={item.file} aria-pressed={active===index} aria-controls={`${id}-image`} onClick={()=>setActive(index)}>{item.label}</button>)}</div>
   <figure className="bumel-admin-screen" id={`${id}-image`}>
    <a href={`/images/bumel/${screen.file}.png`} target="_blank" rel="noopener noreferrer" aria-label={`View full-size ${screen.title} screenshot`}><img src={`/images/bumel/${screen.file}.png`} alt={screen.title} width={sizes[screen.file].width} height={sizes[screen.file].height} loading="lazy" decoding="async"/></a>
    <figcaption aria-live="polite"><h4>{screen.title}</h4>{!compact&&<p>{screen.description}</p>}</figcaption>
   </figure>
   <div className="bumel-gallery-bottom"><span>{active+1} / {screens.length} · Select image to enlarge</span><div className="gallery-controls"><button type="button" aria-label="Previous admin screenshot" disabled={active===0} onClick={()=>setActive(active-1)}>←</button><button type="button" aria-label="Next admin screenshot" disabled={active===screens.length-1} onClick={()=>setActive(active+1)}>→</button></div></div>
 </div>;
}

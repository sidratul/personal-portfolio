"use client";
import { useState } from "react";
import sizes from "@/lib/bumel-coordinator-image-sizes.json";
const screens=[
 {file:"coordinator-dashboard",title:"Coordinator dashboard",description:"Review daily operational status, including trips in progress, ready departures, completed trips, missing vehicles or crew, and items needing attention."},
 {file:"coordinator-create-trip",title:"Create a daily trip",description:"Add a trip to the daily schedule by selecting the route, departure time, vehicle, and assigned crew."},
 {file:"coordinator-trip-details",title:"Trip details & route fares",description:"Review route segments, fares, stop order, and estimated arrival times for the selected departure."},
 {file:"coordinator-crew-fees",title:"Configure crew fees",description:"Assign a fee recipient and configure per-passenger fees as a fixed amount or percentage for the selected schedule."},
 {file:"coordinator-timesheet",title:"Daily schedule timesheet",description:"A time-based daily schedule showing trips, departure times, assigned vehicles, and operational status."},
] as const;
export default function BumelCoordinatorGallery({compact=false}:{compact?:boolean}){
 const [active,setActive]=useState(0);const screen=screens[active];
 return <div className={`bumel-crew-gallery${compact?' is-compact':''}`}><div className="bumel-gallery-label">COORDINATOR MOBILE APPLICATION <span>Expo / React Native</span></div><div className="crew-gallery-display"><figure className="crew-gallery-image"><a href={`/images/bumel/${screen.file}.png`} target="_blank" rel="noopener noreferrer" aria-label={`View full-size ${screen.title} screenshot`}><img src={`/images/bumel/${screen.file}.png`} alt={`Bumel Coordinator — ${screen.title}`} width={sizes[screen.file].width} height={sizes[screen.file].height} loading="lazy" decoding="async"/></a></figure><div className="crew-gallery-description"><p className="crew-gallery-index">{String(active+1).padStart(2,'0')} / 05</p><h4>{screen.title}</h4>{!compact&&<p>{screen.description}</p>}<div className="gallery-controls"><button type="button" disabled={active===0} onClick={()=>setActive(active-1)} aria-label="Previous coordinator screenshot">←</button><button type="button" disabled={active===screens.length-1} onClick={()=>setActive(active+1)} aria-label="Next coordinator screenshot">→</button></div></div></div><div className="crew-gallery-dots" role="group" aria-label="Choose coordinator app screenshot">{screens.map((item,index)=><button key={item.file} type="button" aria-label={item.title} aria-pressed={active===index} onClick={()=>setActive(index)}><span aria-hidden="true"/></button>)}</div></div>;
}

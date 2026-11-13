"use client";
import { useState } from "react";
import sizes from "@/lib/bumel-crew-image-sizes.json";
const screens=[
 {file:"crew-ticket-sale",title:"Onboard ticket sales",description:"Select boarding and drop-off points, set the passenger count, and review the total fare before selling tickets."},
 {file:"crew-manifest",title:"Passenger manifest",description:"Review sold tickets and revenue, with filters for boarding points, destinations, and control."},
 {file:"crew-trip-details",title:"Trip details & crew",description:"View departure details, vehicle information, assigned driver and conductor, and the action to complete a trip."},
 {file:"crew-trip-report",title:"Trip revenue report",description:"Review ticket counts, revenue, fees, and transactions by origin or destination."},
 {file:"crew-sales-report",title:"Sales reporting",description:"Filter by date range and review sales totals and trip-level reporting."},
 {file:"crew-settings",title:"Settings & thermal printer",description:"Manage the crew profile, connected printer, password, and refreshed bus-company settings."},
] as const;
export default function BumelCrewGallery({compact=false}:{compact?:boolean}){
 const [active,setActive]=useState(0);const screen=screens[active];
 return <div className={`bumel-crew-gallery${compact?' is-compact':''}`}><div className="bumel-gallery-label">CREW MOBILE APPLICATION <span>Expo / React Native</span></div><div className="crew-gallery-display"><figure className="crew-gallery-image"><a href={`/images/bumel/${screen.file}.png`} target="_blank" rel="noopener noreferrer" aria-label={`View full-size ${screen.title} screenshot`}><img src={`/images/bumel/${screen.file}.png`} alt={`Bumel Crew — ${screen.title}`} width={sizes[screen.file].width} height={sizes[screen.file].height} loading="lazy" decoding="async"/></a></figure><div className="crew-gallery-description"><p className="crew-gallery-index">{String(active+1).padStart(2,'0')} / 06</p><h4>{screen.title}</h4>{!compact&&<p>{screen.description}</p>}<div className="gallery-controls"><button type="button" disabled={active===0} onClick={()=>setActive(active-1)} aria-label="Previous crew screenshot">←</button><button type="button" disabled={active===screens.length-1} onClick={()=>setActive(active+1)} aria-label="Next crew screenshot">→</button></div></div></div><div className="crew-gallery-dots" role="group" aria-label="Choose crew app screenshot">{screens.map((item,index)=><button key={item.file} type="button" aria-label={item.title} aria-pressed={active===index} onClick={()=>setActive(index)}><span aria-hidden="true"/></button>)}</div></div>;
}

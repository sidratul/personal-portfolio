"use client";
import { useState } from "react";
import BumelAdminGallery from "@/components/bumel-admin-gallery";
import BumelCrewGallery from "@/components/bumel-crew-gallery";
export default function BumelPreviewGallery(){
 const [app,setApp]=useState<'admin'|'crew'>('admin');
 return <div className="bumel-preview-gallery"><div className="bumel-app-switch" role="group" aria-label="Bumel application"><button type="button" aria-pressed={app==='admin'} onClick={()=>setApp('admin')}>Admin Web</button><button type="button" aria-pressed={app==='crew'} onClick={()=>setApp('crew')}>Crew App</button></div>{app==='admin'?<BumelAdminGallery compact/>:<BumelCrewGallery compact/>}</div>;
}

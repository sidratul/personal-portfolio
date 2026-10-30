"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function LegacyAboutRedirect(){
 const router=useRouter();
 useEffect(()=>{router.replace('/#top');},[router]);
 return <div className="page-intro wrap"><p className="eyebrow">ABOUT & EXPERIENCE</p><h1>Now on the homepage.</h1><Link className="text-link" href="/#top">View my profile and experience</Link></div>;
}

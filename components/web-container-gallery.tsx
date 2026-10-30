"use client";
import { useRef } from "react";
const screens = [
  { file: "overview", title: "Investment overview", detail: "Bond holdings and corporate bond discovery" },
  { file: "discovery", title: "Product discovery", detail: "Government bonds and offering filters" },
  { file: "details", title: "Bond details", detail: "Yield, tenor, limits, and coupon schedule" },
  { file: "purchase", title: "Purchase flow", detail: "Investment amount and terms acceptance" },
  { file: "transactions", title: "Transaction tracking", detail: "Order status, details, and billing" },
  { file: "portfolio", title: "Portfolio management", detail: "Holdings, returns, and buy / sell actions" },
];
export default function WebContainerGallery() {
  const track = useRef<HTMLDivElement>(null);
  function move(direction: number) {
    const element = track.current;
    if (!element) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    element.scrollBy({ left: direction * element.clientWidth * 0.85, behavior: reduced ? 'instant' : 'smooth' });
  }
  return <section className="wc-gallery" aria-label="Web Container screenshots">
    <div className="wc-gallery-heading"><div><p className="eyebrow">APPLICATION WALKTHROUGH</p><p>From product discovery to portfolio management.</p></div><div className="gallery-controls"><button type="button" aria-label="Previous screenshots" onClick={() => move(-1)}>←</button><button type="button" aria-label="Next screenshots" onClick={() => move(1)}>→</button></div></div>
    <div className="wc-gallery-track" ref={track} tabIndex={0} aria-label="Six screenshots: swipe, scroll, or use arrow keys to explore">{screens.map((screen,index) => <figure className="wc-screen" key={screen.file}><a href={`/images/web-container/${screen.file}.png`} target="_blank" rel="noopener noreferrer" aria-label={`Enlarge ${screen.title} screenshot`}><img src={`/images/web-container/${screen.file}.png`} alt={`Web Container — ${screen.title}: ${screen.detail}`} width={638} height={1380} loading="lazy" decoding="async" /></a><figcaption><span>0{index+1} / {screen.title}</span><p>{screen.detail}</p></figcaption></figure>)}</div>
    <p className="wc-gallery-hint">Demo data · Swipe to explore · Select an image to view full size</p>
  </section>;
}

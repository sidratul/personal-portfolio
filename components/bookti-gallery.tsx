"use client";
import { useRef, useState } from "react";
import screenshots from "@/lib/bookti-screenshots.json";

type Platform = keyof typeof screenshots;
export default function BooktiGallery() {
  const [platform, setPlatform] = useState<Platform>("Android");
  const [position, setPosition] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  const images = screenshots[platform];
  function choose(name: Platform) {
    track.current?.scrollTo({ left: 0, behavior: "instant" });
    setPlatform(name);
    setPosition(0);
  }
  function move(direction: number) {
    const element = track.current;
    if (!element) return;
    const image = element.querySelector<HTMLElement>("figure");
    const step = image ? image.getBoundingClientRect().width + 20 : element.clientWidth;
    element.scrollBy({ left: direction * step, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }
  return <div className="bookti-gallery-container">
    <div className="gallery-platforms" role="group" aria-label="Bookti screenshot platform">
      {(Object.keys(screenshots) as Platform[]).map(name => <button key={name} type="button" aria-pressed={platform === name} onClick={() => choose(name)}>{name} <span className="bookti-image-count">{screenshots[name].length}</span></button>)}
    </div>
    <div className="bookti-carousel-toolbar"><span aria-live="polite">{position + 1} / {images.length} screenshots</span><div className="gallery-controls"><button type="button" onClick={() => move(-1)} disabled={position === 0} aria-label="Previous Bookti screenshot">←</button><button type="button" onClick={() => move(1)} disabled={position >= images.length - 1} aria-label="Next Bookti screenshot">→</button></div></div>
    <div className="bookti-gallery bookti-carousel" ref={track} tabIndex={0} aria-label={`${platform} screenshots. Swipe or use arrows to explore.`} onScroll={event => {
      const element = event.currentTarget;
      const image = element.querySelector<HTMLElement>("figure");
      if (!image) return;
      const step = image.getBoundingClientRect().width + 20;
      const atEnd = element.scrollWidth - element.clientWidth - element.scrollLeft < 3;
      setPosition(atEnd ? images.length - 1 : Math.min(images.length - 1, Math.round(element.scrollLeft / step)));
    }}>
      {images.map((image, index) => <figure className="app-screenshot" key={image.url}>
        <a href={image.url} target="_blank" rel="noopener noreferrer" aria-label={`Enlarge Bookti ${platform} screenshot ${index + 1}`}><img src={image.url} alt={`Bookti ${platform} application — screen ${index + 1}`} width={image.width} height={image.height} loading="lazy" decoding="async" /></a>
        <figcaption>BOOKTI / {platform.toUpperCase()} / {String(index + 1).padStart(2, "0")}</figcaption>
      </figure>)}
    </div>
    <p className="bookti-carousel-hint">Swipe to explore · Select a screenshot to view full size</p>
  </div>;
}

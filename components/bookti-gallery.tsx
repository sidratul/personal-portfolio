"use client";
import { useState } from "react";

const screenshots = {
  Android: ["/images/bookti/android-01.png", "/images/bookti/android-02.png"],
  iOS: ["/images/bookti/ios-01.jpg", "/images/bookti/ios-02.jpg"],
};
export default function BooktiGallery() {
  const [platform, setPlatform] = useState<keyof typeof screenshots>("Android");
  return <div className="bookti-gallery-container">
    <div className="gallery-platforms" role="group" aria-label="Bookti screenshot platform">
      {(Object.keys(screenshots) as (keyof typeof screenshots)[]).map(name => <button key={name} type="button" aria-pressed={platform === name} onClick={() => setPlatform(name)}>{name}</button>)}
    </div>
    <div className="bookti-gallery">{screenshots[platform].map((url, index) => <figure className="app-screenshot" key={url}>
      <a href={url} target="_blank" rel="noopener noreferrer" aria-label={`Enlarge screenshot ${platform} ${index + 1} Bookti`}>
        <img src={url} alt={`Bookti app screen ${platform}, screenshot ${index + 1}`} width={platform === "iOS" ? 1240 : 1080} height={platform === "iOS" ? 2688 : 2220} loading="lazy" decoding="async" />
      </a>
      <figcaption>BOOKTI / {platform.toUpperCase()} / {String(index + 1).padStart(2, "0")}</figcaption>
    </figure>)}</div>
  </div>;
}

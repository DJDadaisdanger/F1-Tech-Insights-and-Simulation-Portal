
'use client';

export function SimulationClient() {
  return (
    <iframe 
      title="F1 car" 
      frameBorder="0" 
      allowFullScreen
      //@ts-ignore
      mozallowfullscreen="true" 
      //@ts-ignore
      webkitallowfullscreen="true" 
      allow="autoplay; fullscreen; xr-spatial-tracking" 
      //@ts-ignore
      xr-spatial-tracking="true"
      //@ts-ignore
      execution-while-out-of-viewport="true"
      //@ts-ignore
      execution-while-not-rendered="true"
      //@ts-ignore
      web-share="true"
      src="https://sketchfab.com/models/bb6d1df708d945f6b12e506e0d39de97/embed"
      className="w-full h-full"
    >
    </iframe>
  );
}

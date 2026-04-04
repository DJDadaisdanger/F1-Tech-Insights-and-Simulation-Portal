
'use client';

export function SimulationClient() {
  return (
    <iframe 
      title="F1 car" 
      frameBorder="0" 
      allowFullScreen
      sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
      //@ts-ignore
      mozallowfullscreen="true" 
      webkitallowfullscreen="true" 
      allow="autoplay; fullscreen; xr-spatial-tracking" 
      xr-spatial-tracking="true"
      execution-while-out-of-viewport="true"
      execution-while-not-rendered="true"
      web-share="true"
      src="https://sketchfab.com/models/8b0a2d3da2ed41a2ad56080efa598f2c/embed"
      className="w-full h-full"
    >
    </iframe>
  );
}

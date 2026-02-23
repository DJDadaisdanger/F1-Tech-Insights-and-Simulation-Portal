
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
      src="https://sketchfab.com/3d-models/ansys-multi-gpu-solver-in-fluent-8b0a2d3da2ed41a2ad56080efa598f2c#embed"
      className="w-full h-full"
    >
    </iframe>
  );
}

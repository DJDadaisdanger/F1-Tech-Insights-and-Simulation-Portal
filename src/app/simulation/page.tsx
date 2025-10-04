
import { SimulationClient } from "./simulation-client";

export default function SimulationPage() {
    return (
        <div className="flex flex-col h-[calc(100vh-120px)] w-full">
            <p className="mb-4 text-muted-foreground">
                An interactive 3D model of a Formula 1 car, provided by Sketchfab. Use your mouse to rotate, pan, and zoom.
            </p>
            <div className="flex-1 rounded-lg border bg-card overflow-hidden relative">
                <SimulationClient />
            </div>
        </div>
    );
}

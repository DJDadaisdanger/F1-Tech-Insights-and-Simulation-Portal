import { SimulationClient } from "./simulation-client";

export default function SimulationPage() {
    return (
        <div className="flex flex-col h-[calc(100vh-120px)] w-full">
            <p className="mb-4 text-muted-foreground">
                An interactive 3D visualization of airflow over a simplified F1 car model. Use your mouse to rotate the camera.
            </p>
            <div className="flex-1 rounded-lg border bg-card overflow-hidden relative">
                <SimulationClient />
            </div>
        </div>
    );
}

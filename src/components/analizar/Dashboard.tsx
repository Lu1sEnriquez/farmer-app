"use client";

import { Mapa } from "../Mapa/Mapa";
import GenerarAnalisisDialog from "./GenerarAnalisisDialog";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">
          Genera un Analisis Personalizado con IA
        </h1>

        <div className="grid grid-cols-1 gap-4">
          {/* Mapa interactivo */}

          <Mapa />

          <div className="flex justify-center">
            <GenerarAnalisisDialog />
          </div>
        </div>
      </div>
    </div>
  );
}

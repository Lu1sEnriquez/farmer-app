"use client";

import { Mapa } from "../Mapa/Mapa";
import SeedModal from "./ModalSelectAnalisis";






export default function Dashboard() {


  return (
    <div className="min-h-screen bg-background">
      

      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Genera un Analisis Personalizado con IA</h1>

        <div className="grid grid-cols-1 gap-4">
          {/* Mapa interactivo */}
          
         <Mapa/>
         


         <SeedModal/>
        </div>
      </div>
    </div>
  );
}
function setViewState(arg0: any) {
  throw new Error("Function not implemented.");
}


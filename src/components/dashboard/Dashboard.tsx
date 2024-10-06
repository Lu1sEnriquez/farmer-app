"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mapa } from "../Mapa/Mapa";





export default function Dashboard() {


  return (
    <div className="min-h-screen bg-background">
      

      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Genera un Analisis Personalizado con IA</h1>

        <div className="grid grid-cols-1 gap-4">
          {/* Mapa interactivo */}
          
         <Mapa/>
         

          {/* Recomendaciones de IA */}
          <Card>
            <CardHeader>
              <CardTitle>Recomendaciones de IA</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Tipos de semillas recomendados: Maíz híbrido resistente a la
                  sequía, Soja de ciclo corto
                </li>
                <li>Tiempo óptimo de plantación: Segunda semana de abril</li>
                <li>
                  Recomendaciones de riego: Implementar riego por goteo,
                  programar riegos cortos y frecuentes
                </li>
                <li>
                  Sugerencia de cultivo: Considerar la rotación con leguminosas
                  para mejorar la salud del suelo
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

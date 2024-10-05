"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const rainfallData = [
  { month: "Ene", frecuencia: 5, probabilidad: 30 },
  { month: "Feb", frecuencia: 7, probabilidad: 40 },
  { month: "Mar", frecuencia: 10, probabilidad: 60 },
  { month: "Abr", frecuencia: 12, probabilidad: 70 },
  { month: "May", frecuencia: 8, probabilidad: 50 },
  { month: "Jun", frecuencia: 6, probabilidad: 35 },
];

const weatherData = [
  { name: "Temperatura", value: 25 },
  { name: "Humedad", value: 60 },
  { name: "Viento", value: 15 },
];



function MapComponent() {
  const [viewState, setViewState] = useState({
    longitude: -74.5,
    latitude: 40,
    zoom: 9,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setViewState({
            ...viewState,
            latitude, // Actualiza con la ubicación del usuario
            longitude,
            zoom: 12, // Puedes ajustar el zoom como prefieras
          });
        },
        (error) => {
          console.error("Error obteniendo la ubicación del usuario:", error);
        }
      );
    }
  }, []);

  return (
    <Map
      {...viewState}
      onMove={(evt) => setViewState(evt.viewState)}
      style={{ width: "100%", height: "100%" }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken="pk.eyJ1IjoiZXJpY2phc2llbDE3IiwiYSI6ImNtMXdndmplcDBvNnEya29oZXhkNWphaWgifQ.622bZ8vb1dMS3B57NPw7Gg"
    >
      <Marker
        longitude={viewState.longitude}
        latitude={viewState.latitude}
        color="red"
      />
    </Map>
  );
}

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);
 
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      

      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Dashboard Agrícola</h1>

        <div className="grid grid-cols-1 gap-4">
          {/* Mapa interactivo */}
          
          <Card>
         
            <CardHeader>
              <CardTitle>Ubicación del Agricultor</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <MapComponent />
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Gráfico de lluvia */}
            <Card>
              <CardHeader>
                <CardTitle>Frecuencia y Probabilidad de Lluvia</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    frecuencia: {
                      label: "Frecuencia",
                      color: "hsl(var(--chart-1))",
                    },
                    probabilidad: {
                      label: "Probabilidad",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={rainfallData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis
                        yAxisId="left"
                        orientation="left"
                        stroke="var(--color-frecuencia)"
                      />
                      <YAxis
                        yAxisId="right"
                        orientation="right"
                        stroke="var(--color-probabilidad)"
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar
                        yAxisId="left"
                        dataKey="frecuencia"
                        fill="var(--color-frecuencia)"
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="probabilidad"
                        stroke="var(--color-probabilidad)"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Gráfico de condiciones climáticas */}
            <Card>
              <CardHeader>
                <CardTitle>Condiciones Climáticas Actuales</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    value: {
                      label: "Valor",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weatherData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="value" fill="green" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

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

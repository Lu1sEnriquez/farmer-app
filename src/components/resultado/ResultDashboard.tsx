"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ResultAnalisis } from "@/interface/backend/resultAnalisis"; // Asegúrate de que la ruta sea correcta
import { WiHumidity, WiWindy, WiDaySunny, WiBarometer } from "react-icons/wi";
import { FiSunrise } from "react-icons/fi";
import { SiMoonrepo } from "react-icons/si";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useWeatherStore from "@/store/useWeatherStore";
import Image from "next/image";
import { formattedDate } from "@/utils/formatter-date";
import { RecomendacionesCard } from "./RecomendacionesCard";
import LoadingDashboard from "./LoadingResultDashboard";
import { useEffect, useState } from "react";

function ensureHttpsUrl(url: string): string {
  // Si la URL comienza con '//' la convierte a 'https://'
  return url.startsWith("//") ? `https:${url}` : url;
}

interface ResultDashboardProps {
  futureForecastData: ResultAnalisis | null; // Recibir datos de pronóstico
}

const ResultDashboard: React.FC<ResultDashboardProps> = ({
  futureForecastData,
}) => {
  const { seedType, startDate, location } = useWeatherStore(); // Usar Zustand
  const [loading, setLoading] = useState(true); // Estado de carga
  // Verifica si startDate es una instancia de Date
  const formattedStartDate = startDate
    ? formattedDate(startDate.toISOString())
    : "No especificada";

  // Debugging: Muestra en consola el estado del store
  console.log("Tipo de semilla:", seedType);
  console.log("Fecha de siembra:", formattedStartDate);
  console.log("Ubicación:", location);
  console.log(futureForecastData?.responseGemini);

  // Simula la carga de datos (aquí iría tu lógica de fetch)
  useEffect(() => {
    if (futureForecastData) {
      setLoading(false); // Cambia a false cuando se reciben los datos
    }
  }, [futureForecastData]);

  if (loading) {
    return <LoadingDashboard />; // Muestra el componente de carga si está en estado de carga
  } else {
    return (
      <div className="grid grid-cols-1 m-5 md:grid-cols-3 gap-4">
        {/* Información General */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Información General</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Tipo de Semilla: {seedType}</p>
            <p>Fecha de Siembra: {formattedStartDate}</p>
            <p>
              Ubicación:{" "}
              {location
                ? `${location.latitude}, ${location.longitude}`
                : "No especificada"}
            </p>
          </CardContent>
        </Card>

        {/* Gráfica de temperatura */}
        {futureForecastData && (
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Temperatura</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={futureForecastData.forecastWeather.forecast.forecastday}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="day.maxtemp_c"
                    fill="var(--color-maxtemp)"
                    name="Temperatura Máxima (°C)"
                  />
                  <Bar
                    dataKey="day.mintemp_c"
                    fill="var(--color-mintemp)"
                    name="Temperatura Mínima (°C)"
                  />
                  <Bar
                    dataKey="day.avgtemp_c"
                    fill="var(--color-avgtemp)"
                    name="Temperatura Promedio (°C)"
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {/* Condición Climática */}
        {futureForecastData && (
          <Card>
            <CardHeader>
              <CardTitle>Condición Climática</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                {futureForecastData.forecastWeather.current.condition.icon && (
                  <Image
                    src={ensureHttpsUrl(
                      futureForecastData.forecastWeather.current.condition.icon
                    )}
                    alt="weather icon"
                    width={48}
                    height={48}
                    className="w-12 h-12"
                  />
                )}
                <div>
                  <p className="text-lg">
                    {futureForecastData.forecastWeather.current.condition.text}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <WiWindy className="w-6 h-6" />
                    <p>
                      Viento:{" "}
                      <i>
                        {futureForecastData.forecastWeather.current.wind_kph}{" "}
                        km/h
                      </i>
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <WiHumidity className="w-6 h-6" />
                    <p>
                      Humedad:{" "}
                      {futureForecastData.forecastWeather.current.humidity}%
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* UV y Visibilidad */}
        {futureForecastData && (
          <Card>
            <CardHeader>
              <CardTitle>Índice UV y Visibilidad</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <WiDaySunny className="w-8 h-8" />
                <p>
                  Índice UV: {futureForecastData.forecastWeather.current.uv}
                </p>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <WiBarometer className="w-8 h-8" />
                <p>
                  Visibilidad:{" "}
                  {futureForecastData.forecastWeather.current.vis_km} km
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Astro */}
        {futureForecastData && (
          <Card>
            <CardHeader>
              <CardTitle>Astro</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <FiSunrise className="w-8 h-8" />
                <div>
                  <p>
                    Amanecer:{" "}
                    {
                      futureForecastData.forecastWeather.forecast.forecastday[0]
                        .astro.sunrise
                    }
                  </p>
                  <p>
                    Atardecer:{" "}
                    {
                      futureForecastData.forecastWeather.forecast.forecastday[0]
                        .astro.sunset
                    }
                  </p>
                </div>
              </div>
              <Separator className="my-2" />
              <div className="flex items-center gap-4">
                <SiMoonrepo className="w-8 h-8" />
                <div>
                  <p>
                    Salida de la Luna:{" "}
                    {
                      futureForecastData.forecastWeather.forecast.forecastday[0]
                        .astro.moonrise
                    }
                  </p>
                  <p>
                    Puesta de la Luna:{" "}
                    {
                      futureForecastData.forecastWeather.forecast.forecastday[0]
                        .astro.moonset
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        {futureForecastData?.responseGemini !== undefined && (
          <div className="col-span-3">
            <RecomendacionesCard data={futureForecastData?.responseGemini} />
          </div>
        )}
      </div>
    );
  }
};

export default ResultDashboard;

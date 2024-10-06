"use client";

import ChatInterface from "@/app/chat/page";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { Separator } from "@/components/ui/separator";
import { Forecast } from "@/interface/weather/weather";
import { getForecast } from "@/services/weather/weather";
import { addDays } from "date-fns";
import { useState } from "react";
import { FiSunrise } from "react-icons/fi";
import { SiMoonrepo } from "react-icons/si";
import { WiHumidity, WiWindy, WiDaySunny, WiBarometer } from "react-icons/wi";
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

const weatherData: Forecast[] = [];

export default function ResultPage() {
  const [futureForecastData, setFutureForecastData] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const maxDate = addDays(new Date(), 14);

  const handleDateSelect = async (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      try {
        const forecastData = await getForecast(
          "27.062924270743704",
          "-109.46802713192112",
          date
        );
        setFutureForecastData(forecastData);
      } catch (error) {
        setError("Error obteniendo los datos de pronóstico");
      }
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {/* Calendario */}
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={handleDateSelect}
        disabled={(date) => date > maxDate || date < new Date()}
        className="w-full"
      />

      {/* Gráfica de temperatura */}
      {futureForecastData && (
        <Card className="col-span-1 md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>Temperatura</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                mintemp: {
                  label: "Temperatura Mínima (°C)",
                  color: "hsl(var(--chart-2))",
                },
                maxtemp: {
                  label: "Temperatura Máxima (°C)",
                  color: "hsl(var(--chart-1))",
                },
                avgtemp: {
                  label: "Temperatura Promedio (°C)",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[300px] sm:h-[200px] md:h-[300px] lg:h-[400px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={futureForecastData.forecast.forecastday}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="day.mintemp_c"
                    fill="var(--color-mintemp)"
                    name="Temperatura Mínima (°C)"
                  />
                  <Bar
                    dataKey="day.maxtemp_c"
                    fill="var(--color-maxtemp)"
                    name="Temperatura Máxima (°C)"
                  />
                  <Bar
                    dataKey="day.avgtemp_c"
                    fill="var(--color-avgtemp)"
                    name="Temperatura Promedio (°C)"
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      )}

      {/* Tarjeta de Recomendaciones Importantes */}
      {futureForecastData && (
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recomendaciones Importantes</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc ml-4">
              <li>Lleva un paraguas, hay probabilidad de lluvia.</li>
              <li>Usa protector solar, índice UV alto.</li>
              <li>Mantente hidratado, temperaturas elevadas.</li>
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Tarjeta de Componente de Chat */}
      {futureForecastData && (
        <Card className="col-span-4 h-100 w-100">
          <CardHeader>
            <CardTitle>Asistente Virtual</CardTitle>
          </CardHeader>
          <CardContent className="h-100 w-100">
            <div className="chat-component h-100 w-100">
              <ChatInterface />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tarjetas estilo Bento */}
      {futureForecastData && (
        <>
          {/* Condición Climática */}
          <Card>
            <CardHeader>
              <CardTitle>Condición Climática</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <img
                  src={
                    futureForecastData.forecast.forecastday[0].day.condition
                      .icon
                  }
                  alt="weather icon"
                  className="w-12 h-12 sm:w-10 sm:h-10"
                />
                <div>
                  <i className="text-lg">
                    {
                      futureForecastData.forecast.forecastday[0].day.condition
                        .text
                    }
                  </i>
                  <div className="flex items-center gap-2 mt-2">
                    <WiWindy className="w-6 h-6" />
                    <p>
                      Viento:{" "}
                      <i>
                        {
                          futureForecastData.forecast.forecastday[0].day
                            .maxwind_kph
                        }{" "}
                        km/h
                      </i>
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <WiHumidity className="w-6 h-6" />
                    <p>
                      Humedad:{" "}
                      {
                        futureForecastData.forecast.forecastday[0].day
                          .avghumidity
                      }
                      %
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* UV y Visibilidad */}
          <Card>
            <CardHeader>
              <CardTitle>Índice UV y Visibilidad</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <WiDaySunny className="w-8 h-8" />
                <p>
                  Índice UV: {futureForecastData.forecast.forecastday[0].day.uv}
                </p>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <WiBarometer className="w-8 h-8" />
                <p>
                  Visibilidad:{" "}
                  {futureForecastData.forecast.forecastday[0].day.avgvis_km} km
                </p>
              </div>
            </CardContent>
          </Card>

          {/* ASTRO */}
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
                    {futureForecastData.forecast.forecastday[0].astro.sunrise}
                  </p>
                  <p>
                    Atardecer:{" "}
                    {futureForecastData.forecast.forecastday[0].astro.sunset}
                  </p>
                </div>
              </div>
              <Separator className="my-2" />
              <div className="flex items-center gap-4">
                <SiMoonrepo className="w-8 h-8" />
                <div>
                  <p>
                    Salida de la luna:{" "}
                    {futureForecastData.forecast.forecastday[0].astro.moonrise}
                  </p>
                  <p>
                    Puesta de la luna:{" "}
                    {futureForecastData.forecast.forecastday[0].astro.moonset}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}

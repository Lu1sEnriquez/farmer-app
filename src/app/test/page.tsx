"use client";

import { useState } from "react";
import {
  getCurrentWeather,
  getFutureForecast,
} from "@/services/weather/weather";
import { Calendar } from "@/components/ui/calendar";
import { format, addDays } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { Progress } from "@/components/ui/progress";
import { ChartContainer } from "@/components/ui/chart";
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TestPage() {
  const [weather, setWeather] = useState<any>(null);
  const [futureForecastData, setFutureForecastData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const handleButtonClick = async () => {
    setLoading(true);
    setError(null);
    try {
      const weatherData = await getCurrentWeather(
        "27.062924270743704",
        "-109.46802713192112"
      );
      setWeather(weatherData);
    } catch (err) {
      setError("Error obteniendo los datos del clima");
    } finally {
      setLoading(false);
    }
  };

  const handleDateSelect = async (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      try {
        const forecastData = await getFutureForecast(
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

  const minDate = addDays(new Date(), 14);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Página de Pruebas</h1>

      <Button className="mb-4" onClick={handleButtonClick}>
        Obtener Datos del Clima
      </Button>

      {/* Mostrar barra de progreso si está cargando */}
      {loading && (
        <div className="w-full max-w-md mb-4">
          <Progress value={89} className="h-4" />
        </div>
      )}

      {/* Mostrar error si hay alguno */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Mostrar datos si la llamada fue exitosa */}
      {weather && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Datos del Clima:</h2>
          <pre>{JSON.stringify(weather, null, 2)}</pre>
        </div>
      )}

      <h2 className="text-lg font-semibold mt-8">Selecciona una fecha:</h2>
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={handleDateSelect} // Cambiado a la nueva función
        disabled={(date) => date < minDate}
      />

      {selectedDate && (
        <div className="mt-4">
          <p>Fecha seleccionada: {format(selectedDate, "PPP")}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 mb-5">
        {/* Pronóstico a Futuro */}
        {futureForecastData && (
          <Card>
            <CardHeader>
              <CardTitle>Pronóstico a Futuro</CardTitle>
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
                }}
                className="h-[300px]"
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
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        )}

        <Separator/>

        <Card>
          <CardHeader>
            <CardTitle>Condición Climática</CardTitle>
          </CardHeader>
          <CardContent>

          </CardContent>
        </Card>
      </div>
      
    </div>
  );
}

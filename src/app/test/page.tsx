"use client";

import { useState } from "react";
import { getCurrentWeather } from "@/services/weather/weather";
import { getFutureForecast } from "@/services/weather/weather"; // Asegúrate de importar la función
import { Calendar } from "@/components/ui/calendar"; // Ajusta la ruta si es necesario
import { format, addDays } from "date-fns";
import { Button } from "@/components/ui/button"; // Botón desde shadcn
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"; // Importa componentes de Recharts

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

      {loading && <p>Cargando...</p>}
      {error && <p className="text-red-500">{error}</p>}
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

      {/* Mostrar el gráfico si hay datos de pronóstico */}
      {futureForecastData && (
        <div className="mt-8 w-full h-96">
          <h2 className="text-lg font-semibold">Pronóstico a Futuro:</h2>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={futureForecastData.forecast.forecastday}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="day.maxtemp_c"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
                name="Temperatura Máxima (°C)"
              />
              <Line
                type="monotone"
                dataKey="day.mintemp_c"
                stroke="#82ca9d"
                name="Temperatura Mínima (°C)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

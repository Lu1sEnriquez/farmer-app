"use client";

import { useEffect, useState } from "react";
import useWeatherStore from "@/store/useWeatherStore";
import { fetchAnalisis } from "@/services/ia/ia";
import { ResultAnalisis } from "@/interface/backend/resultAnalisis";
import ResultDashboard from "@/components/resultado/ResultDashboard";

export default function ResultPage() {
  const { seedType, location, startDate } = useWeatherStore(); // Usar Zustand
  const [futureForecastData, setFutureForecastData] =
    useState<ResultAnalisis | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const dt = startDate
        ? startDate.toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0];
      const userDate = new Date(dt);

      const currentDate = new Date();
      const today = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate()
      );

      // Calcular la diferencia en milisegundos
      const diffTime = Math.abs(userDate.getTime() - today.getTime());
      // Calcular la diferencia en días
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (location) {
        const q = `${location.latitude},${location.longitude}`; // Obtener q de location
        const data = await fetchAnalisis(q, diffDays, "es", seedType); // Llamar a la función fetchAnalisis
        console.log(data);

        setFutureForecastData(data);
      }
    };

    fetchData();
  }, [location, seedType, startDate]); // Llamar cuando cambian location o seedType

  return (
    <div className="animate-fade">
      <h1 className="text-2xl font-bold m-5">Resultados del Análisis</h1>
      <ResultDashboard futureForecastData={futureForecastData} />{" "}
      {/* Pasar datos al Dashboard */}
    </div>
  );
}

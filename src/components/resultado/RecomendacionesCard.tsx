import React, { useEffect, useState } from "react";
import { Card, CardContent, CardTitle } from "../ui/card";

interface ClimateAnalysisProps {
  date?: string;
  data: string; // Asumimos que recibimos todos los datos como un string
}

export const RecomendacionesCard: React.FC<ClimateAnalysisProps> = ({
  date,
  data,
}) => {
  // Estado local para almacenar los datos analizados
  const [analysisData, setAnalysisData] = useState<Record<string, string>>({});

  // Función para parsear el string a un objeto
  const parseData = (data: string) => {
    const sections = data.split("**"); // Suponiendo que las secciones están separadas por **
    const analysis: Record<string, string> = {};

    sections.forEach((section) => {
      const [title, content] = section.split(":");
      if (title && content) {
        analysis[title.trim()] = content.trim();
      }
    });

    return analysis;
  };

  // Efecto para actualizar el estado cuando cambie la data
  useEffect(() => {
    const parsedData = parseData(data);
    setAnalysisData(parsedData);
  }, [data]); // Dependencia en 'data'

  return (
    <Card>
      <CardTitle>Análisis del Clima</CardTitle>
      <p className="text-lg font-semibold">Fecha: {date}</p>

      <CardContent>
        {/* Si no hay análisis, muestra un mensaje adecuado */}
        {Object.keys(analysisData).length === 0 ? (
          <p>No hay recomendaciones disponibles.</p>
        ) : (
          Object.entries(analysisData).map(([key, value]) => (
            <div key={key} className="mt-4">
              <h3 className="text-xl font-semibold">{key}:</h3>
              <p>{value}</p>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

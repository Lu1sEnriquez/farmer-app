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
    const sections = data.split("**").filter(section => section.trim() !== ""); // Filtramos secciones vacías
    const analysis: Record<string, string> = {};

    // Se procesan las secciones
    sections.forEach((section) => {
      const trimmedSection = section.trim();
      if (trimmedSection) {
        // Verificar si el párrafo comienza con un número seguido de un punto
        const match = trimmedSection.match(/^(\d+)\.\s+(.*)/);
        if (match) {
          const title = match[0]; // Título completo con número
          const content = match[2]; // Contenido después del título
          analysis[title] = content.trim(); // Guardar título y contenido
        } else {
          // Si no hay título, se agrega el contenido como un párrafo normal
          analysis["Párrafo Normal"] = (analysis["Párrafo Normal"] || "") + trimmedSection + "\n"; // Concatenar en el mismo campo
        }
      }
    });

    return analysis;
  };

  // Efecto para actualizar el estado cuando cambie la data
  useEffect(() => {
    const parsedData = parseData(data);
    setAnalysisData(parsedData);
  }, [data]); // Dependencia en 'data'

  // Función para determinar el estilo según el tipo de contenido
  const getStyle = (key: string) => {
    if (key.toLowerCase().includes("advertencia")) {
      return "font-bold text-red-600"; // Estilo para advertencias
    } else if (key.toLowerCase().includes("recomendación")) {
      return "font-semibold text-blue-600"; // Estilo para recomendaciones
    } else {
      return ""; // Estilo por defecto
    }
  };

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
              <h3 className={`text-xl ${getStyle(key)}`}>{key}:</h3>
              <p className="text-base whitespace-pre-wrap">{value}</p> {/* Usar whitespace-pre-wrap para mantener los saltos de línea */}
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

import React from "react";
import { Card, CardContent, CardTitle } from "../ui/card";
import ReactMarkdown from "react-markdown";

interface ClimateAnalysisProps {
  date?: string;
  data: string; // Asumimos que recibimos los datos directamente en formato Markdown
}

export const RecomendacionesCard: React.FC<ClimateAnalysisProps> = ({
  date,
  data,
}) => {
  return (
    <Card>
      <CardTitle>Análisis del Clima</CardTitle>
      <p className="text-lg font-semibold">Fecha: {date}</p>

      <CardContent>
        {/* Renderizar el contenido en formato Markdown */}
        <ReactMarkdown className="text-base whitespace-pre-wrap">
          {data}
        </ReactMarkdown>
      </CardContent>
    </Card>
  );
};

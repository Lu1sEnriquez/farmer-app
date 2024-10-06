"use client"
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

export default function ResultPage() {
  return (
    <div>
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
    </div>
  );
}

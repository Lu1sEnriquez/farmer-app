import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { FiCloud, FiCloudRain, FiMapPin, FiSun } from "react-icons/fi";
import { ReactNode } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface WeatherCardProps {
  day: string;
  date: string;
  location: string;
  temp: number;
  description: string;
  icon: ReactNode;
  details: { label: string; value: string }[];
}

export default function WeatherCard({
  day,
  date,
  location,
  temp,
  description,
  icon,
  details,
}: WeatherCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative bg-gradient-to-br from-blue-400 to-blue-600 text-white p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold">{day}</h2>
            <p className="text-lg">{date}</p>
            <div className="flex items-center mt-2">
              <FiMapPin className="mr-1" />
              <span className="opacity-75">{location}</span>
            </div>
          </div>
          <div>
            {icon}
            <span className="text-6xl font-bold block">{temp}°C</span>
            <span className="text-2xl font-semibold">{description}</span>
          </div>
        </div>

        <CardContent className="bg-card text-card-foreground p-8">
          <div className="space-y-4">
            {details.map((detail, index) => (
              <div key={index} className="flex justify-between">
                <span className="font-semibold">{detail.label}</span>
                <span>{detail.value}</span>
              </div>
            ))}
          </div>
          <Tabs defaultValue="tue" className="mt-8">
            <TabsList className="grid grid-cols-4 gap-4">
              <TabsTrigger value="tue">Tue</TabsTrigger>
              <TabsTrigger value="wed">Wed</TabsTrigger>
              <TabsTrigger value="thu">Thu</TabsTrigger>
              <TabsTrigger value="fri">Fri</TabsTrigger>
            </TabsList>
            <TabsContent value="tue">
              <WeatherForecast
                day="Tue"
                temp={29}
                icon={<FiSun className="w-10 h-10" />}
              />
            </TabsContent>
            <TabsContent value="wed">
              <WeatherForecast
                day="Wed"
                temp={21}
                icon={<FiCloud className="w-10 h-10" />}
              />
            </TabsContent>
            <TabsContent value="thu">
              <WeatherForecast
                day="Thu"
                temp={18}
                icon={<FiCloudRain className="w-10 h-10" />}
              />
            </TabsContent>
            <TabsContent value="fri">
              <WeatherForecast
                day="Fri"
                temp={25}
                icon={<FiSun className="w-10 h-10" />}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </div>
    </Card>
  );
}

// Definir la interfaz para las props
interface WeatherForecastProps {
  day: string;
  temp: number;
  icon: ReactNode;
}

// Componente WeatherForecast como función de flecha
const WeatherForecast = ({ day, temp, icon }: WeatherForecastProps) => {
  return (
    <Card className="mt-4">
      <CardContent className="flex items-center justify-between p-4">
        <div>
          <CardTitle>{day}</CardTitle>
          <CardDescription>{temp}°C</CardDescription>
        </div>
        {icon}
      </CardContent>
    </Card>
  );
};

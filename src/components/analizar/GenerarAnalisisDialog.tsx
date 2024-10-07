"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DatePicker } from "@/components/ui/data-picker";
import { CalendarIcon } from "lucide-react";
import { format, addDays } from "date-fns"; // Importa addDays
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import useWeatherStore from "@/store/useWeatherStore";
import { useRouter } from "next/navigation";

const GenerarAnalisisDialog = () => {
  const { seedType, setSeedType, startDate, setStartDate, location } = useWeatherStore();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  // Calculamos el día de hoy y el rango máximo de 14 días
  const today = new Date();
  const maxDate = addDays(today, 14); // Fecha límite de 14 días después de hoy

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setStartDate(date);
    } else {
      setStartDate(null);
    }
  };

  const handleSubmit = () => {
    console.log("Tipo de semilla:", seedType);
    console.log("Fecha seleccionada:", startDate);
    console.log("location:", location);
    router.push("/result");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={"blue"} className="w-40">
          Generar Análisis
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-lg font-bold mb-4">Análisis Personalizado</DialogTitle>
        <Label>Tipo de Planta:</Label>
        <Input
          value={seedType}
          onChange={(e) => setSeedType(e.target.value)}
          placeholder="Escribe aquí..."
          className="mb-4"
        />
        <Label>Fecha:</Label>
        <DatePicker
          selected={startDate}
          onChange={handleDateChange}
          minDate={today} // Establecemos la fecha mínima
          maxDate={maxDate} // Establecemos la fecha máxima
          classname="border p-2 rounded"
        >
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !startDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {startDate ? format(startDate, "PPP") : <span>Selecciona una fecha</span>}
          </Button>
        </DatePicker>
        <DialogFooter>
          <Button variant={"secondary"} onClick={onClose} className="mt-4">
            Cerrar
          </Button>
          <Button variant={"blue"} onClick={handleSubmit} className="mt-4">
            Generar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GenerarAnalisisDialog;

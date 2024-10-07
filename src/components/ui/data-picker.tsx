"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Button } from "./button";
import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Calendar } from "./calendar";
import { format, isBefore, isAfter } from "date-fns";

interface DatePickerProps {
  selected: Date | null; // Puede ser Date o null
  onChange: (date: Date | null) => void; // Cambia la fecha o null
  minDate?: Date; // Fecha mínima permitida
  maxDate?: Date; // Fecha máxima permitida
  classname: string;
  children: ReactNode;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  selected,
  onChange,
  minDate,
  maxDate,
  children,
}) => {
  // Función que verifica si la fecha está fuera del rango permitido
  const isDateDisabled = (date: Date) => {
    if (minDate && isBefore(date, minDate)) return true;
    if (maxDate && isAfter(date, maxDate)) return true;
    return false;
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div>
          {children ? (
            children
          ) : (
            <Button
              variant={"outline"}
              className={cn(
                "w-[280px] justify-start text-left font-normal",
                !selected && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selected ? (
                format(selected, "PPP")
              ) : (
                <span>Selecciona una fecha</span>
              )}
            </Button>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={selected || undefined} // Asegúrate de que selected sea undefined si es null
          onSelect={(date) => {
            // Solo permite seleccionar fechas dentro del rango
            if (date && !isDateDisabled(date)) {
              onChange(date);
            } else {
              onChange(null);
            }
          }}
          disabled={(date) => isDateDisabled(date)} // Deshabilita fechas fuera del rango
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

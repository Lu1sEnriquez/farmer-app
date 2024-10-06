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
import { format } from "date-fns";

interface DatePickerProps {
  selected: Date | null; // Cambiar a Date | null para evitar strings
  onChange: (date: Date | null) => void; // Cambiar a Date | null
  classname: string;
  children: ReactNode;
}

// En la implementación de DatePicker
export const DatePicker: React.FC<DatePickerProps> = ({
  selected,
  onChange,
  children,
}) => {
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
            onChange(date ?? null); // Llama a onChange con la fecha o null
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

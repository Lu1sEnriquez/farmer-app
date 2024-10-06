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
  selected: Date | undefined; // Cambiado a Date | undefined
  onChange: (date: Date | undefined) => void; // Cambiado a Date | undefined
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
          selected={selected}
          onSelect={onChange} // Asegúrate de que onSelect esté en el formato correcto
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

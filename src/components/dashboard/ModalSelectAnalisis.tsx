import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"; // Asegúrate de que el path sea correcto
import { DatePicker } from "@/components/ui/data-picker"; // Asegúrate de que el path sea correcto
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";

const SeedModal = () => {
  const [seedType, setSeedType] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined); // Cambiar a Date | undefined
  const [isOpen, setIsOpen] = useState(false); // Cambia esto según sea necesario

  const onClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = () => {
    console.log("Tipo de semilla:", seedType);
    console.log("Fecha seleccionada:", startDate);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={"blue"}>Generar Analisis</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-lg font-bold mb-4">
          Analisis Personalizado
        </DialogTitle>
        <DialogDescription>
          generar un analisis de un dia en especifico
        </DialogDescription>
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
          onChange={(date) => setStartDate(date ? date : undefined)} // Cambiar a undefined si date es null
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
            {startDate ? (
              format(startDate, "PPP")
            ) : (
              <span>Selecciona una fecha</span>
            )}
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

export default SeedModal;

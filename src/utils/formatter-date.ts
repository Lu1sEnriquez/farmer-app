import { format } from "date-fns";

export const formattedDate = (dateString: string) => {
    const date = new Date(dateString); // Convertir a objeto Date
    return format(date, "yyyy-MM-dd"); // Formatear a YYYY-MM-DD
  };
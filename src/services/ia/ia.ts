import { ResultAnalisis } from "@/interface/backend/resultAnalisis";

// Define los tipos de entrada de la función
export const fetchAnalisis = async (
    q: string,   // Latitud y longitud combinados
    days: number,  // Número de días
    lang: string,  // Idioma
    cultivo: string  // Tipo de cultivo
  ): Promise<ResultAnalisis | null> => {
    const baseURL = "http://localhost:3008/analisis";
  
    // Definir los parámetros de la URL con los valores recibidos
    const params = new URLSearchParams({
      q: q, // Latitud y longitud
      days: days.toString(), // Número de días
      lang: lang, // Idioma
      cultivo: cultivo, // Tipo de cultivo
    });
  
    try {
      // Realizar la solicitud con fetch
      const response = await fetch(`${baseURL}?${params}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      // Comprobar si la respuesta es válida
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }
  
      // Parsear la respuesta en JSON
      const data: ResultAnalisis = await response.json();
      console.log("Datos recibidos:", data);
      
      // Retornar los datos procesados
      return data;
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
      return null; // Devuelve null si ocurre un error
    }
  };
  

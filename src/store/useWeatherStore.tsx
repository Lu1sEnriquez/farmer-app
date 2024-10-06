import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define el tipo MarkerType para la ubicación (longitud y latitud)
interface MarkerType {
  longitude: number;
  latitude: number;
}

// Define la interfaz del estado del store
interface WeatherStore {
  seedType: string;
  startDate: Date | null;
  location: MarkerType | null; // Para manejar la ubicación del mapa
  setSeedType: (seedType: string) => void;
  setStartDate: (startDate: Date | null) => void;
  setLocation: (location: MarkerType | null) => void;
}

// Crea el store usando Zustand con el middleware persist
const useWeatherStore = create<WeatherStore>()(
  persist(
    (set) => ({
      seedType: "",
      startDate: null,
      location: null, // Ubicación inicial es null
      setSeedType: (seedType) => set({ seedType }),
      setStartDate: (startDate) => set({ startDate }),
      setLocation: (location) => set({ location }),
    }),
    {
      name: "weather-store", // Nombre clave en localStorage
      // Función que transforma los datos cuando son recuperados del localStorage
      merge: (persistedState, currentState) => {
        const mergedState = {
          ...currentState,
          // Verifica que persistedState sea un objeto antes de aplicar spread
          ...(typeof persistedState === "object" && persistedState !== null
            ? persistedState
            : {}),
        };

        // Verifica si startDate es un string y lo convierte a Date
        if (
          persistedState &&
          typeof persistedState === "object" &&
          "startDate" in persistedState
        ) {
          mergedState.startDate = new Date(persistedState.startDate as string);
        }

        return mergedState;
      },
    }
  )
);

export default useWeatherStore;

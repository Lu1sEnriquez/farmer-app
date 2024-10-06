"use client";
import { useEffect, useState } from "react";
import Map, {
  Marker,
  ViewStateChangeEvent,
  MapLayerMouseEvent,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MAPBOX_ACCESTOKEN } from "@/constants/api-keys";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { MdDelete } from "react-icons/md";
import { IoAddOutline } from "react-icons/io5";

// Tipos para el estado del marcador y la vista del mapa
interface MarkerType {
  longitude: number;
  latitude: number;
}

interface ViewStateType {
  longitude: number;
  latitude: number;
  zoom: number;
}

export const Mapa = () => {
  const [viewState, setViewState] = useState<ViewStateType>({
    longitude: -74.5,
    latitude: 40,
    zoom: 9,
  });

  const [marker, setMarker] = useState<MarkerType | null>(null); // Estado para el marcador

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setViewState((prevState) => ({
            ...prevState, // Mantiene el estado anterior
            latitude,
            longitude,
            zoom: 12,
          }));

          setMarker({
            longitude, // Corrige la asignación del marcador
            latitude,
          });
        },
        (error) => {
          console.error("Error obteniendo la ubicación del usuario:", error);
        }
      );
    }
  }, []); // Ejecuta solo una vez, ya que no depende de viewState

  // Maneja el evento de movimiento del mapa
  const handleMove = (evt: ViewStateChangeEvent) => {
    setViewState(evt.viewState);
  };

  // Maneja el clic en el mapa para agregar un marcador
  const handleMapClick = (evt: MapLayerMouseEvent) => {
    const { lngLat } = evt; // Obtiene la latitud y longitud del clic
    setMarker({
      longitude: lngLat.lng,
      latitude: lngLat.lat,
    });
  };

  // Función para eliminar el marcador
  const removeMarker = () => {
    setMarker(null);
  };

  // Agregar marcador en la esquina del mapa
  const addCornerMarker = () => {
    setMarker({
      longitude: viewState.longitude - 0.05, // Ajusta según el centro de la vista
      latitude: viewState.latitude + 0.05,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ubicación del Agricultor</CardTitle>
      </CardHeader>
      <CardContent className="min-h-fit">
        <div className="flex flex-col w-10/12 m-auto relative">
          <div className="absolute z-10 right-5 top-5 flex flex-col space-y-2 gap-3">
          
            <button
              className="bg-red-500 rounded-full text-white p-1"
              onClick={removeMarker}
              style={{ marginLeft: "10px" }}
            >
              <MdDelete size={30} />
            </button>
          </div>
          <Map
            {...viewState}
            onMove={handleMove} // Manejar el movimiento del mapa
            onClick={handleMapClick} // Manejar el clic en el mapa
            style={{
              width: "100%",
              height: "500px",
              marginTop: "10px",
              borderRadius: "10px",
            }} // Estilo cuadrado y borde redondeado
            mapStyle="mapbox://styles/mapbox/outdoors-v12"
            mapboxAccessToken={MAPBOX_ACCESTOKEN}
          >
            {marker && (
              <Marker
                longitude={marker.longitude}
                latitude={marker.latitude}
                color="red"
              />
            )}
          </Map>
        </div>
      </CardContent>
    </Card>
  );
};

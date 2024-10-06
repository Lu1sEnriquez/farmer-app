"use client";
import { useEffect, useState } from "react";
import Map, {
  Marker,
  ViewStateChangeEvent,

  MarkerDragEvent,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MAPBOX_ACCESTOKEN } from "@/constants/api-keys";
import { Card, CardContent, } from "../ui/card";
import { MdDelete } from "react-icons/md";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {  MapMouseEvent } from "mapbox-gl";
import useWeatherStore from "@/store/useWeatherStore";


// Tipos para el estado del marcador y la vista del mapa


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

  const [searchQuery, setSearchQuery] = useState<string>(""); // Estado para la búsqueda
  const { location, setLocation } = useWeatherStore(); // Usar Zustand para almacenar la ubicación

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

          setLocation({
            longitude, // Corrige la asignación del marcador
            latitude,
          });

          // Obtener la dirección a partir de la ubicación inicial
          reverseGeocode(latitude, longitude);
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

  // Maneja el clic en el mapa para agregar un marcador y actualizar la dirección
  const handleMapClick = (evt: MapMouseEvent) => {
    const { lngLat } = evt; // Obtiene la latitud y longitud del clic
    setLocation({
      longitude: lngLat.lng,
      latitude: lngLat.lat,
    });
    // Realiza geocodificación inversa para obtener la dirección
    reverseGeocode(lngLat.lat, lngLat.lng);
  };

  // Función para eliminar el marcador
  const removeMarker = () => {
    setLocation(null);
    setSearchQuery("");
  };

  // Función para buscar una ubicación utilizando la API de Mapbox Geocoding
  const searchLocation = async () => {
    const query = encodeURIComponent(searchQuery);
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${MAPBOX_ACCESTOKEN}`
    );
    const data = await response.json();

    if (data.features && data.features.length > 0) {
      const { center, place_name } = data.features[0];
      const longitude = center[0];
      const latitude = center[1];

      // Centrar el mapa en la ubicación buscada
      setViewState({
        longitude,
        latitude,
        zoom: 12,
      });

      // Colocar un marcador en la ubicación
      setLocation({
        longitude,
        latitude,
      });

      // Actualizar el input con la ubicación buscada
      setSearchQuery(place_name);
    } else {
      alert("Ubicación no encontrada");
    }
  };

  // Función para realizar geocodificación inversa (obtener la dirección a partir de las coordenadas)
  const reverseGeocode = async (latitude: number, longitude: number) => {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${MAPBOX_ACCESTOKEN}`
    );
    const data = await response.json();

    if (data.features && data.features.length > 0) {
      setSearchQuery(data.features[0].place_name); // Actualiza el input con la dirección
    }
  };

  // Función para manejar el evento onDragEnd del marcador
  const handleMarkerDragEnd = (event: MarkerDragEvent) => {
    const { lngLat } = event;
    setLocation({
      longitude: lngLat.lng,
      latitude: lngLat.lat,
    });
    reverseGeocode(lngLat.lat, lngLat.lng); // Actualizar la dirección después de mover el marcador
  };

  return (
    <div className="space-y-3">
      <Card className="md:w-10/12 m-auto">
        <div className="flex flex-row  items-center space-x-3 p-3">
          <Input
            type="text"
            placeholder="Buscar ubicación"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          />
          <div className="flex flex-row space-x-2">
            <Button onClick={searchLocation}>Buscar</Button>
            <Button className="bg-red-500 dark:hover:bg-red-600 hover:bg-red-400 text-white" onClick={removeMarker}>
              <MdDelete size={30} />
            </Button>
            
          </div>
        </div>
      </Card>
      <Card className="md:w-10/12 m-auto">
        <CardContent className="min-h-fit relative">
          <button
            className="bg-red-500 rounded-full text-white p-1 absolute z-10 right-10 bottom-10"
            onClick={removeMarker}
          >
            <MdDelete size={30} />
          </button>

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
            {location && (
              <Marker
                onDragEnd={handleMarkerDragEnd}
                draggable
                longitude={location.longitude}
                latitude={location.latitude}
                color="red"
              />
            )}
          </Map>
        </CardContent>
      </Card>
    </div>
  );
};

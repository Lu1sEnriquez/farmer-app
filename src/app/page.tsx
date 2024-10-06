// pages/index.js
"use client"

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Zoom } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/zoom";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Section */}
      <header className="p-10 text-center">
        <h1 className="text-4xl font-bold">
          Bienvenido al Proyecto de Análisis Meteorológico
        </h1>
        <p className="mt-4 text-lg">
          Optimiza tus cultivos con datos climáticos precisos y recomendaciones
          personalizadas.
        </p>
      </header>

      {/* Project Information Section */}
      <section className="p-10 text-center">
        <h2 className="text-3xl font-semibold">¿Cómo Funciona?</h2>
        <p className="mt-4">
          Utilizando la API de WeatherAPI, nuestro sistema analiza las
          condiciones climáticas y genera recomendaciones específicas para tus
          cultivos.
        </p>
        <p className="mt-2">
          Con base en la información meteorológica, te ayudamos a decidir cuándo
          regar, fertilizar o cosechar.
        </p>
      </section>

      {/* Image Carousel Section */}
      <section className="p-10 text-center">
        <h2 className="text-3xl font-semibold">Galería de Imágenes</h2>
        <Swiper
          zoom={true}
          navigation={true}
          pagination={{ clickable: true }}
          modules={[Zoom, Navigation, Pagination]}
          className="mt-6"
          slidesPerView={1}
          spaceBetween={30}
        >
          {Array.from({ length: 8 }).map((_, index) => (
            <SwiperSlide key={index}>
              <div className="swiper-zoom-container">
                <Image
                  src={`/presentation/${index + 1}.png`}
                  alt={`Cultivo ${index + 1}`}
                  width={800}
                  height={600}
                  className="object-cover rounded-lg shadow"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Call to Action Section */}
      <section className="flex justify-center items-center p-10">
        <Button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          <Link href="/analizar">Generar Análisis</Link>
        </Button>
      </section>

      {/* Footer Section */}
      <footer className="p-4 text-center">
        <p>&copy; 2024 Proyecto de Análisis Meteorológico SpaceApp</p>
      </footer>
    </div>
  );
}

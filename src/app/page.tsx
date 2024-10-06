// pages/index.js

import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Header Section */}
            <header className="bg-gray-100 p-10 text-center">
                <h1 className="text-4xl font-bold">Bienvenido al Proyecto de Análisis Meteorológico</h1>
                <p className="mt-4 text-lg">Optimiza tus cultivos con datos climáticos precisos y recomendaciones personalizadas.</p>
            </header>

            {/* Project Information Section */}
            <section className="p-10 text-center">
                <h2 className="text-3xl font-semibold">¿Cómo Funciona?</h2>
                <p className="mt-4">
                    Utilizando la API de WeatherAPI, nuestro sistema analiza las condiciones climáticas y genera recomendaciones específicas para tus cultivos.
                </p>
                <p className="mt-2">
                    Con base en la información meteorológica, te ayudamos a decidir cuándo regar, fertilizar o cosechar.
                </p>
            </section>

            {/* Image Gallery Section */}
            <section className="p-10 text-center">
                <h2 className="text-3xl font-semibold">Galería de Imágenes</h2>
                <div className="flex justify-center flex-wrap mt-6">
                    <Image src="/images/image1.jpg" alt="Cultivo 1" className="w-80 h-52 object-cover m-2 rounded-lg shadow" />
                    <Image src="/images/image2.jpg" alt="Cultivo 2" className="w-80 h-52 object-cover m-2 rounded-lg shadow" />
                    <Image src="/images/image3.jpg" alt="Cultivo 3" className="w-80 h-52 object-cover m-2 rounded-lg shadow" />
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="flex justify-center items-center p-10">
                <Button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    <a href="/analyze">Analizar Clima</a>
                </Button>
            </section>

            {/* Footer Section */}
            <footer className="bg-gray-100 p-4 text-center">
                <p>&copy; 2024 Proyecto de Análisis Meteorológico</p>
            </footer>
        </div>
    );
}

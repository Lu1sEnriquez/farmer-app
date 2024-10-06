// pages/index.js

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Header Section */}
            <header className=" p-10 text-center">
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
                    <Image src="/images/agricolas-1.avif" alt="Cultivo 1" className="w-80 h-52 object-cover m-2 rounded-lg shadow"  width={200} height={200}/>
                    <Image src="/images/agricolas-2.jpg" alt="Cultivo 2" className="w-80 h-52 object-cover m-2 rounded-lg shadow" width={200} height={200} />
                    <Image src="/images/agricolas-4.jpg" alt="Cultivo 3" className="w-80 h-52 object-cover m-2 rounded-lg shadow"  width={200} height={200}/>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="flex justify-center items-center p-10">
                <Button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    <Link href="/analizar">Generar Analisis</Link>
                </Button>
            </section>

            {/* Footer Section */}
            <footer className=" p-4 text-center">
                <p>&copy; 2024 Proyecto de Análisis Meteorológico SpaceApp</p>
            </footer>
        </div>
    );
}

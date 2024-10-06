/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "cdn.weatherapi.com", // Asegúrate de que no hay barra al final
        },
      ],
    },
  };
  
  export default nextConfig;
  
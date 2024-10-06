const apiUrl = "https://api.weatherapi.com/v1";
const apiKey = '8cf034e557b54002a2322613240510'

export async function getCurrentWeather(Longitud: string, Latitud: string) {
  try {
    const response = await fetch(`${apiUrl}/current.json?q=${Longitud},${Latitud}&lang=es&key=${apiKey}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
}

export async function getFutureForecast(longitud: string, latitud: string, dateTime: Date) {
  try {
    const dt = dateTime.toISOString().split('T')[0];
    const userDate = new Date(dt);

    const currentDate = new Date();
    const today = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

    // Calcular la diferencia en milisegundos
    const diffTime = Math.abs(userDate.getTime() - today.getTime());
    // Calcular la diferencia en días
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const res = await fetch(`${apiUrl}/forecast.json?q=${longitud},${latitud}&days=${diffDays}&lang=es&key=${apiKey}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.url}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
}

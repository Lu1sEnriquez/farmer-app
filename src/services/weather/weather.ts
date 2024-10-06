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

export async function getFutureForecast( longitud: string, latitud: string, dateTime: Date ) {
  try {
    const res = await fetch(`${apiUrl}/future.json?q=${longitud},${latitud}&dt=${dateTime}&lang=es&key=${apiKey}`, {
      method: "GET",
      headers: {
        "Content-Type": "applicatino/json",
      },
    });

    if(!res.ok) {
      throw new Error(`Error: ${res}`)
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
}

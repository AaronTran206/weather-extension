const API_KEY = "3e8563fa30ffa4c71b5d1b61c75ef10b"

//interface object for OpenWeather API ver. 2.5. Closely resembles the structure of the API data.
export interface OpenWeatherData {
  name: string
  main: {
    feels_like: number
    humidy: number
    pressure: number
    temp: number
    temp_max: number
    temp_min: number
  }
  weather: {
    description: string
    icon: string
    id: number
    main: string
  }[]
  wind: {
    deg: number
    speed: number
  }
}

export type OpenWeatherTempScale = "metric" | "imperial"

//async await fetch function for OpenWeather API. Purpose is to contact the API using API key and return the data for use in other functions.
export async function fetchOpenWeatherData(
  city: string,
  tempScale: OpenWeatherTempScale
): Promise<OpenWeatherData> {
  //fetch api request
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${tempScale}&appid=${API_KEY}`
  )

  //throw error
  if (!res.ok) {
    throw new Error("City not found")
  }

  //return json formatted api data
  const data: OpenWeatherData = await res.json()
  return data
}

//api fetch to retrieve icon of weather
export function getWeatherIconSrc(iconCode: string) {
  return `http://openweathermap.org/img/wn/${iconCode}@2x.png`
}

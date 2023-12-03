import axios from "axios";
import {
    WeatherResponse,
    ForecastResponse,
} from "@/interfaces/WeatherInterfaces";

export const apiKey = "ede93c21b355e9a9a626eedd8f2ff094";

export async function getWeather(
    city: string,
    apiKey: string
): Promise<WeatherResponse> {
    try {
        const response = await axios.get(
            `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
        );
        return response.data as WeatherResponse;
    } catch (error) {
        console.error("Error al obtener el clima:", error);
        throw error;
    }
}

export async function getWeatherForecast(
    city: string,
    apiKey: string
): Promise<ForecastResponse> {
    try {
        const response = await axios.get(
            `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&interval=1h`
        );
        return response.data as ForecastResponse;
    } catch (error) {
        console.error("Error al obtener el pronóstico del tiempo:", error);
        throw error;
    }
}

export async function getWeatherForecastByDays(
    city: string,
    apiKey: string
): Promise<ForecastResponse> {
    try {
        const response = await axios.get(
            `http://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=10&lang=es&appid=${apiKey}`
        );
        return response.data as ForecastResponse;
    } catch (error) {
        console.error("Error al obtener el pronóstico del tiempo por dias:", error);
        throw error;
    }
}

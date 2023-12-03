<template>
    <div>
        <!-- Card principal para la información básica del pronóstico -->
        <ion-card v-if="forecastData && forecastData.city">
            <ion-card-content>
                <ion-list>
                    <ion-item v-for="(forecast, index) in forecastData.list" :key="forecast.dt">
                        <template v-if="isNewDay(index)">
                            <ion-header class="date-header">
                                <ion-title>{{
                                    getFormattedDate(forecast.dt, true, false)
                                }}</ion-title>
                            </ion-header>
                        </template>
                        <div class="background">
                            <img v-if="forecast.weather && forecast.weather[0]"
                                :src="getWeatherIconUrl(forecast.weather[0].icon, '2x')" alt="Icono del Tiempo" />
                        </div>
                        <ion-label>
                            <h3>{{ getFormattedDate(forecast.dt, false, true) }}</h3>
                            <p>{{ forecast.weather[0].description }}</p>
                            <p>
                                Temperatura: {{ convertKelvinToCelsius(forecast.main.temp) }} °C
                            </p>
                        </ion-label>
                    </ion-item>
                </ion-list>
            </ion-card-content>
        </ion-card>

        <div v-else class="loading-container">
            <ion-spinner name="crescent"></ion-spinner>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ForecastResponse } from "@/interfaces/WeatherInterfaces";
import {
    IonCard,
    IonCardContent,
    IonHeader,
    IonTitle,
    IonItem,
    IonLabel,
    IonList,
    IonSpinner,
} from "@ionic/vue";

const props = defineProps(["forecastData"]);

// Función para obtener la URL del icono del clima
const getWeatherIconUrl = (iconCode: string, size: "1x" | "2x" | "4x") => {
    return `https://openweathermap.org/img/wn/${iconCode}@${size}.png`;
};

// Función para convertir Kelvin a Celsius
const convertKelvinToCelsius = (kelvin: number) => {
    return (kelvin - 273.15).toFixed(0);
};

// Función para obtener la fecha formateada
const getFormattedDate = (
    timestamp: number,
    includeDate: boolean = false,
    includeTime: boolean = false
) => {
    const date = new Date(timestamp * 1000);

    const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        day: "numeric",
        month: "long",
    };

    let formattedDate = includeDate
        ? date.toLocaleDateString(undefined, options)
        : "";
    formattedDate += includeTime ? ` ${date.toLocaleTimeString()}` : "";

    return formattedDate.trim();
};

// Función para verificar si es un nuevo día
const isNewDay = (index: number): boolean => {
    if (index === 0) {
        return true; // El primer elemento siempre es un nuevo día
    }

    const currentDate = getFormattedDate(
        props.forecastData.list[index].dt,
        true,
        false
    );
    const previousDate = getFormattedDate(
        props.forecastData.list[index - 1].dt,
        true,
        false
    );

    return currentDate !== previousDate;
};
</script>

<style scoped lang="scss">
* {
    font-family: "Nunito Sans", sans-serif;
}

ion-card {
    margin: 10px;
    border-radius: 10px;

    ion-header {
        background-color: #3498db;
        color: #fff;

        ion-title {
            padding-inline: 0;
            font-weight: 400;
        }
    }

    ion-list {
        ion-item {
            border-bottom: 1px solid #ccc;
            padding: 10px;

            ion-label {
                display: block;
            }

            .background {
                background-color: skyblue;
                border-radius: 100%;
                border: 2px solid white;
                overflow: hidden;
                margin-right: 20px;
            }
        }
    }
}

.loading-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 50vh;

    ion-spinner {
        width: 80px;
        height: 80px;
    }
}

ion-header.date-header {
    width: 80%;
}
</style>

<template>
    <div>
        <!-- Card principal para la información básica del pronóstico -->
        <ion-card v-if="forecastData && forecastData.city">
            <ion-card-header>
                <ion-card-title>{{ forecastData.city.name }} - Pronóstico</ion-card-title>
            </ion-card-header>
            <ion-card-content>
                <ion-list>
                    <ion-item v-for="forecast in forecastData.list" :key="forecast.dt">
                        <div class="background">
                            <img v-if="forecast.weather && forecast.weather[0]"
                                :src="getWeatherIconUrl(forecast.weather[0].icon, '2x')" alt="Icono del Tiempo" />
                        </div>
                        <ion-label>
                            <h3>{{ getFormattedDate(forecast.dt) }}</h3>
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
    IonCardHeader,
    IonCardTitle,
    IonItem,
    IonLabel,
    IonList,
    IonSpinner
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
const getFormattedDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};
</script>

<style scoped lang="scss">
* {
    font-family: "Nunito Sans", sans-serif;
}

ion-card {
    margin: 10px;
    border-radius: 10px;

    ion-card-header {
        background-color: #3498db;
        color: #fff;
    }

    ion-list {
        ion-item {
            border-bottom: 1px solid #ccc;
            padding: 10px;

            .background {
                background-color: skyblue;
                border-radius: 100%;
                border: 2px solid white;
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
</style>

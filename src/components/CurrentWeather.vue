<template>
    <div>
        <!-- Card principal para la información básica -->
        <ion-card v-if="weatherData">
            <div class="background">
                <img v-if="weatherData.weather && weatherData.weather[0]"
                    :src="getWeatherIconUrl(weatherData.weather[0].icon, '4x')" alt="Icono del Tiempo" />
            </div>
            <ion-card-header>
                <ion-card-title>{{ weatherData.name }}</ion-card-title>
                <ion-card-subtitle class="description" v-if="weatherData.weather && weatherData.weather[0]">
                    {{ weatherData.weather[0].description }}
                </ion-card-subtitle>
                <ion-card-title>
                    Día
                    {{ convertKelvinToCelsius(weatherData.main.temp_max) }} °C - Noche
                    {{ convertKelvinToCelsius(weatherData.main.temp_min) }} °C
                </ion-card-title>
            </ion-card-header>
        </ion-card>

        <!-- Card adicional para la información extra -->
        <ion-card v-if="weatherData">
            <ion-card-header>
                <ion-card-title>El tiempo en {{ weatherData.name }} hoy</ion-card-title>
            </ion-card-header>
            <ion-card-content>
                <ion-card-subtitle>
                    <ion-icon :icon="thermometerOutline"></ion-icon>
                    Sensación térmica:
                    {{ convertKelvinToCelsius(weatherData.main.feels_like) }} °C
                </ion-card-subtitle>
                <ion-card-subtitle>
                    <ion-icon :icon="waterOutline"></ion-icon>
                    Humedad: {{ weatherData.main.humidity }}%
                </ion-card-subtitle>
                <ion-card-subtitle>
                    Viento: {{ weatherData.wind.speed }} m/s
                </ion-card-subtitle>
                <ion-card-subtitle>
                    Presión: {{ weatherData.main.pressure }} hPa
                </ion-card-subtitle>
            </ion-card-content>
        </ion-card>

        <div v-else class="loading-container">
            <ion-spinner name="crescent"></ion-spinner>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { WeatherResponse } from "@/interfaces/WeatherInterfaces";
import {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonIcon,
    IonSpinner
} from "@ionic/vue";
import { thermometerOutline, waterOutline } from "ionicons/icons";

const props = defineProps(["weatherData"]);

// Función para convertir Kelvin a Celsius
const convertKelvinToCelsius = (kelvin: number) => {
    return (kelvin - 273.15).toFixed(0);
};

// Función para obtener la URL del icono
const getWeatherIconUrl = (iconCode: string, size: "1x" | "2x" | "4x") => {
    return `https://openweathermap.org/img/wn/${iconCode}@${size}.png`;
};
</script>

<style scoped>
* {
    font-family: "Nunito Sans", sans-serif;
}

ion-card {
    max-width: 450px;
    background-color: #ffffff;
    border: 1px solid #e6e6e6;
    border-radius: 4px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: space-between;
}

ion-card-header {
    padding: 8px;
}

ion-card-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: #333333;
}

ion-card-content {
    padding: 8px;
}

ion-card-subtitle {
    font-size: 15px;
    color: #666666;
    border-bottom: 1px solid #666;
}

ion-card img {
    display: block;
    margin-left: auto;
    margin-right: auto;
}

.description {
    border-bottom: none;
    font-size: 1.5rem;
}

.background {
    background-color: skyblue;
}

.loading-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 50vh;  
}

ion-spinner {
        width: 80px;
        height: 80px;
    }
</style>

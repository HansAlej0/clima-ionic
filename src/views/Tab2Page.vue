<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <SearchBar v-model="city" @enter="onEnter" />
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Pronostico del Clima</ion-title>
        </ion-toolbar>
      </ion-header>

      <Forecast :forecastData="forecastData" />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import Forecast from '@/components/Forecast.vue';
import { ref, onMounted } from "vue";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/vue";
import { getWeatherForecast, apiKey } from "@/services/ClimateServices";
import { ForecastResponse} from "@/interfaces/WeatherInterfaces";
import SearchBar from "@/components/SearchBar.vue";

const forecastData = ref<ForecastResponse | null>(null);
const city = ref(""); // Ciudad como variable reactiva
let timeoutId: number | NodeJS.Timeout | undefined;

const onEnter = () => {
  // Realiza la llamada cuando el usuario presiona Enter
  onCityChange();
};

// Función que se ejecuta cuando la ciudad cambia
const onCityChange = async () => {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(async () => {
    // Llamada a la API después de un retraso
    try {
      if (city.value.trim() !== "") {
        forecastData.value = await getWeatherForecast(`${city.value}&lang=es`, apiKey);
      }
    } catch (error) {
      console.error("Error al obtener el clima:", error);
    }
  }, 500);
};

// Llamada a la API cuando el componente se monta o la ciudad cambia
onMounted(onCityChange);

</script>
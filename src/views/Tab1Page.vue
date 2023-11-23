<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Logo</ion-title>
      </ion-toolbar>
      <ion-toolbar>
        <SearchBar v-model="city" @enter="onEnter" />
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Clima actual</ion-title>
        </ion-toolbar>
      </ion-header>

      <!-- Muestra la información del clima -->
      <ion-grid>
        <ion-row class="ion-justify-content-center">
          <ion-col size="auto" class="min-width">
            <CurrentWeather :weatherData="weatherData" />
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/vue";
import { getWeather, apiKey } from "@/services/ClimateServices";
import { WeatherResponse } from "@/interfaces/WeatherInterfaces";
import SearchBar from "@/components/SearchBar.vue";
import CurrentWeather from "@/components/CurrentWeather.vue";

const weatherData = ref<WeatherResponse | null>(null);
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
        weatherData.value = await getWeather(`${city.value}&lang=es`, apiKey);
      }
    } catch (error) {
      console.error("Error al obtener el clima:", error);
    }
  }, 500);
};

// Llamada a la API cuando el componente se monta o la ciudad cambia
onMounted(onCityChange);
</script>

<style scoped>
.min-width {
  min-width: 350px;
}
</style>

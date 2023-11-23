<template>
  <ion-searchbar v-model="value" class="custom-searchbar" @ionInput="onInput" @keyup.enter="onEnter"></ion-searchbar>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";
import { IonSearchbar } from "@ionic/vue";

const { modelValue } = defineProps(["modelValue"]);
const emit = defineEmits();

const value = ref(modelValue);

const onInput = (event) => {
  value.value = event.target.value;
  emit("update:modelValue", value.value);
};

const onEnter = () => {
  emit("enter");
};
</script>

<style scoped>
.custom-searchbar {
  width: 50%;
  margin: auto;
}
</style>

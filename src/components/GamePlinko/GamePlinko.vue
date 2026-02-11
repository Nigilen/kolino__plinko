<script lang="ts" setup>
import { Application } from 'pixi.js';
import { onMounted, onUnmounted, ref } from 'vue';
import { handleResize } from '@/components/GamePlinko/resize';
import { gameSetup } from './setup';

const sceneRef = ref<HTMLDivElement>();
const app = new Application();
const resize = () => {
  if (!sceneRef.value) return;
  handleResize(app, sceneRef.value);
};

onMounted( async () => {
  if (!sceneRef.value) return;
  await gameSetup(app, sceneRef.value);
  
  window.addEventListener('resize', resize);
});

onUnmounted(() => {
  window.removeEventListener('resize', resize);
  app.destroy();
});

</script>

<template>
  <div class="wrapper">
    <div ref="sceneRef" class="scene"></div>
  </div>
</template>

<style lang="css" scoped>
.scene {
  display: flex;
  inline-size: min(250px, 90vmin);
  block-size: 100%;
  aspect-ratio: 0.83 / 1;
  outline: 2px solid tomato;
}
</style>
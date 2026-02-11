<script lang="ts" setup>
import { Application } from 'pixi.js';
import { onMounted, onUnmounted, ref } from 'vue';
import { handleResize } from '@/components/GamePlinko/resize';
import { gameSetup } from './setup';
import { config } from "@/components/GamePlinko/config";


const sceneRef = ref<HTMLDivElement | null>(null);
let app: Application | null = null; 
let resizeObserver: ResizeObserver | null = null;

onMounted(async () => {
  const scene = sceneRef.value;
  if (!scene) return;

  app = new Application();
  
  await gameSetup(app, scene);

  handleResize(
    app, 
    scene.offsetWidth, scene.offsetHeight, 
    config.scene.logicalWidth, config.scene.logicalHeight
  );
  resizeObserver = new ResizeObserver(() => {
    if (app) {
      handleResize(
        app, 
        scene.offsetWidth, scene.offsetHeight, 
        config.scene.logicalWidth, config.scene.logicalHeight
      );
    };
  });
  resizeObserver.observe(scene);
});

onUnmounted(() => {
  resizeObserver?.disconnect();
  resizeObserver = null;
  app?.destroy(true, { children: true, texture: true });
  app = null;
});
</script>

<template>
  <div ref="sceneRef" class="scene"></div>
</template>

<style lang="css" scoped>
.scene {
  display: flex;
  inline-size: min(250px, 90vmin);
  block-size: 100%;
  aspect-ratio: 5 / 6;
  outline: 2px solid tomato;
}
</style>
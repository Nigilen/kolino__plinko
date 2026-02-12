<script lang="ts" setup>
import { Application, Assets } from 'pixi.js';
import { onMounted, onUnmounted, ref } from 'vue';
import { plinkoConfig } from "@/config/plinkoConfig";
import { handleResize } from '@/components/GamePlinko/resize';
import { createWorld } from '@/components/GamePlinko/factories/createWorld';
import { gameSetup } from '@/components/GamePlinko/setup';
import { assets } from '@/components/GamePlinko/assets';

const sceneRef = ref<HTMLDivElement | null>(null);
let app: Application | null = null; 
let resizeObserver: ResizeObserver | null = null;

onMounted(async () => {
  const scene = sceneRef.value;
  if (!scene) return;
  
  app = new Application();
  
  await Assets.load(assets);
  await gameSetup(app, scene);
  const world = await createWorld();

  app.stage.addChild(world);

  const updSize = () => {
    if (!scene || !app) return;

    const sceneWidth = scene.clientWidth;
    if (sceneWidth <= 0) return;
    const sceneHeight = sceneWidth / plinkoConfig.scene.aspectRatio;

    handleResize(
      app, 
      sceneWidth, sceneHeight,
      plinkoConfig.scene.logicalWidth, plinkoConfig.scene.logicalHeight
    );
  };
  updSize();
  resizeObserver = new ResizeObserver(updSize);
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
  inline-size: min(400px, 50vmin);
  aspect-ratio: 5 / 6;

  @media (orientation: portrait) {
    inline-size: min(400px, 90vmin);
  }
}
</style>
<script lang="ts" setup>
import { Application, Assets } from 'pixi.js';
import { onMounted, onUnmounted, ref } from 'vue';
import { plinkoConfig } from "@/config/plinkoConfig";
import { resizeGame } from '@/components/GamePlinko/resize';
import { createWorld } from '@/components/GamePlinko/factories/createWorld';
import { setupGame } from '@/components/GamePlinko/setup';
import { assets } from '@/components/GamePlinko/assets';
import { dropBall } from '@/components/GamePlinko/dropBall';

const sceneRef = ref<HTMLDivElement | null>(null);
let app: Application | null = null; 
let resizeObserver: ResizeObserver | null = null;
let handleDropBall: () => void;
let handleResize: () => void;

defineExpose<{
  runBall: () => void;
}>({
    runBall: () => handleDropBall(),
  });

onMounted(async () => {
  app = new Application();
  if (!sceneRef.value) return;

  const scene: HTMLDivElement = sceneRef.value;
  const logicalWidth: number = plinkoConfig.scene.logicalWidth;
  const logicalHeight: number = plinkoConfig.scene.logicalHeight;

  await Assets.load(assets);
  await setupGame(app, scene);

  const { world, ball, pin } = await createWorld();

  app.stage.addChild(world);

  
  handleDropBall = () => dropBall(app, ball, pin);
  handleResize = () => resizeGame(app, scene.clientWidth, scene.clientHeight, logicalWidth, logicalHeight);

  handleResize();
  resizeObserver = new ResizeObserver(() => handleResize());
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
  <div class="wrapper">
    <div ref="sceneRef" class="scene"></div>
  </div>
</template>

<style lang="css" scoped>
.wrapper {
  position: relative;
  display: flex;
  inline-size: min(400px, 50vmin);
  block-size: auto;
  aspect-ratio: 5 / 6;

  @media (orientation: portrait) {
    inline-size: min(400px, 90vmin);
  }
}

.scene { 
  outline: 3px dashed rgb(50, 148, 210);

  position: absolute;
  inline-size: 100%;
  block-size: 100%;
}
</style>
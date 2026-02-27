<script lang="ts" setup>
import { Application, Assets, Container, Text } from 'pixi.js';
import { onMounted, onUnmounted, ref } from 'vue';
import { plinkoConfig } from "@/config/plinkoConfig";
import { resizeGame } from '@/components/GamePlinko/resize';
import { createWorld } from '@/components/GamePlinko/factories/createWorld';
import { setupGame } from '@/components/GamePlinko/setup';
import { assets } from '@/components/GamePlinko/assets';
import { dropBall } from '@/components/GamePlinko/dropBall';

const emits = defineEmits<{
  (e: 'ballDropped', text: string): void;
}>();

const logicalWidth: number = plinkoConfig.scene.logicalWidth;
const logicalHeight: number = plinkoConfig.scene.logicalHeight;
const sceneRef = ref<HTMLDivElement | null>(null);
let app: Application | null = null; 
let resizeObserver: ResizeObserver | null = null;
let handleDropBall: () => void;
let handleResize: () => void;
let handleRestart: () => void;
let world: Container;
let ball: Container;
let pins: Container[];
let cells: any[];
let currentDrop: { stop: () => void } | undefined = undefined;

const handleDropedBall = (ball: Text) => {
  const text = ball.text;
  const timer = setTimeout(() => {
    emits('ballDropped', text);
    clearTimeout(timer);
  }, 500);
};

defineExpose<{
  runBall: () => void;
  restartGame: () => void;
}>({
    runBall: () => handleDropBall(),
    restartGame: () => handleRestart()
  });

onMounted(async () => {
  app = new Application();
  if (!sceneRef.value) return;
  const scene: HTMLDivElement | null = sceneRef.value;

  await Assets.load(assets);
  await setupGame(app, scene);

  const initGame = async () => {
    const newWorld = await createWorld();
    world = newWorld.world;
    ball = newWorld.ball;
    pins = newWorld.pins;
    cells = newWorld.cells;

    app!.stage.addChild(world);

    handleDropBall = () => {
      if (currentDrop) currentDrop.stop();
      currentDrop = dropBall(app, ball, pins, cells, (ball: Text) => handleDropedBall(ball));
    };
  };

  handleResize = () => resizeGame(app, scene.clientWidth, scene.clientHeight, logicalWidth, logicalHeight);
  handleRestart = async () => {
    await Assets.unload(assets.map((asset) => asset.src));

    plinkoConfig.ball.animation.velocity.x = Math.random() * (10 - -10) + -10;
    plinkoConfig.ball.animation.velocity.y = 0;
    plinkoConfig.ball.animation.gravity = 980;
    plinkoConfig.ball.animation.friction = 0.99;
    plinkoConfig.ball.animation.bounce = 0.6;
    plinkoConfig.scene.walls = [
      { type: 'wall', axis: "y", value: 300 - 6, direction: 1, bounce: 0.8  },
      { type: 'wall', axis: "x", value: 250 - 6, direction: 1, bounce: 0.8  },
      { type: 'wall', axis: "x", value: 6, direction: -1, bounce: 0.8  },
    ];
    plinkoConfig.ball.spawn.posX = 250 / 2;
    plinkoConfig.ball.spawn.posY = 27;

    if (currentDrop) {
      currentDrop.stop();
      currentDrop = undefined;
    };
    if (world) {
      world.destroy({ children: true, texture: true });
      if (world.parent) app!.stage.removeChild(world);
    };
    await Assets.load(assets);
    await initGame();
  };

  await initGame();
  handleResize();
  resizeObserver = new ResizeObserver(() => handleResize());
  resizeObserver.observe(scene);

});

onUnmounted(() => {
  if (currentDrop) {
    currentDrop.stop();
  }
  if (world) {
    world.destroy({ children: true, texture: true });
  }
  resizeObserver = null;
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
  position: absolute;
  inline-size: 100%;
  block-size: 100%;
}
</style>
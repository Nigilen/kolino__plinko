import type { Application } from "pixi.js";
import { STATE } from "@/components/GamePlinko/state";

export const handleResize = (app: Application, scene: HTMLDivElement) => {
  app.renderer.resize(scene.offsetWidth, scene.offsetHeight);
  app.stage.scale.set(
    scene.offsetWidth / STATE.LOGICAL_WIDTH, 
    scene.offsetHeight / STATE.LOGICAL_HEIGHT
  );
};
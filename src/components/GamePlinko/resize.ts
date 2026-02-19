import type { Application } from "pixi.js";

export const resizeGame = (
  app: Application | null, 
  sceneWidth: number, sceneHeight: number,
  logicalWidth: number, logicalHeight: number
) => {
  if (!app) return;
  app.renderer.resize(sceneWidth, sceneHeight);
  app.stage.scale.set(
    sceneWidth / logicalWidth, 
    sceneHeight / logicalHeight
  );
};
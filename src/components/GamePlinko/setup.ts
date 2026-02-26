import { Application } from "pixi.js";

export const setupGame = async (app: Application, scene: HTMLDivElement) => {
  await app.init({
    width: scene.offsetWidth,
    height: scene.offsetHeight,
    backgroundAlpha: 0,
    autoDensity: true,
    antialias: true,
    resolution: Math.min(window.devicePixelRatio || 1, 2),
  });
  scene.appendChild(app.canvas);
};

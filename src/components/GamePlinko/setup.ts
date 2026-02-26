import { Application } from "pixi.js";

export const setupGame = async (app: Application, scene: HTMLDivElement) => {
  await app.init({
    width: scene.offsetWidth,
    height: scene.offsetHeight,
    backgroundAlpha: 0,
    autoDensity: true,
    antialias: true,
    resolution: window.devicePixelRatio || 1,
  });
  scene.appendChild(app.canvas);
};

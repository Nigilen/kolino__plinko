import { Application } from "pixi.js";

export const gameSetup = async (app: Application, scene: HTMLDivElement) => {
  await app.init({
    width: scene.offsetWidth,
    height: scene.offsetHeight,
    backgroundColor: 0x000000,
    autoDensity: true,
    antialias: true,
    resolution: window.devicePixelRatio || 1,
  });
  scene.appendChild(app.canvas);
};

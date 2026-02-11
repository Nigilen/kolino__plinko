import { Application } from "pixi.js";
import { handleResize } from "./resize";

export const gameSetup = async (app: Application, sceneRef: HTMLDivElement) => {
  if (!sceneRef || !app) return;

  await app.init({
    width: sceneRef.offsetWidth,
    height: sceneRef.offsetHeight,
    backgroundColor: 0x000000,
    autoDensity: true,
    antialias: true,
    resolution: window.devicePixelRatio || 1,
  });
  sceneRef.appendChild(app.canvas);
  handleResize(app, sceneRef);
}
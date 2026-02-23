import type { Container } from "pixi.js";

export const getRadius = (container: Container): number => {
  const bounds = container.getLocalBounds();
  return bounds.width / 2;
};
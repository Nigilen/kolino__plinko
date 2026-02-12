import { Container, Graphics } from "pixi.js";

interface CircleProps {
  posX: number;
  posY: number;
  radius: number;
  fill: string;
};

export const createCircle = async (config: CircleProps) => {
  const container = new Container();
  const hole = new Graphics();
  hole.circle(config.posX, config.posY, config.radius);
  hole.fill(config.fill);
  hole.pivot.set(0.5);

  container.addChild(hole);

  return container;
}
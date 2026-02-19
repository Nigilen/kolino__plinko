import { Container, Graphics } from "pixi.js";

interface CircleProps {
  posX: number;
  posY: number;
  radius: number;
  fill: string;
};

export const createCircle = async (config: CircleProps) => {
  const container = new Container();
  const circle = new Graphics();
  circle.circle(config.posX, config.posY, config.radius);
  circle.fill(config.fill);
  circle.pivot.set(0.5);

  container.addChild(circle);
  return { container };
}
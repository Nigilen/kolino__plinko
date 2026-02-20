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
  circle.circle(0, 0, config.radius);
  circle.fill(config.fill);
  circle.pivot.set(config.radius, config.radius);
  container.addChild(circle);
  container.position.set(config.posX, config.posY);
  return { container };
}
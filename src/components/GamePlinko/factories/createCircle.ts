import { Container, Graphics } from "pixi.js";
import type { CircleProps } from "@/components/GamePlinko/types";

export const createCircle = async (props: CircleProps) => {
  const container = new Container();
  const circle = new Graphics();
  circle.circle(0, 0, props.radius);
  circle.fill(props.fill);
  circle.pivot.set(0.5);
  
  container.addChild(circle);
  container.position.set(props.posX, props.posY);
  return { container };
}
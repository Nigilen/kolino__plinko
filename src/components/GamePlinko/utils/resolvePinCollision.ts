import type { Container } from "pixi.js";
import type { BallAnimationProps, WallProps } from "@/config/plinkoConfig";

export const resolvePinCollision = (
  ball: Container, 
  pin: Container,
  config: BallAnimationProps,
) => {
  const distanceX = ball.position.x - pin.position.x;
  const distanceY = ball.position.y - pin.position.y;
  
  const distance = Math.sqrt((distanceX * distanceX) + (distanceY * distanceY));

  const normalX = distanceX / distance;
  const normalY = distanceY / distance;

  const overlap = (6 + (5)) - distance;
  ball.position.x += normalX * overlap;
  ball.position.y += normalY * overlap;

  const dotProduct = config.velocity.x * normalX + config.velocity.y * normalY;
  config.velocity.x = (config.velocity.x - 2 * dotProduct * normalX) * (config.bounce || 1);
  config.velocity.y = (config.velocity.y - 2 * dotProduct * normalY) * (config.bounce || 1);
};
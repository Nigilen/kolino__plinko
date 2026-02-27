import type { Container } from "pixi.js";
import type { BallAnimationProps } from "@/components/GamePlinko/types";

export const moveBall = (ball: Container, config: BallAnimationProps, multiply: number ) => {
  config.velocity.y += config.gravity * multiply;
  config.velocity.x *= config.friction;
  ball.position.y += config.velocity.y * multiply;
  ball.position.x += config.velocity.x * multiply;
};
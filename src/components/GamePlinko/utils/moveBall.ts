import type { Container } from "pixi.js";
import type { Config } from "../types";

export const moveBall = (multiply: number, config: Config, ball: Container) => {
  config.ball.velocity.y += config.ball.gravity * multiply;
  config.ball.velocity.x *= config.ball.friction;
  ball.position.y += config.ball.velocity.y * multiply;
  ball.position.x += config.ball.velocity.x * multiply;
};
import type { Container } from "pixi.js";
import type { Config, Obstacle } from "../types";

export const resolveCollision = (
  ball: Container, 
  obstacle: Obstacle,
  config: Config,
  pinX: number,
  pinY: number,
  ballRadius: number,
  pinRadius: number
) => {
  if (obstacle.type === "circle") {
    const distanceX = ball.position.x - pinX;
    const distanceY = ball.position.y - pinY;
    
    const distance = Math.sqrt((distanceX * distanceX) + (distanceY * distanceY));

    const normalX = distanceX / distance;
    const normalY = distanceY / distance;

    const overlap = (ballRadius + (pinRadius)) - distance;
    ball.position.x += normalX * overlap;
    ball.position.y += normalY * overlap;

    const dotProduct = config.ball.velocity.x * normalX + config.ball.velocity.y * normalY;
    config.ball.velocity.x = (config.ball.velocity.x - 2 * dotProduct * normalX) * (obstacle.bounce || 1);
    config.ball.velocity.y = (config.ball.velocity.y - 2 * dotProduct * normalY) * (obstacle.bounce || 1);

  } else if (obstacle.type === "wall") {
    if (obstacle.axis === "y") { 
      ball.position.y = obstacle.value!;
      config.ball.velocity.y = -config.ball.velocity.y * obstacle.bounce!;
    } 
    else if (obstacle.axis === "x") { 
      ball.position.x = obstacle.value!;
      config.ball.velocity.x = -config.ball.velocity.x * obstacle.bounce!;
    }
  }
};
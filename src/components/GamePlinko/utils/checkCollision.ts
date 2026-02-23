import type { Container } from "pixi.js";
import type { Obstacle } from "../types";

export const checkCollision = (
  ball: Container, 
  obstacle: Obstacle,
  pinX: number,
  pinY: number,
  ballRadius: number,
  pinRadius: number
) => {
  if (obstacle.type === "circle") {
    const distanceX = ball.position.x - pinX;
    const distanceY = ball.position.y - pinY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    return distance < (ballRadius + pinRadius);
  };
  
  if (obstacle.type === "wall") {
    const currentPos = obstacle.axis === "x" ? ball.position.x : ball.position.y;
    if (obstacle.direction === 1) {
      return currentPos > obstacle.value!;
    } else {
      return currentPos < obstacle.value!;
    }
  };
};
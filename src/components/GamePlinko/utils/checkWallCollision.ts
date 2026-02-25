import type { WallProps } from "@/config/plinkoConfig";
import type { Container } from "pixi.js";

export const checkWallCollision = (
  ball: Container, 
  wall: WallProps,
) => {
  const currentPos = wall.axis === "x" ? ball.position.x : ball.position.y;
  if (wall.direction === 1) {
    return currentPos > wall.value!;
  } else {
    return currentPos < wall.value!;
  }
};
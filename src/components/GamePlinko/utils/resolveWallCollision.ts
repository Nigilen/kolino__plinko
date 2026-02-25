import type { Container } from "pixi.js";
import type { BallAnimationProps, WallProps } from "@/config/plinkoConfig";

export const resolveWallCollision = (
  ball: Container, 
  wall: WallProps,
  config: BallAnimationProps
) => {
  if (wall.axis === "y") { 
    ball.position.y = wall.value!;
    config.velocity.y = -config.velocity.y * wall.bounce!;
  } 
  else if (wall.axis === "x") { 
    ball.position.x = wall.value!;
    config.velocity.x = -config.velocity.x * wall.bounce!;
  }
};
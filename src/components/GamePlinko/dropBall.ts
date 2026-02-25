import { checkWallCollision } from "./utils/checkWallCollision";
import { resolveWallCollision } from "./utils/resolveWallCollision";
import { checkPinCollision } from "./utils/checkPinCollision";
import { resolvePinCollision } from "./utils/resolvePinCollision";
import { Container, Ticker, type Application } from "pixi.js";
import { plinkoConfig } from "@/config/plinkoConfig";
import { moveBall } from "./utils/moveBall";

export const dropBall = (
  app: Application | null, 
  ball: Container, 
  pins: Container[], 
) => {
  if (!app || !ball) return;
  
  let accumulator = 0;
  
  const animationTicker = (ticker: Ticker) => {
    const physycsTimeStep = 1 / 60;
    const deltaTime = ticker.elapsedMS / 1000;
    accumulator += deltaTime;
    
    while (accumulator >= physycsTimeStep) {
      
      moveBall(ball, plinkoConfig.ball.animation, physycsTimeStep);

      const hitPin = checkPinCollision(ball, pins);
      if (hitPin) {
        resolvePinCollision(ball, hitPin, plinkoConfig.ball.animation);
      }
      
      plinkoConfig.scene.walls.forEach((wall) => {
        if (checkWallCollision(ball, wall)) {
          resolveWallCollision(ball, wall, plinkoConfig.ball.animation);  
        }
      });

      accumulator -= physycsTimeStep;
    }
  };

  app.ticker.add(animationTicker);
};
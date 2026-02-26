import { checkWallCollision } from "./utils/checkWallCollision";
import { resolveWallCollision } from "./utils/resolveWallCollision";
import { checkPinCollision } from "./utils/checkPinCollision";
import { resolvePinCollision } from "./utils/resolvePinCollision";
import { Container, Ticker, type Application } from "pixi.js";
import { plinkoConfig } from "@/config/plinkoConfig";
import { moveBall } from "./utils/moveBall";
import { onBallCaught } from "./utils/onBallCaught";
import { checkBallCought } from "./utils/checkBallCought";

export const dropBall = (
  app: Application | null, 
  ball: Container, 
  pins: Container[], 
  cells: Container[]
) => {
  if (!app || !ball) return;
  
  let accumulator = 0;
  
  const animationTicker = (ticker: Ticker) => {
    const physycsTimeStep = 1 / 60;
    const deltaTime = ticker.elapsedMS / 1000;
    accumulator += deltaTime;

    let isCought = false;
    
    while (accumulator >= physycsTimeStep) {
      const prevY = ball.position.y;
      
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






      const ballCought = checkBallCought(ball, cells, prevY, plinkoConfig.ball.animation);
      if (ballCought) {
        onBallCaught(
          { 
            minX: ballCought.position.x - 10, 
            maxX: ballCought.position.x + ballCought.width - 10, 
            minY: ballCought.position.y + 10, 
            maxY: ballCought.position.y + ballCought.height 
          },
          1,
          plinkoConfig
        )
      }


      accumulator -= physycsTimeStep;
    }
  };

  app.ticker.add(animationTicker);
};
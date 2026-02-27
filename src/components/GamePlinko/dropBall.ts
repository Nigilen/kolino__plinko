import { Container, Text, Ticker, type Application, type ContainerChild } from "pixi.js";
import { plinkoConfig } from "@/config/plinkoConfig";
import { moveBall } from "@/components/GamePlinko/utils/moveBall";
import { checkWallCollision } from "@/components/GamePlinko/utils/checkWallCollision";
import { resolveWallCollision } from "@/components/GamePlinko/utils/resolveWallCollision";
import { checkPinCollision } from "@/components/GamePlinko/utils/checkPinCollision";
import { resolvePinCollision } from "@/components/GamePlinko/utils/resolvePinCollision";
import { onBallCaught } from "@/components/GamePlinko/utils/onBallCaught";
import { checkBallCought } from "@/components/GamePlinko/utils/checkBallCought";

export const dropBall = (
  app: Application | null, 
  ball: Container, 
  pins: Container[], 
  cells: Container[],
  onFinish: (ball: Text) => void
) => {
  if (!app || !ball) return;
  
  let accumulator = 0;
  let isRunning = true;
  
  const animationTicker = (ticker: Ticker) => {
    if (!ball || !ball.position) {
      app.ticker.remove(animationTicker);
      return;
    }

    const physycsTimeStep = 1 / 60;
    const deltaTime = ticker.elapsedMS / 1000;
    accumulator += deltaTime;

    while (accumulator >= physycsTimeStep && isRunning) {
      let prevY = ball.position.y;
      
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
        const ballTextChildren: Text = ballCought.children[1] as Text;
        onFinish(ballTextChildren);
        onBallCaught(
          { 
            minX: ballCought.position.x - 10, 
            maxX: ballCought.position.x + ballCought.width - 10, 
            minY: ballCought.position.y + 10, 
            maxY: ballCought.position.y + ballCought.height 
          },
          20,
          plinkoConfig
        )
      };

      accumulator -= physycsTimeStep;
    }
  };

  app.ticker.add(animationTicker);

  return {
    stop: () => {
      isRunning = false;
      app.ticker.remove(animationTicker);
    }
  };
};
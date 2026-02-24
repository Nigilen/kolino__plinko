import { Container, Ticker, type Application } from "pixi.js";
import { plinkoConfig } from "@/config/plinkoConfig";
import type { Config } from "./types";
import { checkCollision } from "./utils/checkCollision";
import { resolveCollision } from "./utils/resolveCollision";
import { onBallCaught } from "./utils/onBallCaught";
import { moveBall } from "./utils/moveBall";


const config: Config = {
  ball: {
    velocity: { x: -1.6, y: 0 }, 
    gravity: 9.8 * 100,
    friction: 0.99,
  },
  obstacles: [
    { type: 'wall', axis: "y", value: 300, direction: 1, bounce: 0.8  },
    { type: 'wall', axis: "x", value: 250, direction: 1, bounce: 0.8  },
    { type: 'wall', axis: "x", value: 6, direction: -1, bounce: 0.8  },
    { type: 'circle', x: 0, y: 250, radius: 100, bounce: 1.2 },
  ]
};



export const dropBall = (app: Application | null, ball: Container, pin: Container, bottomCell: Container) => {
  if (!app || !ball) return;

  const ballRadius = 6;
  const pinRadius = 5;

  const cellLeftBorder = 110;
  const cellRightBorder = 130;
  const cellTopBorder = bottomCell.y;
  const cellBottomBorder = bottomCell.y + bottomCell.height;

  
  
  let isCaught = false;
  const wallThickness = 1;  
  
  let accumulator = 0;
  const physycsTimeStep = 1 / 60;
  
  const animation = (ticker: Ticker) => {
    
    const deltaTime = ticker.elapsedMS / 1000;
    accumulator += deltaTime;
    
    while (accumulator >= physycsTimeStep) {
      const prevY = ball.position.y;
      
      moveBall(physycsTimeStep, config, ball);
      
      if (!isCaught) {
        const ballX = ball.position.x;
        const ballY = ball.position.y;

        const entranceMinX = cellLeftBorder + wallThickness;
        const entranceMaxX = cellRightBorder - wallThickness;

        const isInsideX = ballX > entranceMinX && ballX < entranceMaxX;
        const crossedTop = prevY < cellTopBorder && ballY >= cellTopBorder;
        const isMovingDown = config.ball.velocity.y > 0;

        if (isInsideX && crossedTop && isMovingDown) {
          isCaught = true;
          onBallCaught(
            { minX: cellLeftBorder, maxX: cellRightBorder, minY: cellTopBorder, maxY: cellBottomBorder },
            wallThickness,
            config
          );
        };
      }
      
      config.obstacles.forEach((obstacle) => {
        if (checkCollision(ball, obstacle, pin.position.x, pin.position.y, ballRadius, pinRadius)) {
          resolveCollision(ball, obstacle, config, pin.position.x, pin.position.y, ballRadius, pinRadius);  
        }
      });

      accumulator -= physycsTimeStep;
    }
  };

  app.ticker.add(animation);
};
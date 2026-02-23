import { Container, Ticker, type Application } from "pixi.js";
import { plinkoConfig } from "@/config/plinkoConfig";
import { getRadius } from "./utils/getRadius";
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

  const ballRadius = getRadius(ball);
  const pinRadius = getRadius(pin);

  const cellBounds = bottomCell.getBounds();
  const cellLeftBorder = cellBounds.x;
  const cellRightBorder = cellBounds.x + cellBounds.width;
  const cellTopBorder = cellBounds.y;
  const cellBottomBorder = cellBounds.y + cellBounds.height;
  
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
        const ballPos = ball.getGlobalPosition();
        const isInsideX = ballPos.x > cellLeftBorder + 5 && ballPos.x < cellRightBorder - 5;
        const crossedTop = prevY < cellTopBorder && ballPos.y >= cellTopBorder;
        const isMovingDown = config.ball.velocity.y > 0;

        if (isInsideX && crossedTop && isMovingDown) {
          onBallCaught(bottomCell, isCaught, wallThickness, config);
        };
      }
      
      config.obstacles.forEach((obstacle) => {
        if (checkCollision(ball, obstacle, pin.x, pin.y, ballRadius, pinRadius)) {
          resolveCollision(ball, obstacle, config, pin.x, pin.y, ballRadius, pinRadius);  
        }
      });

      accumulator -= physycsTimeStep;
    }
  };

  app.ticker.add(animation);
};
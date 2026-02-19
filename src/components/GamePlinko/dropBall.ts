import { Container, Ticker, type Application } from "pixi.js";
import { plinkoConfig } from "@/config/plinkoConfig";

interface BallConfig {
  velocity: { x: number; y: number; };
  gravity: number;
  friction: number;
  bounce: number;
};

const config: BallConfig = {
  velocity: { x: 4, y: 0 },
  gravity: 1, 
  friction: 0.99,
  bounce: 0.8,
};


export const dropBall = (app: Application | null, ball: Container) => {
  if (!app || !ball) return;



  interface Border {
    axis: "x" | "y";
    value: number;
    direction: -1 | 1;
  };

  const borders: Border[] = [
    { axis: "y", value: 234, direction: 1 },
    { axis: "x", value: 125-6, direction: 1 },
    { axis: "x", value: -125+6, direction: -1 },
  ];

  const checkCollision = (ball: Container, border: Border) => {
    const currentPos = border.axis === "x" ? ball.position.x : ball.position.y;

    if (border.direction === 1) {
      return currentPos > border.value;
    } else {
      return currentPos < border.value;
    }

  };

  const resolveCollision = (ball: Container, border: Border) => {
    if (border.axis === "y") { 
      ball.position.y = border.value;
      config.velocity.y = -config.velocity.y * config.bounce;
    } 
    else if (border.axis === "x") { 
      ball.position.x = border.value;
      config.velocity.x = -config.velocity.x * config.bounce;
    }
  };

  const animation = (ticker: Ticker) => {
    
    config.velocity.y += config.gravity * ticker.deltaTime;
    config.velocity.x *= config.friction;

    ball.position.y += config.velocity.y * ticker.deltaTime;
    ball.position.x += config.velocity.x * ticker.deltaTime;

    borders.forEach((border) => {
      if (checkCollision(ball, border)) {
        resolveCollision(ball, border);  
      }
    });

    if (Math.abs(config.velocity.y) < config.gravity && Math.abs(config.velocity.x) < config.gravity) {
      app.ticker.remove(animation);
      ball.position.y = 0;
      ball.position.x = 0;
      config.velocity.x = 4;
      config.velocity.y = 0;
    }
  };

  app.ticker.add(animation);
};
import { Container, Ticker, type Application } from "pixi.js";
import { plinkoConfig } from "@/config/plinkoConfig";

interface BallConfig {
  velocity: { x: number; y: number; };
  gravity: number;
  friction: number;
};

interface Border {
  type: "wall" | "circle";
  axis?: "x" | "y";
  value?: number;
  direction?: -1 | 1;

  x?: number;
  y?: number;
  radius?: number;
  bounce?: number;
};

const ballConfig: BallConfig = {
  velocity: { x: 0, y: 0 },
  gravity: 0.6, 
  friction: 0.995,
};

const pin = {

};

const borders: Border[] = [
  { type: 'wall', axis: "y", value: 268, direction: 1, bounce: 0.8  },
  { type: 'wall', axis: "x", value: 250, direction: 1, bounce: 0.8  },
  { type: 'wall', axis: "x", value: 12, direction: -1, bounce: 0.8  },
  { type: 'circle', x: 0, y: 250, radius: 100, bounce: 1.2 },
];

export const dropBall = (app: Application | null, ball: Container, pin: Container) => {
  if (!app || !ball) return;

  const checkCollision = (ball: Container, pin: Container, ballRadius: number, border: Border) => {
    if (border.type === "circle") {
      const distanceX = ball.position.x - pin.x;
      const distanceY = ball.position.y - pin.y;
      // Теорема Пифагора: расстояние = √(dx² + dy²)
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      return distance < (ballRadius + pin.width / 2);
    }
    
    if (border.type === "wall") {
      const currentPos = border.axis === "x" ? ball.position.x : ball.position.y;
      if (border.direction === 1) {
        return currentPos > border.value!;
      } else {
        return currentPos < border.value!;
      }
    }
  };

  const resolveCollision = (ball: Container, pin: Container, ballRadius: number, border: Border) => {

    if (border.type === "circle") {
      // 1. Находим вектор между центрами
      const distanceX = ball.position.x - pin.x;
      const distanceY = ball.position.y - pin.y;
      
      // Теорема Пифагора: расстояние = √(dx² + dy²)
      const distance = Math.sqrt((distanceX * distanceX) + (distanceY * distanceY));

      // 2. Находим нормаль (единичный вектор направления)
      const nx = distanceX / distance;
      const ny = distanceY / distance;

      // // 3. Выталкиваем шар из объекта (чтобы не застрял)
      const overlap = (ballRadius + (pin.width / 2)) - distance;
      ball.position.x += nx * overlap;
      ball.position.y += ny * overlap;

      // 4. Отражаем скорость относительно нормали
      // Формула: V_new = V_old - 2 * (V_old · N) * N
      const dotProduct = ballConfig.velocity.x * nx + ballConfig.velocity.y * ny;
      ballConfig.velocity.x = (ballConfig.velocity.x - 2 * dotProduct * nx) * (border.bounce || 1);
      ballConfig.velocity.y = (ballConfig.velocity.y - 2 * dotProduct * ny) * (border.bounce || 1);


    } else if (border.type === "wall") {
      if (border.axis === "y") { 
        ball.position.y = border.value!;
        ballConfig.velocity.y = -ballConfig.velocity.y * border.bounce!;
      } 
      else if (border.axis === "x") { 
        ball.position.x = border.value!;
        ballConfig.velocity.x = -ballConfig.velocity.x * border.bounce!;
      }
    }

  };

  const resetGame = () => {
    ball.position.set(plinkoConfig.ball.posX, plinkoConfig.ball.posY);
    ballConfig.velocity = { x: 0, y: 0 };
    app.ticker.remove(animation);
  };

  const moveBall = (dt: number) => {
    ballConfig.velocity.y += ballConfig.gravity * dt;
    ballConfig.velocity.x *= ballConfig.friction;
    ball.position.y += ballConfig.velocity.y * dt;
    ball.position.x += ballConfig.velocity.x * dt;
  };

  const animation = (ticker: Ticker) => {

    const SUB_STEPS = 4;
    const dt = Math.min(ticker.deltaTime, 2.0) / SUB_STEPS;

    for (let step = 0; step < SUB_STEPS; step++) {
      moveBall(dt);
      borders.forEach((border) => {
        if (checkCollision(ball, pin, 6, border)) {
          resolveCollision(ball, pin, 6, border);  
        }
      });
    }
      // Стабилизация покоя
    if (Math.abs(ballConfig.velocity.y) < 0.1 && Math.abs(ballConfig.velocity.x) < 0.1) {
      ballConfig.velocity.y = 0;
      ballConfig.velocity.x = 0;
      resetGame();
    }
  };

  app.ticker.add(animation);
};
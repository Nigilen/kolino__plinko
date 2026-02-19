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

  const boxConfig = app.stage.getLocalBounds();


  interface Border {
    axis: "x" | "y";
    value: number;
    direction: -1 | 1;
  };

  interface Borders {
    bottom: Border;
    right: Border;
    left: Border;
  };

  const borders: Borders = {
    bottom: { axis: "y", value: 234, direction: 1 },
    right: { axis: "x", value: 125-6, direction: 1 },
    left: { axis: "x", value: -125+6, direction: -1 },
  };

  const checkCollision = (ball: Container, border: Border) => {
    const currentPos = border.axis === "x" ? ball.position.x : ball.position.y;

    // if (border.direction === 1) {
    //   return currentPos > border.value;
    // } else {
    //   return currentPos < border.value;
    // }
    return (currentPos - border.value) * border.direction > 0;

    // —— старый подход
    // if (border.type === "bottom") {
    //   return ball.position.y > border.value;
    // } 
    // else if (border.type === "right") {
    //   return ball.position.x > border.value;
    // }
    // else if (border.type === "left") {
    //   return ball.position.x < border.value;
    // }
  };

  const resolveCollision = (ball: Container, border: Border) => {
    // —— если пересеченная граница вертикальная — равняем позицию и отражаем по вертикали
    if (border.axis === "y") { 
      ball.position.y = border.value;
      config.velocity.y = -config.velocity.y * config.bounce;
    } 
    // —— если пересеченная граница горизонтальная — равняем позицию и отражаем по горизонтали
    else if (border.axis === "x") { 
      ball.position.x = border.value;
      config.velocity.x = -config.velocity.x * config.bounce;
    }
  };

  const animation = (delta: Ticker) => {
    config.velocity.y += config.gravity * delta.deltaTime;
    config.velocity.x *= config.friction * delta.deltaTime;

    ball.position.y += config.velocity.y * delta.deltaTime;
    ball.position.x += config.velocity.x * delta.deltaTime;

    Object.values(borders).forEach((border) => {             // —— перебираем каждую границу
      if (checkCollision(ball, border)) {     // —— произошло ее пересечение???
        resolveCollision(ball, border);       // —— отправляем в обработку!

        // —— если скорость меньше гравитации — обнуляемся
        if (Math.abs(config.velocity.y) < config.gravity) {
          app.ticker.remove(animation);
          ball.position.y = 0;
          ball.position.x = 0;
          config.velocity.x = 4;
          config.velocity.y = 0;
        }
      }
    });


    // —— старый подход - хранение данных в условиях

    // // —— пол - ось (y) и значение (234)
    // if (ball.position.y > boxConfig.maxY - 66) { 
    //   ball.position.y = boxConfig.maxY - 66;
    //   config.velocity.y = -config.velocity.y * config.bounce * delta.deltaTime;
      
    //   if (Math.abs(config.velocity.y) < config.gravity) {
    //     app.ticker.remove(animation);
    //     ball.position.y = 0;
    //     ball.position.x = 0;
    //     config.velocity.x = 4;
    //     config.velocity.y = 0;
    //   }

    //   // —— правая стена - ось (x) и значение (125-6)
    // } else if (ball.position.x > boxConfig.maxX - plinkoConfig.ball.radius * 2) { 
    //   ball.position.x = boxConfig.maxX - plinkoConfig.ball.radius * 2;
    //   config.velocity.x = -config.velocity.x * delta.deltaTime;

    //   // —— левая стена - ось (x) и значение (125+6)
    // } else if (ball.position.x < -boxConfig.maxX + plinkoConfig.ball.radius * 2) { 
    //   ball.position.x = -boxConfig.maxX + plinkoConfig.ball.radius * 2;
    //   config.velocity.x = -config.velocity.x * delta.deltaTime;
    // };
  };

  app.ticker.add(animation);
};
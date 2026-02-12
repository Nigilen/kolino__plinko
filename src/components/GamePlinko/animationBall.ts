import { Container, type Application } from "pixi.js";

export const startAnimation = (app: Application, ball: Container) => {
  if (!app) return;


  const startPosY = 0;
  const endPosY = 300-66;
  const speed = { y: 0 };
  const gravity = 1;

  const animation = () => {
    speed.y += gravity;
    ball.position.y += speed.y;

    
    if (ball.position.y >= endPosY) {
      console.log(speed.y)
      ball.position.y = endPosY;
      // speed.y = -speed.y;

      app.ticker.remove(animation)
    };


  };

  app.ticker.add(animation);
};
import type { BallAnimationProps } from "@/config/plinkoConfig";
import type { Container } from "pixi.js";

export const checkBallCought = (
  ball: Container,
  cells: Container[],
  prevY: number,
  configBall: BallAnimationProps
) => {
  return cells.find((cell) => {
    const cellLeftBorder = cell.x - cell.width / 2;
    const cellRightBorder = cell.x + cell.width / 2;
    const cellTopBorder = cell.y; 

    const ballX = ball.position.x;
    const ballY = ball.position.y;

    const entranceMinX = cellLeftBorder - 5;
    const entranceMaxX = cellRightBorder + 5;

    const isInsideX = ballX > entranceMinX && ballX < entranceMaxX;
    const crossedTop = prevY < cellTopBorder && ballY >= cellTopBorder;
    const isMovingDown = configBall.velocity.y > 0;

    return (isInsideX && crossedTop && isMovingDown);
  });
}
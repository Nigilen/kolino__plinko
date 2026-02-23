import type { Container } from "pixi.js";
import type { Config } from "../types";

export const onBallCaught = (cell: Container, isCaught: boolean, wallThickness: number, config: Config) => {
  if (isCaught) return;
  
  config.obstacles.push(
    { type: "wall", axis: "x", value: cell.x + wallThickness, direction: -1, bounce: 0.5 },
    { type: "wall", axis: "x", value: cell.x + cell.width - wallThickness, direction: 1, bounce: 0.5 },
    { type: "wall", axis: "y", value: cell.y + cell.height - 45, direction: 1, bounce: 0.3 }
  );
  
  isCaught = true;
  console.log('Хоп, ла-ла-лэй!');
};
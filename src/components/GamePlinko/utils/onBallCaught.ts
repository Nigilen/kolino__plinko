import type { Container } from "pixi.js";
import type { Config } from "../types";

// ✅ Принимаем границы объектом, а не контейнер
export const onBallCaught = (
  bounds: { minX: number; maxX: number; minY: number; maxY: number },
  wallThickness: number,
  config: Config
) => {
  
  console.log('Хоп, ла-ла-лэй!');
  console.log('Bounds:', bounds);
  
  config.obstacles.push(
    // ✅ Используем переданные границы, не считаем заново
    { type: "wall", axis: "x", value: bounds.minX + 10, direction: -1, bounce: 0.5 },
    { type: "wall", axis: "x", value: bounds.maxX - 10, direction: 1, bounce: 0.5 },
    // ✅ Исправлено: пол ячейки — это maxY, а не top + 15
    { type: "wall", axis: "y", value: bounds.maxY - 15, direction: 1, bounce: 0.2 }
  );
};
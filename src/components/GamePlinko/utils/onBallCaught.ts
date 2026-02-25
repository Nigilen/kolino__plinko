// import type { Container } from "pixi.js";
// import type { Config } from "../types";

// export const onBallCaught = (
//   bounds: { minX: number; maxX: number; minY: number; maxY: number },
//   wallThickness: number,
//   config: Config
// ) => {
//   config.obstacles.push(
//     { type: "wall", axis: "x", value: bounds.minX + wallThickness, direction: -1, bounce: 0.2 },
//     { type: "wall", axis: "x", value: bounds.maxX - wallThickness, direction: 1, bounce: 0.2 },
//     { type: "wall", axis: "y", value: bounds.maxY - 15, direction: 1, bounce: 0.4 }
//   );
// };
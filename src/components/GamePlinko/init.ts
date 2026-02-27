// import type { Application, Container, Text } from "pixi.js";
// import { dropBall } from "@/components/GamePlinko/dropBall";
// import { createWorld } from "@/components/GamePlinko/factories/createWorld";

// export const initGame = async (
//   app: Application, 
//   handleDropBall: () => void, 
//   handleDropedBall: (ball: Text) => void,
// ) => {
//   let world: Container;
//   let ball: Container;
//   let pins: Container[];
//   let cells: any[];
//   let currentDrop: { stop: () => void } | undefined = undefined;

//   const newWorld = await createWorld();
//   world = newWorld.world;
//   ball = newWorld.ball;
//   pins = newWorld.pins;
//   cells = newWorld.cells;

//   app!.stage.addChild(world);

//   handleDropBall = () => {
//     if (currentDrop) {
//       currentDrop.stop();
//     }
//     currentDrop = dropBall(app, ball, pins, cells, (ball: Text) => handleDropedBall(ball));
//   };

//   return {
//     world,
//     ball,
//     pins,
//     cells,
//     handleDropBall,
//   };
// };
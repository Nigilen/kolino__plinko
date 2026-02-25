import { Container } from "pixi.js";
import { plinkoConfig } from "@/config/plinkoConfig";
import { createCircle } from "@/components/GamePlinko/factories/createCircle";
import { createCell } from "@/components/GamePlinko/factories/createCell";

export const createWorld = async () => {
  const world: Container = new Container();
  let pins: Container[] = [];

  const { container: ball } = await createCircle({...plinkoConfig.ball.paint, ...plinkoConfig.ball.spawn});
  const pinsCount = 42;
  const pinsRow = 7;

  const posX = [];

  for (let i = 0; i < 9; i++) {
    const { container } = await createCircle({...plinkoConfig.pin, posX: i * 30 + 5, posY: 230});
    pins.push(container);
    world.addChild(container);
  }
  
  // const { container } = await createCircle({...plinkoConfig.pin, posX: 0, posY: 0});
  // pins.push(container);
  // world.addChild(container);

  const { container: topCell } = await createCell(plinkoConfig.topCell);
  // const { container: bottomCell, image: bottomCellImage } = await createCell(plinkoConfig.bottomCell);
  
  world.addChild(
    ball,
    topCell,
    // bottomCell,
  );
  return { 
    world, 
    ball,
    pins,
    // bottomCell,
  };
};
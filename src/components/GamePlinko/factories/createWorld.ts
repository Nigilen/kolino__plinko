import { Container } from "pixi.js";
import { plinkoConfig } from "@/config/plinkoConfig";
import { createCircle } from "@/components/GamePlinko/factories/createCircle";
import { createCell } from "@/components/GamePlinko/factories/createCell";

export const createWorld = async () => {
  const world: Container = new Container();
  let pins: Container[] = [];

  const { container: ball } = await createCircle({...plinkoConfig.ball.paint, ...plinkoConfig.ball.spawn});

  for (let i = plinkoConfig.pins.startPinRow; i <= plinkoConfig.pins.pinRows; i++) {
    for (let j = 0; j <= i; j++) {
      const positions = {
        x: (plinkoConfig.pins.centerX - (i * plinkoConfig.pins.halfShift)) + (j * plinkoConfig.pins.shift),
        y: plinkoConfig.pins.startPosY + (i * plinkoConfig.pins.shift)
      };
      const { container } = await createCircle({
        ...plinkoConfig.pin, 
        posX: positions.x, 
        posY: positions.y
      });
      pins.push(container);
      world.addChild(container);
    };
  };

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
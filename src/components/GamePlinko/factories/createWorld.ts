import { Container } from "pixi.js";
import { plinkoConfig } from "@/config/plinkoConfig";
import { createCircle } from "@/components/GamePlinko/factories/createCircle";
import { createCell } from "@/components/GamePlinko/factories/createCell";

export const createWorld = async () => {
  const world: Container = new Container();

  const { container: ball } = await createCircle(plinkoConfig.ball);
  const { container: pin } = await createCircle(plinkoConfig.pin);
  const { container: topCell } = await createCell(plinkoConfig.topCell);
  const { container: bottomCell, image: bottomCellImage } = await createCell(plinkoConfig.bottomCell);
  bottomCellImage.rotation = Math.PI;
  
  world.addChild(
    ball,
    topCell,
    pin,
    bottomCell,
  );
  return { 
    world, 
    ball 
  };
};
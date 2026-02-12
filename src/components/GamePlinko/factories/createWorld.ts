import { Container } from "pixi.js";
import { plinkoConfig } from "@/config/plinkoConfig";
import { createCircle } from "@/components/GamePlinko/factories/createCircle";
import { createCell } from "@/components/GamePlinko/factories/createCell";

export const createWorld = async () => {
  const world = new Container();

  const ball = await createCircle(plinkoConfig.ball);
  const pin = await createCircle(plinkoConfig.pin);
  const { container: topCell } = await createCell(plinkoConfig.topCell);
  const { container: bottomCell, image: bottomCellImage } = await createCell(plinkoConfig.bottomCell);
  bottomCellImage.rotation = Math.PI;

  
  world.addChild(ball);
  world.addChild(topCell);
  world.addChild(pin);
  world.addChild(bottomCell);
  return { world, ball };
};
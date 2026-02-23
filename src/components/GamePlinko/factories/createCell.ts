import { Assets, Container, Sprite } from "pixi.js";

interface CircleProps {
  posX: number;
  posY: number;
  width: number;
  height: number;
  imageAlias: string;
};

export const createCell = async (props: CircleProps) => {
  const container = new Container();
  const texture = Assets.get(props.imageAlias);
  const image = new Sprite(texture);
  
  image.position.set(0, 0);
  image.setSize(props.width, props.height);
  image.anchor.set(0.5, 0);
  
  container.addChild(image);
  container.position.set(props.posX, props.posY);
  return { container, image };
};
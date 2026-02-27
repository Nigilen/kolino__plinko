import { Assets, Container, Sprite, Text } from "pixi.js";
import type { CellPosition } from "@/components/GamePlinko/types";

export const createCell = async (props: CellPosition) => {
  const container = new Container();
  const texture = Assets.get(props.imageAlias);
  const image = new Sprite(texture);
  let text: Text | null = null;
  if (props.bonus) {
    text = new Text({
      text: props.bonus,
      style: {
        fontFamily: "FingerPaint",
        fontSize: 10,
        fill: '#ffffff',
      },
    });
    text.anchor.set(0.5);
    text.position.set(image.x / 2, 23)
  };

  container.addChild(image);
  if (text) container.addChild(text);
  
  image.anchor.set(0.5, 0);
  image.position.set(0, 0);
  image.setSize(props.width, props.height);
  
  container.position.set(props.posX, props.posY);
  return { container, image };
};
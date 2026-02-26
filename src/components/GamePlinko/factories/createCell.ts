import { Assets, Container, Sprite, Text } from "pixi.js";

interface CircleProps {
  posX: number;
  posY: number;
  width: number;
  height: number;
  imageAlias: string;
  bonus?: number | null
};

export const createCell = async (props: CircleProps) => {
  const container = new Container();
  const texture = Assets.get(props.imageAlias);
  const image = new Sprite(texture);
  let text: Text | null = null;

  container.addChild(image);

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
    
    container.addChild(text);
  };
  
  image.position.set(0, 0);
  image.setSize(props.width, props.height);
  image.anchor.set(0.5, 0);
  
  container.position.set(props.posX, props.posY);
  return { container, image };
};
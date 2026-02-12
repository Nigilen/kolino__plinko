interface CellProps {
  posX: number;
  posY: number;
  width: number;
  height: number;
  imageAlias: string;
};

interface CircleProps {
  posX: number;
  posY: number;
  radius: number;
  fill: string;
};

interface PlinkoConfig {
  scene: {
    logicalWidth: number;
    logicalHeight: number;
    aspectRatio: number;
  };
  ball: CircleProps;
  pin: CircleProps;
  topCell: CellProps;
  bottomCell: CellProps;
};

export const plinkoConfig: PlinkoConfig = {
  scene: {
    logicalWidth: 250,
    logicalHeight: 300,
    aspectRatio: 5/6
  },
  ball: {
    posX: 250 / 2,
    posY: 27,
    radius: 6,
    fill: '#E17346',
  },
  pin: {
    posX: 0,
    posY: 0,
    radius: 10, 
    fill: '#000000',
  },
  topCell: {
    posX: 250 / 2,
    posY: 0,
    width: 30,
    height: 33,
    imageAlias: 'skull'
  },
  bottomCell: {
    posX: 250 / 2,
    posY: 300,
    width: 30,
    height: 33,
    imageAlias: 'skull'
  },
} as const;

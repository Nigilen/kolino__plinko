// export interface CellProps {
//   posX: number;
//   posY: number;
//   width: number;
//   height: number;
//   imageAlias: string;
//   bonus?: number | null
// };

export interface CircleProps {
  posX: number;
  posY: number;
  radius: number;
  fill: string;
};


export interface CellProps {
  width: number;
  height: number;
  imageAlias: string;
  bonus?: number | null
};

export interface CellPosition extends CellProps {
  posX: number;
  posY: number;
};

export interface BallAnimationProps {
  velocity: { x: number; y: number };
  gravity: number;
  friction: number;
  bounce: number;
};

export interface BallsProps {
  paint: {
    radius: number;
    fill: string;
  };
  spawn: {
    posX: number;
    posY: number;
  }
  animation: BallAnimationProps
};

export interface PinProps {
  radius: number;
  fill: string;
  bounce: number;
};

export interface WallProps {
  type: 'wall';
  axis: 'x' | 'y';
  value: number;
  direction: 1 | -1; 
  bounce: number;
};

export interface PlinkoConfig {
  scene: {
    logicalWidth: number;
    logicalHeight: number;
    aspectRatio: number;
    walls: WallProps[];
  };
  ball: BallsProps;
  pin: PinProps;
  pins: {
    startPinRow: number;
    pinRows: number;
    centerX: number;
    startPosY: number;
    shift: number;
    halfShift: number;
  };
  topCell: CellPosition;
  bottomCells: {
    paint: CellProps;
    multipliers: number[];
  };
};


export interface MainConfig {
  title: string;
  modal: {
    title: string;
    bonus: string;
    button: string;
  };
}

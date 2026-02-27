export interface CellProps {
  posX: number;
  posY: number;
  width: number;
  height: number;
  imageAlias: string;
  bonus?: number | null
};

export interface CircleProps {
  posX: number;
  posY: number;
  radius: number;
  fill: string;
};
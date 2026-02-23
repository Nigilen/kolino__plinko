export interface Config {
  ball: {
    velocity: { x: number; y: number; };
    gravity: number;
    friction: number;
  },
  obstacles: Obstacle[];
};

export interface Obstacle {
  type: "wall" | "circle";
  axis?: "x" | "y";
  value?: number;
  direction?: -1 | 1;

  x?: number;
  y?: number;
  radius?: number;
  bounce?: number;
};
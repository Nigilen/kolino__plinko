interface PlinkoConfig {
  scene: {
    logicalWidth: number;
    logicalHeight: number;
    aspectRatio: number;
  };
  topCell: {
    width: number;
    height: number;
    position: { x: number; y: number };
  };
  ball: {
    radius: number;
    startPosition: { x: number; y: number };
  };
  pin: {
    radius: number;
    position: { x: number; y: number };
  };
  bottomCell: {
    width: number;
    height: number;
    position: { x: number; y: number };
  };
};

export const plinkoConfig: PlinkoConfig = {
  scene: {
    logicalWidth: 250,
    logicalHeight: 300,
    aspectRatio: 5/6
  },
  topCell: {
    width: 100,
    height: 100,
    position: { x: 100, y: 0 }
  },
  ball: {
    radius: 10,
    startPosition: { x: 100, y: 0 }
  },
  pin: {
    radius: 10, 
    position: { x: 100, y: 0 }
  },
  bottomCell: {
    width: 100,
    height: 100,
    position: { x: 100, y: 0 }
  },
} as const;

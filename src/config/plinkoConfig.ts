import type { PlinkoConfig } from "@/components/GamePlinko/types";

export const plinkoConfig: PlinkoConfig = {
  scene: {
    logicalWidth: 250,
    logicalHeight: 300,
    aspectRatio: 5/6,
    walls: [
      { type: 'wall', axis: "y", value: 300 - 6, direction: 1, bounce: 0.8  },
      { type: 'wall', axis: "x", value: 250 - 6, direction: 1, bounce: 0.8  },
      { type: 'wall', axis: "x", value: 6, direction: -1, bounce: 0.8  },
    ]
  },
  ball: {
    paint: {
      radius: 6,
      fill: '#E17346',
    },
    spawn: {
      posX: 250 / 2,
      posY: 27,
    },
    animation: {
      velocity: { x: 12, y: 0 }, 
      gravity: 980,
      friction: 0.99,
      bounce: 0.6
    }
  },
  pin: { radius: 5, fill: '#2F2F2F', bounce: 0.6 },
  pins: {
    startPinRow: 2,
    pinRows: 8,
    centerX: 125,
    startPosY: 10,
    shift: 30,
    halfShift: 30 / 2,
  },
  topCell: {
    posX: 250 / 2,
    posY: 0,
    width: 30,
    height: 33,
    imageAlias: 'skull'
  },
  bottomCells: {
    paint: {
      width: 30,
      height: 33,
      imageAlias: 'skullBottom',
    },
    multipliers: [1, 2, 3, 4, 5, 6, 7, 8]
  }
};

import type { PlinkoConfig } from "@/components/GamePlinko/types";

export const onBallCaught = (
  bounds: { minX: number; maxX: number; minY: number; maxY: number },
  wallThickness: number,
  config: PlinkoConfig
) => {
  config.scene.walls.push(
    { type: "wall", axis: "x", value: bounds.minX + wallThickness, direction: -1, bounce: 0.5 },
    { type: "wall", axis: "x", value: bounds.maxX - wallThickness, direction: 1, bounce: 0.5 },
    { type: "wall", axis: "y", value: bounds.maxY - 15, direction: 1, bounce: 0.6 }
  );
};
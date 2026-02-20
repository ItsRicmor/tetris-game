import type { Cell, Point, TetrominoType, Rotation } from "../domain/types";

export interface ActivePieceSnapshot {
  type: TetrominoType;
  rotation: Rotation;
  position: Point;
  cells: Point[];
}

export interface GameSnapshot {
  status: "Running" | "Paused" | "GameOver";
  score: number;
  level: number;
  lines: number;

  width: number;
  height: number;
  hiddenRows: number;

  board: Cell[][];
  active: ActivePieceSnapshot;

  hold: TetrominoType | null;
  canHold: boolean;

  next: TetrominoType[];
}
import { Board } from "../board";
import type { Piece } from "../pieces/piece";

export type RotateDirection = "CW" | "CCW";

export interface RotationSystem {
  tryRotate(piece: Piece, direction: RotateDirection, board: Board): Piece;
}
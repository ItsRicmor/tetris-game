import type { TetrominoType } from "../types";

export interface PieceGenerator {
  next(): TetrominoType;
}
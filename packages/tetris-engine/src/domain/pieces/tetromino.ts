import type { Point, Rotation, TetrominoType } from "../types";

/**
 * Offsets (relative points) for each Tetromino type and rotation state.
 * These are "simple rotation" shapes (NOT SRS).
 *
 * Convention:
 * - Each piece is defined by 4 blocks (4 points).
 * - Points are relative to an "anchor" position in the board.
 */
export type ShapeOffsets = Record<Rotation, readonly Point[]>;

export const TETROMINO_OFFSETS: Record<TetrominoType, ShapeOffsets> = {
  // I piece: 4 in a line
  I: {
    /*
     * [1,1,1,1]
     */
    0: [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }],
    /*
     * [1]
     * [1]
     * [1]
     * [1]
     */
    1: [{ x: 2, y: 0 }, { x: 2, y: 1 }, { x: 2, y: 2 }, { x: 2, y: 3 }],
    /*
     * [1,1,1,1]
     */
    2: [{ x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 }],
    /*
     * [1]
     * [1]
     * [1]
     * [1]
     */
    3: [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }, { x: 1, y: 3 }],
  },

  // O piece: 2x2 square (rotation doesn't change)
  O: {
    /*
     * [1,1]
     * [1,1]
     */
    0: [{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 1 }],
    /*
     * [1,1]
     * [1,1]
     */
    1: [{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 1 }],
    /*
     * [1,1]
     * [1,1]
     */
    2: [{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 1 }],
    /*
     * [1,1]
     * [1,1]
     */
    3: [{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 1 }],
  },

  // T piece
  T: {
    /*
     * [0,1,0]
     * [1,1,1]
     */
    0: [{ x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }],
    /*
     * [1,0]
     * [1,1]
     * [1,0]
     */
    1: [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 2 }],
    /*
     * [1,1,1]
     * [0,1,0]
     */
    2: [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 2 }],
    /*
     * [0,1]
     * [1,1]
     * [0,1]
     */
    3: [{ x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 1, y: 2 }],
  },

  // S piece
  S: {
    /*
     * [0,1,1]
     * [1,1,0]
     */
    0: [{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }],
    /*
     * [1,0]
     * [1,1]
     * [0,1]
     */
    1: [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 2, y: 2 }],
    /*
     * [0,1,1]
     * [1,1,0]
     */
    2: [{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 2 }],
    /*
     * [1,0]
     * [1,1]
     * [0,1]
     */
    3: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 1, y: 2 }],
  },

  // Z piece
  Z: {
    /*
     * [1,1,0]
     * [0,1,1]
     */
    0: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 1 }],
    /*
     * [0,1]
     * [1,1]
     * [1,0]
     */
    1: [{ x: 2, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 2 }],
    /*
     * [1,1,0]
     * [0,1,1]
     */
    2: [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 2 }],
    /*
     * [0,1]
     * [1,1]
     * [1,0]
     */
    3: [{ x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 0, y: 2 }],
  },

  // J piece
  J: {
    /*
     * [1,0,0]
     * [1,1,1]
     */
    0: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }],
    /*
     * [1,1]
     * [1,0]
     * [1,0]
     */
    1: [{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }],
    /*
     * [1,1,1]
     * [0,0,1]
     */
    2: [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 2, y: 2 }],
    /*
     * [0,1]
     * [0,1]
     * [1,1]
     */
    3: [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 2 }],
  },

  // L piece
  L: {
    /*
     * [0,0,1]
     * [1,1,1]
     */
    0: [{ x: 2, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }],
    /*
     * [1,0]
     * [1,0]
     * [1,1]
     */
    1: [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 2 }],
    /*
     * [1,1,1]
     * [1,0,0]
     */
    2: [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 0, y: 2 }],
    /*
     * [1,1]
     * [0,1]
     * [0,1]
     */
    3: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }],
  },
};

export function getOffsets(type: TetrominoType, rotation: Rotation): readonly Point[] {
  return TETROMINO_OFFSETS[type][rotation];
}
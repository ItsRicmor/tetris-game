import type { Board } from "../board";
import { Piece } from "../pieces/piece";
import type { Rotation } from "../types";
import type { RotateDirection, RotationSystem } from "./rotation-system";

const KICKS = [
  { x: 0, y: 0 },
  { x: -1, y: 0 },
  { x: 1, y: 0 },
  { x: 0, y: -1 },
  { x: -2, y: 0 },
  { x: 2, y: 0 },
] as const;

function nextRotation(r: Rotation, dir: RotateDirection): Rotation {
  return dir === "CW" ? ((r + 1) % 4) as Rotation : ((r + 3) % 4) as Rotation;
}

export class SimpleRotationSystem implements RotationSystem {
  tryRotate(piece: Piece, direction: RotateDirection, board: Board): Piece {
    const rotated = piece.rotatedTo(nextRotation(piece.rotation, direction));

    for (const k of KICKS) {
      const candidate = rotated.movedBy(k.x, k.y);
      if (!board.collides(candidate.cells())) return candidate;
    }

    return piece;
  }
}
import type { Board } from "../board";
import type { Piece } from "../pieces/piece";
import type { RotateDirection, RotationSystem } from "../rotation/rotation-system";

export class MovementService {
  tryMove(piece: Piece, dx: number, dy: number, board: Board): Piece {
    const next = piece.movedBy(dx, dy);
    return board.collides(next.cells()) ? piece : next;
  }

  tryRotate(piece: Piece, direction: RotateDirection, board: Board, rot: RotationSystem): Piece {
    return rot.tryRotate(piece, direction, board);
  }
}
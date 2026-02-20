import type { Point, Rotation, TetrominoType } from "../types";
import { getOffsets } from "./tetromino";

export class Piece {
  public readonly type: TetrominoType;
  public readonly rotation: Rotation;
  public readonly position: Point; // anchor

  constructor(args: { type: TetrominoType; rotation: Rotation; position: Point }) {
    this.type = args.type;
    this.rotation = args.rotation;
    this.position = args.position;
  }

  /** Absolute occupied cells of the piece in the board. */
  cells(): Point[] {
    const offsets = getOffsets(this.type, this.rotation);
    return offsets.map((o) => ({ x: this.position.x + o.x, y: this.position.y + o.y }));
  }

  movedBy(dx: number, dy: number): Piece {
    return new Piece({
      type: this.type,
      rotation: this.rotation,
      position: { x: this.position.x + dx, y: this.position.y + dy },
    });
  }

  rotatedTo(rotation: Rotation): Piece {
    return new Piece({
      type: this.type,
      rotation,
      position: this.position,
    });
  }
}
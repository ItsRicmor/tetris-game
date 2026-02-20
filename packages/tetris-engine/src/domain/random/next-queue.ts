import type { TetrominoType } from "../types";
import type { PieceGenerator } from "./piece-generator";

export class NextQueue {
  private queue: TetrominoType[];

  constructor(private readonly gen: PieceGenerator, private readonly size: number = 5) {
    if (this.size <= 0) throw new Error("NextQueue size must be > 0");
    this.queue = Array.from({ length: this.size }, () => this.gen.next());
  }

  peek(): readonly TetrominoType[] {
    return [...this.queue];
  }

  popNext(): TetrominoType {
    const next = this.queue.shift()!;
    this.queue.push(this.gen.next());
    return next;
  }
}
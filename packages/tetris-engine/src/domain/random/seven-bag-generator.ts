import type { TetrominoType } from "../types";
import type { PieceGenerator } from "./piece-generator";

const ALL: TetrominoType[] = ["I", "O", "T", "S", "Z", "J", "L"];

export class SevenBagGenerator implements PieceGenerator {
  private bag: TetrominoType[] = [];

  constructor(private readonly rng: () => number = Math.random) {}

  next(): TetrominoType {
    if (this.bag.length === 0) this.refill();
    return this.bag.pop()!;
  }

  private refill() {
    this.bag = [...ALL];
    // Fisher-Yates shuffle
    for (let i = this.bag.length - 1; i > 0; i--) {
      const j = Math.floor(this.rng() * (i + 1));
      [this.bag[i], this.bag[j]] = [this.bag[j], this.bag[i]];
    }
  }
}
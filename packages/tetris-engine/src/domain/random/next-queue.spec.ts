import { NextQueue } from "./next-queue";
import type { PieceGenerator } from "./piece-generator";
import type { TetrominoType } from "../types";

class FakeGen implements PieceGenerator {
  private i = 0;
  private seq: TetrominoType[] = ["I","O","T","S","Z","J","L"];
  next(): TetrominoType {
    const v = this.seq[this.i % this.seq.length];
    this.i++;
    return v;
  }
}

describe("NextQueue", () => {
  it("initializes with the given size", () => {
    const q = new NextQueue(new FakeGen(), 5);
    expect(q.peek().length).toBe(5);
  });

  it("popNext shifts and refills", () => {
    const q = new NextQueue(new FakeGen(), 3);
    const before = q.peek();
    const popped = q.popNext();
    const after = q.peek();

    expect(before.length).toBe(3);
    expect(after.length).toBe(3);
    expect(popped).toBe(before[0]);
    expect(after[after.length - 1]).not.toBeUndefined();
  });
});
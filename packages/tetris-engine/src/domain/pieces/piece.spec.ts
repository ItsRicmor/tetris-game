import { Piece } from "./piece";
import { filled } from "../types";
import { Board } from "../board";

const config = { width: 10, height: 24, hiddenRows: 4 };

describe("Piece", () => {
  it("computes absolute cells from offsets + position", () => {
    const p = new Piece({ type: "O", rotation: 0, position: { x: 3, y: 0 } });
    expect(p.cells()).toEqual([
      { x: 4, y: 0 },
      { x: 5, y: 0 },
      { x: 4, y: 1 },
      { x: 5, y: 1 },
    ]);
  });

  it("board.collides detects piece out of bounds", () => {
    const b = Board.create(config);
    const p = new Piece({ type: "I", rotation: 0, position: { x: 8, y: 0 } }); // would exceed width
    expect(b.collides(p.cells())).toBe(true);
  });

  it("board.collides detects overlap with filled cells", () => {
    let b = Board.create(config);
    b = b.withCell({ x: 4, y: 10 }, filled("T"));

    const p = new Piece({ type: "O", rotation: 0, position: { x: 3, y: 10 } });
    expect(b.collides(p.cells())).toBe(true);
  });

  it("movedBy returns a new piece with updated position", () => {
    const p = new Piece({ type: "T", rotation: 0, position: { x: 3, y: 0 } });
    const p2 = p.movedBy(1, 2);

    expect(p.position).toEqual({ x: 3, y: 0 });
    expect(p2.position).toEqual({ x: 4, y: 2 });
  });
});
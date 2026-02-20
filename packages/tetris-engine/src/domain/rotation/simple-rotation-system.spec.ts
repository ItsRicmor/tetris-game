import { Board } from "../board";
import { filled } from "../types";
import { Piece } from "../pieces/piece";
import { SimpleRotationSystem } from "./simple-rotation-system";

const config = { width: 10, height: 24, hiddenRows: 4 };

describe("SimpleRotationSystem", () => {
  it("rotates in free space (returns a different piece)", () => {
    const board = Board.create(config);
    const rot = new SimpleRotationSystem();

    const piece = new Piece({ type: "T", rotation: 0, position: { x: 3, y: 5 } });
    const rotated = rot.tryRotate(piece, "CW", board);

    expect(rotated.rotation).toBe(1);
    // Should not collide in free space
    expect(board.collides(rotated.cells())).toBe(false);
  });

  it("applies kick near the left wall (rotation succeeds by shifting)", () => {
    const board = Board.create(config);
    const rot = new SimpleRotationSystem();

    // Place a T piece very close to the left wall; rotation might collide without kicks.
    const piece = new Piece({ type: "T", rotation: 0, position: { x: 0, y: 5 } });

    const rotated = rot.tryRotate(piece, "CCW", board);

    // Either it rotates in place or with a kick, but must be valid and rotated.
    expect(rotated.rotation).toBe(3);
    expect(board.collides(rotated.cells())).toBe(false);

    // It should not be exactly the same piece in most near-wall cases
    // (not strictly guaranteed depending on offsets, but usually true).
    expect(rotated.position.x).toBeGreaterThanOrEqual(piece.position.x);
  });

  it("rejects rotation when all kick candidates collide (returns original piece)", () => {
    let board = Board.create(config);
    const rot = new SimpleRotationSystem();

    // Choose a piece and surround its rotated candidates with blocks.
    // We'll use a T piece and block the area around it.
    const piece = new Piece({ type: "T", rotation: 0, position: { x: 4, y: 10 } });

    // Create the rotated version in place to know where it would land.
    const rotatedInPlace = piece.rotatedTo(1); // CW would go to rotation 1 from 0
    const cellsToBlock = rotatedInPlace.cells();

    // Block all cells the rotated piece would need at (0,0) kick
    for (const p of cellsToBlock) {
      board = board.withCell(p, filled("I"));
    }

    // Also block the cells for each kick candidate (to force rejection)
    const kickOffsets = [
      { x: -1, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: -1 },
      { x: -2, y: 0 },
      { x: 2, y: 0 },
    ];

    for (const k of kickOffsets) {
      const kicked = rotatedInPlace.movedBy(k.x, k.y);
      for (const p of kicked.cells()) {
        board = board.withCell(p, filled("I"));
      }
    }

    const result = rot.tryRotate(piece, "CW", board);

    // Rotation rejected → same rotation & position
    expect(result.rotation).toBe(piece.rotation);
    expect(result.position).toEqual(piece.position);
  });
});
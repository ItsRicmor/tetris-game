import { Cell, EMPTY, Point } from "../types";

export interface BoardConfig {
  readonly width: number;      // 10
  readonly height: number;     // 24 (include hidden rows)
  readonly hiddenRows: number; // 4
}

export class Board {
  public readonly width: number;
  public readonly height: number;
  public readonly hiddenRows: number;

  private readonly grid: Cell[][]; // [y][x]

  constructor(config: BoardConfig, grid?: Cell[][]) {
    this.width = config.width;
    this.height = config.height;
    this.hiddenRows = config.hiddenRows;

    this.grid = grid ?? Board.createEmptyGrid(this.width, this.height);
    Board.assertGridShape(this.grid, this.width, this.height);
  }

  static create(config: BoardConfig): Board {
    return new Board(config);
  }

  static createEmptyGrid(width: number, height: number): Cell[][] {
    return Array.from({ length: height }, () =>
      Array.from({ length: width }, () => EMPTY),
    );
  }

  private static assertGridShape(grid: Cell[][], width: number, height: number) {
    if (grid.length !== height) {
      throw new Error(`Invalid grid height. Expected ${height}, got ${grid.length}`);
    }
    for (let y = 0; y < height; y++) {
      if (grid[y].length !== width) {
        throw new Error(`Invalid grid width at row ${y}. Expected ${width}, got ${grid[y].length}`);
      }
    }
  }

  isInside(p: Point): boolean {
    return p.x >= 0 && p.x < this.width && p.y >= 0 && p.y < this.height;
  }

  getCell(p: Point): Cell {
    if (!this.isInside(p)) throw new Error(`Point out of bounds: (${p.x},${p.y})`);
    return this.grid[p.y][p.x];
  }

  /** Returns a NEW board with the cell updated (immutable style). */
  withCell(p: Point, cell: Cell): Board {
    if (!this.isInside(p)) throw new Error(`Point out of bounds: (${p.x},${p.y})`);

    const next = this.grid.map((row) => row.slice());
    next[p.y][p.x] = cell;

    return new Board(
      { width: this.width, height: this.height, hiddenRows: this.hiddenRows },
      next,
    );
  }

  /** True if any point is outside OR overlaps a filled cell */
  collides(points: readonly Point[]): boolean {
    for (const p of points) {
      if (!this.isInside(p)) return true;
      const cell = this.getCell(p);
      if (cell.kind === "filled") return true;
    }
    return false;
  }

  /** Place blocks (assumes caller verified no collision). Returns NEW board. */
  place(points: readonly Point[], makeCell: (p: Point) => Cell): Board {
    let next: Board = this;
    for (const p of points) {
      next = next.withCell(p, makeCell(p));
    }
    return next;
  }

  /** Clears full lines (across full width). Returns { board, cleared }. */
  clearFullLines(): { board: Board; cleared: number } {
    const rowsToKeep: Cell[][] = [];
    let cleared = 0;

    for (let y = 0; y < this.height; y++) {
      const row = this.grid[y];
      const isFull = row.every((c) => c.kind === "filled");
      if (isFull) cleared++;
      else rowsToKeep.push(row);
    }

    if (cleared === 0) return { board: this, cleared: 0 };

    const emptyRow = Array.from({ length: this.width }, () => EMPTY);
    const newGrid: Cell[][] = [
      ...Array.from({ length: cleared }, () => emptyRow),
      ...rowsToKeep,
    ];

    return {
      board: new Board(
        { width: this.width, height: this.height, hiddenRows: this.hiddenRows },
        newGrid,
      ),
      cleared,
    };
  }

  toMatrix(): Cell[][] {
    return this.grid.map((row) => row.slice());
  }
}
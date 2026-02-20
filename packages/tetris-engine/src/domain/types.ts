export type TetrominoType = "I" | "O" | "T" | "S" | "Z" | "J" | "L";
export type Rotation = 0 | 1 | 2 | 3;

export interface Point {
  readonly x: number;
  readonly y: number;
}

export interface FilledCell {
  readonly kind: "filled";
  readonly type: TetrominoType;
}

export interface EmptyCell {
  readonly kind: "empty";
}

export type Cell = EmptyCell | FilledCell;

export const EMPTY: EmptyCell = { kind: "empty" };

export const filled = (type: TetrominoType): FilledCell => ({
  kind: "filled",
  type,
});

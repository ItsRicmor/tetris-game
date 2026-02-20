import TetrisClient from "@/features/tetris/TetrisClient";

export default function TetrisPage() {
  return (
    <main style={{ padding: 16 }}>
      <h1 style={{ marginBottom: 12 }}>Tetris</h1>
      <TetrisClient />
    </main>
  );
}
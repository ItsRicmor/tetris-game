import type { TetrominoType } from "@/packages/tetris-engine/src";

interface NextQueueProps {
  next: readonly TetrominoType[];
}

export const NextQueue = ({ next }: NextQueueProps) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
        Next
      </h3>
      <ol className="space-y-2 list-decimal list-inside text-white">
        {next.map((t, idx) => (
          <li key={`${t}-${idx}`} className="text-lg font-semibold">
            {t}
          </li>
        ))}
      </ol>
    </div>
  );
}

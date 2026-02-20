import type { TetrominoType } from "@/packages/tetris-engine/src";

interface HoldDisplayProps {
  hold: TetrominoType | null;
  canHold: boolean;
}

export const HoldDisplay = ({ hold, canHold }: HoldDisplayProps) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
        Hold
      </h3>
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold text-white">
          {hold ?? "—"}
        </span>
        {!canHold && (
          <span className="text-xs text-gray-500">(locked)</span>
        )}
      </div>
    </div>
  );
}

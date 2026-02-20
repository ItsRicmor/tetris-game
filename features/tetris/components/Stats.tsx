interface StatsProps {
  status: string;
  score: number;
  level: number;
  lines: number;
}

export const Stats = ({ status, score, level, lines }: StatsProps) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 space-y-2">
      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
        Stats
      </h3>
      <div className="flex justify-between">
        <span className="text-gray-400">Status:</span>
        <span className="font-semibold text-white">{status}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-400">Score:</span>
        <span className="font-semibold text-white">{score}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-400">Level:</span>
        <span className="font-semibold text-white">{level}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-400">Lines:</span>
        <span className="font-semibold text-white">{lines}</span>
      </div>
    </div>
  );
}

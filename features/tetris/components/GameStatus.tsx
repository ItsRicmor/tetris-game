interface GameStatusProps {
  status: "Running" | "Paused" | "GameOver";
}

export const GameStatus = ({ status }: GameStatusProps) => {
  if (status === "Running") return null;

  return (
    <div className="mt-4 text-center">
      {status === "GameOver" && (
        <div className="px-4 py-2 bg-red-500/20 border border-red-500 rounded-lg text-red-400 font-semibold">
          Game Over — press R to restart
        </div>
      )}
      {status === "Paused" && (
        <div className="px-4 py-2 bg-yellow-500/20 border border-yellow-500 rounded-lg text-yellow-400 font-semibold">
          Paused — press P to resume
        </div>
      )}
    </div>
  );
}

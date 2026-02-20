export const Controls = () => {
  return (
    <div className="mb-4 bg-gray-800/50 rounded-lg p-3 text-sm text-gray-400">
      <p className="font-semibold text-gray-300 mb-2">Controls:</p>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1">
        <span>← → Move</span>
        <span>↑ / Z Rotate</span>
        <span>↓ Soft Drop</span>
        <span>Space Hard Drop</span>
        <span>C Hold</span>
        <span>P Pause</span>
        <span className="col-span-2">R Restart</span>
      </div>
    </div>
  );
}

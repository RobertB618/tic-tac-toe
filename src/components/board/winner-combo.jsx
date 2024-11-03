import useTicStore from "@/store";
import { getWinningCells, getLine } from "@/lib/Game-Functions";

// WinnerCombo component to visually indicate the winning combination on the board
function WinnerCombo() {
  // Get the winner information from the Zustand store
  const winner = useTicStore((state) => state.winner);

  // If there is no winner, return null (do not render anything)
  if (!winner || winner.player===-1) return null;

  // Get the cells that form the winning combination
  const winningCells = getWinningCells(winner.winplace);

  // Get the line details to draw a line across the winning combination
  const line = getLine(winningCells);

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="absolute inset-0 z-10"
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    >
      {/* Draw a line through the winning cells */}
      <line {...line} stroke="white" strokeWidth="3" strokeLinecap="round" />

      {/* Draw circles at each of the winning cells */}
      {winningCells.map(({ cx, cy }, index) => (
        <circle
          key={index}
          cx={`${cx}%`} // Center x position within each cell
          cy={`${cy}%`} // Center y position within each cell
          r="4%" // Radius of the circle as a percentage of the viewbox
          fill="white"
        />
      ))}
    </svg>
  );
}

export default WinnerCombo;



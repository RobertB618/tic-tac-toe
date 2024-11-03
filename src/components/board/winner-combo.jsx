import useTicStore from "@/store"
import { getWinningCells, getLine } from "@/lib/Game-Functions"

function WinnerCombo() {
    const winner = useTicStore((state) => state.winner)
    if (!winner) return null

    const winningCells = getWinningCells(winner.winplace)
    const line = getLine(winningCells)
    return (
        <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 z-10 "
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
        >
            <line {...line} stroke="white" strokeWidth="3" strokeLinecap="round" />
            {winningCells.map(({ cx, cy }, index) => (
                <circle
                    key={index}
                    cx={`${cx}% `} // Center x within each cell
                    cy={`${cy}%`} // Center y within each cell
                    r="4%" // Radius of circle as a percentage of the viewbox
                    fill="white"
                />
            ))}
        </svg>
    )
}


export default WinnerCombo



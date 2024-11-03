import { usePlayer } from '../../hooks/player-context';
import useTicStore from '../../store';

// PlayerStatus component to display the current status of the player
function PlayerStatus() {
    // Get player index (0 or 1) from the context
    const { playerIndex } = usePlayer();
    
    // Get the current winner status from Zustand store
    const winnerData = useTicStore((state) => state.winner);
    
    // Get the current player turn from Zustand store
    const playerTurn = useTicStore((state) => state.playerTurn);
    
    // Check if it is the current player's turn
    const isMyTurn = playerTurn === playerIndex;
    
    // Get the current state of the board from Zustand store
    const boardState = useTicStore((state) => state.boardState);

    // Check if the game has just started (all cells are empty)
    const isGameStart = boardState.every(cell => cell === 0);

    // If there is a winner (or a draw)
    if (winnerData) {
        // Handle draw case
        if (winnerData === 'draw') {
            return (
                <div className="p-3 rounded-lg bg-yellow-500/20 border border-yellow-500">
                    <div className="text-center text-lg font-bold text-yellow-400">
                        Its a draw! 🤝
                    </div>
                </div>
            );
        }

        // Handle win/lose case
        const winnerPlayer = winnerData.winnerPlayer;
        const hasWon = playerIndex === winnerPlayer;

        return (
            <div className={`p-3 rounded-lg ${
                hasWon 
                ? 'bg-green-500/20 border border-green-500'  // Background for winning player
                : 'bg-red-500/20 border border-red-500'      // Background for losing player
            }`}>
                <div className="text-center text-lg font-bold">
                    {hasWon ? (
                        <span className="text-green-400">¡You win! 🎉</span>
                    ) : (
                        <span className="text-red-400">You lost! 😔</span>
                    )}
                </div>
            </div>
        );
    }

    // If the game is just starting
    if (isGameStart) {
        return (
            <div className="p-4">
                <span className="text-orange-400 text-lg font-bold">
                    Game started! {isMyTurn ? 'Your turn:' : 'Wait your opponent.'}
                </span>
            </div>
        );
    }

    // Default case during the game, displaying whose turn it is
    return (
        <div className={`p-4 rounded-lg transition-colors duration-300 ${
            isMyTurn 
            ? 'bg-blue-500/20 border border-blue-500'  // Background for current player's turn
            : 'bg-gray-700/20'                        // Background for waiting player
        }`}>
            <span className={`text-lg font-bold ${
                isMyTurn ? 'text-orange-400' : 'text-orange-400'
            }`}>
                {isMyTurn ? 'Your turn:' : 'Wait your opponent.'}
            </span>
        </div>
    );
}

export default PlayerStatus;

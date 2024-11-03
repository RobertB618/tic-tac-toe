import { usePlayer } from '../../hooks/player-context';
import useTicStore from '../../store';

function PlayerStatus() {
    const { playerIndex } = usePlayer();
    const winnerData = useTicStore((state) => state.winner);
    const playerTurn = useTicStore((state) => state.playerTurn);
    const isMyTurn = playerTurn === playerIndex;
    const boardState = useTicStore((state) => state.boardState);
    
    // Verificar si es el inicio del juego (tablero vacío)
    const isGameStart = boardState.every(cell => cell === 0);
    
    if (winnerData) {
        if (winnerData === 'draw') {
            return (
                <div className="p-3 rounded-lg bg-yellow-500/20 border border-yellow-500">
                    <div className="text-center text-lg font-bold text-yellow-400 h">
                        Its a draw! 🤝
                    </div>
                </div>
            );
        }

        const winnerPlayer = winnerData.winnerPlayer;
        const hasWon = playerIndex === winnerPlayer;
        return (
            <div className={`p-3 rounded-lg     ${
                hasWon 
                ? 'bg-green-500/20 border border-green-500' 
                : 'bg-red-500/20 border border-red-500'
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

    if (isGameStart) {
        return (
            <div className="p-4">
                <span className="text-orange-400 text-lg font-bold">
                    Game started! {isMyTurn ? 'Your turn:' : 'Wait your opponent.'}
                </span>
            </div>
        );
    }

    return (
        <div className={`p-4 rounded-lg transition-colors duration-300 ${
            isMyTurn 
            ? 'bg-blue-500/20 border border-blue-500' 
            : 'bg-gray-700/20'
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

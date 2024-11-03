import useTicStore from '@/store';
import Cross from '@/components/board/cross';
import Circle from '@/components/board/circle';

// Header component representing the header of the game board, which includes player names and scores
function Header() {
  return (
    <header className="relative flex inset-x-0 h-[5rem] border-b-[1px] border-[#313131] bg-[#171717]">
      {/* Display Player 1's information on the left side */}
      <div className="flex-1 flex justify-center items-center">
        <PlayerDisplay playerIndex={0} />
      </div>
      {/* Display the Score in the center */}
      <div className="absolute flex justify-center items-center h-full w-[20rem] left-[50%] -translate-x-[50%]">
        <ScoreDisplay />
      </div>
      {/* Display Player 2's information on the right side */}
      <div className="flex-1 flex justify-center items-center">
        <PlayerDisplay playerIndex={1} />
      </div>
    </header>
  );
}

export default Header;

// PlayerDisplay component to display information about a specific player
function PlayerDisplay({ playerIndex }) {
  // Retrieve player details from Zustand store
  const players = useTicStore((state) => state.players);
  const playerTurn = useTicStore((state) => state.playerTurn);
  const winner = useTicStore((state) => state.winner);
  const player = players[playerIndex];

  // If the player does not exist (e.g., the game has not yet started), return null
  if (!player) return null;

  // Determine if it is the current player's turn
  const isCurrentTurn = playerIndex === playerTurn;

  return (
    <div
      className={`text-lg font-semibold transition-colors ${
        isCurrentTurn && !winner ? 'text-green-500' : 'text-gray-400'
      }`}
    >
      {player.name}
    </div>
  );
}

// ScoreDisplay component to display the current scores of both players
function ScoreDisplay() {
  // Retrieve player information from Zustand store
  const players = useTicStore((state) => state.players);

  // If there are not yet 2 players, indicate that we are waiting for players to join
  if (players.length < 2) {
    return <div className="text-blue-500">Waiting for players...</div>;
  }

  // Get scores for both players (default to 0 if not available)
  const crossScore = players[0]?.score || 0;
  const circleScore = players[1]?.score || 0;

  // Function to determine the color of the score text based on who is winning
  const getScoreColor = (score1, score2) => {
    if (score1 === score2) return 'text-white'; // Draw
    return score1 > score2 ? 'text-green-500' : 'text-red-500'; // Winning or losing
  };

  return (
    <div className="flex items-center text-xl">
      <span className="text-white mr-2">Score:</span>
      <div className="flex items-center">
        {/* Display Player 1's score (Cross icon) */}
        <div className="flex items-center">
          <Cross className="w-4 h-4 translate-y-[1px]" />
          <span className={`ml-1 ${getScoreColor(crossScore, circleScore)}`}>
            {crossScore}
          </span>
        </div>
        <span className="text-white mx-2">-</span>
        {/* Display Player 2's score (Circle icon) */}
        <div className="flex items-center">
          <Circle className="w-4 h-4 translate-y-[1px]" />
          <span className={`ml-1 ${getScoreColor(circleScore, crossScore)}`}>
            {circleScore}
          </span>
        </div>
      </div>
    </div>
  );
}

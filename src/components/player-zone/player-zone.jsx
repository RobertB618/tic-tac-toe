import Board from '@/components/board';
import PlayerChat from './player-chat';
import { PlayerProvider } from '@/hooks/player-context';
import PlayerStatus from './player-status';
import useTicStore from '@/store';

// PlayerZone component to represent the area dedicated to a player, including the board, chat, and status
function PlayerZone({ player }) {
  // Get the players array from the Zustand store
  const players = useTicStore((state) => state.players);

  // Get the current player data based on the `player` index passed as a prop
  const currentPlayer = players[player];

  return (
    // Provide the current player context to the components inside PlayerZone
    <PlayerProvider player={currentPlayer}>
      <div className="flex-1 min-w-[30vw] flex flex-col justify-center items-center h-full px-2 gap-3">
        {/* Display the current player's status */}
        <PlayerStatus />
        
        {/* Display the game board */}
        <div className="flex justify-center items-center pb-8">
          <Board />
        </div>
        
        {/* Display the chat component for the player */}
        <PlayerChat />
      </div>
    </PlayerProvider>
  );
}

export default PlayerZone;

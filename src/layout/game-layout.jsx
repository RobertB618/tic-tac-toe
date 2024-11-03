import Header from '@/components/header/header';
import PlayerZone from '@/components/player-zone';
import useTicStore from '@/store';

// GameLayout component to represent the overall layout of the game
function GameLayout() {
  // Get the players array from Zustand store
  const players = useTicStore((state) => state.players);

  // Create a PlayerZone for each player, mapping over the players array
  const playersZones = players.map((player, index) => (
    <PlayerZone player={index} key={player.id} />
  ));

  return (
    <main className="flex flex-col h-full w-full bg-[#171717]">
      {/* Header component for displaying the game header */}
      <Header />
      {/* Container for displaying the player zones */}
      <div className="flex-1 flex w-full px-1 gap-1">
        {playersZones}
      </div>
    </main>
  );
}

export default GameLayout;

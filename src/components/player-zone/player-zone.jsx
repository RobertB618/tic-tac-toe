import Board from '@/components/board'
import PlayerChat from './player-chat'
import { PlayerProvider } from '@/hooks/player-context'
import PlayerStatus from './player-status'
import useTicStore from '@/store'

function PlayerZone({ player }) {
  const players = useTicStore((state) => state.players)
  const currentPlayer = players[player]

  return (
    <PlayerProvider player={currentPlayer}>
      <div className="flex-1 min-w-[30vw] flex flex-col justify-center items-center h-full px-2 gap-3">
        <PlayerStatus />
        <div className="flex justify-center items-center pb-8">
          <Board />
        </div>
        <PlayerChat />
      </div>
    </PlayerProvider>
  )
}

export default PlayerZone

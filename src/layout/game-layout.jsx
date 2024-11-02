import Header from '@/components/header/header'
import PlayerZone from '@/components/player-zone'
import useTicStore from '@/store'
function GameLayout() {
  const players = useTicStore((state) => state.players)
  const playersZones = players.map((player, index) => <PlayerZone player={index} key={player.id} />)
  return (
    <main className="flex flex-col h-full w-full  bg-[#171717]">
      <Header />
      <div className=" flex-1 flex w-full px-1 gap-1 ">
        {playersZones}
      </div>
    </main>
  )
}

export default GameLayout

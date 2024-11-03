import useTicStore from '@/store'
import Cross from '@/components/board/cross'
import Circle from '@/components/board/circle'



function Header() {
  const winner=useTicStore(state=>state.winner)
  return (
    <header className="relative flex inset-x-0 h-[5rem] border-b-[1px] border-[#313131] bg-[#171717]">
      <div className="flex-1 flex justify-center items-center">
        <PlayerDisplay playerIndex={0} />
      </div>
      <div className="absolute flex justify-center items-center h-full w-[20rem] left-[50%] -translate-x-[50%]">
        <ScoreDisplay />
      </div>
      <div className="flex-1 flex justify-center items-center">
        <PlayerDisplay playerIndex={1} />
      </div>

    
    </header>
  )
}


export default Header
function PlayerDisplay({ playerIndex }) {
  const players = useTicStore((state) => state.players)
  const playerTurn = useTicStore((state) => state.playerTurn)
  const winner = useTicStore((state) => state.winner)
  const player = players[playerIndex]

  if (!player) return null

  const isCurrentTurn = playerIndex === playerTurn
  return (
    <div
      className={`text-lg font-semibold transition-colors ${isCurrentTurn && !winner ? 'text-green-500' : 'text-gray-400'}`}
    >
      {player.name}
    </div>
  )
}

function ScoreDisplay() {
  const players = useTicStore((state) => state.players)

  if (players.length < 2) {
    return <div className="text-blue-500">Waiting for players...</div>
  }

  const crossScore = players[0]?.score || 0
  const circleScore = players[1]?.score || 0

  const getScoreColor = (score1, score2) => {
    if (score1 === score2) return 'text-white'
    return score1 > score2 ? 'text-green-500' : 'text-red-500'
  }

  return (
    <div className="flex items-center text-xl">
      <span className="text-white mr-2">Score:</span>
      <div className="flex items-center">
        <div className="flex items-center">
          <Cross className="w-4 h-4 translate-y-[1px]" />
          <span className={`ml-1 ${getScoreColor(crossScore, circleScore)}`}>
            {crossScore}
          </span>
        </div>
        <span className="text-white mx-2">-</span>
        <div className="flex items-center">
          <Circle className="w-4 h-4 translate-y-[1px]" />
          <span className={`ml-1 ${getScoreColor(circleScore, crossScore)}`}>
            {circleScore}
          </span>
        </div>
      </div>
    </div>
  )
}

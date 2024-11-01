import Board from '@/components/board';
import PlayerChat from './player-chat';
function PlayerZone() {
  return (
    <>
      <div className="flex-1  min-w-[30vw] flex flex-col justify-center items-center h-full px-2 gap-3">
        <div> playerStatus</div>
        <div className="flex justify-center items-center pb-8">
        <Board />
        </div>
        <PlayerChat/>
      </div>
    </>
  );
}

export default PlayerZone;

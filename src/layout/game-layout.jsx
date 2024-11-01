import Header from '@/components/header/header';
import PlayerZone from '@/components/player-zone';

function GameLayout() {
  return (
    <main className="flex flex-col h-full w-full  bg-[#171717]">
      <Header />
      <div className=" flex-1 flex w-full px-1 gap-1 ">
         <PlayerZone player={0}/>
        <PlayerZone player={1}/> 
      </div>
    </main>
  );
}

export default GameLayout;

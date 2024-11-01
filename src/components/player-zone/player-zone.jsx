
function PlayerZone() {
  return (
    <>
      <div className="flex-1  min-w-[30vw] flex flex-col justify-center items-center h-full px-2 gap-3">
        <div> playerStatus</div>
        <div className="flex justify-center items-center pb-8">
        <div>board</div>
        </div>
        <div className="flex-1 bg-purple-500/40 w-full"> chat</div> 
      </div>
    </>
  );
}

export default PlayerZone;

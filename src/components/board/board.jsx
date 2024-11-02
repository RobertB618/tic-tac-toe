import useTicStore from "@/store";
import Cross from "./cross";
import Circle from "./circle";


function Board({player}) {
  const cellList = new Array(9).fill(0).map((_, index) => {
    return <Cell key={index} cellNum={index} player={player}/>;
  });
  return (
    <div className="grid grid-cols-3  gap-[1px] border-[#454545] border-[1px] rounded-xl overflow-clip bg-[#7d7d7d]">
      {cellList}
    </div>
  );
}

export default Board;

function Cell({cellNum,player}) {
  const cellValue = useTicStore((state) => state.boardState[cellNum]);
  const playerTurn = useTicStore((state) => state.playerTurn);
  const playerMove = useTicStore((state) => state.actions.playerMove);
  const winner=useTicStore((state) => state.winner);
  const IconComponent = cellValue === 1 ? Cross : Circle;
  console.log(playerMove,player)
  const clickHandler = () => {
    if (cellValue || winner || player!==playerTurn ) return;
    playerMove(cellNum);
  };

  const playerValue= player===0?1:-1
  return (
    <div className="flex justify-center items-center w-[5vw] aspect-square bg-[#313131]"
      onClick={clickHandler}
    >
      { cellValue ? <IconComponent className={cellValue!==playerValue && "saturate-[0.2]"}/> : null }

    </div>
  );
}


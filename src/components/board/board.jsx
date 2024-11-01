function Board() {
  const cellList = new Array(9).fill(0).map((cell, index) => {
    return <Cell key={index} />;
  });
  return (
    <div className="grid grid-cols-3  gap-[1px] border-[#454545] border-[1px] rounded-xl overflow-clip bg-[#7d7d7d]">
      {cellList}
    </div>
  );
}

export default Board;

function Cell() {
  return (
    <div className="flex justify-center items-center w-[5vw] aspect-square bg-[#313131]">
      x
    </div>
  );
}

function Header() {
  return (
    <header className="relative  flex inset-x-0 h-[5rem] border-b-[1px] border-[#313131] bg-[#171717]">
      <div className="flex-1 flex justify-center items-center">Player1</div>
      <div className="absolute flex justify-center items-center h-full w-[20rem]  left-[50%] -translate-x-[50%] ">
        Controls
      </div>
      <div className="flex-1 flex justify-center items-center">Player2</div>
    </header>
  );
}

export default Header;

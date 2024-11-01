import SendIcon from './send-icons';

function PlayerChat() {
  return (
    <div className="flex-1 grid grid-rows-[auto,1fr,auto] w-full bg-[#313131] rounded-t-lg border-[1px] border-[#454545]  overflow-clip">
      <div className="w-full  flex-1  rounded-l-lg gap-3 p-2 bg-[#222222]">
        <span>I</span>
        <span>Playerx</span>
      </div>

      <div className=" flex flex-col p-3 overflow-y-auto">
        <div className="flex flex-col gap-2">
          <div>message1</div>
          <div className="self-end">message2</div>
          <div>message3</div>
        </div>
      </div>

      <div className="message-input-container flex items-center p-2 rounded-lg border border-[#8b8b8b] bg-[#424242] m-3">
        <input
          type="text"
          placeholder="Message"
          className="flex-grow bg-transparent text-white placeholder-gray-400 focus:outline-none"
        />

        <button className="text-white/50 hover:text-white/70 ml-2">
          <SendIcon />
        </button>
      </div>
    </div>
  );
}

export default PlayerChat;

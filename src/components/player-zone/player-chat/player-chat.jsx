import SendIcon from './send-icons'
import Circle from '@/components/board/circle'
import Cross from '@/components/board/cross'
import { usePlayer } from '@/hooks/player-context';
//import { cn } from '@/lib';
import useTicStore from '@/store';
import { useState } from 'react';
import MessageBubble from './message-bubble';


function PlayerChat() {
  const { playerIndex } = usePlayer(); // Get player index from context
  const resetGame = useTicStore(state=>state.actions.resetGame)
  
  const chatsList = useTicStore((state) => state.chats);
  const IconPlayer = playerIndex === 0 ? Cross : Circle
  const name = playerIndex === 0 ? 'Player 1' : 'Player 2'
  const chatMessages=chatsList.map((chat)=> <MessageBubble key={chat.time} {...chat} isOwn={playerIndex===chat.player}/>)
  return (
    <div className="flex-1 grid grid-rows-[auto,1fr,auto] w-full bg-[#313131] rounded-t-lg border-[1px] border-[#454545]  overflow-clip">
      <div className="w-full  flex-1 flex justify-between items-center rounded-l-lg  p-2 bg-[#222222]">
        <div className='flex gap-3'>
          <span className="bg-[#313131] flex justify-center p-1 h-full items-center border-[#454545] border aspect-square rounded-md"><IconPlayer className="inline-flex w-4 h-4" /></span>
          <span>{name}</span>
        </div>
        <button
          className="bg-green-800 hover:bg-green-950 text-white text-sm font-medium px-3 py-[.8] rounded-md transition-colors"
          onClick={() => {
            resetGame(true); 
            
          }}
        >
          Reset
        </button>
  
      </div>

      <div className=" flex flex-col p-3 overflow-y-auto">
        <div className="flex flex-col gap-2">
          
          {chatMessages}
        </div>
        
      </div>
      <ChatInput player={playerIndex}/>
    </div>
  )
}

export default PlayerChat


function ChatInput({player}){
  const [message,setMessage]=useState('')
  const addComment=useTicStore(state=>state.actions.addComment)
  const changeMessage=(e)=>{
    setMessage(e.target.value)
  }
  const sendMessage=()=>{
    addComment({message,player})
    setMessage("")
  }
  return (
    <div className="message-input-container flex items-center p-2 rounded-lg border border-[#8b8b8b] bg-[#424242] m-3">
        <input
          type="text"
          value={message}
          onChange={changeMessage}
          placeholder="Message"
          className="flex-grow bg-transparent text-white placeholder-gray-400 focus:outline-none"
        />

        <button className="text-white/50 hover:text-white/70 ml-2"
        type="button"
          onClick={sendMessage}
        >
          <SendIcon />
        </button>
      </div>
  )
}
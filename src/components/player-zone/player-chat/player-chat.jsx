import SendIcon from './send-icons';
import Circle from '@/components/board/circle';
import Cross from '@/components/board/cross';
import { usePlayer } from '@/hooks/player-context';
import { useRef, useEffect } from 'react';
import useTicStore from '@/store';
import { useState } from 'react';
import MessageBubble from './message-bubble';

function PlayerChat() {
  const { playerIndex } = usePlayer(); // Get player index from context to determine which player (0 or 1)
  const resetGame = useTicStore((state) => state.actions.resetGame); // Access the resetGame action from Zustand store
  const textRef = useRef(); // Create a reference for the chat container to scroll it automatically
  const chatsList = useTicStore((state) => state.chats); // Get chat messages from Zustand store
  const IconPlayer = playerIndex === 0 ? Cross : Circle; // Assign player icon based on index (Player 1 or Player 2)
  const name = playerIndex === 0 ? 'Player 1' : 'Player 2'; // Assign player name based on player index
  // Create a list of chat messages using the MessageBubble component, marking whether it's the player's own message
  const chatMessages = chatsList.map((chat) => (
    <MessageBubble key={chat.time} {...chat} isOwn={playerIndex === chat.player} />
  ));

  // Scroll to the bottom whenever the chatsList changes (new message is added)
  useEffect(() => {
    textRef.current.scrollTop = textRef.current.scrollHeight;
  }, [chatsList]);

  return (
    <div className="flex-1 grid grid-rows-[auto,1fr,auto] w-full bg-[#313131] rounded-t-lg border-[1px] border-[#454545] overflow-clip">
      {/* Header Section: Player info and reset button */}
      <div className="w-full flex-1 flex justify-between items-center rounded-l-lg p-2 bg-[#222222]">
        <div className='flex gap-3'>
          {/* Player Icon */}
          <span className="bg-[#313131] flex justify-center p-1 h-full items-center border-[#454545] border aspect-square rounded-md">
            <IconPlayer className="inline-flex w-4 h-4" />
          </span>
          {/* Player Name */}
          <span>{name}</span>
        </div>
        {/* Reset Button */}
        <button
          className="bg-green-800 hover:bg-green-950 text-white text-sm font-medium px-3 py-[.8] rounded-md transition-colors"
          onClick={() => {
            resetGame(true); // Reset the game and reset the score
          }}
        >
          Reset
        </button>
      </div>

      {/* Chat Messages Section */}
      <div className="relative flex-1 flex flex-col p-3 overflow-hidden overflow-x-clip">
        <div className="absolute bottom-0 inset-0 flex flex-col gap-2 overflow-y-auto h-full" ref={textRef}>
          {chatMessages}
        </div>
      </div>
      
      {/* Chat Input Section */}
      <ChatInput player={playerIndex} />
    </div>
  );
}

export default PlayerChat;

// Component for chat input box and send button
function ChatInput({ player }) {
  const [message, setMessage] = useState(''); // State to hold the current message text
  const addComment = useTicStore((state) => state.actions.addComment); // Get addComment action from Zustand store

  // Handle input change and update the message state
  const changeMessage = (e) => {
    setMessage(e.target.value);
  };

  // Function to send a message
  const sendMessage = () => {
    if (message.trim()) {
      addComment({ message, player }); // Add the message to the store
      setMessage(""); // Clear the input field
    }
  };

  return (
    <div className="message-input-container flex items-center p-2 rounded-lg border border-[#8b8b8b] bg-[#424242] m-3">
      {/* Input Field for Message */}
      <input
        type="text"
        value={message}
        onChange={changeMessage}
        placeholder="Message"
        className="flex-grow bg-transparent text-white placeholder-gray-400 focus:outline-none"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            sendMessage(); // Send message when "Enter" key is pressed
          }
        }}
      />

      {/* Send Button */}
      <button
        className="text-white/50 hover:text-white/70 ml-2"
        type="button"
        onClick={sendMessage}
      >
        <SendIcon />
      </button>
    </div>
  );
}
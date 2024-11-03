import SendIcon from './send-icons';
import Circle from '@/components/board/circle';
import Cross from '@/components/board/cross';
import { usePlayer } from '@/hooks/player-context';
import useTicStore from '@/store';
import { useState } from 'react';
import MessageBubble from './message-bubble';

// PlayerChat component to handle the chat functionality for each player
function PlayerChat() {
  // Get the current player index (0 or 1) from context
  const { playerIndex } = usePlayer();
  
  // Get the resetGame action from Zustand store
  const resetGame = useTicStore(state => state.actions.resetGame);

  // Get the list of chat messages from Zustand store
  const chatsList = useTicStore((state) => state.chats);

  // Determine the icon to display based on the player index (Cross for Player 1, Circle for Player 2)
  const IconPlayer = playerIndex === 0 ? Cross : Circle;

  // Set player name based on the index
  const name = playerIndex === 0 ? 'Player 1' : 'Player 2';

  // Map the chat messages to MessageBubble components
  const chatMessages = chatsList.map((chat) => (
    <MessageBubble key={chat.time} {...chat} isOwn={playerIndex === chat.player} />
  ));

  return (
    <div className="flex-1 grid grid-rows-[auto,1fr,auto] w-full bg-[#313131] rounded-t-lg border-[1px] border-[#454545] overflow-clip">
      {/* Player Header Section */}
      <div className="w-full flex-1 flex justify-between items-center rounded-l-lg p-2 bg-[#222222]">
        <div className="flex gap-3">
          {/* Player Icon */}
          <span className="bg-[#313131] flex justify-center p-1 h-full items-center border-[#454545] border aspect-square rounded-md">
            <IconPlayer className="inline-flex w-4 h-4" />
          </span>
          <span>{name}</span>
        </div>
        {/* Reset Button to reset the game */}
        <button
          className="bg-green-800 hover:bg-green-950 text-white text-sm font-medium px-3 py-[.8] rounded-md transition-colors"
          onClick={() => {
            resetGame(true); // Reset the game including the scores
          }}
        >
          Reset
        </button>
      </div>

      {/* Chat Messages Section */}
      <div className="flex flex-col p-3 overflow-y-auto">
        <div className="flex flex-col gap-2">
          {chatMessages}
        </div>
      </div>

      {/* Chat Input Section */}
      <ChatInput player={playerIndex} />
    </div>
  );
}

export default PlayerChat;

// ChatInput component to handle input and submission of messages
function ChatInput({ player }) {
  // State to keep track of the current message being typed
  const [message, setMessage] = useState('');

  // Get the addComment action from Zustand store to add a new message to the chat
  const addComment = useTicStore(state => state.actions.addComment);

  // Handler to change the message state based on input value
  const changeMessage = (e) => {
    setMessage(e.target.value);
  };

  // Function to send the message and add it to the chat
  const sendMessage = () => {
    addComment({ message, player }); // Add message along with player index to chat store
    setMessage(''); // Clear input field after sending
  };

  return (
    <div className="message-input-container flex items-center p-2 rounded-lg border border-[#8b8b8b] bg-[#424242] m-3">
      <input
        type="text"
        value={message}
        onChange={changeMessage}
        placeholder="Message"
        className="flex-grow bg-transparent text-white placeholder-gray-400 focus:outline-none"
      />

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
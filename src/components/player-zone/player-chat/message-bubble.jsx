import { cn } from "@/lib";

// MessageBubble component to render chat messages with a specific style depending on who sent the message
const MessageBubble = ({ isOwn, message, time }) => {
  // Format the time of the message as "HH:MM" using a 24-hour format
  const timeText = time.toLocaleTimeString([], {
    hourCycle: 'h23',
    hour: '2-digit',
    minute: '2-digit'
  });

  // Determine the styling of the message bubble based on whether it's the player's own message or their opponent's
  const classBubble = isOwn ? 'bg-green-800 rounded-br-none' : 'bg-stone-600 rounded-bl-none';

  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
      {/* Render the message bubble */}
      <div
        className={cn('flex flex-col overflow-clip px-5 py-[4px] rounded-lg', classBubble)}
      >
        {/* Display the message text */}
        <span className="text-white text-[18px]">{message}</span>
        {/* Display the message time */}
        <span className="self-end text-[11px]">{timeText}</span>
      </div>
    </div>
  );
};

export default MessageBubble;


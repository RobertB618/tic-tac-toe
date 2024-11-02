import { cn } from "@/lib";
const MessageBubble = ({ isOwn, message,time }) =>{
  const timeText=time.toLocaleTimeString([], {
    hourCycle: 'h23',
    hour: '2-digit',
    minute: '2-digit'
})
  const classBubble=isOwn?' bg-green-800 rounded-br-none':'bg-stone-600 rounded-bl-none'
  return(<div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} `}>
    <div 
      className={cn('flex flex-col  overflow-clip px-5 py-[4px] rounded-lg  ',classBubble) }
        
    >
      
      <span className="text-white text-[18px]">{message}</span>
      <span className="self-end text-[11px]">{timeText}</span>
    </div>
  </div>);
}
export default MessageBubble

/*
${isOwn s
          ? 'bg-green-500 rounded-br-none mr-[12px]' 
          : 'bg-gray-700 rounded-bl-none ml-[12px]'
        }
      `}*/
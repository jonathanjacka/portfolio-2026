import { useEffect, useRef } from 'react';
import Markdown from 'react-markdown';
import type { ChatExchange } from '../types/chat';

interface ChatWindowProps {
  exchanges: ChatExchange[];
}

const ChatWindow: React.FC<ChatWindowProps> = ({ exchanges }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll to newest exchange when a new one is added (length changes)
  useEffect(() => {
    if (scrollRef.current && containerRef.current) {
      // Instant precision scroll to exactly align the new message at the top
      // We subtract 24px (py-6) if we want to show the top padding, 
      // but to hide previous content completely, we scroll exactly to the element
      containerRef.current.scrollTop = scrollRef.current.offsetTop;
    }
  }, [exchanges.length]);

  return (
    <div ref={containerRef} className="flex-1 w-full max-w-3xl overflow-y-auto px-4 py-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex flex-col gap-6">
        {exchanges.map((exchange, index) => {
          const isLast = index === exchanges.length - 1;

          return (
            <div
              key={exchange.id}
              ref={isLast ? scrollRef : null}
              className={`flex flex-col gap-4 transition-[min-height] duration-500 ease-out animate-in fade-in slide-in-from-bottom-4 duration-600 ${
                // Only the last item gets the min-height to ensure scroll space
                isLast ? 'min-h-[60vh]' : 'min-h-0'
                }`}
            >
              {/* User message */}
              <div className="flex items-start gap-2 justify-end">
                <div className="max-w-[75%] sm:max-w-[70%] p-3 sm:p-4 rounded-2xl bg-primary text-primary-content rounded-br-md">
                  <p className="text-sm sm:text-base whitespace-pre-wrap">
                    {exchange.userMessage}
                  </p>
                </div>
              </div>

              {/* Assistant response - spinner overlaid on dimmed avatar during streaming */}
              <div className="flex items-start gap-2 justify-start w-full">
                <div className="relative w-8 h-8 shrink-0 mt-1">
                  <img
                    src="/jon1.jpg"
                    alt="Jonathan"
                    className={`w-8 h-8 rounded-full object-cover ring-2 ring-primary transition-opacity duration-300 ${exchange.isStreaming ? 'opacity-50' : 'opacity-100'
                      }`}
                  />
                  {exchange.isStreaming && (
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 loading loading-spinner w-10 h-10 text-primary [border-width:2px]"></span>
                  )}
                </div>
                {/* Text box only appears when streaming content exists */}
                {exchange.assistantResponse && (
                  <div className="flex-1 min-w-0 p-3 sm:p-4 rounded-2xl bg-base-200 text-base-content rounded-bl-md">
                    <div className="prose prose-sm sm:prose-base prose-headings:text-base-content prose-p:text-base-content prose-strong:text-base-content prose-li:text-base-content max-w-none">
                      <Markdown>{exchange.assistantResponse}</Markdown>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChatWindow;

import { forwardRef } from 'react';
import Markdown from 'react-markdown';
import type { ChatExchange } from '../types/chat';

interface ChatExchangeCardProps {
  exchange: ChatExchange;
}

const ChatExchangeCard = forwardRef<HTMLDivElement, ChatExchangeCardProps>(
  ({ exchange }, ref) => {
    return (
      <div
        ref={ref}
        className={`flex flex-col gap-4 scroll-mt-20 transition-[min-height] duration-500 ease-out ${exchange.isStreaming ? 'min-h-[60vh]' : 'min-h-0'
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

        {/* Assistant response */}
        <div className="flex items-start gap-2 justify-start">
          <img
            src="/jon1.jpg"
            alt="Jonathan"
            className="w-8 h-8 rounded-full object-cover shrink-0 ring-2 ring-primary"
          />
          <div className="max-w-[75%] sm:max-w-[70%] p-3 sm:p-4 rounded-2xl bg-base-200 text-base-content rounded-bl-md">
            {exchange.isStreaming && !exchange.assistantResponse ? (
              <div className="flex items-center gap-2">
                <span className="loading loading-dots loading-sm"></span>
                <span className="text-sm opacity-70">Thinking...</span>
              </div>
            ) : (
              <div className="prose prose-sm sm:prose-base prose-headings:text-base-content prose-p:text-base-content prose-strong:text-base-content prose-li:text-base-content max-w-none">
                <Markdown>{exchange.assistantResponse}</Markdown>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

ChatExchangeCard.displayName = 'ChatExchangeCard';

export default ChatExchangeCard;

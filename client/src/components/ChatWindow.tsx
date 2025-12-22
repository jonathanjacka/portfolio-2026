import { useEffect, useRef } from 'react';
import Markdown from 'react-markdown';
import type { Message } from '../types/chat';

interface ChatWindowProps {
  messages: Message[];
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 w-full max-w-3xl overflow-y-auto px-4 py-6">
      <div className="flex flex-col gap-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start gap-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {/* Avatar for assistant messages */}
            {message.role === 'assistant' && (
              <img
                src="/jon1.jpg"
                alt="Jonathan"
                className="w-8 h-8 rounded-full object-cover shrink-0 ring-2 ring-primary"
              />
            )}
            <div
              className={`max-w-[75%] sm:max-w-[70%] p-3 sm:p-4 rounded-2xl transition-all duration-300 ${message.role === 'user'
                  ? 'bg-primary text-primary-content rounded-br-md'
                  : 'bg-base-200 text-base-content rounded-bl-md'
                }`}
            >
              {message.role === 'assistant' ? (
                <div className="prose prose-sm sm:prose-base prose-headings:text-base-content prose-p:text-base-content prose-strong:text-base-content prose-li:text-base-content max-w-none">
                  <Markdown>{message.content}</Markdown>
                </div>
              ) : (
                <p className="text-sm sm:text-base whitespace-pre-wrap">{message.content}</p>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatWindow;

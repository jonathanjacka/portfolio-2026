import { useState } from 'react';
import ChatWindow from '../components/ChatWindow';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Hero from '../components/Hero';
import InputBar from '../components/InputBar';
import SuggestionCards from '../components/SuggestionCards';
import { useKeyboardHeight } from '../hooks/useKeyboardHeight';
import type { ChatExchange } from '../types/chat';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const MainLayout: React.FC = () => {
  const [exchanges, setExchanges] = useState<ChatExchange[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const keyboardHeight = useKeyboardHeight();
  const isChatActive = exchanges.length > 0;

  const handleResetChat = () => {
    setExchanges([]);
    setIsLoading(false);
  };

  const handleSendMessage = async (content: string) => {
    // Create new exchange
    const exchangeId = `exchange-${Date.now()}`;
    const newExchange: ChatExchange = {
      id: exchangeId,
      userMessage: content,
      assistantResponse: '',
      isStreaming: true,
      timestamp: new Date(),
    };

    setExchanges((prev) => [...prev, newExchange]);
    setIsLoading(true);

    try {
      // Build messages array for API from all exchanges
      const apiMessages = exchanges.flatMap((ex) => [
        { role: 'user' as const, content: ex.userMessage },
        { role: 'assistant' as const, content: ex.assistantResponse },
      ]).concat({ role: 'user' as const, content });

      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('No response body');
      }

      let fullContent = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        fullContent += chunk;

        // Update the exchange with streamed content
        setExchanges((prev) =>
          prev.map((ex) =>
            ex.id === exchangeId ? { ...ex, assistantResponse: fullContent } : ex
          )
        );
      }

      // Mark streaming complete
      setExchanges((prev) =>
        prev.map((ex) =>
          ex.id === exchangeId ? { ...ex, isStreaming: false } : ex
        )
      );
    } catch (error) {
      console.error('Chat error:', error);
      setExchanges((prev) =>
        prev.map((ex) =>
          ex.id === exchangeId
            ? { ...ex, assistantResponse: 'Sorry, I encountered an error. Please try again.', isStreaming: false }
            : ex
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex h-dvh overflow-hidden bg-base-100'>
      <main className='flex-1 flex flex-col items-center relative w-full'>
        <Header isChatActive={isChatActive} onResetChat={handleResetChat} />

        {/* Landing View */}
        <div
          className={`flex-1 flex flex-col items-center justify-center w-full transition-all duration-500 ease-out ${isChatActive
            ? 'opacity-0 scale-95 absolute pointer-events-none'
            : 'opacity-100 scale-100'
            }`}
        >
          <Hero />
          <SuggestionCards onSelectPrompt={handleSendMessage} />
          <InputBar onSubmit={handleSendMessage} disabled={isLoading} />
        </div>

        {/* Chat View - contained within viewport */}
        <div
          className={`flex-1 flex flex-col items-center w-full pt-20 pb-40 overflow-hidden transition-all duration-500 ease-out ${isChatActive
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8 absolute pointer-events-none'
            }`}
        >
          <ChatWindow exchanges={exchanges} />
        </div>

        {/* Input Bar - fixed at bottom in chat mode, adjusts for keyboard */}
        {isChatActive && (
          <div
            className='fixed left-0 right-0 flex justify-center bg-base-100/80 backdrop-blur-sm py-2 transition-[bottom] duration-150'
            style={{ bottom: keyboardHeight > 0 ? keyboardHeight : 64 }}
          >
            <InputBar onSubmit={handleSendMessage} disabled={isLoading} />
          </div>
        )}

        <Footer />
      </main>
    </div>
  );
};

export default MainLayout;

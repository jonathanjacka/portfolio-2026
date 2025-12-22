import { useState } from 'react';
import ChatWindow from '../components/ChatWindow';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Hero from '../components/Hero';
import InputBar from '../components/InputBar';
import SuggestionCards from '../components/SuggestionCards';
import type { Message } from '../types/chat';

// Dummy responses for testing chat view
const dummyResponses: Record<string, string> = {
  experience: `I have over 5 years of experience as a Software Engineer, working across startups and enterprise companies. 

My journey started at a fintech startup where I built payment processing systems, then moved to a larger tech company where I led frontend development for their customer-facing applications.

I specialize in full-stack development with React, Node.js, and cloud technologies.`,
  project: `One of my recent projects was building a real-time collaboration platform similar to Notion.

Key highlights:
• Built with React, TypeScript, and WebSockets
• Implemented operational transformation for conflict-free editing
• Scaled to handle 10,000+ concurrent users
• Reduced load time by 40% through code splitting and lazy loading`,
  skills: `My technical skills span the full stack:

**Frontend:** React, TypeScript, Next.js, Tailwind CSS
**Backend:** Node.js, Python, PostgreSQL, MongoDB
**Cloud:** AWS, GCP, Docker, Kubernetes
**Tools:** Git, CI/CD, Agile methodologies

I'm passionate about clean code, performance optimization, and building great user experiences.`,
  default: `Thanks for your question! I'd be happy to tell you more about my experience. 

Feel free to ask about my work history, specific projects I've worked on, or my technical skills. I'm here to help!`,
};

const MainLayout: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const isChatActive = messages.length > 0;

  const getDummyResponse = (content: string): string => {
    const lowerContent = content.toLowerCase();
    if (lowerContent.includes('experience') || lowerContent.includes('work')) {
      return dummyResponses.experience;
    }
    if (lowerContent.includes('project')) {
      return dummyResponses.project;
    }
    if (lowerContent.includes('skill') || lowerContent.includes('technical')) {
      return dummyResponses.skills;
    }
    return dummyResponses.default;
  };

  const handleSendMessage = (content: string) => {
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    // Simulate assistant response with dummy data
    setTimeout(() => {
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: getDummyResponse(content),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    }, 800);
  };

  return (
    <div className='flex h-screen overflow-hidden bg-base-100'>
      <main className='flex-1 flex flex-col items-center relative w-full'>
        <Header />

        {/* Landing View */}
        <div
          className={`flex-1 flex flex-col items-center justify-center w-full transition-all duration-500 ease-out ${isChatActive
              ? 'opacity-0 scale-95 absolute pointer-events-none'
              : 'opacity-100 scale-100'
            }`}
        >
          <Hero />
          <SuggestionCards onSelectPrompt={handleSendMessage} />
          <InputBar onSubmit={handleSendMessage} />
        </div>

        {/* Chat View */}
        <div
          className={`flex-1 flex flex-col items-center w-full pt-20 pb-32 transition-all duration-500 ease-out ${isChatActive
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8 absolute pointer-events-none'
            }`}
        >
          <ChatWindow messages={messages} />
        </div>

        {/* Input Bar - fixed at bottom in chat mode */}
        {isChatActive && (
          <div className='fixed bottom-16 left-0 right-0 flex justify-center bg-base-100/80 backdrop-blur-sm py-2'>
            <InputBar onSubmit={handleSendMessage} />
          </div>
        )}

        <Footer />
      </main>
    </div>
  );
};

export default MainLayout;

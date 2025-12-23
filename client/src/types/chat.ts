export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatExchange {
  id: string;
  userMessage: string;
  assistantResponse: string;
  isStreaming: boolean;
  timestamp: Date;
}

import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { getAgentContext } from './context.js';

// Base system prompt defining Jonathan's persona
const BASE_SYSTEM_PROMPT = `You are Jonathan Jacka, a professional software engineer and full-stack web developer. You are having a friendly, professional conversation with someone who wants to learn about your background and experience.

## Your Personality
- Warm and approachable, but professional
- Enthusiastic about technology and problem-solving
- Humble but confident in your abilities
- Enjoy helping others learn

## Response Guidelines
- Keep responses conversational and natural
- Use markdown formatting for lists and emphasis when appropriate
- Share specific examples when discussing projects or experiences
- Be honest - if you don't know something, say so
- Keep responses focused and not overly long
- End responses in a way that invites further conversation
- If you are asked anything related to personal information, beliefs, politics, or religion, respond by saying that you'd like to keep the focus on professional topics.
- If you are asked anything related to your salary or compensation, respond by saying that you are not disclosing this information.

Remember: You ARE Jonathan, speaking in first person. Don't refer to yourself in third person.`;

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function streamAgentResponse(messages: ChatMessage[]) {
  // Get dynamic context from YAML files and GitHub
  const dynamicContext = await getAgentContext();

  // Combine base prompt with dynamic context
  const systemPrompt = `${BASE_SYSTEM_PROMPT}

${dynamicContext}

Use the above professional information to answer questions accurately. When discussing projects, skills, or experience, draw from this data.`;

  return streamText({
    model: openai('gpt-4o-mini'),
    system: systemPrompt,
    messages: messages.map((msg) => ({
      role: msg.role,
      content: msg.content,
    })),
  });
}

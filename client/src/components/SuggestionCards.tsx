import React from 'react';

interface Suggestion {
  id: string;
  label: string;
  prompt: string;
  icon?: string;
}

const suggestions: Suggestion[] = [
  {
    id: 'experience',
    label: 'Share your work experience',
    prompt: 'Share your work experience',
  },
  {
    id: 'projects',
    label: 'Tell me about a recent project',
    prompt: 'Tell me about a recent project',
  },
  {
    id: 'skills',
    label: 'Talk about your technical skills',
    prompt: 'Talk about your technical skills',
  },
];

interface SuggestionCardsProps {
  onSelectPrompt?: (prompt: string) => void;
}

const SuggestionCards: React.FC<SuggestionCardsProps> = ({ onSelectPrompt }) => {
  const handleClick = (suggestion: Suggestion) => {
    if (onSelectPrompt) {
      onSelectPrompt(suggestion.prompt);
    }
    // TODO: Future - integrate with agent/chat context
    console.log('Selected prompt:', suggestion.prompt);
  };

  return (
    <div className='flex flex-wrap justify-center gap-3 sm:gap-4 mt-8 px-4 max-w-2xl'>
      {suggestions.map((suggestion) => (
        <button
          key={suggestion.id}
          type='button'
          onClick={() => handleClick(suggestion)}
          aria-label={`Ask: ${suggestion.prompt}`}
          className='bg-base-200 text-base-content p-3 sm:p-4 rounded-lg shadow-md w-32 sm:w-40 text-center cursor-pointer hover:bg-base-300 hover:scale-105 text-sm sm:text-base transition-all duration-200'
        >
          {suggestion.icon && <span className='block text-xl mb-1'>{suggestion.icon}</span>}
          {suggestion.label}
        </button>
      ))}
    </div>
  );
};

export default SuggestionCards;

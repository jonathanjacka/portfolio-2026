import React from 'react';

const suggestions = ['Create image', 'Write anything', 'Help me learn'];

const SuggestionCards: React.FC = () => {
  return (
    <div className='flex flex-wrap justify-center gap-3 sm:gap-4 mt-8 px-4 max-w-2xl'>
      {suggestions.map((suggestion, index) => (
        <div
          key={index}
          className='bg-base-200 text-base-content p-3 sm:p-4 rounded-lg shadow-md w-32 sm:w-40 text-center cursor-pointer hover:bg-base-300 text-sm sm:text-base transition-colors'
        >
          {suggestion}
        </div>
      ))}
    </div>
  );
};

export default SuggestionCards;

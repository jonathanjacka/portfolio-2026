import React from 'react';

const suggestions = ['Create image', 'Write anything', 'Help me learn'];

const SuggestionCards: React.FC = () => {
  return (
    <div className='flex flex-wrap justify-center gap-3 sm:gap-4 mt-8 px-4 max-w-2xl'>
      {suggestions.map((suggestion, index) => (
        <div
          key={index}
          className='bg-white p-3 sm:p-4 rounded-lg shadow-md w-32 sm:w-40 text-center cursor-pointer hover:bg-gray-100 text-sm sm:text-base'
        >
          {suggestion}
        </div>
      ))}
    </div>
  );
};

export default SuggestionCards;

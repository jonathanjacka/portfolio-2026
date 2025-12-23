import React, { useState } from 'react';

interface InputBarProps {
  onSubmit?: (message: string) => void;
  disabled?: boolean;
}

const InputBar: React.FC<InputBarProps> = ({ onSubmit, disabled = false }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = () => {
    const trimmed = inputValue.trim();
    if (trimmed && onSubmit && !disabled) {
      onSubmit(trimmed);
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className='mt-8 w-full max-w-2xl px-4 sm:px-6'>
      <div className='bg-base-200 p-3 sm:p-4 rounded-full shadow-md flex items-center'>
        <input
          type='text'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={disabled ? 'Thinking...' : 'Ask me something...'}
          aria-label='Ask Jonathan a question'
          disabled={disabled}
          className='flex-1 border-none outline-none text-base sm:text-lg bg-transparent text-base-content placeholder:text-base-content/50 px-2 disabled:cursor-not-allowed'
        />
        <button
          type='button'
          onClick={handleSubmit}
          disabled={!inputValue.trim() || disabled}
          aria-label='Send message'
          className='btn btn-primary btn-circle btn-sm sm:btn-md ml-2 disabled:opacity-50'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='currentColor'
            className='w-4 h-4 sm:w-5 sm:h-5'
          >
            <path d='M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z' />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default InputBar;

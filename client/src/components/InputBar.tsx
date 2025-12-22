import React from 'react';

const InputBar: React.FC = () => {
  return (
    <div className='mt-8 w-full max-w-2xl px-4 sm:px-6'>
      <div className='bg-base-200 p-3 sm:p-4 rounded-full shadow-md flex items-center'>
        <input
          type='text'
          placeholder='Ask me something...'
          aria-label='Ask Jonathan a question'
          className='flex-1 border-none outline-none text-base sm:text-lg bg-transparent text-base-content placeholder:text-base-content/50 px-2'
        />
      </div>
    </div>
  );
};

export default InputBar;

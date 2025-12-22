import React from 'react';

const InputBar: React.FC = () => {
  return (
    <div className='absolute bottom-4 sm:bottom-8 w-full max-w-2xl px-4 sm:px-6'>
      <div className='bg-base-200 p-3 sm:p-4 rounded-full shadow-md flex items-center'>
        <input
          type='text'
          placeholder='Ask Gemini'
          className='flex-1 border-none outline-none text-base sm:text-lg bg-transparent text-base-content placeholder:text-base-content/50'
        />
        <div className='flex gap-2 ml-4'>
          <button className='btn btn-circle'>🎤</button>
          <button className='btn btn-circle'>🖼️</button>
        </div>
      </div>
      <p className='text-center text-sm text-base-content/60 mt-2'>
        Gemini can make mistakes, so double-check it.
      </p>
    </div>
  );
};

export default InputBar;

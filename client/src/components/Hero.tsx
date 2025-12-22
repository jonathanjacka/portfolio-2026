import { useState, useEffect } from 'react';

const Hero: React.FC = () => {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowText(true), 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section aria-label="Introduction" className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 px-4">
      <div
        className={`shrink-0 transition-transform duration-1000 ease-out motion-reduce:transition-none ${showText ? 'translate-x-0' : 'sm:translate-x-[calc(50%+1rem)]'
          }`}
      >
        <img
          className={`rounded-full ring-4 ring-primary h-32 w-32 sm:h-48 sm:w-48 lg:h-56 lg:w-56 object-cover transition-transform duration-1000 ease-out motion-reduce:transition-none ${showText ? 'scale-100' : 'scale-110'
            }`}
          src="/jon1.jpg"
          alt="Jonathan Jacka, Software Engineer"
        />
      </div>
      <div
        aria-hidden={!showText}
        className={`text-center sm:text-left max-w-md transition-all duration-1000 ease-out motion-reduce:transition-none ${showText
            ? 'opacity-100 translate-x-0'
            : 'opacity-0 sm:-translate-x-8 pointer-events-none'
          }`}
      >
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-blue-500 to-pink-500">
          Hi, I'm Jonathan
        </h1>
        <p className="mt-3 sm:mt-4 text-base sm:text-lg leading-7 text-base-content/70">
          I'm a software engineer and full stack developer. Ask me anything about my work experience, projects, or technical skills!
        </p>
      </div>
    </section>
  );
};

export default Hero;

const Footer: React.FC = () => {
  const currentDate = new Date();
  const monthYear = currentDate.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <footer className='absolute bottom-4 w-full px-4 sm:px-6'>
      <div className='flex flex-col sm:flex-row justify-center items-center gap-1 sm:gap-4 text-sm text-base-content/60 text-center'>
        <p>This is an AI simulation.</p>
        <p>© {monthYear}, Jonathan Jacka - Chicago, IL</p>
      </div>
    </footer>
  );
};

export default Footer;

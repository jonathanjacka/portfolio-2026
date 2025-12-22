import Header from '../components/Header';
import InputBar from '../components/InputBar';
import SuggestionCards from '../components/SuggestionCards';

const MainLayout: React.FC = () => {
  return (
    <div className='flex h-screen overflow-x-hidden bg-gray-50'>
      <main className='flex-1 flex flex-col items-center justify-center relative w-full overflow-x-hidden'>
        <Header />
        <h1 className='text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-pink-500'>
          Hi Charlotte!
        </h1>
        <SuggestionCards />
        <InputBar />
      </main>
    </div>
  );
};

export default MainLayout;

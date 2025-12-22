import Footer from '../components/Footer';
import Header from '../components/Header';
import Hero from '../components/Hero';
import InputBar from '../components/InputBar';
import SuggestionCards from '../components/SuggestionCards';

const MainLayout: React.FC = () => {
  return (
    <div className='flex h-screen overflow-hidden bg-base-100'>
      <main className='flex-1 flex flex-col items-center justify-center relative w-full'>
        <Header />
        <Hero />
        <SuggestionCards />
        <InputBar />
        <Footer />
      </main>
    </div>
  );
};

export default MainLayout;

